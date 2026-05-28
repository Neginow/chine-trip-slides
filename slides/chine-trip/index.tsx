import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

// ─── Imagery — Wikimedia Commons, one photo per point of interest ─────────────
// Every file was title-verified to show the EXACT place. See image-sources.md.
// Two POIs have no faithful Commons photo and use an on-brand placeholder:
//   • zj_qilou  → 72 Qilou (Zhangjiajie)        — photo à ajouter
//   • sh_teamlab → teamLab Shanghai             — photo à ajouter
import bjNight from './assets/bj_night.jpg';
import bjForbidden from './assets/bj_forbidden.jpg';
import bjTiananmen from './assets/bj_tiananmen.jpg';
import bjJingshan from './assets/bj_jingshan.jpg';
import bjHutong from './assets/bj_hutong.jpg';
import bjWorkers from './assets/bj_workers.jpg';
import bjNatMuseum from './assets/bj_natmuseum.jpg';
import bjSummer from './assets/bj_summer.jpg';
import bjSanlitun from './assets/bj_sanlitun.jpg';
import bjWall from './assets/bj_wall.jpg';
import bjToboggan from './assets/bj_toboggan.jpg';
import cdKuanzhai from './assets/cd_kuanzhai.jpg';
import cdPeoplespark from './assets/cd_peoplespark.jpg';
import cdOpera from './assets/cd_opera.jpg';
import cdPanda from './assets/cd_panda.jpg';
import cdIfs from './assets/cd_ifs.jpg';
import cdTaikooli from './assets/cd_taikooli.jpg';
import cdJiuyan from './assets/cd_jiuyan.jpg';
import cqJiefangbei from './assets/cq_jiefangbei.jpg';
import cqRaffles from './assets/cq_raffles.jpg';
import cqHongya from './assets/cq_hongya.jpg';
import cqLuohan from './assets/cq_luohan.jpg';
import cqCiqikou from './assets/cq_ciqikou.jpg';
import cqSkyline from './assets/cq_skyline.jpg';
import cqEling from './assets/cq_eling.jpg';
import cqShancheng from './assets/cq_shancheng.jpg';
import cq3gorges from './assets/cq_3gorges.jpg';
import cqCableway from './assets/cq_cableway.jpg';
import zjGlass from './assets/zj_glass.jpg';
import zjLandscape from './assets/zj_landscape.jpg';
import zjAvatar from './assets/zj_avatar.jpg';
import zjBailong from './assets/zj_bailong.jpg';
import zjTianzi from './assets/zj_tianzi.jpg';
import zjTianziCable from './assets/zj_tianzicable.jpg';
import wxValley from './assets/wx_valley.jpg';
import wxValley2 from './assets/wx_valley2.jpg';
import wuyuanVillage from './assets/wuyuan_village.jpg';
import wuyuan2 from './assets/wuyuan2.jpg';
import wuyuanHuangling from './assets/wuyuan_huangling.jpg';
import shBund from './assets/sh_bund.jpg';
import shSkyline from './assets/sh_skyline.jpg';
import shPudongNight from './assets/sh_pudong_night.jpg';
import shNanjingRoad from './assets/sh_nanjingroad.jpg';
import shMuseum from './assets/sh_museum.jpg';
import shPearl from './assets/sh_pearl.jpg';
import shYugarden from './assets/sh_yugarden.jpg';
import shCityGod from './assets/sh_citygod.jpg';
import shXintiandi from './assets/sh_xintiandi.jpg';
import shTianzifang from './assets/sh_tianzifang.jpg';
import sh1000trees from './assets/sh_1000trees.jpg';
import trainHsr from './assets/train_hsr.jpg';
import finaleMist from './assets/finale.jpg';

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: { bg: '#0e0b09', text: '#f4ecdd', accent: '#b23a2e' },
  fonts: {
    display: 'Georgia, "Times New Roman", "Songti SC", "Noto Serif", serif',
    body: '"Helvetica Neue", "Inter", system-ui, -apple-system, "PingFang SC", sans-serif',
  },
  typeScale: { hero: 150, body: 34 },
  radius: 8,
};

const C = {
  bg: design.palette.bg,
  ink: '#080605',
  text: design.palette.text,
  red: design.palette.accent,
  redDeep: '#7c211b',
  gold: '#cca352',
  goldSoft: '#e6cf96',
  beige: '#cdbd9d',
  muted: '#9d927e',
  night: '#0f1c33',
  nightHi: '#16294a',
  line: 'rgba(244,236,221,0.16)',
};

const fill: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  overflow: 'hidden',
};

// ─── Trip model ───────────────────────────────────────────────────────────────
const CITIES = [
  { name: 'Pékin', nights: 4 },
  { name: 'Chengdu', nights: 2 },
  { name: 'Chongqing', nights: 3 },
  { name: 'Zhangjiajie', nights: 2 },
  { name: 'Wangxian Valley', nights: 1 },
  { name: 'Wuyuan', nights: 1 },
  { name: 'Shanghai', nights: 3 },
];
const NIGHTS_TOTAL = CITIES.reduce((s, c) => s + c.nights, 0); // 16
const CITY_INFO = (() => {
  let acc = 0;
  return CITIES.map((c) => {
    const mid = (acc + c.nights / 2) / NIGHTS_TOTAL;
    acc += c.nights;
    return { name: c.name, end: acc, mid };
  });
})();
const cityIndexOfNight = (n: number) => Math.max(0, CITY_INFO.findIndex((c) => n <= c.end));

// ─── Shared animations ─────────────────────────────────────────────────────────
const Anim = () => (
  <style>{`
    @keyframes ct-up  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes ct-in  { from { opacity:0; } to { opacity:1; } }
    @keyframes ct-kb  { from { transform:scale(1.0); } to { transform:scale(1.07); } }
    @keyframes ct-kb2 { from { transform:scale(1.06); } to { transform:scale(1.0); } }
    .ct-up  { opacity:0; animation: ct-up .85s cubic-bezier(.2,.7,.2,1) forwards; }
    .ct-in  { opacity:0; animation: ct-in 1.1s ease forwards; }
    .ct-kb  { animation: ct-kb 22s ease-out forwards; }
    .ct-kb2 { animation: ct-kb2 24s ease-out forwards; }
  `}</style>
);

// ─── Primitives ─────────────────────────────────────────────────────────────────
const Photo = ({ src, pos = 'center', kb = 'none' }: { src: string; pos?: string; kb?: 'in' | 'out' | 'none' }) => (
  <img
    src={src}
    alt=""
    className={kb === 'in' ? 'ct-kb' : kb === 'out' ? 'ct-kb2' : undefined}
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }}
  />
);

const Scrim = ({ css }: { css: string }) => (
  <div style={{ position: 'absolute', inset: 0, background: css, pointerEvents: 'none' }} />
);

const Eyebrow = ({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) => (
  <div
    className={className}
    style={{ fontSize: 19, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, ...style }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 96, style }: { children: React.ReactNode; size?: number; style?: React.CSSProperties }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 600,
      lineHeight: 0.98,
      letterSpacing: '-0.015em',
      margin: 0,
      textShadow: '0 4px 28px rgba(0,0,0,0.4)',
      ...style,
    }}
  >
    {children}
  </h2>
);

const Bullets = ({ items, size = 29, shadow = false }: { items: string[]; size?: number; shadow?: boolean }) => (
  <ul style={{ listStyle: 'none', margin: '30px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 17 }}>
    {items.map((t, i) => (
      <li
        key={i}
        className="ct-up"
        style={{
          animationDelay: `${0.15 + i * 0.07}s`,
          fontSize: size,
          lineHeight: 1.25,
          display: 'flex',
          gap: 16,
          alignItems: 'baseline',
          textShadow: shadow ? '0 2px 16px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        <span style={{ color: C.gold, fontSize: size * 0.6, transform: 'translateY(-2px)' }}>—</span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const ProgressBar = ({ night }: { night: number }) => {
  const frac = night / NIGHTS_TOTAL;
  const idx = cityIndexOfNight(night);
  return (
    <div style={{ position: 'absolute', left: 110, right: 110, bottom: 56, zIndex: 6 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 15,
          fontSize: 16,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: C.goldSoft, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{CITIES[idx].name}</span>
        <span style={{ color: C.beige, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>Nuit {night} · {NIGHTS_TOTAL}</span>
      </div>
      <div style={{ position: 'relative', height: 12 }}>
        <div style={{ position: 'absolute', top: 5, left: 0, right: 0, height: 2, background: 'rgba(244,236,221,0.22)' }} />
        <div style={{ position: 'absolute', top: 5, left: 0, width: `${frac * 100}%`, height: 2, background: `linear-gradient(90deg, ${C.redDeep}, ${C.gold})` }} />
        {CITY_INFO.map((c, i) => {
          const reached = c.mid <= frac + 0.0001;
          const current = i === idx;
          return (
            <div
              key={c.name}
              style={{
                position: 'absolute',
                left: `${c.mid * 100}%`,
                top: 6,
                width: current ? 14 : 9,
                height: current ? 14 : 9,
                marginLeft: current ? -7 : -4.5,
                marginTop: current ? -7 : -4.5,
                borderRadius: '50%',
                background: current ? C.gold : reached ? C.goldSoft : 'rgba(244,236,221,0.3)',
                boxShadow: current ? '0 0 0 5px rgba(204,163,82,0.22)' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── Labelled image tile (with on-brand placeholder for missing photos) ──────────
const Tile = ({
  src,
  label,
  pos = 'center',
  big = false,
  kb = 'none',
}: {
  src?: string;
  label: string;
  pos?: string;
  big?: boolean;
  kb?: 'in' | 'out' | 'none';
}) => (
  <div
    className={big ? undefined : 'ct-up'}
    style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: big ? 10 : 8,
      flex: big ? undefined : 1,
      height: '100%',
      width: big ? '100%' : undefined,
      minWidth: 0,
      minHeight: 0,
      border: src ? `1px solid ${C.line}` : `1.5px dashed rgba(204,163,82,0.5)`,
      background: src ? undefined : 'rgba(255,255,255,0.03)',
      boxShadow: big ? '0 24px 60px -28px rgba(0,0,0,0.9)' : 'none',
    }}
  >
    {src ? (
      <>
        <Photo src={src} pos={pos} kb={kb} />
        <Scrim css="linear-gradient(180deg, rgba(8,6,5,0) 52%, rgba(8,6,5,0.82) 100%)" />
        <span
          style={{
            position: 'absolute',
            left: big ? 26 : 15,
            bottom: big ? 22 : 13,
            right: 12,
            fontSize: big ? 27 : 17,
            fontWeight: 600,
            color: C.text,
            letterSpacing: '0.01em',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {label}
        </span>
      </>
    ) : (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0 12px', textAlign: 'center' }}>
        <div style={{ fontSize: big ? 44 : 28, color: C.gold, lineHeight: 1 }}>◎</div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: big ? 30 : 18, color: C.text, lineHeight: 1.1 }}>{label}</div>
        <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted }}>Photo à ajouter</div>
      </div>
    )}
  </div>
);

// ─── Night slide: left text column + right gallery (hero + labelled thumbs) ──────
const NightSlide = ({
  night,
  city,
  title,
  bullets,
  heroSrc,
  heroLabel,
  heroPos = 'center',
  heroKb = 'in',
  thumbs,
}: {
  night: number;
  city: string;
  title: React.ReactNode;
  bullets: string[];
  heroSrc: string;
  heroLabel: string;
  heroPos?: string;
  heroKb?: 'in' | 'out';
  thumbs?: React.ReactNode;
}) => (
  <div style={{ ...fill, display: 'grid', gridTemplateColumns: '35% 65%' }}>
    <Anim />
    {/* left — text */}
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px 60px 110px' }}>
      <Eyebrow className="ct-up">Nuit {night} · {city}</Eyebrow>
      <Title size={76} style={{ marginTop: 24 }}>{title}</Title>
      <Bullets items={bullets} />
    </div>
    {/* right — gallery */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '84px 110px 150px 30px', minHeight: 0 }}>
      <div style={{ flex: thumbs ? 1.7 : 1, minHeight: 0 }}>
        <Tile src={heroSrc} label={heroLabel} pos={heroPos} big kb={heroKb} />
      </div>
      {thumbs && <div style={{ flex: 1, display: 'flex', gap: 14, minHeight: 0 }}>{thumbs}</div>}
    </div>
    <ProgressBar night={night} />
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 1 — Titre
// ════════════════════════════════════════════════════════════════════════════════
const S01_Title: Page = () => (
  <div style={fill}>
    <Anim />
    <Photo src={bjWall} pos="center 42%" kb="in" />
    <Scrim css="linear-gradient(180deg, rgba(8,6,5,0.55) 0%, rgba(8,6,5,0.1) 35%, rgba(8,6,5,0.2) 60%, rgba(8,6,5,0.92) 100%)" />
    <div style={{ position: 'absolute', top: 64, left: 120, right: 120, display: 'flex', justifyContent: 'space-between' }}>
      <Eyebrow className="ct-up">Itinéraire · 17 jours · 7 étapes</Eyebrow>
      <Eyebrow className="ct-up" style={{ color: C.beige }}>Été 2026</Eyebrow>
    </div>
    <div style={{ position: 'absolute', left: 120, bottom: 150, right: 120 }}>
      <h1
        className="ct-up"
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          margin: 0,
          textShadow: '0 6px 40px rgba(0,0,0,0.5)',
        }}
      >
        Voyage en Chine
        <br />
        <span style={{ fontStyle: 'italic', color: C.goldSoft }}>Été 2026</span>
      </h1>
      <p className="ct-up" style={{ animationDelay: '0.25s', marginTop: 40, fontSize: 29, letterSpacing: '0.03em', color: C.beige, textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
        Pékin · Chengdu · Chongqing · Zhangjiajie · Wangxian Valley · Wuyuan · Shanghai
      </p>
    </div>
  </div>
);
S01_Title.transition = {
  duration: 300,
  exit: { duration: 180, easing: 'cubic-bezier(0.4,0,1,1)', keyframes: [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }] },
  enter: { duration: 300, delay: 100, easing: 'cubic-bezier(0,0,0.2,1)', keyframes: [{ opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' }, { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }] },
};

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 2 — Vue d'ensemble (mosaïque)
// ════════════════════════════════════════════════════════════════════════════════
const MosaicTile = ({ src, label, pos = 'center' }: { src: string; label: string; pos?: string }) => (
  <div className="ct-up" style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, minHeight: 0 }}>
    <Photo src={src} pos={pos} />
    <Scrim css="linear-gradient(180deg, rgba(8,6,5,0) 50%, rgba(8,6,5,0.8) 100%)" />
    <span style={{ position: 'absolute', left: 18, bottom: 14, fontSize: 22, fontWeight: 600, color: C.text, textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>{label}</span>
  </div>
);

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div className="ct-up">
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 96, fontWeight: 600, lineHeight: 0.9 }}>{n}</div>
    <div style={{ marginTop: 8, fontSize: 19, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold }}>{label}</div>
  </div>
);

const S02_Overview: Page = () => (
  <div style={{ ...fill, display: 'grid', gridTemplateColumns: '38% 62%' }}>
    <Anim />
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px 0 120px' }}>
      <Eyebrow className="ct-up">Le voyage en un coup d'œil</Eyebrow>
      <Title size={92} style={{ marginTop: 22 }}>Vue d'ensemble</Title>
      <div style={{ display: 'flex', gap: 56, marginTop: 48 }}>
        <Stat n="17" label="Jours" />
        <Stat n="16" label="Nuits" />
        <Stat n="7" label="Étapes" />
      </div>
      <p className="ct-up" style={{ marginTop: 44, fontSize: 27, lineHeight: 1.5, color: C.beige, maxWidth: 620 }}>
        De l'histoire impériale aux mégalopoles futuristes, des pandas aux montagnes
        d'Avatar et aux villages suspendus.
      </p>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 16,
        padding: '96px 120px 96px 30px',
      }}
    >
      <MosaicTile src={bjForbidden} label="Pékin" pos="center" />
      <MosaicTile src={cdPanda} label="Pandas · Chengdu" pos="center" />
      <MosaicTile src={cqHongya} label="Chongqing" pos="center" />
      <MosaicTile src={zjAvatar} label="Zhangjiajie" pos="center" />
      <MosaicTile src={wxValley} label="Wangxian Valley" pos="center" />
      <MosaicTile src={shPudongNight} label="Shanghai" pos="center" />
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 3 — Carte du trajet (SVG)
// ════════════════════════════════════════════════════════════════════════════════
const MapCity = ({ x, y, name, nights, anchor = 'start', dx = 0, dy = 0, big = false }: { x: number; y: number; name: string; nights: number; anchor?: 'start' | 'middle' | 'end'; dx?: number; dy?: number; big?: boolean }) => (
  <g>
    <circle cx={x} cy={y} r={big ? 13 : 9} fill={C.gold} stroke={C.ink} strokeWidth={3} />
    <circle cx={x} cy={y} r={big ? 24 : 18} fill="none" stroke={C.gold} strokeOpacity={0.35} strokeWidth={2} />
    <text x={x + dx} y={y + dy} textAnchor={anchor} style={{ fontFamily: 'Georgia, serif', fontSize: 30, fill: C.text }}>{name}</text>
    <text x={x + dx} y={y + dy + 26} textAnchor={anchor} style={{ fontSize: 18, letterSpacing: '0.12em', fill: C.muted }}>{nights} {nights > 1 ? 'nuits' : 'nuit'}</text>
  </g>
);

const Seg = ({ x, y, label, anchor = 'middle' }: { x: number; y: number; label: string; anchor?: 'start' | 'middle' | 'end' }) => (
  <text x={x} y={y} textAnchor={anchor} style={{ fontSize: 19, letterSpacing: '0.04em', fill: C.goldSoft, fontFamily: 'Helvetica, sans-serif' }}>{label}</text>
);

const S03_Map: Page = () => {
  const P = { bj: [733, 201], cd: [273, 557], cq: [363, 600], zj: [513, 619], wx: [789, 646], wy: [789, 615], sh: [924, 538] } as const;
  const route = `M${P.bj} L${P.cd} L${P.cq} L${P.zj} L${P.wx} L${P.wy} L${P.sh}`;
  return (
    <div style={{ ...fill, background: `radial-gradient(ellipse at 60% 40%, ${C.nightHi}, ${C.night} 55%, ${C.ink} 100%)` }}>
      <Anim />
      <div style={{ position: 'absolute', top: 64, left: 120, zIndex: 5 }}>
        <Eyebrow className="ct-up">Carte du trajet</Eyebrow>
        <Title size={88} style={{ marginTop: 18 }}>Le tracé</Title>
      </div>
      <svg viewBox="0 0 1100 760" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[200, 400, 600, 800, 1000].map((gx) => (<line key={`v${gx}`} x1={gx} y1={60} x2={gx} y2={740} stroke={C.text} strokeOpacity={0.04} />))}
        {[180, 360, 540, 720].map((gy) => (<line key={`h${gy}`} x1={60} y1={gy} x2={1060} y2={gy} stroke={C.text} strokeOpacity={0.04} />))}
        <path d="M992,80 C962,230 1014,360 982,470 C954,580 1002,660 968,748" fill="none" stroke={C.beige} strokeOpacity={0.18} strokeWidth={2} />
        <path d="M363,600 C 500,548 620,548 712,560 S 884,520 924,538" fill="none" stroke="#5b86b3" strokeOpacity={0.35} strokeWidth={6} strokeLinecap="round" />
        <text x={648} y={548} textAnchor="middle" style={{ fontSize: 17, fill: '#7fa3c9', letterSpacing: '0.18em' }}>YANGTSÉ</text>
        <path d={route} fill="none" stroke={C.red} strokeOpacity={0.25} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
        <path d={route} fill="none" stroke={C.gold} strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" strokeLinejoin="round" />
        <Seg x={520} y={368} label="✈  Vol · ~3 h" />
        <Seg x={250} y={596} label="🚄 ~1 h" anchor="end" />
        <Seg x={426} y={653} label="🚄 2–3 h · ✈ 1h20" />
        <Seg x={655} y={690} label="🚄 + 🚗 · 7–9 h" />
        <Seg x={812} y={636} label="🚗 2–3 h" anchor="start" />
        <Seg x={866} y={558} label="🚄 3–4 h" anchor="start" />
        <MapCity x={P.bj[0]} y={P.bj[1]} name="Pékin" nights={4} anchor="start" dx={26} dy={6} big />
        <MapCity x={P.cd[0]} y={P.cd[1]} name="Chengdu" nights={2} anchor="end" dx={-26} dy={6} />
        <MapCity x={P.cq[0]} y={P.cq[1]} name="Chongqing" nights={3} anchor="end" dx={-26} dy={34} />
        <MapCity x={P.zj[0]} y={P.zj[1]} name="Zhangjiajie" nights={2} anchor="middle" dx={-8} dy={64} />
        <MapCity x={P.wx[0]} y={P.wx[1]} name="Wangxian Valley" nights={1} anchor="middle" dx={20} dy={64} />
        <MapCity x={P.wy[0]} y={P.wy[1]} name="Wuyuan" nights={1} anchor="end" dx={-26} dy={2} />
        <MapCity x={P.sh[0]} y={P.sh[1]} name="Shanghai" nights={3} anchor="start" dx={26} dy={6} big />
      </svg>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDES 4–7 — Pékin
// ════════════════════════════════════════════════════════════════════════════════
const S04: Page = () => (
  <div style={fill}>
    <Anim />
    <Photo src={bjNight} pos="center" kb="in" />
    <Scrim css="linear-gradient(180deg, rgba(8,6,5,0.72) 0%, rgba(8,6,5,0.05) 32%, rgba(8,6,5,0) 55%, rgba(8,6,5,0.88) 100%)" />
    <Scrim css="linear-gradient(90deg, rgba(8,6,5,0.78) 0%, rgba(8,6,5,0.2) 44%, rgba(8,6,5,0) 72%)" />
    <div style={{ position: 'absolute', top: 60, left: 120 }}>
      <Eyebrow className="ct-up">Nuit 1 · Pékin</Eyebrow>
    </div>
    <div style={{ position: 'absolute', left: 120, bottom: 150, maxWidth: 1100 }}>
      <Title size={118}>Arrivée à Pékin</Title>
      <Bullets items={['Atterrissage en Chine', 'Installation à l’hôtel', 'Première soirée tranquille']} shadow size={34} />
    </div>
    <ProgressBar night={1} />
  </div>
);

const S05: Page = () => (
  <NightSlide
    night={2}
    city="Pékin"
    title={<>Cœur historique</>}
    bullets={['Place Tian’anmen', 'Cité interdite (3–4 h)', 'Astuce : Working People’s Palace', 'Jingshan pour la vue', 'Hutongs au crépuscule']}
    heroSrc={bjForbidden}
    heroLabel="Cité interdite"
    heroPos="center"
    thumbs={
      <>
        <Tile src={bjTiananmen} label="Tian’anmen" pos="center" />
        <Tile src={bjJingshan} label="Parc Jingshan" pos="center" />
        <Tile src={bjHutong} label="Hutongs" pos="center" />
        <Tile src={bjWorkers} label="Working People’s Palace" pos="center 30%" />
        <Tile src={bjNatMuseum} label="Musée national" pos="center" />
      </>
    }
  />
);

const S06: Page = () => (
  <NightSlide
    night={3}
    city="Pékin"
    title={<>Palais d’été & néons</>}
    bullets={['Palais d’été (3–4 h)', 'Retour métro vers le centre', 'Soirée Sanlitun / Wangfujing']}
    heroSrc={bjSummer}
    heroLabel="Palais d’été"
    heroPos="center"
    thumbs={<><Tile src={bjSanlitun} label="Sanlitun · soirée" pos="center" /></>}
  />
);

const S07: Page = () => (
  <NightSlide
    night={4}
    city="Pékin"
    title={<>La Grande Muraille</>}
    bullets={['Section Mutianyu', 'Montée en télécabine', 'Descente en toboggan', 'Journée de 6 à 8 h']}
    heroSrc={bjWall}
    heroLabel="Grande Muraille · Mutianyu"
    heroPos="center 35%"
    heroKb="out"
    thumbs={<><Tile src={bjToboggan} label="Toboggan de Mutianyu" pos="center" /></>}
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDES 8–9 — Chengdu
// ════════════════════════════════════════════════════════════════════════════════
const S08: Page = () => (
  <NightSlide
    night={5}
    city="Chengdu"
    title={<>Bienvenue à Chengdu</>}
    bullets={['Vol Pékin → Chengdu (~3 h)', 'People’s Park & maison de thé', 'Kuan Zhai Alleys', 'Opéra du Sichuan']}
    heroSrc={cdKuanzhai}
    heroLabel="Kuan Zhai Alleys"
    heroPos="center"
    thumbs={
      <>
        <Tile src={cdPeoplespark} label="People’s Park" pos="center" />
        <Tile src={cdOpera} label="Opéra du Sichuan" pos="center" />
      </>
    }
  />
);

const S09: Page = () => (
  <NightSlide
    night={6}
    city="Chengdu"
    title={<>Pandas & ville</>}
    bullets={['Pandas dès l’ouverture', 'Chunxi Road', 'Taikoo Li & IFS', 'Nine Eyes Bridge la nuit']}
    heroSrc={cdPanda}
    heroLabel="Base des pandas"
    heroPos="center"
    thumbs={
      <>
        <Tile src={cdIfs} label="Panda de l’IFS" pos="center" />
        <Tile src={cdTaikooli} label="Taikoo Li" pos="center" />
        <Tile src={cdJiuyan} label="Nine Eyes Bridge" pos="center" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDES 10–12 — Chongqing
// ════════════════════════════════════════════════════════════════════════════════
const S10: Page = () => (
  <NightSlide
    night={7}
    city="Chongqing"
    title={<>Chongqing, cyberpunk</>}
    bullets={['Train depuis Chengdu (~1 h)', 'Jiefangbei (Liberation Bei)', 'Raffles City', 'Hongyadong illuminé']}
    heroSrc={cqHongya}
    heroLabel="Hongyadong"
    heroPos="center"
    thumbs={
      <>
        <Tile src={cqJiefangbei} label="Jiefangbei" pos="center" />
        <Tile src={cqRaffles} label="Raffles City" pos="center" />
      </>
    }
  />
);

const S11: Page = () => (
  <NightSlide
    night={8}
    city="Chongqing"
    title={<>Temples & vieille ville</>}
    bullets={['Temple Luohan', 'Vieux bourg de Ciqikou', 'Rooftop au Southwind Cliff', 'Coucher de soleil → néons']}
    heroSrc={cqCiqikou}
    heroLabel="Ciqikou"
    heroPos="center 30%"
    thumbs={
      <>
        <Tile src={cqLuohan} label="Temple Luohan" pos="center" />
        <Tile src={cqSkyline} label="Skyline au crépuscule" pos="center" />
      </>
    }
  />
);

const S12: Page = () => (
  <NightSlide
    night={9}
    city="Chongqing"
    title={<>Vues de nuit</>}
    bullets={['Parc d’Eling', 'Shancheng Lane', 'Musée des Trois Gorges', 'Téléphérique du Yangtsé']}
    heroSrc={cqCableway}
    heroLabel="Téléphérique du Yangtsé"
    heroPos="center"
    thumbs={
      <>
        <Tile src={cqEling} label="Parc d’Eling" pos="center" />
        <Tile src={cqShancheng} label="Shancheng Lane" pos="center" />
        <Tile src={cq3gorges} label="Musée des Trois Gorges" pos="center" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDES 13–14 — Zhangjiajie
// ════════════════════════════════════════════════════════════════════════════════
const S13: Page = () => (
  <NightSlide
    night={10}
    city="Zhangjiajie"
    title={<>Cap sur Zhangjiajie</>}
    bullets={['Route depuis Chongqing', 'Hôtel porte Est de Wulingyuan', 'Glass Bridge si le temps le permet']}
    heroSrc={zjGlass}
    heroLabel="Glass Bridge"
    heroPos="center"
    thumbs={<><Tile src={zjLandscape} label="Wulingyuan" pos="center" /></>}
  />
);

const S14: Page = () => (
  <NightSlide
    night={11}
    city="Zhangjiajie"
    title={<>Montagnes Avatar</>}
    bullets={['Ascenseur Bailong', 'Yuanjiajie · Avatar Mountains', 'Tianzi Mountain', '72 Qilou le soir']}
    heroSrc={zjAvatar}
    heroLabel="Yuanjiajie · Avatar Mountains"
    heroPos="center"
    thumbs={
      <>
        <Tile src={zjBailong} label="Ascenseur Bailong" pos="center" />
        <Tile src={zjTianzi} label="Tianzi Mountain" pos="center" />
        <Tile src={zjTianziCable} label="Tianzi Cableway" pos="center" />
        <Tile label="72 Qilou" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 15 — Wangxian Valley
// ════════════════════════════════════════════════════════════════════════════════
const S15: Page = () => (
  <NightSlide
    night={12}
    city="Wangxian Valley"
    title={<>Wangxian Valley</>}
    bullets={['Grosse journée de transport', 'Arrivée l’après-midi', 'Village suspendu & dîner', 'Nuit sur place']}
    heroSrc={wxValley}
    heroLabel="Wangxian Valley (Wangxiangu)"
    heroPos="center"
    thumbs={<><Tile src={wxValley2} label="Le site de jour" pos="center" /></>}
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 16 — Wuyuan
// ════════════════════════════════════════════════════════════════════════════════
const S16: Page = () => (
  <NightSlide
    night={13}
    city="Wuyuan"
    title={<>Wuyuan, l’autre Chine</>}
    bullets={['Route depuis Wangxian', 'Village traditionnel', 'Maisons anciennes & cours d’eau']}
    heroSrc={wuyuanVillage}
    heroLabel="Wuyuan · Wangkou"
    heroPos="center"
    thumbs={<><Tile src={wuyuan2} label="Ruelles de Likeng" pos="center" /></>}
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 17 — Huangling → Shanghai
// ════════════════════════════════════════════════════════════════════════════════
const S17: Page = () => (
  <NightSlide
    night={14}
    city="Shanghai"
    title={<>Huangling → Shanghai</>}
    bullets={['Huangling au matin', 'Train vers Shanghai (~3–4 h)', 'Première soirée à Pudong']}
    heroSrc={shSkyline}
    heroLabel="Skyline de Shanghai"
    heroPos="center"
    thumbs={
      <>
        <Tile src={wuyuanHuangling} label="Huangling · 晒秋" pos="center" />
        <Tile src={shPudongNight} label="Pudong de nuit" pos="center" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 18 — Shanghai classique
// ════════════════════════════════════════════════════════════════════════════════
const S18: Page = () => (
  <NightSlide
    night={15}
    city="Shanghai"
    title={<>Shanghai classique</>}
    bullets={['The Bund', 'Nanjing Road', 'Shanghai Museum', 'Oriental Pearl Tower']}
    heroSrc={shBund}
    heroLabel="The Bund"
    heroPos="center"
    thumbs={
      <>
        <Tile src={shNanjingRoad} label="Nanjing Road" pos="center" />
        <Tile src={shMuseum} label="Shanghai Museum" pos="center" />
        <Tile src={shPearl} label="Oriental Pearl Tower" pos="center" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 19 — Jardins & quartiers cool
// ════════════════════════════════════════════════════════════════════════════════
const S19: Page = () => (
  <NightSlide
    night={16}
    city="Shanghai"
    title={<>Jardins & design</>}
    bullets={['Yu Garden & City God Temple', 'Xintiandi', 'Tianzifang', '1000 Trees', 'teamLab']}
    heroSrc={shYugarden}
    heroLabel="Yu Garden"
    heroPos="center"
    thumbs={
      <>
        <Tile src={shCityGod} label="City God Temple" pos="center" />
        <Tile src={shXintiandi} label="Xintiandi" pos="center" />
        <Tile src={shTianzifang} label="Tianzifang" pos="center" />
        <Tile src={sh1000trees} label="1000 Trees" pos="center" />
        <Tile label="teamLab Shanghai" />
      </>
    }
  />
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 20 — Récap transport
// ════════════════════════════════════════════════════════════════════════════════
const TripRow = ({ from, to, mode, dur, i }: { from: string; to: string; mode: string; dur: string; i: number }) => (
  <div
    className="ct-up"
    style={{ animationDelay: `${0.1 + i * 0.07}s`, display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 1fr', alignItems: 'center', gap: 32, padding: '22px 32px', borderBottom: `1px solid ${C.line}` }}
  >
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 37, color: C.text }}>{from} <span style={{ color: C.red }}>→</span> {to}</div>
    <div style={{ fontSize: 27, color: C.beige }}>{mode}</div>
    <div style={{ fontSize: 27, color: C.goldSoft, textAlign: 'right' }}>{dur}</div>
  </div>
);

const S20_Transport: Page = () => (
  <div style={{ ...fill, background: `linear-gradient(120deg, ${C.ink}, ${C.night})` }}>
    <Anim />
    <img src={trainHsr} alt="" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '38%', objectFit: 'cover', opacity: 0.16 }} />
    <Scrim css={`linear-gradient(90deg, ${C.ink} 50%, rgba(8,6,5,0) 100%)`} />
    <div style={{ position: 'absolute', inset: 0, padding: '84px 120px 78px', display: 'flex', flexDirection: 'column' }}>
      <Eyebrow className="ct-up">Logistique</Eyebrow>
      <Title size={88} style={{ marginTop: 18 }}>Les grands trajets</Title>
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 1fr', gap: 32, padding: '0 32px 14px', fontSize: 18, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold }}>
          <span>Trajet</span>
          <span>Mode</span>
          <span style={{ textAlign: 'right' }}>Durée totale</span>
        </div>
        <TripRow i={0} from="Pékin" to="Chengdu" mode="✈  Vol ~3 h" dur="5–6 h" />
        <TripRow i={1} from="Chengdu" to="Chongqing" mode="🚄 Train G 1–1h30" dur="2h30–3 h" />
        <TripRow i={2} from="Chongqing" to="Zhangjiajie" mode="🚄 2–3 h · ✈ 1h20" dur="≈ 4 h" />
        <TripRow i={3} from="Zhangjiajie" to="Wangxian Valley" mode="🚄 + 🚗 (via Shangrao)" dur="7h30–9 h" />
        <TripRow i={4} from="Wangxian Valley" to="Wuyuan" mode="🚗 Didi" dur="2–3 h" />
        <TripRow i={5} from="Wuyuan" to="Shanghai" mode="🚄 Train G" dur="3–4 h" />
      </div>
      <div style={{ flex: 1 }} />
      <p className="ct-in" style={{ fontSize: 25, color: C.muted, maxWidth: 1100 }}>
        Le seul gros morceau : <span style={{ color: C.goldSoft }}>Zhangjiajie → Wangxian Valley</span>. Une vraie journée de transport — le reste s’enchaîne sans douleur.
      </p>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
//  SLIDE 21 — Conclusion
// ════════════════════════════════════════════════════════════════════════════════
const Reason = ({ place, vibe, i }: { place: string; vibe: string; i: number }) => (
  <div className="ct-up" style={{ animationDelay: `${0.15 + i * 0.07}s`, display: 'flex', alignItems: 'baseline', gap: 18 }}>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, color: C.goldSoft, minWidth: 280 }}>{place}</span>
    <span style={{ color: C.red }}>—</span>
    <span style={{ fontSize: 29, color: C.beige }}>{vibe}</span>
  </div>
);

const S21_Finale: Page = () => (
  <div style={fill}>
    <Anim />
    <Photo src={finaleMist} pos="center" kb="in" />
    <Scrim css="linear-gradient(180deg, rgba(8,6,5,0.72) 0%, rgba(8,6,5,0.55) 45%, rgba(8,6,5,0.92) 100%)" />
    <div style={{ position: 'absolute', inset: 0, padding: '94px 120px 104px', display: 'flex', flexDirection: 'column' }}>
      <Eyebrow className="ct-up">Le mot de la fin</Eyebrow>
      <Title size={88} style={{ marginTop: 18, maxWidth: 1400 }}>Pourquoi ce voyage va être incroyable</Title>
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: 'min-content', rowGap: 22, columnGap: 80, maxWidth: 1560 }}>
        <Reason i={0} place="Pékin" vibe="histoire impériale" />
        <Reason i={1} place="Chengdu" vibe="pandas & Sichuan" />
        <Reason i={2} place="Chongqing" vibe="vibes cyberpunk" />
        <Reason i={3} place="Zhangjiajie" vibe="paysages d’Avatar" />
        <Reason i={4} place="Wangxian Valley" vibe="villages suspendus" />
        <Reason i={5} place="Wuyuan / Huangling" vibe="Chine traditionnelle" />
        <Reason i={6} place="Shanghai" vibe="skyline futuriste" />
      </div>
      <div style={{ flex: 1 }} />
      <p className="ct-in" style={{ fontFamily: 'var(--osd-font-display)', fontStyle: 'italic', fontSize: 44, lineHeight: 1.25, color: C.text, maxWidth: 1600, textShadow: '0 3px 22px rgba(0,0,0,0.6)' }}>
        “ Un voyage entre histoire impériale, mégalopoles futuristes et paysages presque irréels. ”
      </p>
    </div>
  </div>
);

// ─── Deck transition (house = quiet rise) ────────────────────────────────────────
export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 160, easing: 'cubic-bezier(0.4,0,1,1)', keyframes: [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }] },
  enter: { duration: 240, delay: 80, easing: 'cubic-bezier(0,0,0.2,1)', keyframes: [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};

export const meta: SlideMeta = {
  title: 'Voyage en Chine — Été 2026',
  createdAt: '2026-05-28T20:20:13.579Z',
};

// ─── Speaker notes (one per page) ────────────────────────────────────────────────
export const notes: (string | undefined)[] = [
  'Ouverture : 17 jours, 7 villes, de la Grande Muraille à Shanghai. On donne le ton, sans tout dérouler.',
  'La carte mentale : 17 jours / 16 nuits / 7 étapes. La mosaïque montre les 6 ambiances clés du voyage.',
  'Le tracé sur la carte : nord (Pékin) → ouest (Chengdu/Chongqing) → sud (Zhangjiajie) → est (Shanghai), le long du Yangtsé.',
  'Jour 0 : arrivée, on pose les valises, première soirée calme selon l’heure d’atterrissage.',
  'Grosse journée historique : Tian’anmen, Cité interdite (astuce : entrer par le Working People’s Palace), Jingshan pour la vue, hutongs le soir.',
  'Palais d’été l’après-midi, puis retour métro et soirée moderne à Sanlitun ou Wangfujing.',
  'LE jour Grande Muraille (Mutianyu) : télécabine à la montée, toboggan à la descente. Journée complète.',
  'Envol pour Chengdu (~3 h). People’s Park et sa maison de thé, Kuan Zhai Alleys, opéra du Sichuan le soir (changement de visages).',
  'Pandas dès l’ouverture pour éviter la foule, puis Chunxi / IFS / Taikoo Li, et Nine Eyes Bridge la nuit.',
  'Train rapide pour Chongqing (~1 h). Jiefangbei, Raffles City, et Hongyadong illuminé — la carte postale cyberpunk.',
  'Temple Luohan, vieux bourg de Ciqikou, puis rooftop au Southwind Cliff vers 18h pour la bascule coucher de soleil → néons.',
  'Parc d’Eling, Shancheng Lane (ou musée des Trois Gorges), téléphérique du Yangtsé ou bateau de nuit.',
  'Transfert vers Zhangjiajie, hôtel près de la porte Est de Wulingyuan. Glass Bridge si on arrive assez tôt.',
  'Le clou du voyage : Wulingyuan. Ascenseur Bailong, Yuanjiajie (les piliers d’Avatar), Tianzi Mountain. 72 Qilou en ville le soir.',
  'La grosse journée de transport (7–9 h) vers Wangxian Valley. Arrivée l’après-midi, balade et dîner sur place.',
  'Petite route vers Wuyuan. Ambiance village traditionnel : maisons anciennes, ruelles, cours d’eau.',
  'Huangling le matin (le 晒秋, séchage des récoltes sur les toits), puis train vers Shanghai et première soirée côté Pudong.',
  'Shanghai classique : The Bund, Nanjing Road, Shanghai Museum, et un observatoire (Oriental Pearl ou Shanghai Tower).',
  'Vieux Shanghai + quartiers cool : Yu Garden, City God Temple, Xintiandi, Tianzifang, 1000 Trees, teamLab.',
  'Récap transport. Le seul vrai morceau dur est Zhangjiajie → Wangxian. Tout le reste s’enchaîne facilement.',
  'Clôture : on rappelle la promesse de chaque étape, puis la phrase finale. On laisse l’image parler.',
];

export default [
  S01_Title,
  S02_Overview,
  S03_Map,
  S04, S05, S06, S07,
  S08, S09,
  S10, S11, S12,
  S13, S14,
  S15,
  S16,
  S17,
  S18, S19,
  S20_Transport,
  S21_Finale,
] satisfies Page[];
