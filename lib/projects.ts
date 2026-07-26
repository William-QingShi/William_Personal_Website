import aiPromoRaw from "@/content/projects/01_30_成都美术学院数字媒体艺术系_AI宣传片.md?raw";
import springRaw from "@/content/projects/02_26_渡见春.md?raw";
import yuhuaRaw from "@/content/projects/03_15_羽化.md?raw";
import factoryRaw from "@/content/projects/04_07_三线故事_消失的老厂房.md?raw";
import tidesRaw from "@/content/projects/05_22_潮汐之间.md?raw";
import formRaw from "@/content/projects/06_20_我见之形.md?raw";
import hbnRaw from "@/content/projects/07_31_HBN_AIGC广告宣传片.md?raw";

export type ProjectKind = "ai" | "cinematography" | "documentary";

export type Project = {
  id: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  overview: string;
  role: string;
  capabilities: string[];
  position: string;
  displayLevel: string;
  cover: string;
  frames: string[];
  stills: string[];
  bts: string[];
  process: string[];
  galleryAspect: string;
  btsAspect: string;
  processAspect: string;
  coverAspect: string;
  kind: ProjectKind;
  featured: boolean;
  externalFilm?: string;
  disclaimer?: string;
  moduleNotes: Record<string, string>;
};

const sourceProjects = [
  { id: "30", raw: aiPromoRaw },
  { id: "26", raw: springRaw },
  { id: "15", raw: yuhuaRaw },
  { id: "07", raw: factoryRaw },
  { id: "22", raw: tidesRaw },
  { id: "20", raw: formRaw },
  { id: "31", raw: hbnRaw },
];

function mediaSet(folder: "stills" | "bts" | "process", slug: string, count: number) {
  return Array.from(
    { length: count },
    (_, index) => `/images/projects/${folder}/${slug}-${String(index + 1).padStart(2, "0")}.jpg`,
  );
}

const projectConfig: Record<string, Omit<Project, "title" | "type" | "year" | "overview" | "role" | "capabilities" | "position" | "displayLevel">> = {
  "30": {
    id: "30",
    slug: "cdam-ai-promo",
    cover: "/images/projects/cdam-ai-cover.jpg",
    frames: [
      "/images/projects/cdam-ai-frame-1.jpg",
      "/images/projects/cdam-ai-process-1.jpg",
      "/images/projects/cdam-ai-process-2.jpg",
    ],
    stills: mediaSet("stills", "cdam-ai-promo", 4),
    bts: [],
    process: mediaSet("process", "cdam-ai-promo", 5),
    galleryAspect: "16 / 9",
    btsAspect: "3 / 2",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "ai",
    featured: true,
    moduleNotes: {
      Concept: "围绕院系宣传片建立概念与镜头方向，并把画面需求拆解为可执行的生成资产。",
      "AI Workflow": "William 负责图像生成、视频生成、剪辑、音效与包装，覆盖从概念到输出的完整链路。",
      "Asset Development": "人物、场景与镜头资产在统一规划下生成和筛选，为后续视频生成保持视觉连续性。",
    },
  },
  "26": {
    id: "26",
    slug: "daochunhan",
    cover: "/images/projects/daochunhan-cover.jpg",
    frames: [
      "/images/projects/daochunhan-frame-1.jpg",
      "/images/projects/daochunhan-frame-2.jpg",
      "/images/projects/daochunhan-frame-3.jpg",
    ],
    stills: mediaSet("stills", "daochunhan", 8),
    bts: [],
    process: [],
    galleryAspect: "16 / 9",
    btsAspect: "3 / 2",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "cinematography",
    featured: true,
    moduleNotes: {
      "Visual Concept": "以导演创作和视觉叙事实验为核心，William 同时承担导演与摄影指导。",
      "Camera System": "摄影设计与器材规划服务于短片的叙事结构，并在前期剧本讨论中参与镜头判断。",
      "Lighting Design": "现场光线与画面控制被纳入同一套视觉系统，避免技术选择脱离叙事。",
      Frames: "精选静帧保留短片真实的画面节奏、人物关系与空间气氛。",
    },
  },
  "15": {
    id: "15",
    slug: "yuhua",
    cover: "/images/projects/yuhua-cover.jpg",
    frames: [
      "/images/projects/yuhua-frame-1.jpg",
      "/images/projects/yuhua-frame-2.jpg",
      "/images/projects/yuhua-frame-3.jpg",
    ],
    stills: mediaSet("stills", "yuhua", 9),
    bts: mediaSet("bts", "yuhua", 8),
    process: mediaSet("process", "yuhua", 6),
    galleryAspect: "16 / 9",
    btsAspect: "3 / 2",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "cinematography",
    featured: true,
    moduleNotes: {
      "Visual Concept": "摄影与视觉系统是本项目的核心，前期从分镜、机位与画幅关系开始组织画面。",
      "Camera System": "器材清单、机位图和分镜共同构成现场摄影执行的依据。",
      "Lighting Design": "灯光与摄影器材规划在拍摄前协同完成，并通过现场剧照与最终静帧验证。",
      Frames: "静帧集中呈现摄影设计在人物、空间和光线中的最终结果。",
    },
  },
  "07": {
    id: "07",
    slug: "vanishing-factory",
    cover: "/images/projects/factory-cover.jpg",
    frames: [
      "/images/projects/factory-frame-1.jpg",
      "/images/projects/factory-frame-2.jpg",
    ],
    stills: mediaSet("stills", "vanishing-factory", 3),
    bts: [],
    process: [],
    galleryAspect: "4 / 3",
    btsAspect: "4 / 3",
    processAspect: "16 / 10",
    coverAspect: "4 / 3",
    kind: "documentary",
    featured: false,
    externalFilm: "https://www.bilibili.com/video/BV1bh81e5EnH",
    moduleNotes: {
      Story: "项目以老厂房为观察对象，William 负责从前期策划到现场执行的完整制作链路。",
      "Visual Approach": "导演与摄影由同一创作判断贯穿，以真实场景和人物信息为画面基础。",
      Production: "制作策划、器材汇总与现场执行共同构成纪录片的生产方法。",
      Frames: "现有画面用于呈现老厂房的空间状态与纪录片现场质感。",
    },
  },
  "22": {
    id: "22",
    slug: "between-tides",
    cover: "/images/projects/tides-cover.jpg",
    frames: [
      "/images/projects/tides-frame-1.jpg",
      "/images/projects/tides-frame-2.jpg",
    ],
    stills: mediaSet("stills", "between-tides", 10),
    bts: mediaSet("bts", "between-tides", 7),
    process: [],
    galleryAspect: "16 / 9",
    btsAspect: "4 / 3",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "documentary",
    featured: false,
    moduleNotes: {
      Story: "人物观察和真实现场是项目的主要内容，William 作为摄影负责人建立观看距离。",
      "Visual Approach": "摄影以不打断现场为前提，在人物、环境和情绪之间保持克制的视觉控制。",
      Production: "现场判断集中于人物纪录片摄影与真实环境中的画面组织。",
      Frames: "静帧与幕后照片共同呈现最终画面和摄影现场之间的关系。",
    },
  },
  "20": {
    id: "20",
    slug: "the-form-i-see",
    cover: "/images/projects/form-cover.jpg",
    frames: [
      "/images/projects/form-frame-1.jpg",
      "/images/projects/form-frame-2.jpg",
    ],
    stills: mediaSet("stills", "the-form-i-see", 8),
    bts: mediaSet("bts", "the-form-i-see", 4),
    process: [],
    galleryAspect: "16 / 9",
    btsAspect: "16 / 9",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "cinematography",
    featured: false,
    moduleNotes: {
      "Visual Concept": "项目以实验影像语言和摄影表达为核心，William 担任摄影指导。",
      "Camera System": "摄影选择围绕视觉探索展开，器材规划作为现有制作资料的一部分保留。",
      "Lighting Design": "光线、画面结构与影像表达被作为同一视觉探索处理。",
      Frames: "精选静帧呈现实验影像语言在最终画面中的具体表现。",
    },
  },
  "31": {
    id: "31",
    slug: "hbn-aigc-concept",
    cover: "/images/projects/hbn-cover.jpg",
    frames: [
      "/images/projects/hbn-frame-1.jpg",
      "/images/projects/hbn-frame-2.jpg",
    ],
    stills: mediaSet("stills", "hbn-aigc-concept", 7),
    bts: [],
    process: mediaSet("process", "hbn-aigc-concept", 10),
    galleryAspect: "16 / 9",
    btsAspect: "3 / 2",
    processAspect: "16 / 10",
    coverAspect: "16 / 9",
    kind: "ai",
    featured: false,
    disclaimer: "个人 AIGC 概念实验项目，非 HBN 官方委托。",
    moduleNotes: {
      Concept: "以商业视觉表达为练习方向建立个人概念，不代表 HBN 官方委托。",
      "AI Workflow": "William 负责视频生成，并通过人物、场景与角色资产组织生成过程。",
      "Asset Development": "过程资料展示人物资产、场景资产、角色资产与生成图片的开发关系。",
    },
  },
};

function section(raw: string, heading: string) {
  const match = raw.match(new RegExp(`## ${heading}\\s+([\\s\\S]*?)(?=\\n## |$)`));
  return match?.[1]?.trim() ?? "";
}

function field(raw: string, label: string) {
  const match = raw.match(new RegExp(`${label}：([^\\n]*)`));
  return match?.[1]?.trim() ?? "";
}

function parseProject(id: string, raw: string): Project {
  const config = projectConfig[id];
  const sourceTitle = raw.match(/^# (.+)$/m)?.[1]?.trim() ?? "";
  const title = sourceTitle;
  const type = field(section(raw, "Basic Information"), "项目类型");
  const year = field(section(raw, "Basic Information"), "完成时间")
    .replace(/年/g, ".")
    .replace(/月/g, "")
    .replace(/\.$/, "");
  const overview = section(raw, "Project Overview");
  const role = field(section(raw, "My Role"), "William职责");
  const capabilities = field(section(raw, "Core Capability"), "核心能力标签")
    .split("、")
    .filter(Boolean);
  const position = field(section(raw, "Website Position"), "网站展示定位");
  const displayLevel = section(raw, "Display Level");

  return {
    ...config,
    title,
    type,
    year,
    overview,
    role,
    capabilities,
    position,
    displayLevel,
  };
}

export const projects = sourceProjects.map(({ id, raw }) => parseProject(id, raw));

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
