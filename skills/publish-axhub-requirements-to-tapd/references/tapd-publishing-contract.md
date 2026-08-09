# TAPD Publishing Contract

## Read Before Write

1. Confirm the workspace ID.
2. Search the exact intended title, then its normalized module title without brackets or separators. For page splits, use the exact requested page title as the third and final query.
3. Inspect candidate parent/child relationships and template-generated role tasks.
4. Read the approved template requirement's current fields.
5. Read workspace field metadata for custom aliases and candidate values.

Stop after these bounded checks. Do not query PRD titles, business synonyms, or unrelated analytics keywords to look for requirement duplicates. If the exact/normalized searches are empty, record `duplicate_result=none` and continue.

## Base Fields

Carry these semantic values when requested:

| Semantic field | Rule |
| --- | --- |
| Category | Copy ID from approved template or resolve by exact category name |
| Iteration | Copy current iteration ID; do not reuse stale names blindly |
| Priority | Use configured candidate/label, not an undocumented raw value |
| Owner | Copy the requested handler/owner |
| Designer | Resolve the workspace's design-person custom field alias |
| Work-item type | Copy the parent/template work-item type |
| Parent | Set only for true page/sub-requirements |

Do not confuse designer, developer, creator, reporter, and owner.

## Title Grammar

Keep terminal, module, and page suffix inside one full-width bracket pair:

```text
【商管工作台_商品卡免佣总部运营模块_运营概览】
```

Do not create `【模块】_运营概览`.

## Description Contract

Use HTML supported by TAPD and keep this section order:

```html
<h2>需求背景</h2>
<h2>本期范围</h2>
<h2>核心业务规则</h2>
<h2>依赖</h2>
<h2>验收标准</h2>
<h2 id="deliverables">交付物链接</h2>
```

The delivery section contains clickable prototype and PRD links. For existing requirements, locate the current delivery/source section and replace only that section.

## Duplicate Decisions

| Existing state | Action |
| --- | --- |
| Exact complete requirement | `skip-existing` |
| Exact requirement missing requested fields/links | `update-missing-fields` |
| Similar title with uncertain scope | `blocked`, ask user |
| Parent exists but requested page child does not | Create only the missing child |
| Role task exists | Preserve it; it is not a page requirement duplicate |

## Verification Contract

Read back the affected item after every write. Confirm all requested fields and exact description links. In batches, compare intended count with read-back count and list every resulting ID/URL.
