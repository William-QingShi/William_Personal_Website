import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const codeDirectory = resolve(scriptDirectory, "..");
const projectDirectory = resolve(codeDirectory, "..", "..");
const sourceDirectory = resolve(projectDirectory, "01_Content", "Projects");
const websiteDirectory = resolve(codeDirectory, "content", "projects");

async function markdownFiles(directory) {
  return (await readdir(directory))
    .filter((name) => name.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right, "zh-CN"));
}

async function checksum(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

const [sourceFiles, websiteFiles] = await Promise.all([
  markdownFiles(sourceDirectory),
  markdownFiles(websiteDirectory),
]);

const differences = [];
const allFiles = [...new Set([...sourceFiles, ...websiteFiles])].sort((left, right) =>
  left.localeCompare(right, "zh-CN"),
);

for (const name of allFiles) {
  if (!sourceFiles.includes(name)) {
    differences.push(`${name} 只存在于网站副本`);
    continue;
  }

  if (!websiteFiles.includes(name)) {
    differences.push(`${name} 只存在于根目录内容源`);
    continue;
  }

  const [sourceHash, websiteHash] = await Promise.all([
    checksum(resolve(sourceDirectory, name)),
    checksum(resolve(websiteDirectory, name)),
  ]);

  if (sourceHash !== websiteHash) {
    differences.push(`${name} 两份内容不同`);
  }
}

if (differences.length > 0) {
  console.error("项目内容副本未同步：");
  for (const difference of differences) {
    console.error(`- ${difference}`);
  }
  process.exitCode = 1;
} else {
  console.log(`项目内容副本一致：${sourceFiles.length} 个 Markdown 文件。`);
}
