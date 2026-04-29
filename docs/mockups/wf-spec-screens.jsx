// wf-spec-screens.jsx — 基本設計書に沿った画面のワイヤーフレーム
// S-01 入力 / S-02 カレンダー(上下分割) / S-03 レポート / S-04 予算 / S-05 設定 / S-07 カテゴリ管理

const TABS5 = ['入力', 'カレンダー', 'レポート', '予算', '設定'];

// 5タブのバー（アイコン枠＋ラベル）
function WFTabBar5({ active = 0 }) {
  const names = ['plus.circle', 'calendar', 'chart.pie', 'dollarsign.circle', 'gearshape'];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTop: `0.5px solid ${WF.inkLight}`,
      display: 'flex', justifyContent: 'space-around',
      padding: '5px 0 4px', background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(20px)',
    }}>
      {TABS5.map((t, i) => {
        const c = i === active ? WF.blue : WF.inkLight;
        return (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            flex: 1,
          }}>
            <SF name={names[i]} size={20} color={c} weight={1.6} />
            <div style={{ fontFamily: WF.body, fontSize: 9, fontWeight: 500, color: c }}>{t}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-01 入力タブ（デフォルト日付＝今日）
// ─────────────────────────────────────────────────────────────
function S01_Input() {
  const keys = ['1','2','3','4','5','6','7','8','9','000','0','⌫'];
  const checkIcon = <SF name="square.and.pencil" size={18} color={WF.blue} weight={1.8} />;
  // category icons (8 = 4×2)
  const cats = [
    { k: 'food', label: '食費', sf: 'fork.knife', color: '#ff9500', selected: true },
    { k: 'transit', label: '交通', sf: 'tram.fill', color: WF.blue },
    { k: 'daily', label: '日用品', sf: 'cart', color: WF.green },
    { k: 'fun', label: '娯楽', sf: 'gamecontroller', color: '#af52de' },
    { k: 'cloth', label: '衣類', sf: 'tshirt', color: '#5ac8fa' },
    { k: 'med', label: '医療', sf: 'cross.case', color: WF.red },
    { k: 'util', label: '光熱費', sf: 'bolt', color: '#ffcc00' },
    { k: 'other', label: 'その他', sf: 'ellipsis', color: WF.inkSoft },
  ];
  return (
    <div style={{ background: WF.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42 }}>
      <WFFixedHeader segmented={['支出','収入']} segmentedActive={0} right={checkIcon} />
      {/* day switcher */}
      <div style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.left" size={18} color={WF.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WF.body, color: WF.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月1日</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.right" size={18} color={WF.blue} weight={2.2} />
        </div>
      </div>
      {/* fields card: type/amount + memo */}
      <div style={{ background: '#fff', margin: '0 12px 10px', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px',
          borderBottom: `0.5px solid ${WF.inkLight}30`, fontFamily: WF.body }}>
          <div style={{ color: WF.ink, fontSize: 13, fontWeight: 500 }}>支出</div>
          <div style={{ color: WF.ink, fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>¥0</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px',
          fontFamily: WF.body, fontSize: 13 }}>
          <div style={{ color: WF.ink }}>メモ</div>
          <div style={{ color: WF.inkLight }}>—</div>
        </div>
      </div>
      {/* category icon grid */}
      <div style={{ margin: '0 12px 8px', padding: '8px 6px', background: '#fff', borderRadius: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
          {cats.map((c) => (
            <div key={c.k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '5px 0' }}>
              <div style={{ width: 32, height: 32, borderRadius: 16,
                background: c.selected ? c.color : `${c.color}22`,
                color: c.selected ? '#fff' : c.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: c.selected ? `1.5px solid ${c.color}` : 'none' }}>
                <SF name={c.sf} size={18} color="currentColor" weight={1.6} />
              </div>
              <div style={{ fontFamily: WF.body, fontSize: 9, color: c.selected ? WF.ink : WF.inkSoft, fontWeight: c.selected ? 600 : 400 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* numpad — appears only when amount is being entered */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 12px' }}>
        {keys.map((k, i) => (
          <div key={i} style={{
            padding: '7px 0', textAlign: 'center', background: '#fff', borderRadius: 7,
            fontFamily: WF.body, fontSize: 16, color: WF.ink, fontWeight: 500,
            boxShadow: '0 1px 2px rgba(0,0,0,.05)',
          }}>{k}</div>
        ))}
      </div>
      <WFTabBar5 active={0} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-02 カレンダータブ（上下分割：上=カレンダー+サマリ / 下=選択日リスト）
// ─────────────────────────────────────────────────────────────
function S02_Calendar() {
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
    <div style={{ background: WF.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42 }}>
      <WFFixedHeader title="カレンダー" right={<SF name="plus" size={18} color={WF.blue} weight={2} />} />
      {/* month switcher: ‹  2026年 4月  ›  */}
      <div style={{ padding: '10px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.left" size={18} color={WF.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WF.body, color: WF.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.right" size={18} color={WF.blue} weight={2.2} />
        </div>
      </div>
      {/* monthly summary */}
      <div style={{ margin: '0 12px 6px', padding: '7px 12px', background: '#fff', borderRadius: 9,
        display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>支出</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.ink }}>¥38,420</div>
        </div>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>収入</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.green }}>¥250,000</div>
        </div>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>差額</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.blue }}>+¥211,580</div>
        </div>
      </div>
      {/* weekday header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 8px 1px' }}>
        {['日','月','火','水','木','金','土'].map((h, i) => (
          <div key={i} style={{ fontFamily: WF.body, fontSize: 9,
            color: i === 0 ? WF.red : i === 6 ? WF.blue : WF.inkLight,
            textAlign: 'center' }}>{h}</div>
        ))}
      </div>
      {/* grid (compact, top half) */}
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
                borderRadius: 9, background: isSelected ? WF.accent : 'transparent',
                color: isSelected ? '#fff' : (dow === 0 ? WF.red : dow === 6 ? WF.blue : WF.ink),
                fontFamily: WF.body, fontSize: 11, fontWeight: isSelected ? 600 : 500,
              }}>{d}</div>
              {data && (
                <div style={{ fontFamily: WF.body, fontSize: 8,
                  color: data.type === 'income' ? WF.green : WF.inkSoft, marginTop: 0 }}>
                  {data.type === 'income' ? '+' : ''}{data.amount > 9999 ? Math.round(data.amount/1000)+'k' : data.amount}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* divider */}
      <div style={{ height: 0.5, background: WF.inkLight, opacity: 0.4, margin: '8px 14px 6px' }} />
      {/* selected day list */}
      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <div style={{ fontFamily: WF.body, fontSize: 11, color: WF.ink, fontWeight: 600 }}>4月28日 火曜</div>
          <div style={{ fontFamily: WF.body, fontSize: 11, color: WF.inkSoft }}>合計 ¥3,360</div>
        </div>
        {[
          { c: '食費', m: 'スーパー', a: 2400 },
          { c: '交通費', m: '電車', a: 380 },
          { c: '食費', m: 'コンビニ', a: 580 },
        ].map((r, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '6px 0',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WF.inkLight}30` : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: WF.ink, marginRight: 8 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: WF.body, fontSize: 12, color: WF.ink }}>{r.m}</div>
              <div style={{ fontFamily: WF.body, fontSize: 9, color: WF.inkSoft }}>{r.c}</div>
            </div>
            <div style={{ fontFamily: WF.body, fontSize: 12, color: WF.ink, fontWeight: 500 }}>¥{r.a.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <WFTabBar5 active={1} />
      {/* annotation: double tap hint */}
      <div style={{ position: 'absolute', top: 90, right: 6, fontFamily: WF.hand, fontSize: 11,
        color: WF.accent, transform: 'rotate(-4deg)', textAlign: 'center', lineHeight: 1.1 }}>
        日付ダブルタップ<br/>→入力シート
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-03 レポートタブ（円グラフ＋カテゴリ別内訳）
// ─────────────────────────────────────────────────────────────
function S03_Report() {
  const breakdown = [
    { c: '食費', a: 18400, p: 0.48, color: '#ff9500' },      // systemOrange
    { c: '交通費', a: 8200, p: 0.21, color: WF.blue },        // systemBlue
    { c: '娯楽', a: 5800, p: 0.15, color: '#af52de' },        // systemPurple
    { c: '日用品', a: 3620, p: 0.09, color: WF.green },       // systemGreen
    { c: 'その他', a: 2400, p: 0.07, color: WF.inkSoft },
  ];
  // donut chart segments via stroke-dasharray
  const C = 2 * Math.PI * 32;
  let offset = 0;
  return (
    <div style={{ background: WF.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42 }}>
      <WFFixedHeader segmented={['月間','年間']} segmentedActive={0} />
      {/* month switcher: ‹  2026年 4月  ›  */}
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.left" size={18} color={WF.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WF.body, color: WF.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.right" size={18} color={WF.blue} weight={2.2} />
        </div>
      </div>
      <div style={{ margin: '0 12px 8px', padding: '7px 12px', background: '#fff', borderRadius: 9,
        display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>支出</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.ink }}>¥38,420</div>
        </div>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>収入</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.green }}>¥250,000</div>
        </div>
        <div>
          <div style={{ fontFamily: WF.body, fontSize: 8, color: WF.inkSoft, letterSpacing: 0.3 }}>差額</div>
          <div style={{ fontFamily: WF.body, fontSize: 12, fontWeight: 600, color: WF.blue }}>+¥211,580</div>
        </div>
      </div>
      {/* donut */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 10px' }}>
        <svg width="120" height="120" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke={WF.paperWarm} strokeWidth="14" />
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
          <text x="40" y="40" textAnchor="middle" fontFamily={WF.body} fontSize="9" fill={WF.inkSoft}>支出</text>
          <text x="40" y="51" textAnchor="middle" fontFamily={WF.body} fontSize="9" fontWeight="600" fill={WF.ink}>¥38,420</text>
        </svg>
      </div>
      {/* breakdown */}
      <div style={{ background: '#fff', margin: '0 12px', borderRadius: 10, padding: '4px 0' }}>
        {breakdown.map((r, i, arr) => (
          <div key={i} style={{ padding: '7px 12px',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WF.inkLight}25` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 9, height: 9, borderRadius: 2, background: r.color }} />
                <span style={{ fontFamily: WF.body, fontSize: 11, color: WF.ink }}>{r.c}</span>
                <span style={{ fontFamily: WF.body, fontSize: 9, color: WF.inkSoft }}>{Math.round(r.p*100)}%</span>
              </div>
              <span style={{ fontFamily: WF.body, fontSize: 11, color: WF.ink, fontWeight: 500 }}>¥{r.a.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <WFTabBar5 active={2} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-04 予算タブ（全体予算＋カテゴリ別予算）
// ─────────────────────────────────────────────────────────────
function S04_Budget() {
  return (
    <div style={{ background: WF.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42 }}>
      <WFFixedHeader title="予算" right={<SF name="slider.horizontal.3" size={18} color={WF.blue} weight={1.8} />} />
      {/* month switcher: ‹  2026年 4月  ›  */}
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.left" size={18} color={WF.blue} weight={2.2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: WF.body, color: WF.ink }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>2026年</span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>4月</span>
        </div>
        <div style={{ width: 36, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WF.blue }}>
          <SF name="chevron.right" size={18} color={WF.blue} weight={2.2} />
        </div>
      </div>
      {/* overall */}
      <div style={{ margin: '0 12px 10px', background: '#fff', borderRadius: 10, padding: '11px 14px' }}>
        <div style={{ fontFamily: WF.body, fontSize: 9, color: WF.inkSoft, fontWeight: 600, letterSpacing: 0.3, marginBottom: 4 }}>全体予算</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
          <span style={{ fontFamily: WF.body, fontSize: 18, fontWeight: 700, color: WF.ink }}>¥38,420</span>
          <span style={{ fontFamily: WF.body, fontSize: 11, color: WF.inkSoft }}>/ ¥80,000</span>
        </div>
        <div style={{ height: 6, background: WF.paperWarm, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: '48%', height: '100%', background: WF.green, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontFamily: WF.body, fontSize: 9, color: WF.inkSoft }}>
          <span>消化 48%</span><span>残り ¥41,580</span>
        </div>
      </div>
      {/* by category */}
      <div style={{ padding: '0 16px 4px', fontFamily: WF.body, fontSize: 9, color: WF.inkSoft, fontWeight: 600, letterSpacing: 0.3 }}>カテゴリ別</div>
      <div style={{ background: '#fff', margin: '0 12px', borderRadius: 10, padding: '4px 0' }}>
        {[
          { c: '食費', s: 18400, b: 25000, color: '#ff9500', status: 'ok' },
          { c: '交通費', s: 8200, b: 8000, color: WF.blue, status: 'over' },
          { c: '娯楽', s: 5800, b: 10000, color: '#af52de', status: 'ok' },
          { c: '日用品', s: 3620, b: 5000, color: WF.green, status: 'ok' },
        ].map((r, i, arr) => {
          const p = Math.min(1.2, r.s / r.b);
          const over = r.s > r.b;
          return (
            <div key={i} style={{ padding: '8px 12px',
              borderBottom: i < arr.length - 1 ? `0.5px solid ${WF.inkLight}25` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                <span style={{ fontFamily: WF.body, fontSize: 11, color: WF.ink, fontWeight: 500 }}>{r.c}</span>
                <span style={{ fontFamily: WF.body, fontSize: 10, color: over ? WF.red : WF.inkSoft }}>
                  ¥{r.s.toLocaleString()} <span style={{ color: WF.inkLight }}>/ ¥{r.b.toLocaleString()}</span>
                </span>
              </div>
              <div style={{ height: 4, background: WF.paperWarm, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, p * 100)}%`, height: '100%',
                  background: over ? WF.red : r.color }} />
              </div>
              {over && <div style={{ fontFamily: WF.body, fontSize: 9, color: WF.red, marginTop: 2 }}>⚠ 超過 ¥{(r.s - r.b).toLocaleString()}</div>}
            </div>
          );
        })}
      </div>
      <WFTabBar5 active={3} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S-05 設定タブ（カテゴリ管理 + 固定費の設定 のみ）
// ─────────────────────────────────────────────────────────────
function S05_Settings() {
  return (
    <div style={{ background: WF.paper, height: '100%', position: 'relative', paddingBottom: 50, paddingTop: 42 }}>
      <WFFixedHeader title="設定" />
      <div style={{ background: '#fff', margin: '12px 12px 0', borderRadius: 10, overflow: 'hidden' }}>
        {[
          { l: '予算の設定', v: '¥80,000 / 月', i: 'budget' },
          { l: 'カテゴリ管理', v: '6 項目', i: 'tag' },
          { l: '固定費の設定', v: '3 件', i: 'repeat' },
        ].map((it, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px 14px',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${WF.inkLight}30` : 'none',
            fontFamily: WF.body, fontSize: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6,
              background: it.i === 'tag' ? '#ff9500' : it.i === 'budget' ? WF.green : WF.blue,
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
            <span style={{ flex: 1, color: WF.ink, whiteSpace: 'nowrap' }}>{it.l}</span>
            <span style={{ color: WF.inkSoft, marginRight: 6, fontSize: 13, whiteSpace: 'nowrap' }}>{it.v}</span>
            <SF name="chevron.right" size={11} color={WF.inkLight} weight={2} />
          </div>
        ))}
      </div>
      <WFTabBar5 active={4} />
    </div>
  );
}

Object.assign(window, { S01_Input, S02_Calendar, S03_Report, S04_Budget, S05_Settings, WFTabBar5 });
