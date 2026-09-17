# Operation Manual Template

Use this template as the default Markdown structure. Trim sections that do not apply, but do not remove evidence, pending items, or operation steps needed for training.

## File Paths

Default Axhub paths:

```text
src/resources/manuals/<模块名称>操作手册/
src/resources/manuals/<模块名称>操作手册/<模块名称>操作手册.md
src/resources/manuals/<模块名称>操作手册/<模块名称>页面清单.md
src/resources/manuals/<模块名称>操作手册/<模块名称>待确认项.md
src/resources/assets/manual/<截图文件名>.png
```

Folder rule:

- Create one manual folder per business module by default: `src/resources/manuals/<模块名称>操作手册/`.
- Put the module's operation manual, page list, pending items, and optional interactive HTML in that folder.
- If the user has already provided a meaningful folder such as `src/resources/manuals/新商策略操作手册/`, reuse it and place the related module files inside it.
- Do not scatter the three deliverables directly under `src/resources/manuals/` unless the user explicitly asks for a flat structure.

Screenshot links from files under `src/resources/manuals/` should usually be:

```md
![页面名称](/api/docs/assets/manual/<截图文件名>.png)
```

Use this as the standard Axhub Make preview mapping:

```text
Markdown link: /api/docs/assets/manual/<截图文件名>.png
Filesystem path: src/resources/assets/manual/<截图文件名>.png
```

Do not embed screenshots as `data:image/...;base64,...`, do not use absolute local paths such as `D:\...` or `file:///...`, and do not fall back to `../assets/manual/...` for manuals under `src/resources/manuals/` unless the project explicitly uses a different preview router.

## Template Priority

For Axhub projects, the primary operation-manual delivery template is:

```text
src/resources/templates/functional-module-operation-manual.md
```

Before drafting the manual:

1. Check whether the project template exists.
2. If it exists, read it completely and use its chapter order as the main manual skeleton.
3. Replace or remove all authoring guidance and placeholders from the delivered manual, including `[填写指南]`, `[请填写...]`, `[示例]`, `{{PLACEHOLDER}}`, unused sample rows, and any section that does not apply.
4. Do not rely on `create-workflow` or `create-document.md` to load this template. When this skill is invoked directly, this reference must trigger the template read itself.
5. If the template is missing, fall back to the structure in this file and record that fallback in the final response.

The project template should usually provide these delivery chapters:

- 文档概要: revision record, target readers, technical/business support.
- 功能简介: business background, function introduction, application scenarios, system path, permissions/prerequisites.
- 快速入门: one-sentence start, common operation quick reference, pre-use checklist.
- 业务流程图: optional Mermaid or screenshot-based flow explanation.
- 页面与字段说明: screenshot + region/field/button/state explanation.
- 主要操作指南: task-based steps with screenshots.
- 异常处理: page/permission/data/operation exceptions.
- FAQ: training and trial questions that do not duplicate exception handling.
- 交付前检查清单: no placeholders, screenshots, paths, contacts, permissions, terminology, and trial-read validation.
- 附录: related documents, glossary, pending items.

## Manual Structure Supplement

Use the following sections as required supplements to the project template. When the source contains live pages, Axure interactions, drawers, modals, or secondary pages, include or merge these delivery sections unless the user explicitly asks for a smaller document.

## Page Operation Coverage Table

```md
## 页面操作覆盖表

| 页面/状态 | 入口 | 页面类型 | 操作风险 | 执行状态 | 截图 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| 列表默认态 | 菜单进入 | 列表页 | Low | 已实际操作 | /api/docs/assets/manual/xxx.png | 已采集筛选区、工具栏、表格 |
| 新增抽屉 | 新增按钮 | 抽屉 | Medium | 已填写但未提交 | /api/docs/assets/manual/xxx.png | 保存属于高风险，未获授权未执行 |
```

Execution status must use one of: `已实际操作`, `仅打开查看`, `已填写但未提交`, `已切换并复原`, `因缺少用户输入被阻断`, `因高风险未执行`, `因权限不足未执行`, `待确认`.

## Secondary Page / Drawer / Modal Template

Use this block for each secondary page, drawer, or modal that is opened or blocked:

```md
### {二级页面/抽屉/弹窗名称}

- 入口路径：{菜单 / 页面 / 按钮 / 行操作 / 更多菜单}
- 打开方式：{点击 xxx / 选择 xxx / 从 xxx 行进入}
- 页面用途：{面向业务用户说明用途}
- 页面类型：{详情页 / 新增页 / 编辑页 / 配置页 / 审核页 / 规则页 / 日志页 / 抽屉 / 弹窗}
- 操作风险：{Low / Medium / High / Blocking Input}
- 执行状态：{已实际操作 / 仅打开查看 / 已填写但未提交 / 已切换并复原 / 因缺少用户输入被阻断 / 因高风险未执行 / 因权限不足未执行 / 待确认}
- 截图：![{名称}](/api/docs/assets/manual/{截图文件名}.png)

#### 字段说明

| 字段名称 | 控件类型 | 是否必填 | 默认值 | 可选项/示例 | 校验说明 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |

#### 按钮说明

| 按钮名称 | 所在区域 | 点击后结果 | 是否高风险 | 是否已执行 | 备注 |
| --- | --- | --- | --- | --- | --- |

#### 关闭/返回说明

- 关闭方式：{返回 / 关闭图标 / 取消 / 点击遮罩 / 面包屑}
- 是否存在未保存确认：{是 / 否 / 未触发 / 待确认}
- 保存/提交前置条件：{字段、权限、测试对象、用户授权}
- 风险边界：{哪些动作只打开查看，哪些动作未获授权未执行}
- 待确认项：{无 / xxx}
```

## Blocking Input Record

```md
## 阻断类输入记录

| 阻断位置 | 所需字段 | 用户是否已提供 | 后续动作 | 当前状态 | 影响范围 |
| --- | --- | --- | --- | --- | --- |
| 新增抽屉 | 订单号 | 否 | 等待用户提供后继续校验订单带出信息 | 因缺少用户输入被阻断 | 新增流程字段校验与提交前确认 |
```

## High-Risk Action Record

```md
## 高风险动作未执行记录

| 动作 | 影响对象 | 未执行原因 | 需要的用户授权 | 当前已采集证据 |
| --- | --- | --- | --- | --- |
| 保存 | 当前编辑记录 | 未获得明确授权 | 允许保存该测试记录并验证保存结果 | 已打开编辑页、采集字段、底部按钮和保存前状态 |
```

## Page List Template

```md
# {模块名称}页面清单

| 序号 | 页面名称 | 层级 | 入口路径 | 页面类型 | 操作风险 | 执行状态 | 截图 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
```

## Pending Items Template

```md
# {模块名称}待确认项

| 序号 | 页面 | 问题类型 | 问题描述 | 影响 | 建议确认人 |
| --- | --- | --- | --- | --- | --- |
```
