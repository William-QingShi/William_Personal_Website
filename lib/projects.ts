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
  kind: ProjectKind;
  featured: boolean;
  externalFilm?: string;
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
    kind: "ai",
    featured: true,
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
    kind: "cinematography",
    featured: true,
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
    kind: "cinematography",
    featured: true,
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
    kind: "documentary",
    featured: false,
    externalFilm: "https://www.bilibili.com/video/BV1bh81e5EnH",
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
    kind: "documentary",
    featured: false,
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
    kind: "cinematography",
    featured: false,
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
    kind: "ai",
    featured: false,
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
