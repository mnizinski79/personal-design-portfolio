## End Session

Wrap up the current working session. Do the following steps in order:

1. **Review the conversation** — identify everything that was built, changed, or decided in this session
2. **Update session notes** — look for a `SESSIONS.md` or `SESSION.md` in the project root or parent directory and prepend a new entry at the top using this format:

   ```
   ## YYYY-MM-DD — [brief phase/theme title]

   ### Accomplished
   - [bullet per meaningful thing completed]

   ### Next Steps
   1. [ordered list of what comes next]

   ---
   ```

3. **Git wrap-up** — run these steps in sequence:
   - Run `git status` and show Mike the full list of changed/untracked files
   - Ask Mike to confirm he wants to stage all of them, or if any should be excluded
   - Once confirmed, run `git add -A`
   - Run `git commit -m "Session YYYY-MM-DD: [one-line summary of what was built]"`
   - Before pushing, check the current branch with `git branch --show-current`, then ask Mike: "You're on branch `[branch]` — push here, or a different branch?"
   - Push to the branch Mike confirms

4. **Stop local servers** — check for any dev servers that were started this session (e.g. `next dev`, `sanity dev`). If any are still running, stop them and confirm they've been shut down.
5. **Confirm** — tell Mike the commit was pushed and show the commit message used
