# Axhub Resource Discovery

## Bounded Search Order

1. Use explicit user paths and mappings.
2. Read `src/prototypes/<prototype-id>/spec.md` and direct references in that prototype.
3. Search filenames and headings under `src/resources/` with business keywords from the prototype.
4. Search PRD contents for the prototype ID, module name, core objects, or page names.
5. If several candidates remain, compare scope and ask the user. Do not widen the search after this point.

An explicit user statement that a resource folder contains the deliverable PRD resolves the association, even when the folder and prototype names differ. Still describe each artifact accurately; do not merge unrelated functionality into one claimed implementation.

## Project Identity

Read `.axhub/make/client.json` and use `project.id`. If absent, inspect other Axhub project metadata or ask the user; do not derive an ID from the folder name.

## Cloud Origins

Prefer origins explicitly supplied by the user. Otherwise inspect project deployment scripts/configuration and recent verified project links. Runtime and administration services may use different ports; never derive one port from the other without configuration evidence.

## Cloud Document Index

When the administration service is available, query:

```text
GET <admin-origin>/api/docs?projectId=<project-id>
```

Match the returned `path` to the selected local PRD. The index endpoint is discovery evidence only.

## Share URL Contract

- Prototype: `<runtime-origin>/prototypes/<prototype-id>`
- PRD: `<admin-origin>/docs/<each-path-segment-encoded-without-.md>?projectId=<project-id>`

Run `scripts/build-share-links.mjs`, then require HTTP 200. For PRDs, also confirm the response is the rendered HTML preview and its title/content matches the selected document.

If the prototype is reachable but the PRD is not indexed, do not fabricate a URL. Report the local PRD and cloud publication gap.
