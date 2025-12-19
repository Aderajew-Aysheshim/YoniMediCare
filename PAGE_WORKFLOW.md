# Page Workflow — Auto-push for `client/src/pages`

This document explains the project's policy for page updates.

Scope
- Applies to edits under: `client/src/pages/*`

Workflow
- Changed page files will be automatically staged, committed, and pushed to `origin/main` by the maintainer.
- Commit message format: `chore(pages): update <file1, file2...>`
- Push target: `origin/main`

Notes
- The maintainer will test changes locally before committing.
- Risky changes will use a branch + PR workflow instead of a direct push.

If you'd like a different policy (require PRs, CI gating, etc.), tell me and I will update this document and adjust the workflow.
