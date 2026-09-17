---
name: project-memory
description: 项目整理与记忆沉淀工作流；当用户要求整理项目、同步文档/主题/数据、更新项目索引、沉淀近期改动、维护 memory-log、沉淀设计模式、整理变更影响或让项目资产保持可追溯时使用。负责增量扫描变更、识别文档/主题/数据/设计一致性影响、生成建议清单、经确认后维护 src/resources、src/themes、src/database 等后置资源并记录日志。
---

# 项目整理

本技能用于在原型、组件、文档、主题或数据发生变化后，整理项目后置资源，让项目资产保持清晰、可追溯、可渐进扩展。它不负责重做页面主体实现；如果整理过程中发现页面或组件本体需要改造，应先向用户说明并切换到对应创建/开发流程。

## 进入条件

当用户表达以下任一意图时使用本 Skill：

- “整理项目”“沉淀项目记忆”“同步项目资料”“更新项目索引”。
- “最近改的页面帮我整理一下”“把文档/主题/数据同步一下”。
- “更新 memory-log”“维护 project-overview”“补齐 page-map / data-model / 主题索引”。
- “沉淀这次改动”“整理变更影响”“把新设计模式记到项目里”“同步设计 Review 结论”。
- 已完成原型/组件/资源修改，需要补充后置文档、主题、数据、日志。

不要在用户只是要求开发页面、改 UI、写 PRD 或创建数据表时直接使用本 Skill；这些任务应先走对应创建流程，完成后再用本 Skill 做后置整理。

## 核心原则

- **先读项目规则**：开始前阅读 `/AGENTS.md`，再按需阅读 `rules/resource-management-guide.md`、`rules/documentation-guide.md`、`rules/theme-guide.md`、`src/database/README.md`。
- **增量优先**：默认只整理与本次变更相关的资源，不做无关全量刷新。
- **建议先行**：先展示变更检测和建议清单，用户确认后再改文件。
- **不覆盖用户资产**：修改已有文件前必须先读取原内容；未经确认，不删除、不重命名、不批量覆盖。
- **日志可追溯**：每次执行都追加 `src/resources/memory-log.md`，日志短、准、可检索。
- **轻入口，重索引**：`src/resources/project-overview.md` 只保留总览、阅读索引、关键待办，不承载长篇细节。
- **证据驱动沉淀**：新增或更新的记忆必须能追溯到用户请求、git 变更、已有文档、主题文件、数据表、设计 Review 发现或明确的待确认项。
- **设计一致性可追踪**：若变更涉及视觉规范、组件模式、页面模板或交互模式，先依据默认主题和 Review 结论判断是否同步主题索引、专题文档或设计待办；未确认的新模式不要写成既定规范。

## 执行流程

1. **读取规则与现状**
   - 输入：用户请求、当前工作目录。
   - 动作：阅读 `/AGENTS.md`；检查 `src/resources/`、`src/themes/`、`src/database/`、`src/prototypes/`、`src/components/` 是否存在；读取默认主题位置和可用设计依据。
   - 输出：确认整理范围候选、可用模板、已有后置资源、默认主题与设计依据。

2. **确定扫描范围**
   - 输入：用户指定范围或默认范围。
   - 动作：按“范围确定规则”选择扫描目录和基准时间。
   - 输出：明确本次扫描范围，例如 `src/prototypes/benefit-center/`、`src/resources/`、`src/database/`。

3. **执行增量检测**
   - 输入：扫描范围、上次日志时间、git 状态。
   - 动作：优先使用 git 识别变更；没有 git 或日志时执行目录扫描。
   - 输出：按原型/组件、文档、主题、数据、公共模块分类的变更清单，并标注文档影响、主题影响、数据影响、设计模式影响。

4. **评估影响并生成建议清单**
   - 输入：变更清单、资源规范、模板。
   - 动作：按“影响分级规则”判断是否需要更新总览、专题文档、主题索引、数据说明或设计模式待办；列出建议维护项，标明将新增/修改的文件。
   - 输出：用户可确认的 checklist。未确认前不要编辑项目资源。

5. **按固定顺序维护资源**
   - 输入：用户确认后的 checklist。
   - 动作：依次处理项目总览、专题子文档、主题、数据、维护日志。
   - 输出：已更新的后置资源与检查结果。

6. **验收与最终回复**
   - 输入：本次修改文件、日志、可用检查命令结果。
   - 动作：检查文件存在、模板字段是否替换、JSON 是否合法、日志是否符合格式。
   - 输出：简短总结、文件路径、验收结果、待确认事项。

## 范围确定规则

按以下优先级确定整理范围：

1. **用户明确指定范围**
   - “整理首页相关文档” -> 仅扫描首页原型及关联资源。
   - “同步主题和数据” -> 仅扫描 `src/themes/` 与 `src/database/`。
   - “更新 xxx-page 文档” -> 扫描该原型、对应 `spec.md`、关联文档。

2. **用户给出模糊方向**
   - “最近改的页面” -> 根据 git 变更和文件修改时间扫描最近变更的 `src/prototypes/`、`src/components/`。
   - “把文档都更新一下” -> 扫描 `src/resources/`，并关联近期原型/组件变更。

3. **用户未指定范围**
   - 读取 `src/resources/memory-log.md` 最后一条 `upd` 日志时间作为增量基准。
   - 若日志不存在、为空或无法解析，按首次执行处理。

默认扫描目录：

- `src/prototypes/`
- `src/components/`
- `src/themes/`
- `src/database/`
- `src/resources/`
- `src/common/`

## 变更检测方法

优先使用 git，因为它能识别新增、修改、删除和未提交变更：

```powershell
git status --short
git diff --name-only
git diff --name-only --cached
git log --since="YYYY-MM-DD HH:mm" --name-only --pretty=format:
```

如果无法使用 git，再使用 PowerShell 文件时间扫描：

```powershell
Get-ChildItem -Recurse -File src/prototypes,src/components,src/themes,src/database,src/resources,src/common |
  Where-Object { $_.LastWriteTime -gt [datetime]"YYYY-MM-DD HH:mm" } |
  Select-Object FullName, LastWriteTime
```

分类规则：

- `src/prototypes/`、`src/components/` -> 原型/组件变更。
- `src/resources/` -> 文档变更。
- `src/themes/` -> 主题变更。
- `src/database/` -> 数据变更。
- `src/common/` -> 公共模块变更，需判断是否影响页面、数据结构或文档说明。

## 影响分级规则

对变更影响做轻量分级，帮助用户判断哪些记忆必须沉淀：

| 级别 | 触发条件 | 建议动作 |
| --- | --- | --- |
| Critical | 页面入口、业务流程、权限边界、核心数据结构、默认主题规范变化；或现有文档与实现明显冲突 | 必须列入建议清单，优先更新专题文档、总览索引和 memory-log |
| Warning | 新增字段、按钮、状态、组件模式、页面模板、主题 token 使用方式或数据口径变化 | 建议更新专题文档；若模式可复用，记录到主题/设计待办 |
| Info | 命名、截图、说明文字、小范围文档补充、无业务影响的资源移动 | 可合并到本次整理摘要，不强制创建新专题 |

分级只用于整理优先级，不替代用户确认。涉及删除、重命名、拆分大文档、主题规范确立或数据结构调整时，仍必须等待用户确认。

## 后置资源一致性矩阵

用下表判断变更应同步到哪里：

| 变更类型 | project-overview | 专题文档 | 主题/设计索引 | 数据说明 | memory-log |
| --- | --- | --- | --- | --- | --- |
| 新增/改动页面 | 更新入口索引 | page-map、business-flow、information-architecture | 如有新布局/组件模式则记录 | 如涉及字段/数据源则更新 | 必填 |
| 新增/改动组件 | 仅记录关键公共组件 | 视影响更新组件说明或页面专题 | 记录可复用模式或主题待办 | 通常不更新 | 必填 |
| 主题 token/规范变化 | 更新主题索引 | 视影响补充说明 | 必填 | 通常不更新 | 必填 |
| 数据表/字段变化 | 更新数据索引 | data-model、permission-model、state-lifecycle | 通常不更新 | 必填并校验 JSON | 必填 |
| 文档重组/拆分 | 更新阅读索引 | 更新被拆分专题 | 通常不更新 | 通常不更新 | 必填 |

## 设计与主题沉淀规则

当检测到 `src/prototypes/`、`src/components/` 或 `src/themes/` 变化时，增加以下判断：

1. **设计依据**：优先读取 `AGENTS.md` 默认主题；再按需读取 `rules/theme-guide.md`、主题 `DESIGN.md`、`designToken.json`、`globals.css` 或主题索引文档。
2. **新增模式识别**：若页面/组件出现新的布局、表单、筛选区、表格操作列、弹窗/抽屉、空状态、异常提示或状态标签模式，判断是否具有复用价值。
3. **沉淀位置**：
   - 已确认的复用模式：同步到 `project-overview.md` 的主题/组件索引，或相关专题文档。
   - 未确认的新模式：写入待办，不直接改写主题规范。
   - 已有设计 Review 结论：优先引用 Review 发现，不重复发明规则。
4. **边界**：本 Skill 不直接重构 UI、组件或主题实现；若发现需要改造，应在最终回复中建议切换到 `design-review`、`create-workflow` 或对应开发流程。

## 建议清单模板

向用户展示建议清单时使用以下格式：

```text
上次项目整理：YYYY-MM-DD HH:mm（若首次执行，写“首次执行”）
本次扫描范围：src/prototypes/...、src/resources/...

检测到以下变更：

原型/组件：
- xxx-page（新增 / 修改）
- yyy-component（修改）

文档：
- abc.md（修改）

建议执行：
- [ ] 初始化或更新 project-overview.md（影响级别：Critical / Warning / Info）
- [ ] 更新 page-map.md（页面结构变化，影响级别：Critical）
- [ ] 更新 data-model.md（数据字段变化，影响级别：Critical）
- [ ] 同步主题索引或记录设计模式待办（设计模式变化，影响级别：Warning）
- [ ] 追加 memory-log.md（必填）

请确认是否按以上建议执行。
```

若用户明确要求“直接整理”，且当前任务风险低，可以执行最小必要维护；但涉及删除、重命名、拆分大文档、git 快照提交时仍必须单独确认。

## 首次执行

当 `src/resources/memory-log.md` 不存在、为空，或没有可解析的维护日志时：

1. 视为首次整理，执行全量资源盘点。
2. 检查并按需初始化：
   - `src/resources/project-overview.md`，模板：`src/resources/templates/project-overview-template.md`
   - `src/resources/memory-log.md`，模板：`src/resources/templates/memory-log-template.md`
   - 必要专题文档，例如 `page-map.md`、`data-model.md`、`business-flow.md`
3. 不强制一次性创建所有专题文档；只创建本次变更确实需要的文档。
4. 首条日志的 `src` 字段写 `init`。

## 固定维护顺序

### 1. Git 与备份检查

- 检查是否为 git 仓库。
- 若需要创建快照提交，先展示拟提交文件并获得用户确认。
- 不要把与本次整理无关的用户改动一起提交。
- 如果用户未确认 git 快照，可继续做文件级修改，但最终回复说明未创建快照。
- 快照提交信息格式：

```text
chore: snapshot before project-memory <YYYY-MM-DD HH:mm>
```

### 2. 项目说明入口

- 目标文件：`src/resources/project-overview.md`。
- 若不存在，基于 `src/resources/templates/project-overview-template.md` 初始化。
- 若存在，只更新与本次变更相关的索引、摘要和待办。
- 保持轻量：达到或超过 `1000` 行时，必须提出拆分建议；目标是通过“专题子文档 + 总入口索引”控制在 `800` 行以内。
- 不使用简单删减压缩；应迁移细节到专题子文档，再在总入口保留摘要和链接。

### 3. 专题子文档

仅维护与变更有关的专题文档：

- `page-map.md`：页面地图、入口导航、页面关系。
- `information-architecture.md`：信息架构、模块边界、字段分组。
- `business-flow.md`：业务流程、关键路径、异常路径。
- `data-model.md`：核心对象、字段摘要、数据表关系。
- `permission-model.md`：角色、权限边界、可见/可操作范围。
- `state-lifecycle.md`：状态机、生命周期、流转条件。

新增专题文档时优先使用 `src/resources/templates/*-template.md`。如果没有对应模板，复用项目现有文档风格，保持 Markdown 简洁。

### 4. 主题维护

- 仅在主题文件变化、页面视觉体系变化、组件模式变化、已有设计 Review 指出需要沉淀，或用户明确要求主题同步时执行。
- 维护位置：`src/themes/`。
- 如需读取规范，使用 `rules/theme-guide.md`。
- 更新后同步 `project-overview.md` 的主题索引。
- 对未确认的新设计模式，只记录待办或建议，不直接写入主题规范。

### 5. 数据维护

- 仅在数据表、页面数据源、字段口径变化时执行。
- 维护位置：`src/database/`。
- 必须遵循 `src/database/README.md`：JSON 对象包含 `tableName` 和 `records`，每条记录有唯一 `id`。
- 修改 JSON 后必须做语法检查。
- 更新后同步 `project-overview.md` 的数据索引。

### 6. 维护日志

- 目标文件：`src/resources/memory-log.md`。
- 模板来源：`src/resources/templates/memory-log-template.md`。
- 日志一行一条，默认追加到文件末尾；若项目已有“时间倒序”约定，则遵循现有顺序。
- 除命中裁剪规则外，只追加，不改写历史日志。
- 当日志达到或超过 `1000` 行时，先确认是否裁剪；确认后删除最旧的 `100` 行业务日志，追加一条 `trim` 日志，再追加本次 `upd` 日志。

日志字段顺序必须与模板一致：

```text
YYYY-MM-DD HH:mm | kind | src | sum | doc | theme | data | git | todo
```

字段要求：

- `kind`：`upd` 表示普通维护，`trim` 表示日志裁剪。
- `src`：触发来源，如 `user`、`git`、`init`、`sys`。
- `sum`：更新摘要，尽量控制在 `20` 字以内。
- `doc`：文档变更，只写文件名、专题名或 `-`。
- `theme`：主题变更，只写主题名、目录名或 `-`。
- `data`：数据变更，只写数据文件名、表名或 `-`。
- `git`：短提交号或 `-`。
- `todo`：后续待办或 `-`。

示例：

```text
2026-03-16 14:20 | upd | user | 更新总览索引 | project-overview,page-map | - | orders.json | a1b2c3d | 补权限模型
2026-03-16 14:25 | trim | sys | 删旧100行 | - | - | - | - | 保留较新记录
```

## 异常与边界处理

- `AGENTS.md` 缺失：改读 `CLAUDE.md` 或 `README.md`，并在最终回复说明 fallback。
- 默认主题或设计依据缺失：跳过主题合规判断，只做通用资源一致性整理，并在待办中标记“补设计依据”。
- 模板缺失：不要臆造完整模板；先复用同类文档结构，并在日志 `todo` 标记“补模板”。
- `memory-log.md` 字段与模板不一致：先提示差异，再按当前模板追加新日志；不要批量改写历史。
- 检测到删除或重命名：先列入建议清单，用户确认后再更新索引。
- 发现大量无关改动：缩小范围，只处理用户指定或与近期变更强相关的资源。
- JSON 校验失败：停止数据维护，指出文件和错误位置，修复后再继续。
- 发现设计模式与主题冲突：不要直接改主题或页面；在建议清单中标为 Warning/Critical，并建议单独执行 `design-review` 或主题维护任务。
- 文档超过 1000 行：先提出拆分方案，用户确认后再迁移内容。

## 质量检查点

- [ ] 已阅读 `/AGENTS.md` 和必要资源规范。
- [ ] 已确认默认主题和可用设计依据；缺失时已标注 fallback。
- [ ] 已执行增量检测并按类型分类变更。
- [ ] 已按 Critical / Warning / Info 标注关键记忆影响。
- [ ] 已展示建议清单并获得用户确认。
- [ ] 已避免覆盖、删除或提交无关用户改动。
- [ ] 已按需维护 `src/resources/project-overview.md`。
- [ ] 已按需维护专题子文档、主题、数据。
- [ ] 已识别并记录需要沉淀的设计模式、主题索引或设计待办。
- [ ] JSON 数据文件已通过语法检查。
- [ ] 已按 9 字段格式追加 `src/resources/memory-log.md`。
- [ ] 最终回复包含修改文件、验收结果和待办。
