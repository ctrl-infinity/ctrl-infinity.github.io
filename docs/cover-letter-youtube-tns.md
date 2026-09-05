# Cover Letter Software Engineer II, YouTube Trust and Safety, Responsiveness

Vinayak Gupta
Noida, India · vinayakgupta.13.6@gmail.com · +91 9896276989
linkedin.com/in/vinayak-gupta30 · github.com/ctrl-infinity

Dear Hiring Manager,

I'm writing to apply for the Software Engineer II role on YouTube Trust and Safety, Responsiveness. I build the kind of systems this team lives in every day ones that take a large, noisy stream of things needing judgment, and make sure the right ones get looked at fast, consistently, and without a human having to babysit the pipeline.

The clearest example is a project I'm proudest of at SimCorp: an autonomous review agent I designed and shipped across every repository in the org. It ingests a pull request, enriches it with the linked work item's acceptance criteria and the full surrounding file context, and returns a structured, severity-ranked judgment not free-form prose, a fixed schema, so downstream tooling can act on it deterministically. It runs unattended with real write access to production discussion threads, so I built it with strict security governance (read-only tool access, least privilege by default) and fingerprinted comment reconciliation so re-runs update an existing thread instead of spamming it. Today it reviews every PR org-wide, cut first-review turnaround by 70%, and catches real issues 35% of the time before a human reviewer even opens the diff. Swap "pull request" for "piece of content" and that's a triage-and-escalation system automated classification feeding a faster, more consistent human response.

I've since taken on a larger piece of that same problem: a production multi-agent orchestration platform that classifies incoming requests and routes them to independently built domain agents over the open Agent2Agent (A2A) protocol, so other teams can ship a new agent with zero changes to the orchestrator. Because it's the front door for every one of those requests, it had to be built for failure, not just for the happy path circuit breakers, retry-with-jitter, and an LLM-proposed fallback agent on every downstream call, end-to-end identity propagation and per-tenant isolation with no service-identity impersonation, and a single distributed trace stitched across the orchestrator and every downstream agent's own telemetry so an incident is debuggable across team boundaries. I also own the platform underneath it: Bicep-provisioned infrastructure, least-privilege managed identities, and approval-gated CI/CD with SAST/SCA scanning and post-deploy smoke tests before anything reaches production. That combination resilience, security, and observability for a system other teams depend on without owning is exactly the muscle I'd bring to Responsiveness.

I'm looking to move on from my current role for a straightforward reason: I want a harder problem and a team of people who are as self-driven about solving it as I am, without needing to be told to. I've also had the chance to work closely with European colleagues over the past couple of years, and their directness, ownership, and work culture are things I'd like to be closer to day to day it's part of what draws me to a team with Google's global footprint.

I'd welcome the chance to talk about how I can contribute to Trust and Safety. Thank you for considering my application.

Sincerely,
Vinayak Gupta
