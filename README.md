# Axhub Daily Skills

Reusable workflow skills collected from day-to-day Axhub Make work. Every skill is published as a complete installable directory with its `SKILL.md`, references, scripts, tests, and optional Agent metadata.

The frequency labels below reflect explicit local usage history reviewed on 2026-09-17. They are a practical navigation aid, not a quality ranking.

## Skill Catalog

### High Frequency

| Skill | What it does |
| --- | --- |
| `operation-manual-workflow` | Produces evidence-based, training-ready operation manuals from live admin pages, Axure prototypes, screenshots, or business notes. |
| `work-summary` | Generates daily or custom-range project work summaries from repository changes. |
| `darwin-skill` | Reviews, scores, tests, and iteratively improves Agent Skills. |
| `publish-axhub-requirements-to-tapd` | Publishes or updates traceable TAPD requirements from Axhub prototypes, PRDs, and verified share links. |
| `create-workflow` | Routes Axhub content-creation requests to the most relevant prototype, component, document, data, or design workflow. |
| `prototype-annotation` | Connects page directories, component notes, states, and supporting documents to runnable prototypes. |
| `project-memory` | Maintains traceable project memory, indexes, change impact, and resource consistency. |
| `canvas-workspace` | Organizes documents, prototypes, screenshots, diagrams, and annotations on an Axhub canvas. |
| `design-review` | Reviews prototypes and components for design-system consistency and reusable patterns. |

### Medium Frequency

| Skill | What it does |
| --- | --- |
| `explore-options` | Produces and compares several UI or implementation directions before execution. |
| `axhub-prototype-context` | Reads annotated prototype context, including PRDs, directories, notes, and source entry points. |
| `handle-comments` | Processes commentary and review comments in prototypes and related documents. |
| `skills-management` | Maintains project skill inventories, categories, documentation, and backups. |

### Low Frequency

| Skill | What it does |
| --- | --- |
| `axhub-runtime-component` | Generates browser-side React components and pages for Axhub Runtime prototypes. |
| `calicat-cli-operator` | Uses the Calicat CLI to extract design, interaction, PRD, page, and screenshot context. |
| `figma-content-operator` | Reads, creates, edits, exports, or maps Figma content and code. |
| `git-repo-beginner-guide` | Guides non-technical collaborators through repository setup, synchronization, conflicts, recovery, and handoff. |
| `react-to-figma-make` | Converts React, Vite, Next.js, V0, or AI Studio pages into Figma Make import assets. |
| `write-prd` | Drafts or updates PRDs from prototypes, resources, canvas notes, and existing product context. |

## Install

Install one skill into a Codex project:

```powershell
npx skills add hidingsquids-beep/axhub-daily-skills --skill operation-manual-workflow
```

Replace `operation-manual-workflow` with any skill name from the catalog. Keep each installed directory intact because references, scripts, assets, and tests may be required by its workflow.

## Repository Layout

```text
skills/
  <skill-name>/
    SKILL.md
    agents/            # optional Agent UI metadata
    references/        # optional detailed guidance
    scripts/           # optional helpers and tests
    test-prompts.json  # optional behavior checks
```

Environment-specific examples are generalized before publication, and generated evaluation history is not included. Some skills still require their named external tools, plugins, CLIs, or project files at runtime.

## License

This repository is released under the [MIT License](LICENSE). Individual bundled assets or upstream-derived skills may retain additional attribution or license notices in their own directories.
