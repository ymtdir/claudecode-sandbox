// wf-spec-screens-dark.jsx — ダークモード版 S-01〜S-05

// 5タブのバー（ダーク版）
function WFTabBar5Dark({ active = 0 }) {
  const names = ['plus.circle', 'calendar', 'chart.pie', 'dollarsign.circle', 'gearshape'];
  const labels = ['入力', 'カレンダー', 'レポート', '予算', '設定'];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTop: `0.5px solid ${WFD.divider}`,
      display: 'flex', justifyContent: 'space-around',
      padding: '5px 0 4px', background: 'rgba(28,28,30,0.92)',
      backdropFilter: 'blur(20px)',
    }}>
      {labels.map((t, i) => {
        const c = i === active ? WFD.blue : WFD.inkLight;
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
            <SF name={names[i]} size={20} color={c} weight={1.6} />
            <div style={{ fontFamily: WFD.body, fontSize: 9, fontWeight: 500, color: c }}>{t}</div>
          </div>
        );
      })}
    </div>
  );
}

// ダーク用ヘッダ
function WFHeaderDark({ left, right, title, subtitle, padX = 14 }) {
  return (
    <div style={{ padding: `8px ${padX}px 6px` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 22 }}>
        <div style={{ fontFamily: WFD.body, fontSize: 14, color: WFD.blue, fontWeight: 500 }}>{left}</div>
        <div style={{ fontFamily: WFD.body, fontSize: 14, color: WFD.blue, fontWeight: 500 }}>{right}</div>
      </div>
      <div style={{ marginTop: 4 }}>
        <div style={{ fontFamily: WFD.body, fontSize: 22, fontWeight: 700, letterSpacing: -0.4, color: WFD.ink }}>{title}</div>
        {subtitle && <div style={{ fontFamily: WFD.body, fontSize: 12, color: WFD.inkSoft, marginTop: 2 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-01 入力タブ（ダーク）
// ─────────────────────────────────────────────────────────────
function S01_InputDark() {
  const keys = ['1','2','3','4','5','6','7','8','9','000','0','⌫'];
  const checkIcon = <SF name="square.and.pencil" size={18} color={WFD.blue} weight={1.8} />;
  return (
    <div style={{ background: WFD.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42, color: WFD.ink }}>
      <WFFixedHeader dark segmented={['支出','収入']} segmentedActive={0} right={checkIcon} />
      {/* day switcher: ‹  2026年 4月 1日  ›  */}
      <div style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.left" size={18} color={WFD.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WFD.body, color: WFD.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月1日</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.right" size={18} color={WFD.blue} weight={2.2} />
        </div>
      </div>
      {/* fields card: type/amount + memo */}
      <div style={{ background: WFD.paperWarm, margin: '0 12px 10px', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px',
          borderBottom: `0.5px solid ${WFD.divider}`, fontFamily: WFD.body }}>
          <div style={{ color: WFD.ink, fontSize: 13, fontWeight: 500 }}>支出</div>
          <div style={{ color: WFD.ink, fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>¥0</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px',
          fontFamily: WFD.body, fontSize: 13 }}>
          <div style={{ color: WFD.ink }}>メモ</div>
          <div style={{ color: WFD.inkLight }}>—</div>
        </div>
      </div>
      {/* category icon grid */}
      <div style={{ margin: '0 12px 8px', padding: '8px 6px', background: WFD.paperWarm, borderRadius: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
          {[
            { k: 'food', label: '食費', sf: 'fork.knife', color: '#ff9f0a', selected: true },
            { k: 'transit', label: '交通', sf: 'tram.fill', color: WFD.blue },
            { k: 'daily', label: '日用品', sf: 'cart', color: WFD.green },
            { k: 'fun', label: '娯楽', sf: 'gamecontroller', color: '#bf5af2' },
            { k: 'cloth', label: '衣類', sf: 'tshirt', color: '#64d2ff' },
            { k: 'med', label: '医療', sf: 'cross.case', color: WFD.red },
            { k: 'util', label: '光熱費', sf: 'bolt', color: '#ffd60a' },
            { k: 'other', label: 'その他', sf: 'ellipsis', color: WFD.inkSoft },
          ].map((c) => (
            <div key={c.k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '5px 0' }}>
              <div style={{ width: 32, height: 32, borderRadius: 16,
                background: c.selected ? c.color : `${c.color}33`,
                color: c.selected ? '#000' : c.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: c.selected ? `1.5px solid ${c.color}` : 'none' }}>
                <SF name={c.sf} size={18} color="currentColor" weight={1.6} />
              </div>
              <div style={{ fontFamily: WFD.body, fontSize: 9, color: c.selected ? WFD.ink : WFD.inkSoft, fontWeight: c.selected ? 600 : 400 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* numpad — appears only when amount is being entered */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 12px' }}>
        {keys.map((k, i) => (
          <div key={i} style={{
            padding: '7px 0', textAlign: 'center', background: WFD.paperWarm, borderRadius: 7,
            fontFamily: WFD.body, fontSize: 16, color: WFD.ink, fontWeight: 500,
          }}>{k}</div>
        ))}
      </div>
      <WFTabBar5Dark active={0} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-02 カレンダー（ダーク）
// ─────────────────────────────────────────────────────────────
function S02_CalendarDark() {
  const sample = {
    1: { amount: 1200 }, 3: { amount: 3200 }, 5: { amount: 280 },
    7: { amount: 4500 }, 10: { amount: 250000, type: 'income' },
    12: { amount: 1850 }, 15: { amount: 4200 }, 18: { amount: 980 },
    19: { amount: 6400 }, 23: { amount: 1100 }, 25: { amount: 5800 },
    28: { amount: 3360 },
  };
  const days = [];
  for (let i = 0; i < 3; i++) days.push(null);
  for (let d = 1; d <= 30; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return (
    <div style={{ background: WFD.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42, color: WFD.ink }}>
      <WFFixedHeader dark title="カレンダー" right={<SF name="plus" size={18} color={WFD.blue} weight={2} />} />
      <div style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.left" size={18} color={WFD.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WFD.body, color: WFD.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.right" size={18} color={WFD.blue} weight={2.2} />
        </div>
      </div>
      <div style={{ margin: '0 12px 6px', padding: '7px 12px', background: WFD.paperWarm, borderRadius: 9,
        display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>支出</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.ink }}>¥38,420</div>
        </div>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>収入</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.green }}>¥250,000</div>
        </div>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>差額</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.blue }}>+¥211,580</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 8px 1px' }}>
        {['日','月','火','水','木','金','土'].map((h, i) => (
          <div key={i} style={{ fontFamily: WFD.body, fontSize: 9,
            color: i === 0 ? WFD.red : i === 6 ? WFD.blue : WFD.inkLight,
            textAlign: 'center' }}>{h}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 8px', rowGap: 1 }}>
        {days.map((d, i) => {
          if (d == null) return <div key={i} style={{ height: 30 }} />;
          const dow = i % 7;
          const data = sample[d];
          const isSelected = d === 28;
          return (
            <div key={i} style={{ height: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
              <div style={{
                width: 20, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 9, background: isSelected ? WFD.accent : 'transparent',
                color: isSelected ? '#fff' : (dow === 0 ? WFD.red : dow === 6 ? WFD.blue : WFD.ink),
                fontFamily: WFD.body, fontSize: 11, fontWeight: isSelected ? 600 : 500,
              }}>{d}</div>
              {data && (
                <div style={{ fontFamily: WFD.body, fontSize: 8,
                  color: data.type === 'income' ? WFD.green : WFD.inkSoft, marginTop: 0 }}>
                  {data.type === 'income' ? '+' : ''}{data.amount > 9999 ? Math.round(data.amount/1000)+'k' : data.amount}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ height: 0.5, background: WFD.divider, margin: '8px 14px 6px' }} />
      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <div style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.ink, fontWeight: 600 }}>4月28日 火曜</div>
          <div style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.inkSoft }}>合計 ¥3,360</div>
        </div>
        {[
          { c: '食費', m: 'スーパー', a: 2400 },
          { c: '交通費', m: '電車', a: 380 },
          { c: '食費', m: 'コンビニ', a: 580 },
        ].map((r, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '6px 0',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WFD.divider}` : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: WFD.ink, marginRight: 8 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: WFD.body, fontSize: 12, color: WFD.ink }}>{r.m}</div>
              <div style={{ fontFamily: WFD.body, fontSize: 9, color: WFD.inkSoft }}>{r.c}</div>
            </div>
            <div style={{ fontFamily: WFD.body, fontSize: 12, color: WFD.ink, fontWeight: 500 }}>¥{r.a.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <WFTabBar5Dark active={1} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-03 レポート（ダーク）
// ─────────────────────────────────────────────────────────────
function S03_ReportDark() {
  const breakdown = [
    { c: '食費', a: 18400, p: 0.48, color: '#ff9f0a' },     // systemOrange (Dark)
    { c: '交通費', a: 8200, p: 0.21, color: WFD.blue },
    { c: '娯楽', a: 5800, p: 0.15, color: '#bf5af2' },       // systemPurple (Dark)
    { c: '日用品', a: 3620, p: 0.09, color: WFD.green },
    { c: 'その他', a: 2400, p: 0.07, color: WFD.inkSoft },
  ];
  const C = 2 * Math.PI * 32;
  let offset = 0;
  return (
    <div style={{ background: WFD.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42, color: WFD.ink }}>
      <WFFixedHeader dark segmented={['月間','年間']} segmentedActive={0} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.left" size={18} color={WFD.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WFD.body, color: WFD.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.right" size={18} color={WFD.blue} weight={2.2} />
        </div>
      </div>
      <div style={{ margin: '0 12px 8px', padding: '7px 12px', background: WFD.paperWarm, borderRadius: 9,
        display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>支出</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.ink }}>¥38,420</div>
        </div>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>収入</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.green }}>¥250,000</div>
        </div>
        <div>
          <div style={{ fontFamily: WFD.body, fontSize: 8, color: WFD.inkSoft, letterSpacing: 0.3 }}>差額</div>
          <div style={{ fontFamily: WFD.body, fontSize: 12, fontWeight: 600, color: WFD.blue }}>+¥211,580</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 10px' }}>
        <svg width="120" height="120" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke={WFD.paperWarm} strokeWidth="14" />
          {breakdown.map((b, i) => {
            const len = b.p * C;
            const seg = (
              <circle key={i} cx="40" cy="40" r="32" fill="none"
                stroke={b.color} strokeWidth="14"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 40 40)" />
            );
            offset += len;
            return seg;
          })}
          <text x="40" y="40" textAnchor="middle" fontFamily={WFD.body} fontSize="9" fill={WFD.inkSoft}>支出</text>
          <text x="40" y="51" textAnchor="middle" fontFamily={WFD.body} fontSize="9" fontWeight="600" fill={WFD.ink}>¥38,420</text>
        </svg>
      </div>
      <div style={{ background: WFD.paperWarm, margin: '0 12px', borderRadius: 10, padding: '4px 0' }}>
        {breakdown.map((r, i, arr) => (
          <div key={i} style={{ padding: '7px 12px',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WFD.divider}` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 9, height: 9, borderRadius: 2, background: r.color }} />
                <span style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.ink }}>{r.c}</span>
                <span style={{ fontFamily: WFD.body, fontSize: 9, color: WFD.inkSoft }}>{Math.round(r.p*100)}%</span>
              </div>
              <span style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.ink, fontWeight: 500 }}>¥{r.a.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <WFTabBar5Dark active={2} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-04 予算（ダーク）
// ─────────────────────────────────────────────────────────────
function S04_BudgetDark() {
  return (
    <div style={{ background: WFD.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42, color: WFD.ink }}>
      <WFFixedHeader dark title="予算" right={<SF name="slider.horizontal.3" size={18} color={WFD.blue} weight={1.8} />} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.left" size={18} color={WFD.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WFD.body, color: WFD.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WFD.blue }}>
          <SF name="chevron.right" size={18} color={WFD.blue} weight={2.2} />
        </div>
      </div>
      <div style={{ margin: '0 12px 10px', background: WFD.paperWarm, borderRadius: 10, padding: '11px 14px' }}>
        <div style={{ fontFamily: WFD.body, fontSize: 9, color: WFD.inkSoft, fontWeight: 600, letterSpacing: 0.3, marginBottom: 4 }}>全体予算</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
          <span style={{ fontFamily: WFD.body, fontSize: 18, fontWeight: 700, color: WFD.ink }}>¥38,420</span>
          <span style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.inkSoft }}>/ ¥80,000</span>
        </div>
        <div style={{ height: 6, background: WFD.paperDeep, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: '48%', height: '100%', background: WFD.green, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontFamily: WFD.body, fontSize: 9, color: WFD.inkSoft }}>
          <span>消化 48%</span><span>残り ¥41,580</span>
        </div>
      </div>
      <div style={{ padding: '4px 16px 4px', fontFamily: WFD.body, fontSize: 9, color: WFD.inkSoft, fontWeight: 600, letterSpacing: 0.3 }}>カテゴリ別</div>
      <div style={{ background: WFD.paperWarm, margin: '0 12px', borderRadius: 10, padding: '4px 0' }}>
        {[
          { c: '食費', s: 18400, b: 25000, color: '#ff9f0a' },
          { c: '交通費', s: 8200, b: 8000, color: WFD.blue },
          { c: '娯楽', s: 5800, b: 10000, color: '#bf5af2' },
          { c: '日用品', s: 3620, b: 5000, color: WFD.green },
        ].map((r, i, arr) => {
          const p = Math.min(1.2, r.s / r.b);
          const over = r.s > r.b;
          return (
            <div key={i} style={{ padding: '8px 12px',
              borderBottom: i < arr.length - 1 ? `0.5px solid ${WFD.divider}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                <span style={{ fontFamily: WFD.body, fontSize: 11, color: WFD.ink, fontWeight: 500 }}>{r.c}</span>
                <span style={{ fontFamily: WFD.body, fontSize: 10, color: over ? WFD.red : WFD.inkSoft }}>
                  ¥{r.s.toLocaleString()} <span style={{ color: WFD.inkLight }}>/ ¥{r.b.toLocaleString()}</span>
                </span>
              </div>
              <div style={{ height: 4, background: WFD.paperDeep, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, p * 100)}%`, height: '100%',
                  background: over ? WFD.red : r.color }} />
              </div>
              {over && <div style={{ fontFamily: WFD.body, fontSize: 9, color: WFD.red, marginTop: 2 }}>⚠ 超過 ¥{(r.s - r.b).toLocaleString()}</div>}
            </div>
          );
        })}
      </div>
      <WFTabBar5Dark active={3} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-05 設定（ダーク・カテゴリ管理＋固定費の設定 のみ）
// ─────────────────────────────────────────────────────────────
function S05_SettingsDark() {
  return (
    <div style={{ background: WFD.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42, color: WFD.ink }}>
      <WFFixedHeader dark title="設定" />
      <div style={{ background: WFD.paperWarm, margin: '12px 12px 0', borderRadius: 10, overflow: 'hidden' }}>
        {[
          { l: '予算の設定', v: '¥80,000 / 月', i: 'budget' },
          { l: 'カテゴリ管理', v: '6 項目', i: 'tag' },
          { l: '固定費の設定', v: '3 件', i: 'repeat' },
        ].map((it, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px 14px',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WFD.divider}` : 'none',
            fontFamily: WFD.body, fontSize: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6,
              background: it.i === 'tag' ? '#ff9f0a' : it.i === 'budget' ? WFD.green : WFD.blue,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: 12, color: '#fff' }}>
              {it.i === 'tag' ? (
                <SF name="tag" size={14} color="currentColor" weight={1.8} />
              ) : it.i === 'budget' ? (
                <SF name="dollarsign.circle" size={14} color="currentColor" weight={1.8} />
              ) : (
                <SF name="repeat" size={14} color="currentColor" weight={1.8} />
              )}
            </div>
            <span style={{ flex: 1, color: WFD.ink, whiteSpace: 'nowrap' }}>{it.l}</span>
            <span style={{ color: WFD.inkSoft, marginRight: 6, fontSize: 13, whiteSpace: 'nowrap' }}>{it.v}</span>
            <SF name="chevron.right" size={11} color={WFD.inkLight} weight={2} />
          </div>
        ))}
      </div>
      <WFTabBar5Dark active={4} />
    </div>
  );
}

Object.assign(window, { S01_InputDark, S02_CalendarDark, S03_ReportDark, S04_BudgetDark, S05_SettingsDark });
