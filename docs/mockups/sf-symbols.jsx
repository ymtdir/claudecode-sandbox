/* global React */
// ─────────────────────────────────────────────────────────────
// SF Symbols 風アイコン（ワイヤーフレーム用近似 SVG）
//
// SF Symbols は Apple のフォントなので Web から直接利用できない。
// ここでは SwiftUI 実装時に Image(systemName: "<name>") で
// そのまま置き換えられるように、各 SVG に
//   data-sf-symbol="<canonical SF Symbol name>"
// を付与している。
//
// デフォルトは Regular weight（stroke 1.5/24, round caps）。
// ─────────────────────────────────────────────────────────────

function SF({ name, size = 18, color = 'currentColor', weight = 1.5, fill = false, style }) {
  const s = size;
  const sw = weight;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    'data-sf-symbol': name, style,
  };

  // path generator per symbol name
  switch (name) {
    // navigation / actions
    case 'checkmark':
      return <svg {...common}><path d="M5 12.5l4.5 4.5L19 7"/></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'pencil':
      return <svg {...common}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>;
    case 'square.and.pencil':
      return <svg {...common}><path d="M16 3h-9a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8"/><path d="M14 3l7 7-9 9H5v-7l9-9z"/><path d="M13 4l7 7"/></svg>;
    case 'slider.horizontal.3':
      return <svg {...common}><path d="M3 7h18M3 12h18M3 17h18"/><circle cx="9" cy="7" r="2" fill={fill ? color : '#fff'} /><circle cx="15" cy="12" r="2" fill={fill ? color : '#fff'} /><circle cx="7" cy="17" r="2" fill={fill ? color : '#fff'} /></svg>;
    case 'chevron.left':
      return <svg {...common}><path d="M15 5l-7 7 7 7"/></svg>;
    case 'chevron.right':
      return <svg {...common}><path d="M9 5l7 7-7 7"/></svg>;
    case 'chevron.right.small':
      return <svg {...common} viewBox="0 0 12 24"><path d="M4 8l4 4-4 4"/></svg>;
    case 'xmark':
      return <svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'ellipsis':
      return <svg {...common}><circle cx="6" cy="12" r="1.2" fill={color} stroke="none"/><circle cx="12" cy="12" r="1.2" fill={color} stroke="none"/><circle cx="18" cy="12" r="1.2" fill={color} stroke="none"/></svg>;

    // tabs
    case 'plus.circle':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M7.5 12h9"/></svg>;
    case 'calendar':
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'chart.pie':
      return <svg {...common}><path d="M12 3v9h9"/><path d="M21 12a9 9 0 11-9-9"/></svg>;
    case 'chart.bar':
      return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case 'dollarsign.circle':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M9 9.5h4a1.8 1.8 0 010 3.6h-2a1.8 1.8 0 000 3.6h4"/></svg>;
    case 'gearshape':
      return <svg {...common}><path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/><path d="M19.4 13.5a7.6 7.6 0 000-3l2.1-1.6-2-3.4-2.5.9a7.6 7.6 0 00-2.6-1.5L14 2h-4l-.4 2.9a7.6 7.6 0 00-2.6 1.5l-2.5-.9-2 3.4 2.1 1.6a7.6 7.6 0 000 3l-2.1 1.6 2 3.4 2.5-.9a7.6 7.6 0 002.6 1.5L10 22h4l.4-2.9a7.6 7.6 0 002.6-1.5l2.5.9 2-3.4-2.1-1.6z"/></svg>;

    // categories
    case 'fork.knife':
      return <svg {...common}><path d="M7 3v8M7 11v10M5 3v5a2 2 0 002 2M9 3v5a2 2 0 01-2 2"/><path d="M16 3c-1.5 1.5-2 3.5-2 5.5 0 1.7.8 2.8 2 3.2V21"/></svg>;
    case 'tram.fill':
      return <svg {...common}><rect x="5" y="3" width="14" height="14" rx="2.5"/><path d="M5 11h14M9 17l-2 4M15 17l2 4"/><circle cx="9" cy="14" r="0.9" fill={color} stroke="none"/><circle cx="15" cy="14" r="0.9" fill={color} stroke="none"/></svg>;
    case 'cart':
      return <svg {...common}><path d="M3 5h2.5l2.5 11h11l2-7H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>;
    case 'gamecontroller':
      return <svg {...common}><path d="M7 8h10a4 4 0 014 4v2a4 4 0 01-7 2.8L13 16h-2l-1 .8A4 4 0 013 14v-2a4 4 0 014-4z"/><path d="M7 12h2M8 11v2"/><circle cx="16" cy="12" r="0.8" fill={color} stroke="none"/><circle cx="18" cy="14" r="0.8" fill={color} stroke="none"/></svg>;
    case 'tshirt':
      return <svg {...common}><path d="M8 3l4 2 4-2 4 4-3 2v11H7V9L4 7l4-4z"/></svg>;
    case 'cross.case':
      return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M12 11v6M9 14h6"/></svg>;
    case 'bolt':
      return <svg {...common}><path d="M13 3l-7 11h5l-1 7 7-11h-5l1-7z"/></svg>;

    // settings rows
    case 'tag':
      return <svg {...common}><path d="M3 11V4h7l11 11-7 7L3 11z"/><circle cx="8" cy="8" r="1.2"/></svg>;
    case 'repeat':
      return <svg {...common}><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>;

    default:
      // unknown — render a subtle question mark in a circle
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 .5c0 1.5-2.5 1.8-2.5 3.5M12 17v.01"/></svg>;
  }
}

Object.assign(window, { SF });
