# Manual Quality Checklist

Use this checklist before final delivery.

## Project Template Usage

- [ ] In Axhub projects, checked whether `src/resources/templates/functional-module-operation-manual.md` exists.
- [ ] If the project template exists, read it before writing the manual and used it as the primary section order.
- [ ] If the project template exists, the delivered manual includes the applicable core chapters: 文档概要, 功能简介, 快速入门, 页面与字段说明, 主要操作指南, 异常处理, FAQ, 交付前检查清单, and 附录/待确认项.
- [ ] If the project template was missing, the final response states that `references/manual-template.md` was used as fallback.
- [ ] The manual does not rely on templates referenced only by another skill, such as `create-workflow`; all templates needed by this skill were read directly.
- [ ] No authoring guidance or unused placeholders remain: `[填写指南]`, `[请填写...]`, `[示例]`, `{{PLACEHOLDER}}`, unused sample rows, or empty template chapters.

## Screenshot Completeness

- [ ] Every core page has at least one screenshot or a clear reason why no screenshot exists.
- [ ] Every core modal has a screenshot or pending item.
- [ ] Every core drawer has a screenshot or pending item.
- [ ] Every key operation flow references screenshots when screenshots were requested or collected.
- [ ] Screenshot paths in Markdown use the project preview mapping `/api/docs/assets/manual/<截图文件名>.png` and point to existing files under `src/resources/assets/manual/`.

## Page Completeness

- [ ] Page list is complete for the selected module scope.
- [ ] The selected scope is stated; full-prototype coverage is not implied unless actually completed.
- [ ] Menu paths and page entry paths are clear.
- [ ] Page purposes are written from the user's task perspective.
- [ ] Regions, fields, buttons, states, and operation steps are documented for each core page.
- [ ] Every visible primary toolbar button and row action is either operated, safely opened, or explicitly listed as blocked/pending.
- [ ] Dropdowns, radio groups, checkbox groups, switches, date ranges, numeric controls, tabs, and expandable areas are covered when they affect page behavior.
- [ ] Copy/duplicate, import/export, batch, status, approval, delete, save, and submit entries are not silently omitted; their execution status and risk handling are stated.
- [ ] Dynamic form linkages are captured: changing applicable scope, merchant type, level, category, station, or similar controls records the downstream matrix/table/field changes.
- [ ] Operation steps are executable by a new user without oral explanation.

## Deep Interaction Coverage

- [ ] A page/interaction coverage queue was created before writing the manual.
- [ ] All low-risk secondary entries were opened when accessible: detail, view, logs, rules/help, tabs, expand/collapse, pagination, sorting, filter, and reset.
- [ ] At least one safe sample was opened for each visible typical admin entry type in scope: new/add, edit, detail, configuration, logs/rules, copy, approval, association/binding/selection, drawer, and modal.
- [ ] New/add/edit/configuration/copy entries were not skipped only because Save or Submit exists.
- [ ] Each opened secondary page, drawer, and modal has a screenshot or a precise blocker reason.
- [ ] Each entry records execution status: `已实际操作`, `仅打开查看`, `已填写但未提交`, `已切换并复原`, `因缺少用户输入被阻断`, `因高风险未执行`, `因权限不足未执行`, or `待确认`.
- [ ] Unopened safe entries are listed with a concrete reason, not a vague `无法验证`.
- [ ] Empty list states were captured; safe reset/filter changes or user test-object requests were attempted before ending collection.

## Training Usability

- [ ] The manual explains what to click, what to fill, what to choose, and what happens after saving or submitting.
- [ ] Exceptions include user-facing handling guidance.
- [ ] Permission and status limitations are stated when visible in the prototype or supplied material.
- [ ] PRD-like internal implementation details are not overused.
- [ ] Business terms match the prototype or source material.

## Live Admin Safety

- [ ] Live admin URL tasks record the capture method, final URL after redirects, and login or permission state.
- [ ] Low-risk interactions that were executed are separated from medium-risk actions that were only previewed or filled without persistence.
- [ ] High-risk data changes such as save, submit, delete, approve, publish, import, export, batch operation, and status change were not executed without explicit user confirmation.
- [ ] Opening an edit/new/configuration/approval page is distinguished from actually saving, submitting, approving, or changing status.
- [ ] If the user gave scoped high-risk authorization, the authorized scope, affected temporary/test object, executed actions, and cleanup result are documented.
- [ ] Unconfirmed high-risk actions are listed as `待确认` and are not described as verified results.
- [ ] Real data sensitivity is noted when screenshots include customer, merchant, financial, credential, or other sensitive information.
- [ ] Chrome plugin capture method is stated, including whether an existing logged-in Chrome tab was claimed or a new Chrome tab was opened.
- [ ] Chrome tab finalization is stated: deliverable tab kept, intermediate tabs released/closed, or finalization blocker reported.
- [ ] If Chrome plugin communication failed, the final output does not silently switch to another browser solution; it explains the Chrome/plugin blocker and marks evidence gaps as `待确认`.

## Uncertainty Handling

- [ ] Unshown rules are not invented.
- [ ] Every behavior claim is supported by visible evidence, user material, or a pending-confirmation note.
- [ ] Unclear interactions are listed as `待确认`.
- [ ] Blocking fields were converted into user questions instead of being treated as immediate failure.
- [ ] Blocking input questions state current page/modal, needed field, why it is needed, whether data can change, and whether Save/Submit will be clicked.
- [ ] After the user supplied a blocking field, the original verification chain continued from the current page or nearest stable entry.
- [ ] If the user did not provide the field, the path is marked `因缺少用户输入被阻断` and the affected operation is listed in pending items.
- [ ] Inaccessible pages explain the access blocker.
- [ ] Missing login credentials are handled without bypassing permissions.
- [ ] Static or non-clickable Axure interactions are documented as static evidence.
- [ ] Conflicting terminology or duplicated entry paths are recorded as pending items.

## Markdown Hygiene

- [ ] No unreplaced template placeholders remain unless they are intentionally shown as examples.
- [ ] No `functional-module-operation-manual.md` PM guidance text remains in the deliverable.
- [ ] Tables render with aligned header separators.
- [ ] Local image links are preview-mapped paths, not absolute machine paths, `file:///` URLs, stale `../assets/manual/...` links, or `data:image/...;base64,...` payloads.
- [ ] Every `/api/docs/assets/manual/<截图文件名>.png` link has a matching file at `src/resources/assets/manual/<截图文件名>.png`.
- [ ] File paths in the final response match the actual files created.
- [ ] Manual deliverables are grouped in one folder per module under `src/resources/manuals/<模块名称>操作手册/`, unless the user explicitly requested or provided another folder.
- [ ] Operation manual, page list, pending items, and optional interactive HTML for the same module are not scattered across the manuals root.

## Final Response Format

Use this shape after creating or updating manual files:

```md
已生成以下文件：

1. 操作手册：`src/resources/manuals/xxx操作手册/xxx操作手册.md`
2. 页面清单：`src/resources/manuals/xxx操作手册/xxx页面清单.md`
3. 待确认项：`src/resources/manuals/xxx操作手册/xxx待确认项.md`
4. 截图目录：`src/resources/assets/manual/`

本次共识别：
- 页面：x 个
- 弹窗 / 抽屉：x 个
- 核心操作流程：x 条
- 待确认项：x 条

已完成检查：
- Markdown 结构和标题层级
- 截图引用路径（`/api/docs/assets/manual/...` 映射到 `src/resources/assets/manual/...`）
- 页面、字段、按钮、状态、异常覆盖
- 页面操作覆盖表、二级页面/抽屉/弹窗说明
- 阻断类输入记录、高风险动作未执行记录
- 待确认项标注
- 真实后台采集方式、登录/权限状态、Chrome 标签释放/保留结果
- 已执行交互与未执行高风险操作

说明：
- 以下页面因无法访问 / 需要登录 / 原型缺失，未纳入截图：xxx
- 以下交互因 Axure 原型未配置点击事件，仅按静态页面整理：xxx
- 以下真实后台高风险操作未获授权，未执行，仅列为待确认：xxx
```

If no page or interaction is blocked, say so directly instead of leaving placeholder text.
