---
name: publish-axhub-requirements-to-tapd
description: Use when publishing or updating TAPD requirements from Axhub Make prototypes, PRDs, cloud preview links, or when splitting page-level child requirements and validating TAPD fields.
---

# Publish Axhub Requirements To TAPD

## Overview

Turn verified Axhub prototype and PRD facts into traceable TAPD parent and page requirements. Discover resources in a bounded order, produce a publication manifest before writing, then read back every created or updated item.

## Required References

- Read [references/axhub-resource-discovery.md](references/axhub-resource-discovery.md) when locating a prototype, PRD, `projectId`, or cloud link.
- Read [references/tapd-publishing-contract.md](references/tapd-publishing-contract.md) before any TAPD create or update.
- Use `scripts/build-share-links.mjs` to construct share URLs; do not hand-build encoded PRD paths when the script is available.

## Hard Gates

Do not write TAPD until all gates pass:

1. Confirm workspace, target terminal, normalized title, prototype ID, PRD path, parent/child intent, and field template.
2. Read the prototype specification and PRD. Treat an explicit user association as authoritative; otherwise require a content match.
3. Search TAPD for exact and normalized duplicate titles, including existing children and auto-generated role tasks.
4. Resolve category, iteration, priority, owner, designer, and work-item type from a user-approved template or field metadata.
5. Resolve delivery origins from public deployment evidence and enforce endpoint roles: prototypes use the public Runtime origin; PRDs use the public Admin origin.
6. Require HTTP 200 and matching rendered content from every link. A loopback or bind origin (`localhost`, `127.0.0.1`, `0.0.0.0`, `[::1]`) never satisfies a TAPD delivery gate, even when it returns 200.
7. Show or internally validate a complete publication manifest before the first write.

If a gate fails, stop that item and report the missing fact. Never invent a PRD, field alias, link, requirement ID, or successful result.

## Workflow

### 1. Resolve Inputs

Collect or discover:

- TAPD workspace and entity type.
- Prototype ID and source directory.
- PRD path. The PRD may live in a differently named resource folder.
- Terminal/title prefix, parent title, and requested page splits.
- Cloud runtime origin, administration origin, and Axhub project ID.
- Approved TAPD template requirement.

Apply the bounded discovery order in the Axhub reference. Stop searching once each required artifact has one verified match; do not perform open-ended repository exploration.

Use this execution budget unless the user asks for broader research:

- At most 3 TAPD duplicate queries: exact intended title, normalized module title, and exact requested page title when page splits exist.
- One approved template lookup plus one field-metadata lookup. Stop when all semantic fields resolve.
- One Axhub document-index query, then direct HTTP checks for the selected prototype and PRD.
- Do not search TAPD using PRD filenames or analytics keywords unless those words are part of the intended TAPD title.
- If the budget cannot resolve a required fact, mark the manifest row `blocked` and ask for that fact.

Completion condition: as soon as the selected source files, field template, duplicate result, and HTTP checks satisfy the hard gates, stop discovery and emit the publication manifest. Do not run exploratory searches after the manifest can be completed. For read-only planning, the manifest and disclosed scope differences are the final result; return them without waiting for a write step. For write requests, proceed directly from the manifest to the approved representative or batch write, then read back the affected items.

### 2. Build The Requirement Model

Extract only supported facts into this order:

1. 需求背景
2. 本期范围
3. 核心业务规则
4. 依赖
5. 验收标准
6. 交付物链接

Separate confirmed behavior from Mock data, inferred behavior, and pending production decisions. If the prototype and PRD describe different scopes, follow an explicit user association but state each artifact's actual scope; otherwise pause for confirmation.

### 3. Plan Parent And Page Requirements

Create one parent requirement by default. Split page requirements only when the user requests it or the prototype has independently deliverable pages.

Use one full-width bracket pair:

```text
【商管工作台_模块】
【商管工作台_模块_运营概览】
【销售商端APP_模块】
```

Page children inherit category, iteration, priority, owner, designer, and work-item type from the parent/template. Preserve auto-generated product, design, backend, frontend, client, and test tasks; page requirements are additional children, not replacements.

### 4. Discover And Verify Share Links

Resolve origins in this order:

1. Explicit user-supplied public or team-reachable origins.
2. Project deployment configuration: read `.env.cloud` when present, otherwise `.env.cloud.example`. Use `PUBLIC_RUNTIME_ORIGIN` for the prototype origin. Use `PUBLIC_ADMIN_ORIGIN` when defined; otherwise combine the same scheme/host with `MAKE_PUBLIC_PORT` for the Admin origin.
3. `docs/cloud-deployment.md` and deployment proxy configuration.
4. A recent verified share link from the same project.

Treat `.axhub/make/.dev-server-info.json`, browser `window.location.origin`, `localhost`, and `127.0.0.1` as local preview evidence only. Do not publish them to TAPD. `RUNTIME_PORT` serves `/prototypes/...`; `MAKE_PUBLIC_PORT` serves `/docs/...`; `MAKE_ADMIN_PORT` is an internal upstream and is not a share port.

For this project's checked-in cloud profile, `.env.cloud.example` resolves `PUBLIC_RUNTIME_ORIGIN=http://121.40.110.77:51720` and `MAKE_PUBLIC_PORT=53817`, so the public Admin origin is `http://121.40.110.77:53817`. Re-read the configuration each run rather than assuming these values for another project.

Run:

```powershell
node <skill-dir>/scripts/build-share-links.mjs `
  --runtime-origin <runtime-origin> `
  --admin-origin <admin-origin> `
  --project-id <project-id> `
  --prototype-id <prototype-id> `
  --prd-path <resource-relative-prd-path>
```

Verify both returned URLs with a read-only HTTP request. The prototype response must be the intended prototype page, and the PRD response must be the rendered document whose title/content matches the selected PRD. The PRD link must use `/docs/...`, omit `.md`, encode each path segment, and include `projectId`. `/api/docs/...` is an index/raw-file API, not a deliverable share link.

If a public URL returns 401, 403, or is unreachable, mark the item `blocked`; never fall back to a working loopback URL. Before the manifest passes, assert that both final URLs contain no loopback/bind host and that the prototype and PRD origins use their configured public ports.

### 5. Produce The Publication Manifest

Before writing, produce one row per intended requirement with:

```text
action | title | parent_id | category | iteration | priority | owner | designer | prototype_url | prd_url | origin_evidence | duplicate_result
```

Allowed actions: `create`, `update-missing-fields`, `skip-existing`, `blocked`. An existing item defaults to `skip-existing`; update only the fields or description block explicitly requested.

### 6. Write Through The Available TAPD Connector

Use the runtime's available TAPD MCP, connector, CLI, or API. Map semantic fields from field metadata; do not assume a custom-field alias from another workspace.

For updates, read the latest description immediately before writing and replace only the intended section. For a batch, create or update one representative item first when the user asks for manual verification.

### 7. Read Back And Verify

Re-read each affected requirement and verify:

- ID, URL, workspace, title, and parent level.
- Category, iteration, priority, owner, designer, and work-item type.
- All required description sections.
- Exact prototype and PRD URLs.
- Public origin evidence and correct Runtime/Admin endpoint roles; no loopback or bind host remains.
- No duplicate parent/page requirement was created.

Report partial success item by item. Do not claim completion from a successful write response alone.

## Quick Reference

| Need | Source or rule |
| --- | --- |
| Project ID | `.axhub/make/client.json` |
| Public origins | `.env.cloud`, then `.env.cloud.example`, then `docs/cloud-deployment.md` |
| Prototype facts | `src/prototypes/<id>/spec.md`, then `.spec/` |
| PRD candidates | User path, prototype references, then bounded `src/resources/` search |
| Prototype share | `<runtime-origin>/prototypes/<prototype-id>` |
| PRD share | `<admin-origin>/docs/<encoded-resource-path-without-.md>?projectId=<id>` |
| Designer field | Resolve from TAPD field metadata |
| Child suffix | Inside the same `【】` pair |
| Completion proof | TAPD read-back plus HTTP 200 link checks |

## Common Mistakes

- Matching PRDs by filename only. Compare business content and honor explicit user mappings.
- Using `/api/docs/` as a share URL. Generate `/docs/` and verify the rendered HTML page.
- Accepting a local HTTP 200 as delivery proof. TAPD links must use configured public/team origins; a public 401/403 is blocking, not permission to substitute localhost.
- Reusing the Admin port for prototypes. Runtime serves `/prototypes/...`; public Admin serves `/docs/...`.
- Copying a parent's designer into `developer`. Resolve the actual design-person field.
- Creating page requirements before checking template-generated role tasks.
- Overwriting the whole description to add links. Patch only the delivery section.
- Treating a connector success response as final verification. Read the item back.
- Searching indefinitely. Follow the bounded order and mark the item blocked when evidence runs out.
