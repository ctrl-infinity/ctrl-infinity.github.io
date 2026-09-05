---
name: jd-intake
description: Turn a pasted LinkedIn job description into a docs/applications/<company>-<role>.md file using the intake template. Use when the user pastes a job posting or says "add this JD", "save this role", "intake".
model: haiku
allowed-tools: Read, Write, Glob
---

# JD intake

The user will paste the raw text of a job posting, usually copied from LinkedIn. Your only job is to save it as one Markdown file under `docs/applications/`, in the format of the template. Do nothing else: no summarising, no resume edits, no git commands.

## Steps

1. Read `docs/applications/_template.md` to get the exact frontmatter keys and section headings. Reproduce them exactly.
2. From the pasted text, extract:
   - `company` and `role` (the job title as written in the posting).
   - `location` as stated, including remote or hybrid wording.
   - `seniority` only if the posting names a level (e.g. "SDE II", "Senior", "L5"). Otherwise leave it empty.
   - `url` only if the user pasted a URL. Never invent one.
   - `priority`: 3 unless the user says otherwise. `status`: `saved`.
3. Build the filename: lower-case `<company>-<role>`, spaces and punctuation to single hyphens, at most 60 characters, ending in `.md`. Example: `google-software-engineer-ii-trust-and-safety.md`. Use Glob to check `docs/applications/` for a collision. If the name exists, append `-2`, `-3`, and so on.
4. Under the heading `## Job description (paste verbatim below this line)`, paste the posting **verbatim**. Preserve section headings such as "About the job", "Responsibilities", "Minimum qualifications", "Preferred qualifications". Keep bullets as Markdown bullets. Do not paraphrase, shorten, or reorder.
   The only permitted removals are LinkedIn interface noise that is not part of the posting: "Show more", "Show less", "Apply", "Easy Apply", "Save", "See who you know", "Meet the hiring team", applicant counts, "Promoted", and the "About the company" boilerplate if it is clearly the generic company blurb.
5. Leave the `## Why this role` and `## Must-haves you do NOT currently meet` sections with their HTML comments intact and empty. The user fills those in.
6. Write the file with Write. Then reply with the file path and the filled frontmatter block, and nothing else.

## If something is missing

If the company or role cannot be determined from the paste, ask one short question for the missing value. Do not ask about anything else. If the user pastes several postings in one message, create one file per posting.
