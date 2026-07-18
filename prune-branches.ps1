<#
.SYNOPSIS
Prunes merged local branches and their associated worktrees.

.DESCRIPTION
This script fetches the latest changes from origin, identifies local branches that have been merged into origin/main, 
removes their associated worktrees if they exist, and then deletes the local branches.
#>

$ErrorActionPreference = "Continue"

Write-Host "Fetching latest from origin..." -ForegroundColor Cyan
git fetch origin --prune

# Define the main branch against which we check for merged branches
$mainBranch = "main"

Write-Host "Finding local branches merged into origin/$mainBranch..." -ForegroundColor Cyan
# Find all local branches merged into remote main. We exclude main and master to prevent deleting them.
$mergedBranches = git branch --format '%(refname:short)' --merged origin/$mainBranch | ForEach-Object { $_.Trim() } | Where-Object { 
    $_ -match '\S' -and $_ -ne 'main' -and $_ -ne 'master' 
}

if (-not $mergedBranches) {
    Write-Host "No merged branches to clean up. Everything is tidy!" -ForegroundColor Green
    exit
}

Write-Host "Branches to be pruned: $($mergedBranches -join ', ')" -ForegroundColor Yellow

# Parse worktrees reliably using porcelain format to handle spaces in paths
$worktrees = git worktree list --porcelain
$currentPath = ""
$worktreeMap = @{}

foreach ($line in $worktrees) {
    if ($line -match "^worktree (.+)") {
        $currentPath = $matches[1]
    } elseif ($line -match "^branch refs/heads/(.+)") {
        $worktreeMap[$matches[1]] = $currentPath
    }
}

foreach ($branch in $mergedBranches) {
    Write-Host "`nProcessing branch: $branch" -ForegroundColor Cyan
    
    # Safeguard: Skip if the remote tracking branch still exists (meaning it hasn't been deleted on remote)
    git show-ref --verify --quiet "refs/remotes/origin/$branch"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  -> Remote branch 'origin/$branch' still exists. Skipping." -ForegroundColor Yellow
        continue
    }

    $wtPath = $worktreeMap[$branch]
    
    if ($wtPath) {
        Write-Host "  -> Branch is checked out in worktree at: $wtPath" -ForegroundColor Yellow
        Write-Host "  -> Removing worktree..."
        
        # Remove the worktree directory using PowerShell to avoid Git's interactive prompts on locked files (e.g. node_modules)
        try {
            Remove-Item -LiteralPath $wtPath -Recurse -Force -ErrorAction Stop
            # Clean up the internal git references for the deleted worktree
            git worktree prune
            Write-Host "  -> Worktree removed." -ForegroundColor Green
        } catch {
            Write-Host "  -> Failed to delete worktree directory (files are likely in use by VS Code or a dev server). Skipping branch deletion." -ForegroundColor Red
            continue
        }
    }

    Write-Host "  -> Deleting local branch..."
    # -d is safe because we already know it's merged
    git branch -d $branch
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  -> Branch deleted successfully." -ForegroundColor Green
    } else {
        Write-Host "  -> Failed to delete branch." -ForegroundColor Red
    }
}

Write-Host "`nCleanup complete!" -ForegroundColor Green
