# Live Admin Manual Workflow

Use this reference when an operation manual is based on a real后台 URL, live admin page, CRM/ERP/OMS page, or any online business system where user data may be visible or changeable.

## Startup Rules

1. Normalize obvious URL typos before access, such as `hhttps://` to `https://`.
2. Prefer `@chrome` / Codex Chrome Extension for live admin collection so the workflow can reuse the user's real Chrome login state, open tabs, cookies, extensions, and permission context.
3. First try to claim an already-open target tab that matches the requested URL or module. If no suitable tab exists, open a new Chrome tab with the normalized URL.
4. Do not depend on a DevTools debugging port and do not install a temporary browser-control layer by default.
5. If Chrome plugin communication fails, stop and explain the likely blocker instead of silently switching to another browser solution. Common blockers include Chrome not running, Codex Chrome Extension not installed or disabled, native host failure, extension permission issues, or plugin communication timeout.
6. Use only the user-provided or already-available authenticated session. Do not bypass authentication, scrape credentials, or perform permission escalation.
7. If the live system cannot be accessed, capture or describe the blocker page when safe and list the blocker in pending items.

## Chrome Plugin Control Pattern

Use the `@chrome` plugin as the default control layer for live admin pages.

Recommended sequence:

1. Name the browser session for traceability, for example `operation manual - <module>`.
2. Inspect existing Chrome tabs and claim the tab whose URL, title, or visible page text matches the requested module.
3. If no matching tab exists, open a new tab and navigate to the normalized URL.
4. Wait for the page to settle, then record the final URL, title, login/permission state, visible page heading, menu path, and primary text.
5. Capture a screenshot and DOM/text snapshot before interactions.
6. Execute low-risk interactions through the claimed tab: query, reset, pagination, sorting, tab switch, detail view, drawer/modal open, and edit-entry open without saving.
7. For medium-risk interactions, fill or preview only when no persistent result is triggered; document that no save/submit happened and restore values when practical.
8. Before any high-risk operation, pause and ask the user for explicit authorization unless a scoped authorization already covers that exact module, object, and action.
9. Save evidence into the evidence map after each meaningful state change.
10. At the end, release or close tabs with `browser.tabs.finalize({ keep })`. Keep the final deliverable tab when it helps user review; close or release intermediate tabs.

If the user explicitly asks to avoid fallback tools, honor that instruction. If Chrome is unavailable, report the exact Chrome/plugin blocker and stop after documenting what could not be collected.

## Interaction Risk Levels

Classify every interaction before executing it.

| Risk | Examples | Execution rule |
| --- | --- | --- |
| Low | menu navigation, filter, reset, pagination, sorting, expand/collapse, tab switch, view detail, logs, rules/help page, read-only drawer/modal | May execute directly for evidence collection. |
| Medium | open new/add/edit/copy/configuration/approval page, fill form without submitting, preview upload, open import/export dialog without confirming, switch a control then revert, select/deselect checkboxes to observe downstream matrix changes | May execute only when it does not persist data; document that no save/submit happened. |
| High | save, submit, delete, approve, reject, publish, unpublish, import, export sensitive data, copy/duplicate that creates data, batch operation, status change, send notification, irreversible workflow transition | Stop and ask the user for explicit confirmation before execution unless the user has already granted a scoped authorization for this module/test object. If not confirmed, do not execute and mark `待确认`. |
| Blocking Input | required order number, document number, seller/store/product ID or name, phone number, contract/settlement/payment/audit number, test account, test object, business date, station/city/category, or other mandatory business object | Pause and ask the user for the minimum required field. Resume the same verification path after the user replies. If the user refuses or does not provide it, mark `因缺少用户输入被阻断`. |

The confirmation question must name the exact action and affected object when visible, for example:

```text
我已打开“编辑销售商”页面。点击“保存”会修改真实后台数据。是否允许我保存这条记录用于验证保存结果？
```

Do not treat vague approval as permission for all future high-risk actions. If the user gives broad but explicit scoped authorization, record it in the evidence map, for example `confirmed: all high-risk actions on temporary test strategy only`. Stay inside that scope and prefer a clearly named temporary/test record. Ask again only when the action would affect a different object, real production-like data, a different module, or a materially broader risk category.

## Evidence Collection

Collect enough evidence before writing:

| Field | Meaning |
| --- | --- |
| Page | Visible page name or inferred module name |
| URL | Current browser URL after redirects |
| Account state | Logged in, login blocked, permission blocked, or unknown |
| Capture method | `@chrome` claimed existing tab, `@chrome` opened new tab, or blocked by Chrome/plugin issue |
| Interaction action | Clicked, opened, filled, selected, searched, reset, or skipped |
| Visible feedback | New page, drawer, modal, toast, validation text, table refresh, or no visible change |
| Screenshot | Stable screenshot filename |
| Risk level | Low, Medium, High |
| User confirmation | Not needed, confirmed, denied, or not asked because action was skipped |
| Required input | Missing field name, user-provided value, not needed, or refused |
| Recovery state | Continued from current page, re-entered from stable entry, blocked by missing input, or skipped by authorization boundary |
| Tab result | Kept as deliverable, released, closed, or unavailable |
| Pending item | Missing permission, unclear rule, unexecuted high-risk action, or inaccessible state |

Use `High` confidence only for behavior directly observed in the live page. Use `Medium` for visible but untested controls. Use `Pending` for blocked, skipped, or high-risk behavior without confirmation.

## Control Coverage Inventory

Before writing, create a compact inventory for every important visible control in the selected module. Do not rely only on the main happy path.

| Control group | What to test or document |
| --- | --- |
| Toolbar buttons | Query, reset, add, edit, copy, delete, approve/reject, submit/save, import/export, batch actions, status changes, priority/order changes |
| Row actions | Detail, edit, copy, enable/disable, logs, delete, workflow actions |
| Form controls | Required text fields, dropdowns, radio groups, checkbox groups, switches, date ranges, numeric steppers, uploads, cascaders |
| Dynamic regions | Tables, matrices, calculated fields, validation messages, disabled states, empty states, default values, and columns/rows shown after selections |
| Confirmation layers | Toasts, popovers, modal confirmations, drawer footers, validation text, and secondary confirmations |

For each control, record one of these statuses: `已实际操作`, `仅打开查看`, `已填写但未提交`, `已切换并复原`, `因缺少用户输入被阻断`, `因高风险未执行`, `因权限不足未执行`, or `待确认`.

## Deep Interaction Exploration Policy

Do not stop at the first-level menu, main page, or list page when the module exposes safe entries.

1. Treat every visible navigation entry, toolbar button, row action, more-menu item, dropdown menu, card entry, tab, expand/collapse item, linked text, drawer trigger, and modal trigger as a potential page state.
2. Build a deep exploration queue before writing the manual:
   - primary list page
   - query/filter and reset
   - table pagination and sorting
   - row detail or view entry
   - row edit entry
   - new/add entry
   - copy/duplicate entry
   - more-menu actions
   - rules, logs, help, association, binding, selection, configuration, and approval entries
   - drawers, modals, and secondary pages
3. Open every low-risk entry directly. For medium-risk entries, open to the safe boundary, capture fields and validation, and stop before persistence.
4. Do not skip `新增`, `新建`, `编辑`, `配置`, or `复制` just because the page has a Save or Submit button. At minimum, capture the opened page/drawer/modal, required fields, default values, available options, bottom buttons, disabled states, close behavior, and unsaved-change prompt.
5. If a list is empty, capture the empty state, try reset or safe filter changes, and ask the user for a test object or filter condition before treating the module as static.
6. For each explored entry, record:

| Field | Required detail |
| --- | --- |
| Entry name | Button/link/menu text such as 新增, 编辑, 详情, 日志 |
| Entry location | Toolbar, row action, more menu, tab, card, drawer, modal |
| Opened title | Page, drawer, or modal title after opening |
| Page type | List, detail, new, edit, copy, config, approval, rules, logs, drawer, modal |
| Major fields | Field names, required marks, defaults, visible options |
| Footer buttons | Save, submit, cancel, close, previous/next, confirm |
| Close behavior | Back, close icon, cancel, outside click, unsaved confirmation |
| Risk level | Low, Medium, High, Blocking Input |
| Execution status | 已实际操作, 仅打开查看, 已填写但未提交, 已切换并复原, 因缺少用户输入被阻断, 因高风险未执行, 因权限不足未执行, 待确认 |
| Screenshot | Screenshot filename or pending reason |

## Blocking Input Recovery Policy

When a real admin flow needs a specific business object, convert the blocker into a user question and recover the flow after the user replies.

1. Do not invent test data, skip the core path, or mark the whole module as unverifiable just because a field is missing.
2. Common blocking inputs include order number, document number, seller ID/name, store ID/name, product ID/name, phone number, contract number, settlement number, payment number, audit number, test account, test subject, business date, station, city, category, or similar required object.
3. Ask the smallest necessary question. Use this shape:

```text
当前流程已进入【页面/抽屉/弹窗名称】，继续验证需要填写【字段名】。请提供一个可用于测试的【订单号/店铺编号/销售商名称】；我收到后将继续从当前步骤验证，不会直接跳过该流程。当前不会点击保存/提交，除非你明确授权。
```

4. The question must state current location, required field, why the field is needed, whether it can change data, and whether Save/Submit will be clicked.
5. After the user replies, continue the original verification chain:
   - Prefer the current opened page, drawer, or modal.
   - If the session was lost, return to the latest stable entry and re-open the same path.
   - Continue screenshots, validation capture, and operation result capture.
   - Mark the evidence map as `用户补充数据后继续验证`.
6. If the user refuses or does not provide the value, mark the path as `因缺少用户输入被阻断` and add a pending item describing the missing field and affected operation path.

When a form has dependent configuration regions, capture representative before/after states:

1. Required selection missing, including validation text and downstream empty/disabled regions.
2. One option selected, including rows/columns/matrix entries that appear.
3. Multiple options selected, including how rows/columns expand.
4. Option removed, including how downstream rows/columns shrink or become empty.
5. Restored state before closing or submitting, when practical.

## Recommended Flow

1. Read project rules, check `src/resources/templates/functional-module-operation-manual.md`, and confirm output paths. If the project template exists, read it before drafting and use it as the primary manual section order.
2. Normalize the URL and open it through `@chrome` / Codex Chrome Extension by claiming an existing matching Chrome tab first, or opening a new Chrome tab when needed.
3. Capture the initial page, final URL after redirects, title, major visible text, screenshot, DOM/text snapshot, and login/permission state.
4. Identify the requested module and page scope from URL, breadcrumbs, menus, headings, or user instruction.
5. Inventory the page before interacting: menu path, list area, filter area, toolbar, row actions, more menus, tabs, drawer triggers, modal triggers, linked text, and secondary-page entries.
6. Build the deep exploration queue: list page, filter/reset, pagination/sorting, row detail, row edit, new/add, copy, more actions, rules/logs/configuration, approval, association/binding/selection, drawers, modals, and secondary pages.
7. Execute the queue by risk:
   - `Low`: click/open directly, screenshot, and return to the stable page.
   - `Medium`: open and fill/switch/preview up to the submit boundary, capture validation and buttons, restore values when practical, and do not persist.
   - `High`: pause and ask for explicit authorization naming the action and object.
   - `Blocking Input`: ask the user for the missing field, then resume the same chain after the reply.
8. For every completed entry, record operation name, current URL, title, page type, risk level, screenshot, whether deeper exploration is needed, blocking fields, confirmation status, and execution status.
9. For new/edit/submit-like flows, prefer temporary test data or user-provided test objects. If the user authorizes a high-risk action for a test object, stay inside that exact scope.
10. If a list is empty, capture empty state, reset filters or try safe filter changes, then ask whether the user can provide a test object or filter condition.
11. Write manual, page list, and pending items from the evidence map, coverage inventory, deep exploration queue, and the project-level functional operation manual template when present.
12. Validate screenshot paths and explicitly report which interactions were executed, filled but not submitted, blocked by missing input, skipped for high risk, or blocked by permissions.
13. Finalize Chrome tabs with `browser.tabs.finalize({ keep })`; report whether the deliverable tab was kept and whether intermediate tabs were released or closed.

## Screenshot Rules

Default directory:

```text
src/resources/assets/manual/
```

Markdown link format for Axhub manuals:

```md
![页面名称](/api/docs/assets/manual/<截图文件名>.png)
```

This link is a project preview mapping, not a physical directory. It should resolve to:

```text
src/resources/assets/manual/<截图文件名>.png
```

Do not write `../assets/manual/<截图文件名>.png`, absolute local filesystem paths, `file:///...`, or base64 `data:image/...` payloads in delivered manuals unless the project explicitly overrides the preview router. If an older manual used a relative path or base64 image because of migration issues, normalize it to `/api/docs/assets/manual/<截图文件名>.png` and verify the file exists on disk.

Live admin screenshot filename format:

```text
<模块名称>_<序号>_<页面或动作>.png
```

Examples:

```text
销售商商家管理列表_01_初始访问.png
销售商商家管理列表_02_筛选条件展开.png
销售商商家管理列表_03_详情抽屉.png
销售商商家管理列表_04_编辑页未保存.png
```

For sensitive data, mask or avoid exposing secrets where practical. If screenshots may contain real personal, financial, credential, or commercial data, mention the sensitivity in the final response and pending items.

## Failure And Boundary Handling

- **URL redirects to login**: capture login page, record final URL, do not invent business page behavior.
- **Chrome plugin unavailable**: stop and report the blocker. Do not automatically switch to another browser automation method unless the user explicitly requests a fallback.
- **Chrome extension communication fails**: state whether the likely cause is Chrome not running, Codex Chrome Extension missing/disabled, native host failure, extension permissions, or timeout; keep the manual limited to supplied screenshots/notes only if the user accepts reduced evidence.
- **User is logged in only in Chrome**: prefer claiming the already-open Chrome tab so the manual uses the actual authenticated session.
- **Permission denied**: capture the denial page and mark missing role/permission as `待确认`.
- **Page loads but data is empty**: document empty-state behavior only; do not invent list operations.
- **Control is hidden or disabled**: record disabled reason if visible; otherwise mark the rule pending.
- **Blocking input required**: ask for the specific field and resume after user reply; do not convert it directly into `无法验证`.
- **User provides blocking input later**: continue from the current page when possible; otherwise re-enter from the latest stable page and mark the evidence as `用户补充数据后继续验证`.
- **High-risk action not authorized**: describe the visible entry and expected manual step, but clearly mark the result as unverified.
- **Authorized high-risk workflow**: keep the operation inside the named scope, prefer temporary records, capture confirmations and final state, and clean up temporary data when cleanup itself is authorized and safe.
- **Dynamic form linkage is unclear**: capture the control before/after state and describe only the observed change, for example `未选择商户类型时矩阵显示暂无数据`; list the underlying business rule as `待确认`.
- **Export/import involves real data**: treat as high risk. Open the dialog only if safe; do not confirm export/import without explicit permission.
