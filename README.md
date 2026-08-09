# Axhub Daily Skills

Reusable workflow skills for Axhub Make projects. Each skill is kept as a complete, installable directory with its references, scripts, tests, and optional Agent metadata.

## Included Skills

### `publish-axhub-requirements-to-tapd`

Publishes or updates traceable TAPD requirements from verified Axhub Make prototypes, PRDs, and cloud preview links. It validates publication prerequisites, avoids duplicate requirements, builds a publication manifest before writes, and reads back the resulting TAPD records.

## Install

Install the first skill into a Codex project:

```powershell
npx skills add hidingsquids-beep/axhub-daily-skills --skill publish-axhub-requirements-to-tapd
```

Use `SKILL.md` inside the installed directory as the primary workflow guide. The `references/`, `scripts/`, and `test-prompts.json` files are part of the skill and should remain together.

## Structure

```text
skills/
  publish-axhub-requirements-to-tapd/
    SKILL.md
    agents/
    references/
    scripts/
    test-prompts.json
```

## License

This repository is released under the [MIT License](LICENSE).
