---
name: operation-manual-workflow
description: Create training-ready operation manuals from live admin URLs, Axure prototypes, screenshots, or business notes. Use for 操作手册, 用户手册, 培训手册, 后台系统操作手册, 真实后台链接制册, Chrome 插件采集, Axure 原型生成手册, 二级页面/抽屉/弹窗深度探查, 阻断字段问询恢复, 保存/提交前确认, field/button/state coverage, configuration linkage, or step-by-step business operation documentation.
---

# Operation Manual Workflow

Use this skill to turn live-system or prototype evidence into a maintainable Markdown operation manual for business training, implementation delivery, QA review, or onboarding.

## Role

Act as a product training documentation engineer, senior product manager, and QA validation assistant. The output should help a business user complete operations step by step, while preserving enough page logic for implementation and testing teams to trace the prototype.

## Inputs

Accept one or more of these inputs:

- Axure published URL, localhost URL, or `file:///` URL.
- Live admin URL or business system URL, including login-protected后台, 商管后台, 管理后台, CRM, ERP, OMS, or other operational systems.
- Local Axure package directory containing files such as `start.html`, `index.html`, `resources/`, `data/`, `files/`, or `images/`.
- Screenshots, page exports, page notes, PRD snippets, or business process notes.
- Module name, system side, user role, target reader, output format, page scope, screenshot requirements, or menu hierarchy.
- Project-level operation manual templates, especially `src/resources/templates/functional-module-operation-manual.md` in Axhub projects.

When the user provides a live admin URL or real business system link, read `references/live-admin-manual-workflow.md` before execution. When the user provides an Axure prototype, read `references/axure-manual-workflow.md` before execution. When the user only provides screenshots or notes, use the same manual structure but mark unverifiable interactions as pending confirmation.

## Decision Tree

- **Live admin URL or real business system link**: use `references/live-admin-manual-workflow.md`, collect browser evidence with `@chrome` / Codex Chrome Extension from the user's Chrome session, simulate safe interactions, and stop before any high-risk data change unless the user explicitly authorizes it.
- **Axure URL or local Axure package**: inspect or open the prototype first with `references/axure-manual-workflow.md`, capture pages and interactions, then write the manual.
- **Only screenshots or static page exports**: document visible regions, fields, buttons, and steps; mark hidden transitions, permissions, and validation as `待确认`.
- **Only business notes or PRD text**: create a draft manual structure and pending list; do not claim screenshots or prototype behavior exists.
- **User asks for Word/PDF**: finish Markdown first, then convert only after the Markdown manual is complete and reviewed for obvious gaps.

## Core Principles

- Browse or inspect evidence before writing. Do not produce a manual only from filenames, page titles, or guesses.
- Organize by user operation path, not by internal implementation.
- Use the prototype's terminology exactly when it is visible. Do not rename business terms.
- Treat each page, modal, drawer, or important interactive state as a documentable unit.
- Treat every visible action control as a candidate evidence target: buttons, links, row actions, dropdowns, radio groups, checkboxes, switches, date pickers, steppers, tabs, expand/collapse controls, upload/import/export entries, and copy/duplicate actions.
- Capture dynamic form behavior, especially when a selection changes downstream fields, table columns, matrix rows, validation text, disabled states, or default values.
- Do not invent validation rules, permissions, status meanings, error messages, or irreversible behavior that the prototype or user material does not show.
- In Axhub projects, use the project-level functional operation manual template as the delivery skeleton when it exists: `src/resources/templates/functional-module-operation-manual.md`.
- Do not assume templates referenced by other skills, such as `create-workflow`, are automatically loaded. This skill must read its own required template files before writing.
- Treat `references/manual-template.md` as the operation-manual adapter and coverage supplement; treat the project template as the primary section order and delivery style when both are available.
- Do not write a complete manual from only a main page, first-level menu, or list screenshot when clickable entries exist. Build a page/interaction coverage queue first, then write.
- Enter secondary pages and states to their safe boundary: detail, edit, new/add, copy, configuration, approval, rules, logs, association, bind/select, drawer, modal, tab, and more-menu entries.
- Do not skip add/edit/copy/configuration pages only because they contain Save or Submit. Open them, capture fields/defaults/buttons/validation, and stop before persistence unless authorized.
- When a required business input blocks progress, ask the user for the minimum needed test value and resume the same verification chain after the user replies.
- On live systems, low-risk interactions such as navigation, filtering, reset, pagination, sorting, tab switch, opening details, and opening edit pages may be simulated directly.
- On live systems, high-risk data changes such as save, submit, delete, approve, publish, import, export sensitive data, batch operation, or status change require explicit user confirmation before execution. If the user explicitly authorizes a scoped high-risk workflow for the current module or test object, execute authorized actions within that scope without asking again for each click; keep actions on temporary/test records when possible and document the exact scope. If confirmation is absent, do not perform the action; document it as `待确认`.
- Mark gaps as `待确认`, especially missing clicks, unclear field constraints, absent errors, login blocks, inaccessible pages, and incomplete states.

## Deep Interaction Exploration Policy

- Treat visible navigation entries, toolbar buttons, row actions, more menus, dropdown menus, cards, tabs, expand/collapse controls, drawers, modals, and linked text as potential page states.
- Classify each entry before acting:
  - `Low`: detail, view, expand, tab, filter, reset, pagination, sorting, logs, rules, help. Open directly and screenshot.
  - `Medium`: new/add, edit, configuration, import/export dialog, copy page, approval page before final decision. Open, fill, switch, preview, and capture evidence, but do not persist.
  - `High`: save, submit, delete, approve/reject, publish, enable/disable, batch operation, import confirmation, export sensitive data. Ask for explicit authorization.
  - `Blocking Input`: a required business object is missing. Ask the user for the exact field and resume after receiving it.
- For each secondary page, drawer, or modal, record entry name, entry location, title, major fields, required marks, defaults, options, footer buttons, close method, unsaved-change confirmation, screenshot filename, risk level, and execution status.

## Blocking Input Recovery Policy

- Do not fabricate, skip, or abandon a core flow when it needs a business identifier or test object.
- Blocking fields include order number, document number, seller ID/name, store ID/name, product ID/name, phone number, contract number, settlement/payment/audit number, test account, test subject, business date, station, city, category, or similar required object.
- Ask the smallest necessary question in this shape: `当前流程已进入【页面/抽屉/弹窗名称】，继续验证需要填写【字段名】。请提供一个可用于测试的【字段类型】；我收到后将继续从当前步骤验证，不会直接跳过该流程。当前不会点击保存/提交，除非你明确授权。`
- After the user replies, continue from the current page when possible. If the page session is lost, return to the latest stable entry and continue the same verification path.
- If the user refuses or does not provide the value, mark the path as `因缺少用户输入被阻断` and add a pending item naming the missing field and affected operation.

## Template Resolution Policy

Use this order before writing the operation manual:

1. In Axhub projects, check whether `src/resources/templates/functional-module-operation-manual.md` exists.
2. If it exists, read it completely before drafting the manual and use it as the primary deliverable structure.
3. Use `references/manual-template.md` to add this skill's evidence-specific sections, such as page operation coverage, secondary page/drawer/modal descriptions, blocking input records, high-risk action records, page list, pending items, and screenshot path rules.
4. If the project template conflicts with this skill's evidence or safety rules, keep the project template's section order but preserve this skill's evidence, risk, pending-item, and validation requirements.
5. If the project template is missing, continue with `references/manual-template.md` and state the fallback in the final response.
6. Never leave template authoring guidance, examples, or placeholders in the deliverable. Remove or replace content such as `[填写指南]`, `[请填写...]`, `[示例]`, `{{PLACEHOLDER}}`, and unused sample rows.

## Workflow

1. **Read project rules**
   - In Axhub projects, read `AGENTS.md`, `rules/resource-management-guide.md`, and `rules/documentation-guide.md` when available.
   - For operation manuals, check and read `src/resources/templates/functional-module-operation-manual.md` before writing. This is required even when the user invoked `$operation-manual-workflow` directly without `$create-workflow`.
   - Default output paths:
     - Manual folder: `src/resources/manuals/<模块名称>操作手册/`
     - Manual: `src/resources/manuals/<模块名称>操作手册/<模块名称>操作手册.md`
     - Page list: `src/resources/manuals/<模块名称>操作手册/<模块名称>页面清单.md`
     - Pending items: `src/resources/manuals/<模块名称>操作手册/<模块名称>待确认项.md`
     - Screenshots: `src/resources/assets/manual/`
   - If the user names an existing manual folder or the project already has a related folder, reuse that folder instead of creating a duplicate. Example: `src/resources/manuals/新商策略操作手册/` may contain files such as `店铺新商策略管理操作手册.md`, `店铺新商策略管理页面清单.md`, and `店铺新商策略管理待确认项.md`.
   - Keep each module's deliverables together: operation manual, page list, pending items, and optional interactive HTML should live in the same folder.

2. **Clarify only blocking gaps**
   - Continue directly if the prototype/material, target module, and reader can be inferred.
   - Ask only when the module scope, access method, or output format cannot be derived safely.
   - Minimal clarification: module name, target reader/role, source URL or directory, and whether screenshots are required.

3. **Collect evidence**
   - For live admin URLs or real business system links, follow `references/live-admin-manual-workflow.md`.
   - For Axure URLs or packages, follow `references/axure-manual-workflow.md`.
   - For screenshots or static notes, identify page names, visible regions, fields, buttons, states, and operation paths from the supplied material.
   - Maintain a lightweight evidence map while working: page, source, URL, captured state, interaction action, screenshot filename, risk level, confirmation status, confidence, and pending issue.
   - Build a deep exploration queue before writing: list list page, filters, pagination/sorting, row detail, row edit, add/new, copy, more actions, rules/logs/configuration entries, drawers, modals, tabs, and secondary pages.
   - Build a control coverage inventory before writing: list every visible button, link, row operation, dropdown, checkbox, radio, switch, date control, tab, expandable area, and matrix/table configuration control; mark each as `已实际操作`, `仅打开查看`, `已填写但未提交`, `已切换并复原`, `因缺少用户输入被阻断`, `因高风险未执行`, `因权限不足未执行`, or `待确认`.
   - For configuration forms, deliberately test representative selection changes and validation states: no option selected, one option selected, multiple options selected, option removed, and restoring the safe/default state. Capture before/after evidence when downstream regions change.
   - For copy/duplicate, import/export, batch, status, approval, and delete controls, at least open or document the entry. Execute the persistent result only when authorized and scoped.
   - Record inaccessible pages, broken assets, login requirements, and non-clickable interactions in the pending list.

4. **Create the manual**
   - Resolve the manual template using **Template Resolution Policy**.
   - If `src/resources/templates/functional-module-operation-manual.md` exists, use it as the primary manual section order, normally including document overview, functional introduction, quick start, business flow, page/field descriptions, main operation guide, exception handling, FAQ, delivery checklist, and appendix.
   - Use `references/manual-template.md` to merge in evidence-oriented sections that the project template does not cover, especially the page operation coverage table, secondary page/drawer/modal blocks, blocking input records, and high-risk action records.
   - Keep the manual readable for training: explain entry, action, input, result, limitation, and exception handling.
   - Save screenshots under `src/resources/assets/manual/`, but link them from Markdown with the project preview mapping path `/api/docs/assets/manual/<截图文件名>.png`. Do not embed screenshots as base64 and do not use machine-specific absolute paths.

5. **Create supporting documents**
   - Page list: page name, hierarchy, entry path, page type, status, screenshot reference, and notes.
   - Pending items: page, issue type, issue description, impact, and recommended confirmer.
   - Omit supporting documents only when the user explicitly asks for a single manual and the source is small.

6. **Validate**
   - Apply `references/manual-quality-checklist.md`.
   - Confirm the manual either used `src/resources/templates/functional-module-operation-manual.md` or explicitly recorded why it fell back to `references/manual-template.md`.
   - Confirm no project-template guidance, examples, or placeholders remain in the delivered manual.
   - Check Markdown headings, tables, screenshot paths, pending items, and whether every core page has operation steps.
   - For every `/api/docs/assets/manual/<截图文件名>.png` link, verify that `src/resources/assets/manual/<截图文件名>.png` exists. Treat missing files, base64 image links, absolute local paths, and stale `../assets/manual/` links as delivery blockers.
   - Check that every asserted rule is backed by visible evidence, user material, or an explicit `待确认` marker.
   - Check the control coverage inventory against the manual and page list; no visible primary button, row action, dropdown, checkbox/radio group, or dynamic matrix/control linkage should be omitted silently.
   - Final response must list generated paths, source coverage, identified pages/interactions, validation result, and pending confirmations.

## Output Style

- Prefer Markdown unless the user explicitly asks for Word or PDF.
- Use direct instructional verbs such as "进入", "点击", "填写", "选择", "保存", "提交", "返回".
- Avoid PRD language that discusses internal system implementation.
- Avoid vague claims like "系统自动处理" unless the prototype or user material shows the result.
- Clearly distinguish "已实际操作", "仅打开查看", "已填写但未提交", and "因高风险未执行".
- Also distinguish "已切换并复原", "因缺少用户输入被阻断", "因权限不足未执行", and "待确认".
- Use `待确认` instead of filling unknown business rules.

## Reference Files

- `references/live-admin-manual-workflow.md`: Live admin URL access, `@chrome` plugin capture, logged-in Chrome session reuse, tab claiming/finalization, interaction risk grading, screenshots, and safety confirmations.
- `references/axure-manual-workflow.md`: Axure access, browser sizing, page traversal, screenshots, interactions, and edge cases.
- `references/manual-template.md`: Operation-manual adapter that explains how to combine the project-level template with evidence coverage, page-list, pending-item, and screenshot rules.
- `references/manual-quality-checklist.md`: Validation checklist and final response format.
- Project template when present: `src/resources/templates/functional-module-operation-manual.md`.
