# Implementation Specifications

This directory contains implementation specifications that bridge user stories and technical tasks.

## Purpose

Specification files document:
- **What will be implemented**: File organization and structure
- **How components interact**: Function signatures and data flow
- **Key decisions**: Architecture choices made during planning
- **Links to requirements**: References to requests/ (what) and todo/ (how)

## When to Use

**Before starting implementation:**
1. Read `/planning/requests/{feature}.md` (user story)
2. Check `/planning/specs/{feature}.md` (implementation structure)
3. Follow `/planning/todo/{feature}.md` (technical tasks)

**After completing implementation:**
1. Update `/planning/specs/{feature}.md` to reflect actual implementation
2. Note any deviations from original spec and why
3. Document key decisions made during coding

## Specification Files

Each spec file contains:
- **Overview**: What this feature does
- **File Structure**: Where code lives in the app
- **Key Functions**: Function signatures and their roles
- **Data Model**: How data is structured and stored
- **Component Interactions**: How parts communicate
- **Implementation Notes**: Important considerations
- **Links**: References to requests/, todo/, design_decisions/

## Workflow Example

For implementing the card management feature:

1. **Understand User Need**: Read `/planning/requests/cards.md`
2. **Review Architecture**: Read `/planning/specs/cards.md`
3. **Plan Implementation**: Follow `/planning/todo/cards.md`
4. **Code**: Implement in `script.js` according to spec
5. **Update Spec**: Modify `/planning/specs/cards.md` to reflect actual code
6. **Document**: Create `/planning/done/cards.md` explaining what was built

## Maintenance

- Keep specs in sync with actual implementation
- Update specs when implementation deviates from plan
- Add implementation notes and lessons learned
- Reference actual line numbers in code when relevant
