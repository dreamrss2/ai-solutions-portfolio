export type Lang = "en" | "zh";

export type LocalizedText = Record<Lang, string>;

export type ProjectLinkKind = "live" | "source" | "upstream";

export interface ProjectLink {
  kind: ProjectLinkKind;
  href: string;
  label: LocalizedText;
}

export interface ProjectMedia {
  src: string;
  thumbnail: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface ProjectFact {
  value: string;
  label: LocalizedText;
}

export interface WorkflowStep {
  number: string;
  title: LocalizedText;
  text: LocalizedText;
}

export interface CaseStudySection {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  items?: LocalizedText[];
}

export interface Project {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  tags: string[];
  featured: boolean;
  accent: "mint" | "coral" | "blue" | "yellow";
  media: ProjectMedia[];
  facts: ProjectFact[];
  workflow: WorkflowStep[];
  sections: CaseStudySection[];
  links: ProjectLink[];
}

export interface Experiment {
  icon: "bot" | "network";
  title: string;
  category: LocalizedText;
  summary: LocalizedText;
  evidence: LocalizedText;
  tags: string[];
}

const l = (en: string, zh: string): LocalizedText => ({ en, zh });

export const portfolioUrl = "https://portfolio.renss.top";
export const githubUrl = "https://github.com/dreamrss2";

export const projects: Project[] = [
  {
    slug: "zr-ai-gateway",
    title: l("ZR AI Gateway", "ZR AI 网关"),
    category: l("Flagship product · AI infrastructure", "旗舰产品 · AI 基础设施"),
    role: l(
      "Product engineer and secondary-development owner",
      "产品工程与二次开发负责人",
    ),
    summary: l(
      "A unified AI API gateway and user-facing workspace built through focused secondary development on New API and Sub2API.",
      "基于 New API 与 Sub2API 进行聚焦二次开发，形成统一 AI API 网关与面向用户的工作空间。",
    ),
    outcome: l(
      "Connected model access, key lifecycle, chat, image generation and operator controls into one coherent product surface.",
      "把模型接入、密钥生命周期、对话、生图和运营控制整合为一套连贯的产品体验。",
    ),
    tags: ["Go", "React", "API Gateway", "New API", "Sub2API"],
    featured: true,
    accent: "mint",
    media: [
      {
        src: "/projects/zr-gateway.jpg",
        thumbnail: "/projects/thumbs/zr-gateway.webp",
        alt: l(
          "ZR AI Gateway public homepage with unified model access and gateway features",
          "展示统一模型接入与网关能力的 ZR AI Gateway 公开首页",
        ),
        caption: l(
          "Public gateway homepage. The signed-in chat workspace is intentionally not linked from this portfolio.",
          "网关公开首页。出于隐私考虑，本作品集不直接链接登录后的对话工作台。",
        ),
      },
    ],
    facts: [
      { value: "2", label: l("upstream foundations", "个上游基础项目") },
      { value: "Chat + Image", label: l("product workflows", "产品工作流") },
      { value: "No shared key", label: l("browser security rule", "浏览器安全规则") },
    ],
    workflow: [
      {
        number: "01",
        title: l("Validate identity", "校验身份"),
        text: l(
          "Reuse the gateway login state and validate the current user before exposing model controls.",
          "复用网关登录状态，在展示模型控制能力前校验当前用户。",
        ),
      },
      {
        number: "02",
        title: l("Resolve access", "解析访问能力"),
        text: l(
          "Load or create a user-owned API key and request only the models available to that key.",
          "加载或创建用户自己的 API Key，并只请求该 Key 可用的模型。",
        ),
      },
      {
        number: "03",
        title: l("Route by intent", "按意图路由"),
        text: l(
          "Send chat, generation and image-edit requests to their compatible OpenAI-style endpoints.",
          "把对话、生图和图片编辑请求路由到兼容的 OpenAI 风格接口。",
        ),
      },
      {
        number: "04",
        title: l("Keep the workspace useful", "保持工作台可用"),
        text: l(
          "Separate agent modes, preserve conversation context and surface actionable gateway errors.",
          "区分智能体模式、保留会话上下文，并把网关报错转换成可执行提示。",
        ),
      },
    ],
    sections: [
      {
        eyebrow: l("BUSINESS PROBLEM", "业务问题"),
        title: l("One account, many model providers", "一个账号连接多种模型能力"),
        body: l(
          "Teams should not have to understand every upstream provider, credential format or endpoint before they can use AI. The product needed one controlled entry point while keeping usage, keys and routing visible to operators.",
          "团队不应该先理解每个上游供应商、凭据格式和接口差异，才能开始使用 AI。产品需要提供统一入口，同时让运营侧仍能看清用量、密钥和路由状态。",
        ),
      },
      {
        eyebrow: l("MY CONTRIBUTION", "我的工作"),
        title: l("Turn upstream systems into one product", "把上游系统整理成一个产品"),
        body: l(
          "I worked across gateway configuration, product branding, model discovery and the static ZR Chat workspace. The work focused on the gaps between an admin-oriented gateway and a usable end-user flow.",
          "我同时处理网关配置、产品品牌、模型发现和 ZR Chat 静态工作台，重点补齐偏管理端的网关与真实用户流程之间的缺口。",
        ),
        items: [
          l(
            "Load chat-capable models from the current validated API key instead of a hard-coded list.",
            "从当前已校验的 API Key 加载可对话模型，而不是使用写死列表。",
          ),
          l(
            "Add direct image upload, image generation and reference-image editing routes.",
            "增加图片直传、生图和参考图编辑路由。",
          ),
          l(
            "Create agent modes for general chat, image work, prompt design and content analysis.",
            "建立通用对话、生图、提示词设计和内容分析等智能体模式。",
          ),
        ],
      },
      {
        eyebrow: l("ENGINEERING DECISION", "工程决策"),
        title: l("Keep credentials with the user", "让凭据始终属于用户"),
        body: l(
          "The browser reuses the signed-in user's gateway token, selects a user-owned key and keeps that generated key only in memory for the current session. No shared server key is embedded in the static frontend.",
          "浏览器复用已登录用户的网关 Token，选择用户自己的 Key，并仅在当前会话内存中保存生成的 Key；静态前端不嵌入共享服务端密钥。",
        ),
      },
      {
        eyebrow: l("DELIVERY EVIDENCE", "交付证据"),
        title: l("A public product surface and a tested chat workflow", "公开产品入口与经过验证的对话流程"),
        body: l(
          "The public gateway is live. The repository also contains a focused smoke test for agent-mode behavior, while the production chat route remains behind the gateway's own authentication boundary.",
          "公开网关已上线。仓库中还保留针对智能体模式行为的专项冒烟测试，而生产对话路由继续位于网关自身的认证边界之后。",
        ),
      },
    ],
    links: [
      {
        kind: "live",
        href: "https://api.renss.top/",
        label: l("Open live gateway", "打开线上网关"),
      },
      {
        kind: "source",
        href: "https://github.com/dreamrss2/zr-ai-gateway-showcase",
        label: l("View sanitized showcase", "查看脱敏展示仓库"),
      },
      {
        kind: "upstream",
        href: "https://github.com/QuantumNous/new-api",
        label: l("New API upstream", "New API 上游"),
      },
      {
        kind: "upstream",
        href: "https://github.com/Wei-Shaw/sub2api",
        label: l("Sub2API upstream", "Sub2API 上游"),
      },
    ],
  },
  {
    slug: "bank-ai-data-intelligence",
    title: l("Banking AI & Data Intelligence", "银行 AI 应用与数据智能分析"),
    category: l("Enterprise delivery · Anonymized", "企业交付 · 已匿名化"),
    role: l(
      "AI Agent engineer and application technical lead",
      "AI Agent 开发工程师 / AI 应用技术负责人",
    ),
    summary: l(
      "An enterprise workflow connecting job parsing, requirement interpretation, code analysis, test design, automation assistance and data segmentation.",
      "连接作业解析、需求理解、代码分析、测试设计、自动化辅助与数据分群的企业级工作流。",
    ),
    outcome: l(
      "Converted fragmented testing and analysis activities into traceable, reusable agent workflows with human checkpoints.",
      "把分散的测试与分析活动整理成可追踪、可复用并带人工确认点的智能体工作流。",
    ),
    tags: ["Dify", "DeepAgents", "Python", "Java", "K-Means", "DBSCAN"],
    featured: false,
    accent: "coral",
    media: [
      {
        src: "/projects/bank-agent.png",
        thumbnail: "/projects/thumbs/bank-agent.webp",
        alt: l(
          "Anonymized bank testing skill taxonomy and correction workflow",
          "已匿名化的银行测试 Skill 分类与纠偏工作流",
        ),
        caption: l(
          "A skill classification design with human correction, versioned rules and structured test output.",
          "包含人工纠偏、规则版本与结构化测试输出的 Skill 分类设计。",
        ),
      },
    ],
    facts: [
      { value: "Batch", label: l("multi-job parsing", "多作业批量解析") },
      { value: "2", label: l("clustering approaches", "类聚类方法") },
      { value: "Audit", label: l("step-level evidence", "步骤级证据") },
    ],
    workflow: [
      {
        number: "01",
        title: l("Normalize inputs", "标准化输入"),
        text: l(
          "Clean jobs, tables, files and business data into structures that tools and agents can inspect.",
          "把作业、表结构、文件与业务数据清洗成工具和智能体可检查的结构。",
        ),
      },
      {
        number: "02",
        title: l("Interpret the change", "理解变更"),
        text: l(
          "Combine requirement context, code artifacts, SQL impact and domain skills into an explainable analysis.",
          "结合需求上下文、代码资产、SQL 影响和领域 Skill，生成可解释分析。",
        ),
      },
      {
        number: "03",
        title: l("Design coverage", "设计覆盖"),
        text: l(
          "Generate structured test cases and automation assistance, then validate format and skill references.",
          "生成结构化测试用例和自动化辅助内容，再校验格式与 Skill 引用。",
        ),
      },
      {
        number: "04",
        title: l("Learn from the data", "从数据中发现规律"),
        text: l(
          "Use feature engineering and clustering to identify scenarios, distributions and anomalous samples.",
          "通过特征工程与聚类识别典型场景、数据分布和异常样本。",
        ),
      },
    ],
    sections: [
      {
        eyebrow: l("BUSINESS PROBLEM", "业务问题"),
        title: l("Testing knowledge was scattered across people and artifacts", "测试知识分散在人和不同资产之间"),
        body: l(
          "A single change could involve requirement text, batch jobs, Java methods, Mapper/XML, database metadata and existing domain rules. Manual analysis was difficult to repeat and even harder to audit.",
          "一次变更可能同时涉及需求文本、批量作业、Java 方法、Mapper/XML、数据库元数据与既有领域规则。人工分析难以复用，也更难审计。",
        ),
      },
      {
        eyebrow: l("MY CONTRIBUTION", "我的工作"),
        title: l("Own the path from requirement to accepted workflow", "负责从需求到可验收工作流的完整路径"),
        body: l(
          "I handled requirement clarification, solution design, task decomposition, delivery coordination and evaluation while also building the agent and analysis components.",
          "我负责需求澄清、方案设计、任务拆解、交付推进与效果评估，同时参与智能体和分析组件建设。",
        ),
        items: [
          l(
            "Build batch agent flows for multiple jobs, table structures and file types.",
            "构建支持多作业、多表结构与多文件类型的批量智能体流程。",
          ),
          l(
            "Connect Dify/AIWorks workflows with code analysis and progressive domain-skill loading.",
            "连接 Dify/AIWorks 工作流、代码分析与渐进式领域 Skill 加载。",
          ),
          l(
            "Prepare, standardize and evaluate clustering features with business-facing explanations.",
            "完成聚类特征清洗、标准化、评估，并输出业务可理解的解释。",
          ),
        ],
      },
      {
        eyebrow: l("ENGINEERING MODULES", "工程模块"),
        title: l("DeepAgents code knowledge and test design", "DeepAgents 代码知识与测试设计"),
        body: l(
          "The Java code knowledge agent uses deterministic workflow control, local CodeGraph analysis, SQLite queues and skill orchestration before model analysis. The test-case designer progressively loads only the matched domain skills, validates references and emits Markdown plus audit-ready JSON.",
          "Java 代码知识智能体先通过固定工作流控制、本地 CodeGraph、SQLite 队列和 Skill 编排，再进入模型分析；测试用例设计器只渐进加载命中的领域 Skill，校验引用并输出 Markdown 与可审计 JSON。",
        ),
      },
      {
        eyebrow: l("DATA INTELLIGENCE", "数据智能"),
        title: l("Clustering as a testing aid, not a black box", "把聚类当作测试辅助，而不是黑盒"),
        body: l(
          "K-Means and DBSCAN were used after cleaning, standardization and feature work to reveal typical business groups, unusual samples and distribution patterns. The output was paired with visual analysis and business interpretation so it could inform test strategy and risk review.",
          "在清洗、标准化和特征工程后使用 K-Means 与 DBSCAN，识别典型业务分群、异常样本和分布规律，并配套可视化与业务解释，服务于测试策略和风险审查。",
        ),
      },
    ],
    links: [
      {
        kind: "source",
        href: "https://github.com/dreamrss2/enterprise-agent-workflows",
        label: l("Run the synthetic showcase", "运行合成数据展示项目"),
      },
    ],
  },
  {
    slug: "tilevision-studio",
    title: l("TileVision Studio", "TileVision Studio"),
    category: l("Independent product · Spatial AI", "独立产品 · 空间 AI"),
    role: l("Product designer and full-stack delivery owner", "产品设计与全栈交付负责人"),
    summary: l(
      "A production-minded workflow that turns tile samples and room context into inspectable multi-angle spatial results.",
      "将瓷砖样品和空间语境转化为可检查的多角度空间结果，并面向生产质量进行约束。",
    ),
    outcome: l(
      "Made generation quality visible through staged inputs, angle coverage, consistency checks and reviewable outputs.",
      "通过分阶段输入、角度覆盖、一致性检查和可复核输出，让生成质量变得可见。",
    ),
    tags: ["Computer Vision", "Image Generation", "Quality Gates", "FastAPI", "React"],
    featured: false,
    accent: "blue",
    media: [
      {
        src: "/projects/tilevision.png",
        thumbnail: "/projects/thumbs/tilevision.webp",
        alt: l("TileVision Studio generation workspace", "TileVision Studio 生成工作台"),
        caption: l(
          "The task workspace separates material input, generation state, angle coverage and quality checks.",
          "任务工作台将素材输入、生成状态、角度覆盖和质量检查分开展示。",
        ),
      },
    ],
    facts: [
      { value: "Multi-angle", label: l("result coverage", "结果覆盖") },
      { value: "Rules", label: l("quality gates", "质量门禁") },
      { value: "Traceable", label: l("generation state", "生成状态") },
    ],
    workflow: [
      {
        number: "01",
        title: l("Capture the material", "获取材料"),
        text: l("Accept tile samples and the intended room context.", "接收瓷砖样品与目标空间语境。"),
      },
      {
        number: "02",
        title: l("Define the scene", "定义场景"),
        text: l("Clarify room type, viewpoint, laying method and expected result set.", "明确空间类型、视角、铺贴方式和结果数量。"),
      },
      {
        number: "03",
        title: l("Generate with constraints", "约束生成"),
        text: l("Create spatial views while preserving material and perspective consistency.", "生成空间视图，同时约束材料与透视一致性。"),
      },
      {
        number: "04",
        title: l("Review before delivery", "交付前复核"),
        text: l("Check visible quality rules, compare angles and retain the accepted outputs.", "检查可见质量规则、对比角度并保留验收结果。"),
      },
    ],
    sections: [
      {
        eyebrow: l("PRODUCT PROBLEM", "产品问题"),
        title: l("A beautiful image is not enough", "只有一张好看图片还不够"),
        body: l(
          "For a spatial visualization workflow, the tile material, scale, laying direction and room perspective all need to remain believable. The product therefore treats generation as an inspectable task rather than a single prompt box.",
          "空间效果工作流要求材料、比例、铺贴方向和空间透视都可信，因此产品把生成过程设计成可检查任务，而不是单一提示词输入框。",
        ),
      },
      {
        eyebrow: l("MY CONTRIBUTION", "我的工作"),
        title: l("Design the workflow and the quality language", "同时设计工作流与质量语言"),
        body: l(
          "I shaped the interaction model, generation stages, multi-angle result library and quality feedback, then validated the behavior through regression checks and rendered evidence.",
          "我设计交互模型、生成阶段、多角度结果库和质量反馈，并通过回归检查与渲染证据验证行为。",
        ),
      },
      {
        eyebrow: l("ENGINEERING DECISION", "工程决策"),
        title: l("Separate generation from acceptance", "把生成与验收分开"),
        body: l(
          "Generation can finish while a result still fails material, geometry or realism expectations. Explicit task states and quality gates make that distinction operational for users and testable for the team.",
          "生成完成并不代表结果满足材料、几何或真实感要求。显式任务状态与质量门禁让用户能操作这种差异，也让团队能够测试它。",
        ),
      },
      {
        eyebrow: l("DELIVERY EVIDENCE", "交付证据"),
        title: l("A complete product surface with repeatable checks", "完整产品界面与可重复检查"),
        body: l(
          "The product includes a task workspace, generation controls, result views and regression-oriented local validation. The private production source remains separate from this public portfolio.",
          "产品包含任务工作台、生成控制、结果视图和面向回归的本地验证；生产源码继续保持私有，与公开作品集分离。",
        ),
      },
    ],
    links: [],
  },
  {
    slug: "renopilot",
    title: l("RenoPilot", "RenoPilot"),
    category: l("Independent product · Operations AI", "独立产品 · 运营 AI"),
    role: l("Workflow product designer and engineering owner", "工作流产品设计与工程负责人"),
    summary: l(
      "A renovation operations workbench that turns customer context into quote readiness, risk prompts and follow-up actions.",
      "把客户背景转化为报价准备度、风险提示和后续动作的装修业务运营工作台。",
    ),
    outcome: l(
      "Translated unstructured conversations and scattered pricing knowledge into a repeatable store workflow.",
      "把非结构化沟通和分散的价格知识整理成门店可重复执行的工作流。",
    ),
    tags: ["Workflow Design", "Business Rules", "Pricing", "Risk Prompts", "React"],
    featured: false,
    accent: "yellow",
    media: [
      {
        src: "/projects/renopilot.png",
        thumbnail: "/projects/thumbs/renopilot.webp",
        alt: l("RenoPilot renovation operations dashboard", "RenoPilot 装修业务运营工作台"),
        caption: l(
          "The workbench combines customer stage, missing information, pricing risk and next actions.",
          "工作台集中展示客户阶段、缺失信息、报价风险和下一步动作。",
        ),
      },
    ],
    facts: [
      { value: "Structured", label: l("customer context", "客户语境") },
      { value: "Visible", label: l("quote readiness", "报价准备度") },
      { value: "Actionable", label: l("risk prompts", "风险提示") },
    ],
    workflow: [
      {
        number: "01",
        title: l("Import context", "导入语境"),
        text: l("Extract customer, room, budget and intent from the conversation.", "从沟通中提取客户、空间、预算和意图。"),
      },
      {
        number: "02",
        title: l("Check completeness", "检查完整度"),
        text: l("Identify missing details and the questions needed before a quote is safe.", "识别缺失信息与安全报价前必须追问的问题。"),
      },
      {
        number: "03",
        title: l("Build the quote", "形成报价"),
        text: l("Combine items, regional references and margin-risk rules.", "结合报价项、区域参考与毛利风险规则。"),
      },
      {
        number: "04",
        title: l("Drive follow-up", "推动跟进"),
        text: l("Convert the current state into clear store actions and reminders.", "把当前状态转换为清晰的门店动作与提醒。"),
      },
    ],
    sections: [
      {
        eyebrow: l("PRODUCT PROBLEM", "产品问题"),
        title: l("The quote is only as good as the context behind it", "报价质量取决于背后的语境"),
        body: l(
          "Store teams often collect key details across chat, memory, price sheets and follow-up notes. Missing one condition can make a quote incomplete or unprofitable.",
          "门店团队往往把关键信息分散在聊天、个人记忆、价格表和跟进记录中，遗漏一个条件就可能让报价不完整或失去利润空间。",
        ),
      },
      {
        eyebrow: l("MY CONTRIBUTION", "我的工作"),
        title: l("Turn operating judgment into product behavior", "把运营判断转化为产品行为"),
        body: l(
          "I mapped customer stages, pricing prerequisites, missing-information rules and follow-up actions into a workbench that can be scanned and operated repeatedly.",
          "我把客户阶段、报价前置条件、缺失信息规则和跟进动作映射到一个可扫描、可重复操作的工作台。",
        ),
      },
      {
        eyebrow: l("ENGINEERING DECISION", "工程决策"),
        title: l("Keep deterministic pricing separate from AI assistance", "让确定性价格与 AI 辅助保持边界"),
        body: l(
          "AI is used to organize context and suggest questions, while price references, required fields and risk thresholds remain explicit business rules.",
          "AI 用于整理语境和建议追问，而价格参考、必填字段和风险阈值继续由显式业务规则控制。",
        ),
      },
      {
        eyebrow: l("DELIVERY EVIDENCE", "交付证据"),
        title: l("An end-to-end operating workspace", "端到端运营工作台"),
        body: l(
          "The product surface covers customer intake, readiness review, price maintenance, regional references, quote generation and follow-up, rather than stopping at a chat demo.",
          "产品界面覆盖客户录入、准备度检查、价格维护、区域参考、报价生成和后续跟进，而不是停在聊天演示。",
        ),
      },
    ],
    links: [],
  },
  {
    slug: "yingqiao-flow",
    title: l("YingQiao Flow", "YingQiao Flow"),
    category: l("Independent system · Content operations", "独立系统 · 内容运营"),
    role: l("Agent-pipeline designer and automation owner", "Agent 流水线设计与自动化负责人"),
    summary: l(
      "A source-aware content pipeline spanning topic selection, Chinese content packages, authorized assets, video generation and draft-upload checks.",
      "覆盖选题、中文内容包、授权素材、视频生成与草稿上传检查的来源可追溯内容流水线。",
    ),
    outcome: l(
      "Made compliance and source status explicit at every handoff instead of treating them as a final manual check.",
      "把合规与来源状态放进每次交接，而不是留到最后再人工补查。",
    ),
    tags: ["Agent Pipeline", "Source Tracking", "Compliance", "Video", "Automation"],
    featured: false,
    accent: "coral",
    media: [
      {
        src: "/projects/yingqiao.png",
        thumbnail: "/projects/thumbs/yingqiao.webp",
        alt: l("YingQiao Flow draft publishing evidence", "YingQiao Flow 草稿发布证据"),
        caption: l(
          "A real draft-publishing checkpoint from the content production flow.",
          "内容生产流水线中的真实草稿发布检查节点。",
        ),
      },
    ],
    facts: [
      { value: "Source-aware", label: l("topic research", "选题研究") },
      { value: "Gated", label: l("asset handoff", "素材交接") },
      { value: "Auditable", label: l("draft checks", "草稿检查") },
    ],
    workflow: [
      {
        number: "01",
        title: l("Select the topic", "选择选题"),
        text: l("Evaluate recency, source quality and content value before production.", "在生产前评估时效、来源质量与内容价值。"),
      },
      {
        number: "02",
        title: l("Build the package", "形成内容包"),
        text: l("Produce the script, visual brief, source notes and compliance boundaries together.", "同步生成脚本、视觉说明、来源记录与合规边界。"),
      },
      {
        number: "03",
        title: l("Verify the assets", "校验素材"),
        text: l("Accept only authorized assets that satisfy the package contract.", "只接收满足素材包合同的授权素材。"),
      },
      {
        number: "04",
        title: l("Generate and hand off", "生成并交接"),
        text: l("Create the vertical video, burn subtitles and validate the draft-upload state.", "生成竖屏视频、烧录字幕并验证草稿上传状态。"),
      },
    ],
    sections: [
      {
        eyebrow: l("PRODUCT PROBLEM", "产品问题"),
        title: l("Fast content production still needs evidence", "快速内容生产仍然需要证据"),
        body: l(
          "A usable content pipeline must distinguish a verified source from an inaccessible one, an authorized asset from an attractive image and a validated draft from a generated file.",
          "可用的内容流水线必须区分已验证与不可访问的来源、授权素材与仅仅好看的图片，以及已验证草稿与单纯生成文件。",
        ),
      },
      {
        eyebrow: l("MY CONTRIBUTION", "我的工作"),
        title: l("Define contracts between every automation step", "为每个自动化步骤定义交接合同"),
        body: l(
          "I structured the outputs, validators, status language and failure boundaries across research, content generation, asset preparation, video assembly and upload checks.",
          "我为研究、内容生成、素材准备、视频合成和上传检查建立结构化产物、校验器、状态语言与失败边界。",
        ),
      },
      {
        eyebrow: l("ENGINEERING DECISION", "工程决策"),
        title: l("A blocked source is not an empty result", "来源不可访问不等于没有内容"),
        body: l(
          "The pipeline records source-inaccessible, blocked and partial states explicitly. That prevents later steps from presenting missing evidence as a clean result.",
          "流水线显式记录 source-inaccessible、blocked 和 partial 状态，防止后续步骤把缺失证据包装成正常结果。",
        ),
      },
      {
        eyebrow: l("DELIVERY EVIDENCE", "交付证据"),
        title: l("Validated packages before browser automation", "浏览器自动化前先验证交付包"),
        body: l(
          "Asset packages and draft-upload dry runs are validated before any publishing action. When browser control is unavailable, the run remains blocked instead of being reported as published.",
          "素材包与草稿上传 dry-run 会在发布动作前完成校验；浏览器控制不可用时，运行会保持 blocked，而不会被误报为已发布。",
        ),
      },
    ],
    links: [],
  },
];

export const experiments: Experiment[] = [
  {
    icon: "bot",
    title: "RPA Test Simulator",
    category: l("Human-in-the-loop automation", "人在回路自动化"),
    summary: l(
      "A local prototype for requirement recognition, quote-field localization, simulated input and final human confirmation.",
      "验证需求识别、报价字段定位、模拟输入与最终人工确认链路的本地原型。",
    ),
    evidence: l(
      "Runs with local rules when no model key is configured and includes planner plus server contract tests.",
      "未配置模型 Key 时仍可使用本地规则运行，并包含规划器与服务契约测试。",
    ),
    tags: ["Python", "RPA", "Vision", "Human approval"],
  },
  {
    icon: "network",
    title: "Simple Code Nexus",
    category: l("Local code intelligence", "本地代码智能"),
    summary: l(
      "A lightweight static code graph that scans Python, stores relationships in SQLite and exports LLM-ready context.",
      "扫描 Python、将关系写入 SQLite 并导出适合 LLM 使用上下文的轻量静态代码图谱。",
    ),
    evidence: l(
      "Extracts files, symbols, routes and table queries without making a real model call.",
      "无需真实模型调用即可提取文件、符号、路由与数据库查询关系。",
    ),
    tags: ["AST", "SQLite", "FastAPI", "Knowledge graph"],
  },
];

export const homeCopy = {
  en: {
    nav: { work: "Selected work", capabilities: "Capabilities", experience: "Experience", contact: "Contact" },
    role: "AI Solutions Engineer · Guangzhou",
    name: "Ren Sishuo",
    headline: "I turn ambiguous AI ideas into deployable systems.",
    intro:
      "Agent workflows, knowledge systems and intelligent automation built around real business constraints — from discovery and architecture to delivery, evaluation and enablement.",
    primaryCta: "Explore selected work",
    secondaryCta: "Discuss a role",
    proof: ["Enterprise Agent systems", "AI platform engineering", "Delivery and enablement"],
    statementEyebrow: "THE WORK BETWEEN THE MODEL AND THE BUSINESS",
    statement:
      "My strongest work starts before the prompt: finding the repeatable process, defining the human checkpoints and connecting the model to the tools, data and acceptance rules a team actually needs.",
    workEyebrow: "SELECTED WORK",
    workTitle: "Systems that move from demo to operation",
    workIntro:
      "Five case studies showing how I frame the problem, build the workflow and leave behind evidence a team can inspect.",
    readCase: "Read case study",
    zoomImage: "Enlarge project image",
    experimentEyebrow: "ENGINEERING EXPERIMENTS",
    experimentTitle: "Small systems for testing one hard idea",
    experimentIntro:
      "Focused prototypes that isolate automation safety and local code intelligence without pretending to be production products.",
    capabilityEyebrow: "CAPABILITIES",
    capabilityTitle: "A practical bridge across business and engineering",
    capabilityIntro:
      "I work across discovery, architecture, implementation and acceptance rather than handing the problem off between disciplines.",
    capabilities: [
      ["AI requirement discovery", "Identify repeatable workflows, business constraints and the real cost of failure."],
      ["Agent architecture", "Design task decomposition, tools, retrieval, sub-agents and human approval gates."],
      ["Platform implementation", "Build with Dify, DeepAgents, Python, FastAPI, Java and existing enterprise systems."],
      ["Evaluation and delivery", "Define acceptance criteria, trace failures and enable the operating team."],
    ],
    platformEyebrow: "ENTERPRISE OPERATING RANGE",
    platformTitle: "The systems around the agent matter too",
    platformItems: [
      ["AiWorks platform", "Dify secondary development, multi-model access, dynamic knowledge bases, load balancing and platform governance."],
      ["AI automation platform", "Browser-based remote control, multi-project adaptation, log analysis, knowledge Q&A and conversational operations."],
      ["Quality engineering", "Dynamic test frameworks and diagnostic tooling across UI, CAN, voice, Trace and production protocols."],
    ],
    processEyebrow: "HOW I WORK",
    processTitle: "From vague request to accepted workflow",
    process: [
      ["01", "Discover", "Map users, inputs, decisions, exceptions and the cost of the current process."],
      ["02", "Design", "Split deterministic workflow, model reasoning and human control deliberately."],
      ["03", "Build", "Connect data, knowledge, tools and interfaces into a small end-to-end slice."],
      ["04", "Verify", "Evaluate quality, trace failure paths and leave the operating team with clear controls."],
    ],
    experienceEyebrow: "EXPERIENCE",
    experienceTitle: "From test engineering to AI delivery",
    experiences: [
      ["2025.11 — Present", "Large bank client project", "AI Agent Engineer / AI Application Technical Lead", "Agent architecture, business workflow delivery, evaluation and technical enablement."],
      ["2024.12 — 2025.11", "Vico Electronics", "AI Platform Engineer / Automation Platform Lead", "Dify extensions, multi-model integration, internal tools and intelligent automation."],
      ["2022.07 — 2024.12", "Jintu Computing", "Software Development Engineer in Test", "Framework architecture, automation delivery and multi-domain diagnostic tooling."],
    ],
    education: "B.Sc. Computer Science and Technology · Shaanxi Fashion Engineering University · 2018—2022",
    contactEyebrow: "LET'S BUILD THE USEFUL PART",
    contactTitle: "Looking for AI solution and implementation roles.",
    contactText:
      "Based in Guangzhou. I am interested in teams that need someone who can understand the workflow, build the system and carry it through delivery.",
    emailCta: "Email me",
    githubCta: "GitHub",
    footer: "AI solutions · Agent platforms · Intelligent automation",
  },
  zh: {
    nav: { work: "代表项目", capabilities: "核心能力", experience: "工作经历", contact: "联系我" },
    role: "AI 解决方案工程师 · 广州",
    name: "任思硕",
    headline: "把模糊的 AI 想法，做成可交付的系统。",
    intro:
      "围绕真实业务约束建设 Agent 工作流、知识系统和智能自动化能力，从需求诊断、架构设计到开发交付、效果评估与团队赋能。",
    primaryCta: "查看代表项目",
    secondaryCta: "聊聊岗位",
    proof: ["企业级 Agent 系统", "AI 平台工程", "交付与赋能"],
    statementEyebrow: "连接模型与业务的那段工作",
    statement:
      "我最擅长的工作发生在写提示词之前：找到可重复流程，定义人工确认点，再把模型接到团队真正需要的工具、数据和验收规则上。",
    workEyebrow: "代表项目",
    workTitle: "从演示走向真实运营的系统",
    workIntro: "五个案例分别展示我如何定义问题、构建工作流，并留下团队可检查的交付证据。",
    readCase: "查看完整案例",
    zoomImage: "放大项目图片",
    experimentEyebrow: "工程实验",
    experimentTitle: "用小系统验证一个困难问题",
    experimentIntro: "聚焦自动化安全与本地代码智能的原型，不把实验包装成生产产品。",
    capabilityEyebrow: "核心能力",
    capabilityTitle: "连接业务与工程的实战能力",
    capabilityIntro: "覆盖需求诊断、架构、实现与验收，而不是把同一个问题在不同岗位之间反复转交。",
    capabilities: [
      ["AI 需求诊断", "识别可重复流程、业务约束与失败的真实成本。"],
      ["Agent 架构设计", "设计任务拆解、工具、检索、SubAgent 与人工确认节点。"],
      ["平台开发落地", "基于 Dify、DeepAgents、Python、FastAPI、Java 与企业系统完成集成。"],
      ["评估与交付", "定义验收标准、追踪失败路径并帮助业务团队真正采用。"],
    ],
    platformEyebrow: "企业工程覆盖",
    platformTitle: "智能体周围的系统同样重要",
    platformItems: [
      ["AiWorks 平台", "Dify 二次开发、多模型接入、动态知识库、负载均衡与平台治理。"],
      ["AI 自动化平台", "Web 在线远控、多项目适配、日志分析、知识问答与对话式操作。"],
      ["质量工程", "覆盖 UI、CAN、语音、Trace 与产测协议的动态测试框架和诊断工具。"],
    ],
    processEyebrow: "工作方法",
    processTitle: "从模糊需求到可验收工作流",
    process: [
      ["01", "诊断", "梳理用户、输入、决策、异常路径和现有流程成本。"],
      ["02", "设计", "主动划分确定性流程、模型推理和人工控制的边界。"],
      ["03", "构建", "先连接数据、知识、工具和界面，形成最小端到端闭环。"],
      ["04", "验收", "评估质量、追踪失败路径，并给运营团队留下清晰控制能力。"],
    ],
    experienceEyebrow: "工作经历",
    experienceTitle: "从测试工程走向 AI 交付",
    experiences: [
      ["2025.11 — 至今", "大型银行客户项目", "AI Agent 开发工程师 / AI 应用技术负责人", "Agent 架构、业务流程落地、效果评估与技术赋能。"],
      ["2024.12 — 2025.11", "维客电子有限公司", "AI 平台开发工程师 / AI 自动化平台负责人", "Dify 平台二开、多模型集成、内部工具与智能自动化。"],
      ["2022.07 — 2024.12", "锦图计算", "测试开发工程师", "框架架构、自动化交付与多领域问题诊断工具。"],
    ],
    education: "计算机科学与技术 本科 · 陕西服装工程学院 · 2018—2022",
    contactEyebrow: "一起把 AI 做到有用",
    contactTitle: "正在寻找 AI 解决方案与实施交付岗位。",
    contactText: "人在广州，希望加入真正需要理解业务流程、建设系统并推动交付的团队。",
    emailCta: "给我发邮件",
    githubCta: "GitHub",
    footer: "AI 解决方案 · Agent 平台 · 智能自动化",
  },
} as const;

export function localize(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
