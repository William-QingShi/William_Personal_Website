export type Capability = {
  slug: string;
  number: string;
  archive: string;
  title: string;
  description: string;
  intro: string;
  workflow: { title: string; description: string }[];
  deliverables: string[];
  projectSlugs: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "ai-moving-image",
    number: "01",
    archive: "AI FILM",
    title: "AI 影像与生成工作流",
    description: "从概念、Prompt 与资产规划，到图像生成、视频生成、剪辑、声音和包装。",
    intro:
      "把生成式工具放进真实的影像制作流程：先明确叙事和视觉目标，再建立可复用的角色、场景与镜头资产，最终完成剪辑、声音和交付。",
    workflow: [
      { title: "概念与拆解", description: "将主题、受众和传播目标拆成视觉方向、镜头任务与生成边界。" },
      { title: "资产与 Prompt", description: "规划人物、场景和风格资产，建立可迭代的 Prompt 与筛选标准。" },
      { title: "生成与连续性", description: "完成图像和视频生成，并围绕角色、光线与镜头关系校正连续性。" },
      { title: "后期与交付", description: "通过剪辑、声音、字幕与包装，把生成素材组织成完整成片。" },
    ],
    deliverables: ["创意概念与视觉方向", "Prompt 与生成资产体系", "AI 图像 / 视频镜头", "剪辑、声音与成片包装"],
    projectSlugs: ["cdam-ai-promo", "hbn-aigc-concept"],
  },
  {
    slug: "cinematography",
    number: "02",
    archive: "CINEMATOGRAPHY",
    title: "视觉叙事与摄影设计",
    description: "把叙事目标转化为镜头、画幅、摄影、灯光与现场视觉系统。",
    intro:
      "摄影不是单独追求漂亮画面，而是让机位、镜头、光线、色彩和画幅共同服务人物与叙事，并能在现场被可靠执行。",
    workflow: [
      { title: "叙事分析", description: "从剧本、人物与场景出发，确认画面的观看距离和情绪方向。" },
      { title: "视觉系统", description: "确定画幅、镜头语言、色彩、光线逻辑与视觉参考。" },
      { title: "摄影准备", description: "把方向落实为分镜、机位、器材、灯光与拍摄计划。" },
      { title: "现场控制", description: "根据真实空间和表演调整摄影与灯光，维持整片视觉一致性。" },
    ],
    deliverables: ["摄影阐述与视觉参考", "分镜、机位与镜头设计", "器材和灯光方案", "现场摄影与画面控制"],
    projectSlugs: ["daochunhan", "yuhua", "the-form-i-see"],
  },
  {
    slug: "documentary",
    number: "03",
    archive: "VISUAL STORYTELLING",
    title: "纪录片与人物内容",
    description: "在真实环境中观察人物，并以克制的机位、灯光和现场判断建立影像。",
    intro:
      "从人物沟通和真实环境出发，在不打断现场的前提下寻找画面。重点不是预设戏剧，而是让空间、行动和时间自然形成叙事。",
    workflow: [
      { title: "人物与议题", description: "理解人物关系、真实处境和内容边界，建立拍摄信任。" },
      { title: "现场预判", description: "勘察空间、光线与行动路径，为不可重复的瞬间留下余量。" },
      { title: "观察式摄影", description: "用克制机位和必要的光线控制，保留现场的真实节奏。" },
      { title: "素材组织", description: "围绕人物变化、环境信息与情绪线索建立可剪辑的结构。" },
    ],
    deliverables: ["人物沟通与拍摄提纲", "纪录片摄影方案", "现场摄影与灯光判断", "人物与环境影像素材"],
    projectSlugs: ["between-tides", "vanishing-factory", "jiamu-chawarong"],
  },
  {
    slug: "production",
    number: "04",
    archive: "FILM PRODUCTION",
    title: "前期策划与项目执行",
    description: "将需求和脚本转化为方案、分镜、器材与拍摄计划，并连接制作和交付。",
    intro:
      "把抽象需求变成团队可共同执行的制作语言：明确目标和范围，提前暴露风险，并让创意、摄影、现场和后期始终指向同一交付结果。",
    workflow: [
      { title: "需求定义", description: "确认目标、受众、渠道、周期与交付规格，避免创意和制作脱节。" },
      { title: "方案落地", description: "整理创意方案、脚本、分镜、视觉参考与技术路径。" },
      { title: "制作规划", description: "建立人员、器材、场景、拍摄日程和现场执行清单。" },
      { title: "后期衔接", description: "管理素材、修改与版本交付，让制作结果回到最初目标。" },
    ],
    deliverables: ["创意 / 拍摄方案", "脚本、分镜与机位规划", "器材、人员和日程清单", "制作到交付的流程管理"],
    projectSlugs: ["vanishing-factory", "cdam-ai-promo"],
  },
];

export function getCapability(slug: string) {
  return capabilities.find((capability) => capability.slug === slug);
}
