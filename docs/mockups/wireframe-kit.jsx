// wireframe-kit.jsx — handwritten/sketched primitives for low-fi wireframes
// All shapes use slightly-imperfect strokes and a Caveat/handwritten feel.
// Phone frame is intentionally simple (no real iOS chrome) — focus is on layout.

const WF = {
  ink: '#1d1d1f',
  inkSoft: '#5a5a5f',
  inkLight: '#9c9ca1',
  paper: '#f2f2f7',      // = systemGroupedBackground (iOS Light)
  paperWarm: '#e5e5ea',  // = systemGray5 / fill secondary — for tracks, segmented bg
  accent: '#3a82f7',     // = systemBlue. tint カラーを 1色に統一（HIG）
  accentSoft: '#cfe0fb',
  blue: '#3a82f7',       // systemBlue
  blueSoft: '#cfe0fb',
  green: '#34c759',
  red: '#ff3b30',
  hand: '"Caveat", "Comic Sans MS", "Marker Felt", cursive',
  ui: '"Architects Daughter", "Caveat", system-ui',
  body: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

// Dark mode palette — iOS standard dark colors
const WFD = {
  ink: '#f2f2f7',         // primary label
  inkSoft: '#a8a8ad',      // secondary label
  inkLight: '#6c6c70',     // tertiary label
  paper: '#000000',        // app bg (true black like iOS)
  paperWarm: '#1c1c1e',    // grouped card bg / secondary fill
  paperDeep: '#2c2c2e',    // tertiary fill
  accent: '#0a84ff',     // = systemBlue (Dark)
  accentSoft: '#1c2a44',
  blue: '#0a84ff',
  blueSoft: '#1c2a44',
  green: '#30d158',
  red: '#ff453a',
  divider: 'rgba(84,84,88,0.65)',
  hand: WF && WF.hand || '"Caveat", cursive',
  ui: '"Architects Daughter", "Caveat", system-ui',
  body: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

// ---------- WFPhone — minimal phone outline. width 280, height 580 default ----------
function WFPhone({ children, width = 280, height = 580, label, note, tint = '#fff' }) {
  return (
    <div style={{ position: 'relative', width, paddingBottom: 4 }}>
      <div style={{
        width, height,
        border: `2px solid ${WF.ink}`,
        borderRadius: 32,
        background: tint,
        position: 'relative',
        overflow: 'hidden',
        // tiny wobble to feel hand-drawn
        boxShadow: `1.5px 2px 0 ${WF.ink}`,
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 70, height: 14, background: WF.ink, borderRadius: 7, opacity: 0.85,
        }} />
        {/* status bar text */}
        <div style={{
          position: 'absolute', top: 10, left: 18, fontFamily: WF.hand,
          fontSize: 13, color: WF.ink, fontWeight: 700, letterSpacing: -0.2,
        }}>9:41</div>
        <div style={{
          position: 'absolute', top: 11, right: 18, fontFamily: WF.hand,
          fontSize: 12, color: WF.ink, display: 'flex', gap: 4, alignItems: 'center',
        }}>
          <svg width="14" height="9" viewBox="0 0 14 9"><rect x="0" y="6" width="2" height="3" fill={WF.ink}/><rect x="3.5" y="4" width="2" height="5" fill={WF.ink}/><rect x="7" y="2" width="2" height="7" fill={WF.ink}/><rect x="10.5" y="0" width="2" height="9" fill={WF.ink}/></svg>
          <svg width="18" height="9" viewBox="0 0 18 9"><rect x="0.5" y="0.5" width="14" height="8" rx="2" fill="none" stroke={WF.ink}/><rect x="2" y="2" width="9" height="5" rx="1" fill={WF.ink}/><rect x="15.5" y="3" width="1.5" height="3" fill={WF.ink}/></svg>
        </div>
        {/* content */}
        <div style={{
          position: 'absolute', top: 32, left: 0, right: 0, bottom: 14,
          overflow: 'hidden',
        }}>{children}</div>
        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 3, background: WF.ink, borderRadius: 2, opacity: 0.7,
        }} />
      </div>
      {label && (
        <div style={{
          fontFamily: WF.hand, fontSize: 18, color: WF.ink,
          marginTop: 14, fontWeight: 700, letterSpacing: 0.2,
        }}>{label}</div>
      )}
      {note && (
        <div style={{
          fontFamily: WF.hand, fontSize: 15, color: WF.inkSoft,
          marginTop: 2, lineHeight: 1.3,
        }}>{note}</div>
      )}
    </div>
  );
}

// ---------- Hand-drawn line primitives ----------
const Hline = ({ y, x1 = 0, x2 = '100%', color = WF.ink, dash, w = 1.2 }) => (
  <svg style={{ position: 'absolute', left: x1, right: 0, top: y, width: '100%', height: 6, overflow: 'visible' }}>
    <path d={`M2 3 Q ${0.3} 2.6, ${0.6} 3.2 T 1 2.8`} stroke={color} strokeWidth={w} fill="none" strokeDasharray={dash} />
  </svg>
);

// Hand-drawn rectangle (slightly wobbly)
function HandRect({ x = 0, y = 0, w, h, fill = 'none', stroke = WF.ink, strokeWidth = 1.4, radius = 6, dash, style = {}, children, onClick }) {
  // generate a path with tiny variations
  const r = radius;
  const path = `M${x + r} ${y}
    L${x + w - r} ${y} Q${x + w} ${y} ${x + w} ${y + r}
    L${x + w} ${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h}
    L${x + r} ${y + h} Q${x} ${y + h} ${x} ${y + h - r}
    L${x} ${y + r} Q${x} ${y} ${x + r} ${y} Z`;
  return (
    <g onClick={onClick} style={style}>
      <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinejoin="round" strokeLinecap="round"/>
      {children}
    </g>
  );
}

// ---------- Cell — calendar day cell ----------
function WFCell({ day, amount, type = 'expense', density = 'text', dim = false, today = false, weekend = false, w = 36, h = 44 }) {
  const numColor = dim ? WF.inkLight : WF.ink;
  return (
    <div style={{
      width: w, height: h, position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 4, boxSizing: 'border-box',
    }}>
      {today ? (
        <div style={{
          width: 22, height: 22, borderRadius: 11,
          background: WF.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: WF.body, fontSize: 13, fontWeight: 600,
        }}>{day}</div>
      ) : (
        <div style={{
          fontFamily: WF.body, fontSize: 13, fontWeight: 500,
          color: weekend ? WF.inkLight : numColor,
          height: 22, display: 'flex', alignItems: 'center',
        }}>{day}</div>
      )}
      {density === 'text' && amount != null && (
        <div style={{
          fontFamily: WF.body, fontSize: 9, fontWeight: 500,
          color: type === 'income' ? WF.green : WF.inkSoft,
          marginTop: 1, letterSpacing: -0.3,
        }}>{type === 'income' ? '+' : ''}{amount}</div>
      )}
      {density === 'dot' && amount != null && (
        <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
          {[...Array(Math.min(3, Math.ceil(amount / 1500)))].map((_, i) => (
            <div key={i} style={{
              width: 4, height: 4, borderRadius: 2,
              background: type === 'income' ? WF.green : WF.ink,
            }} />
          ))}
        </div>
      )}
      {density === 'bar' && amount != null && (
        <div style={{
          marginTop: 3, width: '70%',
          height: Math.min(14, Math.max(2, amount / 600)),
          background: type === 'income' ? WF.green : WF.inkSoft,
          borderRadius: 1,
        }} />
      )}
    </div>
  );
}

// ---------- Annotation post-it / scribble ----------
function WFNote({ children, top, left, right, bottom, rotate = -2, w = 160, kind = 'postit' }) {
  if (kind === 'postit') {
    return (
      <div style={{
        position: 'absolute', top, left, right, bottom, width: w,
        background: '#fff7c2', padding: '10px 12px',
        fontFamily: WF.hand, fontSize: 14, lineHeight: 1.25, color: '#5a4a2a',
        boxShadow: '0 2px 6px rgba(0,0,0,.1)',
        transform: `rotate(${rotate}deg)`, zIndex: 5,
      }}>{children}</div>
    );
  }
  // scribble: arrow + handwritten label
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom, width: w,
      fontFamily: WF.hand, fontSize: 17, color: WF.ink, lineHeight: 1.2,
      transform: `rotate(${rotate}deg)`, zIndex: 5,
    }}>{children}</div>
  );
}

// ---------- Tab bar at bottom of phone ----------
function WFTabBar({ tabs, active = 0 }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTop: `1.4px solid ${WF.ink}`,
      display: 'flex', justifyContent: 'space-around',
      padding: '6px 0 4px', background: WF.paper,
    }}>
      {tabs.map((t, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          opacity: i === active ? 1 : 0.5,
        }}>
          <div style={{ width: 18, height: 18, border: `1.4px solid ${WF.ink}`, borderRadius: 4 }} />
          <div style={{ fontFamily: WF.body, fontSize: 9, fontWeight: 500, color: WF.ink }}>{t}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- Header (title + side buttons) ----------
function WFHeader({ left, right, title, subtitle, large = false, padX = 16 }) {
  return (
    <div style={{ padding: `8px ${padX}px ${large ? 6 : 8}px`, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 22 }}>
        <div style={{ fontFamily: WF.body, fontSize: 14, color: WF.blue, fontWeight: 500 }}>{left}</div>
        <div style={{ fontFamily: WF.body, fontSize: 14, color: WF.blue, fontWeight: 500 }}>{right}</div>
      </div>
      {large ? (
        <div style={{ marginTop: 4 }}>
          <div style={{ fontFamily: WF.body, fontSize: 22, fontWeight: 700, letterSpacing: -0.4, color: WF.ink }}>{title}</div>
          {subtitle && <div style={{ fontFamily: WF.body, fontSize: 12, color: WF.inkSoft, marginTop: 2 }}>{subtitle}</div>}
        </div>
      ) : (
        title && <div style={{ textAlign: 'center', marginTop: -18, fontFamily: WF.body, fontSize: 14, fontWeight: 600, color: WF.ink }}>{title}</div>
      )}
    </div>
  );
}

// ---------- Section title (sketchy underline) ----------
function WFSectionTitle({ children, color = WF.ink }) {
  return (
    <div style={{
      fontFamily: WF.hand, fontSize: 22, fontWeight: 700, color,
      letterSpacing: 0.3, lineHeight: 1.1,
      paddingBottom: 6, position: 'relative', display: 'inline-block',
    }}>
      {children}
      <svg style={{ position: 'absolute', left: 0, right: 0, bottom: -2, width: '110%', height: 8 }} viewBox="0 0 200 8" preserveAspectRatio="none">
        <path d="M2 4 Q 50 1, 100 4 T 198 3" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ---------- WFFixedHeader — iOS NavigationBar pattern (~44pt) ----------
// Renders a fixed top bar with optional left/right actions and a centered title or segmented control.
// Pass `title` for a regular nav bar, or `segmented={[...labels]}` + `segmentedActive={i}` for a segmented title.
function WFFixedHeader({ title, left, right, segmented, segmentedActive = 0, dark = false }) {
  const C = dark ? WFD : WF;
  const bg = dark ? WFD.paper : WF.paper;
  const border = dark ? WFD.divider : `${WF.inkLight}30`;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 42,
      background: bg, borderBottom: `0.5px solid ${border}`,
      display: 'flex', alignItems: 'center', padding: '0 10px', zIndex: 5,
    }}>
      {/* left slot */}
      <div style={{ minWidth: 44, color: C.blue, fontFamily: C.body, fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center' }}>
        {left}
      </div>
      {/* center: title or segmented */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {segmented ? (
          <div style={{ display: 'flex', background: dark ? WFD.paperWarm : '#e5e5ea', borderRadius: 6, padding: 1.5, minWidth: 130 }}>
            {segmented.map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: '2px 10px', textAlign: 'center', borderRadius: 4.5,
                background: i === segmentedActive ? (dark ? WFD.paperDeep : '#fff') : 'transparent',
                boxShadow: i === segmentedActive ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
                fontFamily: C.body, fontSize: 11, fontWeight: i === segmentedActive ? 600 : 500,
                color: C.ink, whiteSpace: 'nowrap',
              }}>{s}</div>
            ))}
          </div>
        ) : (
          <div style={{ fontFamily: C.body, fontSize: 14, fontWeight: 600, color: C.ink, letterSpacing: -0.2 }}>{title}</div>
        )}
      </div>
      {/* right slot */}
      <div style={{ minWidth: 44, color: C.blue, fontFamily: C.body, fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </div>
  );
}

Object.assign(window, { WF, WFD, WFPhone, WFCell, WFNote, WFTabBar, WFHeader, WFSectionTitle, WFFixedHeader, HandRect });
