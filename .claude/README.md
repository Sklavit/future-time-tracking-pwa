# Claude Code Configuration

This directory contains configuration for Claude Code.

## Structure

- `.claudeignore` - Files and patterns that Claude Code should ignore
- `commands/` - Custom slash commands for this project

## Getting Started

You can add custom slash commands by creating markdown files in the `commands/` directory.
Each file should contain the prompt you want Claude to execute when the command is invoked.

Example: `.claude/commands/test.md`
```markdown
Run all tests in the project and report the results.
```

This would allow you to use `/test` to run project tests.
