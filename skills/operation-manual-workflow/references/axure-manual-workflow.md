# Axure Manual Workflow

Use this reference when an operation manual is based on an Axure published URL, localhost URL, `file:///` URL, or local Axure package.

## Startup Check

1. Verify the source:
   - URL: confirm it is reachable in the browser.
   - Local package: look for `start.html`, `index.html`, or `home.html`.
   - Axure resources: check for `resources/`, `data/`, `files/`, and `images/`.
2. Check whether the prototype has loading failures, missing images, script errors, login requirements, or browser-security restrictions.
3. If a local package cannot open through `file:///`, start a local server from the package directory when feasible:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080/start.html` or the actual entry file.

## Viewport Selection

Use the user's system side when provided. Otherwise infer from page ratio. If still unclear, default to `1440 x 900`.

| System side | Recommended viewport |
| --- | --- |
| 商管 Web 工作台 | 1440 x 900 |
| 后台管理系统 | 1440 x 900 |
| 销售商 APP | 390 x 844 |
| 小程序 | 390 x 844 |
| PDA / 司机端 | 390 x 844 |
| 平板端 | 1024 x 768 |

## Page Traversal

1. Read the prototype sitemap when available.
2. Extract page names and preserve the prototype hierarchy.
3. Skip pages that are clearly irrelevant: 说明页, 空白页, 废弃页, 测试页, 临时页.
4. Visit each business page and wait until it is stable before capturing evidence.
5. For long pages or scrollable regions, capture a full-page screenshot or clear sectional screenshots.
6. Capture important states: default page, modal, drawer, dropdown, tab switch, step progression, empty state, permission restriction, validation error, success feedback, and failure feedback.
7. Build a deep exploration queue for the requested scope: list page, filter/reset, pagination/sorting, row detail, row edit, new/add, copy, more actions, rules/logs/configuration, approval, association/binding/selection, drawers, modals, tabs, and secondary pages.
8. Build a control coverage inventory for the requested scope: every visible toolbar button, row action, dropdown, checkbox/radio group, switch, date picker, tab, expandable region, matrix/table control, and copy/duplicate entry should be clicked, opened, or explicitly marked as static/pending.
9. For forms with dependent configuration regions, capture before/after states when selections change downstream fields, table columns, matrix rows, validation text, disabled states, or default values.
10. Do not skip add/edit/copy/configuration pages just because they contain Save or Submit. In Axure, open these states when clickable and capture fields, defaults, required marks, footer buttons, validation prompts, close behavior, and screenshots.
11. Keep traversal bounded to the user's requested module or the clearly relevant sitemap branch unless the user asks for a full-prototype manual.

## Evidence Map

Keep a compact working map before writing the manual:

| Page | Source | Captured state | Entry | Risk | Execution status | Screenshot | Confidence | Pending issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Use `High` when the behavior was directly observed, `Medium` when it is visible but not interacted with, and `Pending` when the source is incomplete. Only `High` or user-confirmed items should be written as final behavior.

## Deep Interaction Exploration Policy

For Axure prototypes, treat every visible navigation item, toolbar button, row action, more menu, dropdown menu, card, tab, expand/collapse item, linked text, drawer trigger, and modal trigger as a possible state.

| Risk | Prototype examples | Capture rule |
| --- | --- | --- |
| Low | detail, view, expand, tab, filter, reset, pagination, sorting, logs, rules/help | Click directly and screenshot. |
| Medium | new/add, edit, copy, configuration, approval page before final submit, import/export dialog | Open and interact up to the visible submit/save boundary. Capture fields, required marks, defaults, validation, and footer buttons. |
| High | prototype state that represents save success, submit success, delete confirmation, approve/reject, publish, enable/disable, import/export confirmation | Capture only if the prototype safely simulates the state. If the source represents a real linked system or unclear persistence, mark pending or ask user. |
| Blocking Input | prototype requires order number, seller/store/product ID or name, phone number, test account, station/city/category, or another business object to reveal the next state | Ask the user for the minimum test value and resume the same prototype path after the reply. |

For every secondary page, drawer, or modal, record entry name, entry location, opened title, page type, major fields, required marks, default values, options, footer buttons, close behavior, unsaved-change prompt, screenshot filename, risk level, and execution status.

## Screenshot Rules

Default screenshot directory in Axhub projects:

```text
src/resources/assets/manual/
```

Filename format:

```text
模块序号_页面序号_页面名称_状态说明.png
```

Examples:

```text
01_01_店铺等级策略列表_默认态.png
01_02_新建店铺等级策略_基本信息.png
01_03_新建店铺等级策略_适用范围下拉.png
01_04_新建店铺等级策略_指标算法配置弹窗.png
```

Quality requirements:

- Include the complete page, modal, drawer, or relevant interaction state.
- Do not cut off half of a modal, button, table, or important form area.
- Do not include browser chrome or developer tools unless the user explicitly requests it.
- Modal screenshots must include overlay, title, main buttons, and close entry.
- Table screenshots should include headers and at least two example rows when possible.
- Mobile screenshots must keep a mobile viewport ratio.

## Page Recognition

For each page, capture or infer only from visible evidence:

```text
页面名称:
所属模块:
页面类型:
使用角色:
入口路径:
页面用途:
关联页面:
截图:
```

Common page types: 列表页, 新增页, 编辑页, 详情页, 审核页, 配置页, 工作台页, 数据看板页, 规则说明页, 弹窗, 抽屉, 缺省页, 结果页.

For each visible region, record:

```text
区域名称:
区域用途:
包含字段:
包含按钮:
操作说明:
注意事项:
```

## Field, Button, And State Capture

Field table:

| 字段名称 | 控件类型 | 是否必填 | 填写说明 | 示例值 | 操作限制 | 错误提示 |
| --- | --- | --- | --- | --- | --- | --- |

Button table:

| 按钮名称 | 所在区域 | 触发条件 | 点击后结果 | 是否二次确认 | 备注 |
| --- | --- | --- | --- | --- | --- |

State table:

| 状态 | 状态含义 | 用户可见操作 | 系统限制 | 下一步动作 |
| --- | --- | --- | --- | --- |

If the prototype does not show field constraints, write:

```text
原型未明确，需以实际系统校验规则为准。
```

## Interaction Capture

Try to collect core interaction states when available:

- Dropdown open, multiselect selection, tag deletion.
- Radio/checkbox selection and deselection, including required-empty validation.
- Tab switch, step next/previous, table action column click.
- Add/edit/copy modal or drawer, delete confirmation modal, drawer open.
- Save success, save failure, required-empty validation.
- Date/time picker, upload control, switch on/off.
- Dynamic matrix/table changes after selecting merchant type, level, category, station, scope, or similar configuration controls.
- Permission denied, disabled operation, empty data, loading, and exception states.
- New/add, edit, copy, configuration, approval, rules, logs, association, binding, selection, and detail entries. At least open one safe sample for each visible type in the requested module.

For dynamic controls, document at least the visible user-facing change. Examples: `未选择商户类型时矩阵暂无数据`, `选择创业者后矩阵新增创业者行`, `取消 C级/D级 后矩阵列同步减少`. If the prototype does not expose the underlying rule, mark the rule as `待确认`.

For each core function, summarize:

```text
操作目标:
适用角色:
前置条件:
操作入口:
操作步骤:
操作结果:
注意事项:
相关截图:
```

## Blocking Input Recovery

If a prototype flow needs a specific test value before showing the next state:

1. Do not invent the value or skip the flow.
2. Ask the user for the smallest required field and name the current page/drawer/modal.
3. State whether the prototype action is only simulated or could touch a real linked system.
4. After the user replies, continue from the current prototype state when possible; otherwise return to the latest stable page and re-open the same path.
5. If the user does not provide the value, mark the entry as `因缺少用户输入被阻断` and add it to pending items.

## Edge Cases

- **Prototype cannot open**: check path, local server need, resource loss, browser security, and missing entry file. If still blocked, write the source into pending items.
- **Login required**: use user-provided test credentials only. Do not bypass permission. Document accessible pages and mark blocked pages pending.
- **Interaction not clickable**: check for hotspots. If still static, document visible page state and mark missing interaction pending.
- **Clickable entry not opened**: record the specific reason, such as missing hotspot, broken link, permission gate, unsafe real-system action, or unresolved blocking input.
- **Blocking input required**: ask for the needed field and resume after the user replies; do not mark the whole prototype flow as impossible immediately.
- **Long page**: use full-page screenshot first; if unreadable, split into top/middle/bottom screenshots.
- **Multiple platforms**: separate Web and APP chapters. Do not mix operation steps. Use Web verbs such as "点击"; use mobile verbs such as "点击", "滑动", "返回", and "下拉刷新".
- **No sitemap**: manually collect reachable navigation and page links from the visible prototype shell, then mark sitemap absence in pending items.
- **Source conflict**: keep prototype-visible terms in the manual and list conflicting PRD/business terms in pending items for confirmation.
