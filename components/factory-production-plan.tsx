const shootDays = [
  {
    date: "03.16",
    title: "真实场景拍摄",
    items: ["川齿粮站", "防空洞采访与空镜", "川齿厂人物与环境"],
  },
  {
    date: "03.17",
    title: "人物与演播室拍摄",
    items: ["盛邦公司人物采访", "川齿厂人物段落", "演播室布光与多人物录制"],
  },
];

const equipment = [
  ["摄影", "三机位系统 / 24–70mm / 85mm / 20–60mm / 滑轨"],
  ["灯光", "Aputure 600X Pro / F22X / 蝴蝶布 / 旗板"],
  ["录音", "DJI Mic 2 / Zoom H6 / 32-bit 浮点录音"],
  ["数据", "4K 50FPS 10-bit 拍摄 / 分场景校验归档"],
];

const postWorkflow = [
  ["01", "DIT 与素材归档", "三机位与双录音设备按场景校验、拷贝和批注。"],
  ["02", "多机位粗剪", "完成音视频对位，并依据前期拍摄计划建立结构。"],
  ["03", "精剪与字幕", "以策划案校准画面、节奏与字幕，输出审阅样片。"],
  ["04", "声音制作", "完成人声处理、动态控制与整体响度统一。"],
  ["05", "包装与特效", "制作字幕、动效和特殊文字包装，统一纪实表达。"],
  ["06", "色彩与交付", "完成色彩管理、镜头匹配、历史段落风格化与母版输出。"],
];

export function FactoryProductionPlan({ sectionNumber }: { sectionNumber: string }) {
  return (
    <article className="project-module production-plan-proof">
      <div className="page-shell module-heading">
        <span>{sectionNumber}</span>
        <div>
          <p>制作过程 / 原始策划</p>
          <h2>制作策划档案</h2>
        </div>
        <p className="module-note">三线故事 · 2024.03</p>
      </div>

      <div className="page-shell production-plan-sheet">
        <header className="production-plan-intro">
          <div>
            <p>PRODUCTION PLAN / DOCUMENT 01</p>
            <h3>从两日拍摄计划到完整后期链路</h3>
          </div>
          <dl>
            <div>
              <dt>形式</dt>
              <dd>专题纪录型节目</dd>
            </div>
            <div>
              <dt>成片</dt>
              <dd>15 分钟以上</dd>
            </div>
            <div>
              <dt>拍摄</dt>
              <dd>2160P · 50FPS</dd>
            </div>
            <div>
              <dt>交付</dt>
              <dd>1080P · 25FPS · 16:9</dd>
            </div>
          </dl>
        </header>

        <section className="production-plan-block production-schedule">
          <div className="production-plan-label">
            <span>01</span>
            <p>拍摄日程</p>
          </div>
          <div className="production-day-grid">
            {shootDays.map((day) => (
              <article key={day.date}>
                <span>{day.date}</span>
                <h4>{day.title}</h4>
                <ul>
                  {day.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="production-plan-block production-approach">
          <div className="production-plan-label">
            <span>02</span>
            <p>摄影阐述</p>
          </div>
          <blockquote>
            以自然主义光效为基础，在演播室、粮站、老厂房、防空洞与公司场景中保持光源逻辑；
            通过较大的明暗关系塑造人物，同时让真实空间和历史质感进入画面。
          </blockquote>
        </section>

        <section className="production-plan-block production-equipment">
          <div className="production-plan-label">
            <span>03</span>
            <p>技术系统</p>
          </div>
          <dl>
            {equipment.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="production-plan-block production-post">
          <div className="production-plan-label">
            <span>04</span>
            <p>后期流程</p>
          </div>
          <div className="production-post-grid">
            {postWorkflow.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h4>{title}</h4>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
