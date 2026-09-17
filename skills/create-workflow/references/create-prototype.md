# 创建原型 / 组件

创建或更新原型页面、业务组件、通用 UI 组件的标准流程。原型默认存放在 `src/prototypes/`，组件默认存放在 `src/components/`。

## 角色定位

你将作为 **UI/UX 设计架构师 × 前端工程师（复合型）**，协助用户从需求理解、规格设计、代码实现到验收闭环完成原型或组件。

## 适用范围

当主产物被 `create-workflow` 判断为原型或组件时使用本流程，包括：

- 新建页面、原型、业务流程界面、看板、表单、弹窗、移动端页面。
- 新建可复用组件、业务组件、局部 UI 模块。
- 更新已有原型/组件的布局、交互、样式、数据展示或规格文档。
- 根据 PRD、截图、设计稿、数据表、主题或已有页面还原新的前端原型。

如果用户实际要创建项目文档、主题或数据表，应回到 `create-workflow` 重新分流。

## 核心原则

- **先读规范**：必须阅读 `/AGENTS.md`、`rules/design-guide.md`、`rules/development-guide.md`、`src/resources/templates/spec-template.md`。
- **资料优先**：用户提供的 PRD、截图、主题、数据、参考页面优先级最高；项目已有文档和数据优先于推测。
- **先 spec 后代码**：涉及原型/组件创建或重要更新时，必须先产出或同步更新 `spec.md`，再实现 `index.tsx`。
- **文档代码同步**：修改实现时同步更新 `spec.md`；修改 `spec.md` 时同步检查实现是否需要调整。
- **信息足够就执行**：需求已明确时不要强制等待用户补充；只有关键目标、范围或输出位置缺失时才澄清。
- **验收不省略**：实现后必须运行或说明无法运行 `scripts/check-app-ready.mjs` 的原因。

## 执行流程

1. **读取规则与资料**
   - 输入：用户需求、附件、链接、目标目录或已有文件。
   - 动作：阅读项目规则、设计指南、开发指南、spec 模板；查找相关 PRD、数据表、主题和同类原型。
   - 输出：任务类型、资料来源、目标目录候选。

2. **判断新建还是更新**
   - 若用户指定已有目录或文件，读取 `spec.md`、`index.tsx`、`style.css` 后按更新处理。
   - 若目标目录已存在但用户要求新建，先提示冲突，询问更新、改名新建或合并。
   - 若无对应目录，按新建处理。

3. **需求对齐**
   - 信息足够时直接进入设计，不重复追问。
   - 缺少目标用户、核心功能、页面范围、组件职责或输出类型时，使用“最小澄清模板”。

4. **设计与规格文档**
   - 按 `rules/design-guide.md` 完成功能、内容、数据、布局、视觉和交互规划。
   - 使用 `src/resources/templates/spec-template.md` 生成或更新 `spec.md`。
   - `spec.md` 必须覆盖业务目标、功能清单、信息架构、数据来源、布局结构、视觉规范、交互状态和验收要点。

5. **开发实现**
   - 按 `rules/development-guide.md` 创建或更新 `index.tsx`、`style.css` 和必要内部子组件。
   - `index.tsx` 顶部必须包含中文 `@name` 注释。
   - 目录名使用小写字母、数字、连字符，例如 `benefit-center`。
   - React 与 Hooks 直接从 `react` 导入；新增依赖需确认项目可用并同步安装。
   - 使用 Tailwind 时，必须导入 `style.css`，且 `style.css` 包含 `@import "tailwindcss";`。

6. **验收与修复**
   - 原型运行：`node scripts/check-app-ready.mjs /prototypes/<name>`。
   - 组件运行：`node scripts/check-app-ready.mjs /components/<name>`。
   - 若返回 `ERROR`，根据 `errors` 修复后重新执行，直到 `READY` 或明确说明阻塞原因。
   - 最终回复说明产物路径、验收结果、访问地址或待确认事项。

## 最小澄清模板

仅在关键信息不足时使用：

```text
收到，准备创建原型或组件。

我还需要确认 3 点：
- 目标类型：页面原型 / 业务组件 / 通用组件
- 核心场景：这个页面或组件主要解决什么问题
- 输出位置：放到 src/prototypes/ 还是 src/components/
```

如果用户已经提供 PRD、截图、目录或明确需求，不要用该模板阻塞执行。

## 输出目录与文件

### 原型页面

目录：`src/prototypes/<page-name>/`

必需文件：

- `spec.md` - 规格文档。
- `index.tsx` - 页面入口组件。

可选文件：

- `style.css` - 样式文件，使用 Tailwind 时必需。
- `components/` - 页面内部子组件目录。

### UI 组件

目录：`src/components/<component-name>/`

必需文件：

- `spec.md` - 规格文档。
- `index.tsx` - 组件入口。

可选文件：

- `style.css` - 样式文件，使用 Tailwind 时必需。
- `components/` - 组件内部拆分目录。

## 新建要求

新建原型或组件时必须完成：

- 确定目录名，使用小写字母、数字、连字符。
- 创建 `spec.md`，并确保内容可指导实现。
- 创建 `index.tsx`，顶部包含：

```typescript
/**
 * @name 中文显示名
 *
 */
```

- 如使用 Tailwind，创建并导入 `style.css`：

```css
@import "tailwindcss";
```

- 实现关键状态：默认、加载、空状态、错误/异常、禁用或不可操作状态。
- 对照 `spec.md` 检查功能、内容、数据和视觉是否一致。

## 更新要求

更新已有原型或组件时：

- 先读取原 `spec.md` 和实现文件，识别当前功能边界。
- 保留仍有效的结构、交互和样式，不顺手重写无关部分。
- 修改代码前先更新 `spec.md` 中受影响的功能、布局、数据或验收说明。
- 如果用户只要求改文案、样式或小交互，保持修改范围最小。
- 如果发现 `spec.md` 与实现不一致，优先同步两者，并在最终回复说明。

## 资料与资源使用

按以下优先级收集资料：

1. 用户提供的 PRD、截图、设计稿、主题、数据或明确约束。
2. `src/resources/` 中相关业务文档。
3. `src/database/` 中可直接消费的数据表。
4. `src/themes/` 中用户指定或项目默认主题。
5. `src/prototypes/`、`src/components/` 中同类页面和组件。

不要一次性读取无关资料；只加载和当前页面/组件直接相关的文件。

## 异常与边界处理

- `rules/development-guide.md` 或 `src/resources/templates/spec-template.md` 缺失：停止并说明缺失路径，不臆造规范。
- 目标目录已存在：先读取现有内容，询问更新、改名新建或合并。
- 用户资料不足但必须继续：使用现有项目资料推断，并在 `spec.md` 标记 `待确认`。
- 用户要求跳过 `spec.md`：说明项目要求文档代码同步，至少生成轻量 `spec.md`。
- 验收脚本失败：根据 `errors` 修复并重跑；如果是环境问题，记录命令、错误摘要和未完成原因。
- 需要新增依赖：先检查 `package.json`，优先使用已有依赖；确需新增时说明用途并安装。
- 发现 `hack.css`：不要修改，除非用户明确要求且说明风险。

## 质量检查点

- [ ] 已阅读 `/AGENTS.md`、`rules/design-guide.md`、`rules/development-guide.md`、`src/resources/templates/spec-template.md`。
- [ ] 已确认新建或更新，并处理目标目录冲突。
- [ ] `spec.md` 已创建或同步更新。
- [ ] `index.tsx` 顶部包含中文 `@name` 注释。
- [ ] 目录名符合小写字母、数字、连字符规则。
- [ ] 使用 Tailwind 时已导入 `style.css`，且包含 `@import "tailwindcss";`。
- [ ] 空状态、加载态、异常态等关键状态已覆盖或在 `spec.md` 标注。
- [ ] 已运行 `node scripts/check-app-ready.mjs /prototypes/<name>` 或 `/components/<name>`。
- [ ] 最终回复包含产物路径、验收结果和待确认事项。

## 参考

- `rules/design-guide.md`
- `rules/development-guide.md`
- `src/resources/templates/spec-template.md`
