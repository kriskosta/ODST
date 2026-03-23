# Agent Protocol

You are an ephemeral agent. You will:

1. Read necessary documentation
2. Do meaningful and precise work
3. Accomplish task
4. Commit changes
5. Cease to exist

Bonus: If you think of ways to legitimately improve the overall process or have suggestions based on lessons you may have learned accomplishing your task, you are allowed to append to the file docs/LESSONS.md. If you suffer from extreme challenges, you may append to the file docs/CHALLENGES.md.

The next agent has no memory of you. Communicate through:

- Code changes
- Documentation updates
- Code comments
- Git commit messages

## Primary state communication: `docs/PROGRESS.md` Change logging: `docs/CHANGELOG.md` Lessons logging: `docs/LESSONS.md` Challenges logging: `docs/CHALLENGES.md`

## Project Overview

**Monarch Website** is a premium, highly polished website project with an emphasis on visual excellence, reliability, and performance. The primary focus is building and maintaining a production-grade website that meets the highest standards of quality.

### Future Integrations

- **Web3 Marketplace** - Blockchain-based marketplace integration
- **Web2 Plugin** - Proprietary alternative marketplace solution

---

## Project Structure

```
monarch_website/
├── docs/
│   ├── AGENT_PROTOCOL.md         # This file - agent workflow guide
│   ├── SYSTEM.md                 # High-level description
│   ├── ARCHITECTURE.md           # Target state (what "done" looks like)
│   ├── PROGRESS.md               # Current state (what exists now)
│   ├── CONSTRAINTS.md            # Rules and patterns
│   ├── DEPENDENCIES.md           # External dependencies
│   ├── LESSONS.md                # Lessons learned by agents
│   ├── CHALLENGES.md             # Challenges encountered by agents
│   └── CHANGELOG.md              # Change history
├── src/                          # Source code
├── public/                       # Static assets
├── tests/                        # Test suites
└── [config files]                # Build/deploy configuration
```

---

## Work Loop

```
1. LOCATE
   • Confirm you're in the monarch_website project
   • Read docs/SYSTEM.md for high-level context

2. INVESTIGATE
   • Read docs/ARCHITECTURE.md → target state
   • Read docs/PROGRESS.md → current state
   • Read docs/CONSTRAINTS.md → rules to follow

3. IDENTIFY
   • If assigned a task → execute it
   • If no task assigned → find the gap between ARCHITECTURE and PROGRESS
   • If no meaningful gap exists → terminate (nothing to do)

4. PLAN
   • What files need to be created/modified?
   • What tests are required?
   • What dependencies are missing?
   • What docs need updating?

5. IMPLEMENT
   • Follow CONSTRAINTS.md patterns
   • Write tests WITH implementation
   • Ensure cross-browser compatibility
   • Verify responsive design
   • Check accessibility standards

6. DOCUMENT
   • Update docs/PROGRESS.md (MANDATORY)
     - Check off completed items
     - Update test status
   • Append to docs/CHANGELOG.md
   • Add code comments for non-obvious logic

7. COMMIT & PUSH
   • Follow commit message format (see below)
   • Push branch
```

---

## Website Quality Standards

### Visual Excellence

- Pixel-perfect implementation of designs
- Smooth animations and transitions
- Consistent typography and spacing
- Professional color palette adherence

### Performance

- Core Web Vitals optimization (LCP, FID, CLS)
- Image optimization and lazy loading
- Minimal bundle size
- Efficient caching strategies

### Reliability

- Zero tolerance for broken links
- Graceful error handling
- Fallback states for all dynamic content
- Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

### Responsive Design

- Mobile-first approach
- Breakpoint consistency
- Touch-friendly interactions
- Viewport-appropriate layouts

---

## Commit Message Format

```
[#ISSUE_ID] Brief description

- Specific change 1
- Specific change 2
```

If no issue ID: `[NO-ISSUE] Brief description`

---

## Updating PROGRESS.md

### Check off completed items

```markdown
- [ ] ComponentName    →    - [x] ComponentName
```

### Update test status

```markdown
| Suite       | Tests | Passing | Failing |
|-------------|-------|---------|---------|
| Unit        | 12    | 12      | 0       |
| Integration | 5     | 5       | 0       |
| E2E         | 8     | 8       | 0       |
```

### Update phase progress

```markdown
Phase 1: [####______] 40%    →    Phase 1: [######____] 60%
```

---

## Updating CHANGELOG.md

Append entry:

```markdown
### YYYY-MM-DD - #ISSUE_ID
**Work**: Brief description
**Files**: file1.tsx (new), file2.css (modified)
**Tests**: TestFile.spec.ts (N tests)
**Status**: Success | Partial | Blocked
**Notes**: Context for next agent
---
```

---

## Handling Gaps

### Missing Component

1. Check if a design exists
2. Create component following existing patterns
3. Ensure it's responsive and accessible
4. Add to component library if reusable
5. Note in PROGRESS.md

### Missing Dependency

1. Check PROGRESS.md "What's Next"
2. Higher priority? → Implement it first
3. Lower priority? → Document blocker, proceed without it

### Uncertainty

1. Check ARCHITECTURE.md
2. Check similar patterns in codebase
3. Still unclear? → Add to "Questions for Humans" in PROGRESS.md
4. Make reasonable decision, document it, proceed

### Found Bug (Not Your Task)

1. Blocks you? → Fix it, document in CHANGELOG
2. Doesn't block? → Add to "Known Issues" in PROGRESS.md
3. Don't go on tangents

### Visual Discrepancy

1. Check if design assets exist
2. Compare against design specifications
3. Document deviation in PROGRESS.md
4. Proceed with best judgment, flag for review

---

## Termination Conditions

**STOP and commit if:**

- Task complete
- Blocked with no workaround (document why)
- No meaningful task identified

**DO NOT stop for:**

- Missing docs (create them)
- Unclear requirements (make decision, document it)
- Test failures you can fix

---

## Commit Checklist

Before committing:

- [ ] Code compiles/builds without errors
- [ ] All tests pass
- [ ] No linting errors
- [ ] PROGRESS.md updated
- [ ] CHANGELOG.md entry added
- [ ] Commit message follows format
- [ ] No debug code or console.logs
- [ ] No unfinished TODOs
- [ ] Follows docs/CONSTRAINTS.md rules
- [ ] Responsive design verified
- [ ] Accessibility checked

---

## Don'ts

| Don't | Why |
|-------|-----|
| Skip reading docs | You'll duplicate work or violate patterns |
| Forget PROGRESS.md | Next agent won't know state |
| Make architectural changes | Add to "Questions for Humans" instead |
| Leave tests for "later" | There is no later for you |
| Work outside task scope | Add to "What's Next" for future agents |
| Ignore discoveries | Record important findings for future agents |
| Break responsive design | All changes must work across viewports |
| Skip accessibility | Website must be usable by everyone |
| Commit console.logs | Keep production code clean |
| Ignore performance | Every change should maintain or improve speed |

---

## Integration Guidelines

### Future: Web3 Marketplace

When Web3 integration work begins:

- Wallet connection flows must be seamless
- Transaction states must be clearly communicated
- Gas estimation and confirmation UX is critical
- Fallback for non-Web3 browsers required

### Future: Web2 Plugin (Proprietary Alternative)

When proprietary marketplace work begins:

- Must integrate without disrupting existing functionality
- Payment flow security is paramount
- User data handling must follow privacy requirements
- API integration must be resilient and well-tested

---

## Execution Template

For each task:

1. Create branch: `ai/[ISSUE_ID]-[brief-descriptor]`
2. Follow the workflow above
3. Commit: `[#ISSUE_ID] Description`
4. Push: `git push origin [branch-name]`
