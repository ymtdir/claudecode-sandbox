# DESIGN.md — iOS HIG（日本語アプリ）

> SwiftUI / UIKit で作る iOS ネイティブアプリ向けデザイン仕様書。
> Apple Human Interface Guidelines（HIG）と iOS 標準アプリ（カレンダー / メモ / リマインダー / 株価 等）の挙動を基準に整理。
> 元の Apple Japan Web 版 DESIGN.md とは**別物**（Webサイトのスタイルではなく、iOS アプリ内のスタイル）。

**視覚原本**: 本書のトークン・原則を画面に落とした成果物が [docs/mockups/家計簿ワイヤーフレーム.html](docs/mockups/家計簿ワイヤーフレーム.html)。Light / Dark × S-01〜S-05 を一覧できる。詳細は [docs/mockups/README.md](docs/mockups/README.md)。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: iOS 標準アプリ（カレンダー / メモ / リマインダー / 設定 / 株価）と並べて違和感がないこと。独自の装飾を最小化し、**システムが提供する素材**（systemカラー、SF Symbols、Dynamic Type）に寄せる
- **密度**: 中。リスト中心の画面では cell の min height は 44pt、フォーム系は inset grouped で余白を取る
- **キーワード**: クリア、整理、システム標準、ライト/ダーク両対応、Dynamic Type 対応
- **日本語アプリの特徴**: テキストが英語より縦に長くなりやすいため、cell の高さは可変（`UITableView.automaticDimension` / SwiftUI は自動）。truncation よりも折り返しを優先

---

## 2. Color Palette & Roles

> ハードコードした色は使わず、**システムカラー（semantic color）** を使用すること。これによりライト/ダーク、アクセシビリティ（高コントラスト）に自動追従する

### 2.1 ラベル色（テキスト）

| 用途               | SwiftUI      | UIKit              | Light            | Dark             |
| ------------------ | ------------ | ------------------ | ---------------- | ---------------- |
| 本文・主要テキスト | `.primary`   | `.label`           | `#000000` α=0.85 | `#FFFFFF` α=0.85 |
| 補助テキスト       | `.secondary` | `.secondaryLabel`  | `#3C3C43` α=0.60 | `#EBEBF5` α=0.60 |
| 弱め               | —            | `.tertiaryLabel`   | `#3C3C43` α=0.30 | `#EBEBF5` α=0.30 |
| プレースホルダ     | —            | `.quaternaryLabel` | `#3C3C43` α=0.18 | `#EBEBF5` α=0.16 |

### 2.2 背景色

| 用途                         | SwiftUI / UIKit                     | Light     | Dark      |
| ---------------------------- | ----------------------------------- | --------- | --------- |
| アプリの基本背景             | `Color(UIColor.systemBackground)`   | `#FFFFFF` | `#000000` |
| カード等の上に重ねる二次背景 | `.secondarySystemBackground`        | `#F2F2F7` | `#1C1C1E` |
| その上にもう一段             | `.tertiarySystemBackground`         | `#FFFFFF` | `#2C2C2E` |
| グループ化リストの基本       | `.systemGroupedBackground`          | `#F2F2F7` | `#000000` |
| グループ化セルの面           | `.secondarySystemGroupedBackground` | `#FFFFFF` | `#1C1C1E` |

> **使い分け**: フォームや設定画面は **grouped** 系（`Form` / `List(.insetGrouped)`）。一般的な縦スクロール画面は **system** 系。これにより iOS 標準アプリと地が揃う

### 2.3 Fill 色（コントロール塗り）

| 用途                         | SwiftUI / UIKit         |
| ---------------------------- | ----------------------- |
| 大きめの塗り（ボタン背景等） | `.systemFill`           |
| 中（タグ・ピル）             | `.secondarySystemFill`  |
| 小（プログレスバー溝）       | `.tertiarySystemFill`   |
| 極小（テキストフィールド枠） | `.quaternarySystemFill` |

### 2.4 区切り線

- セパレータ: `.separator`（透過込み）／不透明版が必要なら `.opaqueSeparator`

### 2.5 Tint Color（アクセント）

- iOS のシステム tint は **systemBlue**（`#007AFF` / Dark `#0A84FF`）
- アプリ全体のアクセントは `Asset Catalog` で `AccentColor` を設定し、SwiftUI なら `.tint(.accentColor)`
- 本アプリ（家計簿）の tint は **systemBlue を維持**（カレンダー / リマインダーと並べたときに浮かない）

### 2.6 セマンティックな色

| 用途                 | 色                                                         |
| -------------------- | ---------------------------------------------------------- |
| 収入・成功           | `.green`（`#34C759` / Dark `#30D158`）                     |
| 支出超過・警告・削除 | `.red`（`#FF3B30` / Dark `#FF453A`）                       |
| 目立たせたいリンク   | `.blue`（systemBlue）                                      |
| 注意（黄色）         | `.yellow`（`#FFCC00` / Dark `#FFD60A`）                    |
| カテゴリ識別の追加色 | `.orange` `.purple` `.pink` `.teal` `.indigo` を組み合わせ |

> カテゴリ識別など装飾用に色を **増やす場合も systemXxx の中から選ぶ**。`#ff6b3d` のような独自オレンジは避ける

---

## 3. Typography Rules

### 3.1 フォント — Dynamic Type が原則

- **必ず `Font.TextStyle`（SwiftUI）/ `UIFont.TextStyle`（UIKit）を使う**。固定 pt は原則禁止
- システムが自動で **SF Pro**（欧文）+ **ヒラギノ角ゴシック**（和文）+ Dynamic Type のサイズ拡縮を行う

### 3.2 Text Style 一覧（Default サイズ／HIG 準拠）

| Style         | Size (pt) | Weight   | 用途                                      |
| ------------- | --------- | -------- | ----------------------------------------- |
| `largeTitle`  | 34        | Regular  | 大画面の見出し（カレンダー月名など）      |
| `title`       | 28        | Regular  | 画面タイトル（NavigationBar large title） |
| `title2`      | 22        | Regular  | 副見出し                                  |
| `title3`      | 20        | Regular  | カード見出し                              |
| `headline`    | 17        | Semibold | リスト項目の主見出し                      |
| `body`        | 17        | Regular  | 本文                                      |
| `callout`     | 16        | Regular  | 補足本文                                  |
| `subheadline` | 15        | Regular  | サブテキスト                              |
| `footnote`    | 13        | Regular  | 注釈                                      |
| `caption`     | 12        | Regular  | 補助情報                                  |
| `caption2`    | 11        | Regular  | さらに小さい補助                          |

### 3.3 SwiftUI 例

```swift
Text("4月").font(.largeTitle).fontWeight(.bold)
Text("食費").font(.headline)
Text("¥3,360").font(.body).monospacedDigit()  // 数字は等幅digitで桁揃え
Text("3件").font(.footnote).foregroundStyle(.secondary)
```

### 3.4 数字（金額）の扱い

- 金額表示は `.monospacedDigit()` を必ず付ける（桁が揃ってチカチカしない）
- フォーマットは `Decimal.formatted(.currency(code: "JPY"))` を使う（`¥3,360` / 小数なし自動）
- 大きな金額の表示は `headline` または `title3` 程度

### 3.5 行間・字間

- **明示指定しない**。iOS のシステムが Dynamic Type サイズに応じて line-height / tracking を自動調整する
- どうしても調整が必要な場合のみ `.lineSpacing()` / `.tracking()` を使い、根拠コメントを残す

### 3.6 日本語タイポグラフィ

- フォント: **ヒラギノ角ゴシック** を OS が自動選択（iOS 9 以降）。`HiraKakuPro` / `Pro N` を直接指定する必要はない
- 禁則処理: iOS 標準の禁則に任せる（`lineBreakMode` のデフォルトで OK）
- 縦書き: 該当なし

### 3.7 数字と日本語の混植

- 「¥3,360」「4月28日」のような表記は和欧文混在。`Text` をそのまま渡せばシステムが SF Pro + ヒラギノで自動合成する
- 日付は `Date.formatted(.dateTime.year().month().day().locale(Locale(identifier: "ja_JP")))` などで Locale に任せる

---

## 4. Component Stylings

### 4.1 ボタン

iOS では **長方形のピル型は使わない**（それは Web の Apple.com）。HIG では：

- **Filled / Plain / Bordered** の3種が標準。SwiftUI の `Button` + `buttonStyle` で十分
- 角丸は **8〜12pt 程度の Continuous Corner**（`RoundedRectangle(cornerRadius: 12, style: .continuous)`）
- 「保存」など navigation bar 内ボタンは tint カラーのテキストのみ（背景なし）

```swift
Button("保存") { … }.buttonStyle(.borderedProminent)   // tint背景の塗り
Button("キャンセル") { … }.buttonStyle(.bordered)        // 薄いfill
Button("削除", role: .destructive) { … }                 // 自動で .red
```

### 4.2 ナビゲーションバー

- `NavigationStack` + `.navigationTitle("…")` ＋ `.navigationBarTitleDisplayMode(.large)` を基本
- 背景は **半透明 + ぼかし**（システムが自動）。手動で `backdrop-filter` を作る必要はない
- 左に戻る、右に保存／編集 — iOS 標準の配置

### 4.3 タブバー

- `TabView { … }` を使う。本アプリは 5 タブ（入力 / カレンダー / レポート / 予算 / 設定）
- アイコンは **SF Symbols** で統一：
  - 入力: `plus.circle.fill`
  - カレンダー: `calendar`
  - レポート: `chart.pie.fill`（または `chart.bar.fill`）
  - 予算: `dollarsign.circle`（または `target`）
  - 設定: `gearshape`
- ラベルは必須。アイコンのみは避ける

### 4.4 リスト・フォーム

- 設定 / カテゴリ管理 / 固定費 → **`Form` または `List(.insetGrouped)`**
- 日別リスト → **`List(.plain)` または `List(.inset)`**
- セルの行は `HStack` + `Spacer()` + 末尾 chevron（`Image(systemName: "chevron.right")` は不要、Navigation で自動付与）

### 4.5 入力（数値キーパッド）

- 金額入力は `TextField` + `.keyboardType(.numberPad)`
- カスタムテンキーを作る場合も、`.systemFill` 系の塗りと SF Pro のサイズに合わせる
- 「000」キーは独自拡張なので明示的に `.bordered` 風に

### 4.6 シート・モーダル

- `.sheet(isPresented:)` を使う。サイズは `.presentationDetents([.medium, .large])` で iOS 純正の半シート（リマインダー新規作成風）が出せる
- 取り扱いハンドルは `.presentationDragIndicator(.visible)`

### 4.7 アイコン

- **SF Symbols** のみ使用。emoji や独自 SVG はカテゴリのアバター以外では避ける
- 重みは `.regular` 基準、強調したいときだけ `.semibold`

---

## 5. Layout Principles

### 5.1 余白・グリッド

- **Safe Area を尊重**：SwiftUI ではデフォルトで尊重される
- 標準の **横余白は 16pt**（iPhone）／ナビバー large title 配下は 20pt
- セクション間の縦余白は **24〜32pt**
- カード内 padding は 12〜16pt

### 5.2 タッチターゲット

- 最小 **44 × 44 pt**（HIG 必須）
- リストセル高さ: 標準 44pt、サブタイトル付き 56〜60pt

### 5.3 コンテンツ幅

- iPhone は基本 1 カラム
- iPad では `NavigationSplitView` を使い、サイドバー（マスター）+ ディテールの 2 カラムが標準
- 本アプリは Phase 1 で iPhone のみ

---

## 6. Depth & Elevation

- iOS は基本フラット。**カードに影をつけない**（システムは material と blur で奥行きを出す）
- 必要なら `Material` を使う：
  - `.background(.regularMaterial)` — リーガル（タブバー風）
  - `.background(.thinMaterial)` — シート上の薄ぼかし
- カスタム shadow は使わない。どうしても必要なら `shadow(color: .black.opacity(0.08), radius: 8, y: 2)` 程度に留める

---

## 7. Do's and Don'ts

### Do（推奨）

- **systemカラー / セマンティックカラーを使う**（`.primary` `.secondary` `Color(.systemGroupedBackground)` 等）。ハードコードした hex は asset catalog の AccentColor 以外で避ける
- **Dynamic Type 対応**（`.font(.body)` 等の TextStyle を使う）
- **SF Symbols でアイコン統一**
- **金額には `.monospacedDigit()`**
- **半シート（`.presentationDetents`）** を入力モーダルに使い、iOS 純正の体験に揃える
- **`Form` / `List(.insetGrouped)`** を設定系に使う
- ライト / ダーク両対応 — Asset Catalog の `Any Appearance / Dark` で色を分ける

### Don't（禁止）

- **ピル型（`cornerRadius: 980`）ボタンを使わない**。それは Apple.com Web の流儀。iOS では 8〜12pt の Continuous Corner
- **独自カラー（`#ff6b3d` 等）を散らかさない**。systemOrange / systemPink などから選ぶ
- **固定 pt のフォントサイズを多用しない**。Dynamic Type が崩れる
- **SF Pro Display / SF Pro Text を直接指定しない**。iOS が Text Style から自動選択する
- **Web由来の `backdrop-filter: blur()` を CSS 風に書かない**。SwiftUI は `Material` を使う
- **`.font(.system(size: 12))` のような固定指定は最終手段**。原則 `.caption` などを使う

---

## 8. Responsive Behavior

### Size Class

- iPhone Portrait: `compact × regular`（基本）
- iPhone Landscape: `compact × compact`（小型機）／`regular × compact`（Pro Max）
- iPad: `regular × regular`

### Phase 1 のスコープ

- iPhone（縦持ち）のみ最適化
- iPad / Landscape は Auto Layout に任せる（崩れなければOK）

### Dark Mode

- 自動追従。`@Environment(\.colorScheme)` で必要時に分岐
- 意図的にライト固定したい画面はないため、`.preferredColorScheme()` は使わない

### Dynamic Type

- 最低 `large`（デフォルト）から `accessibility5` までで崩れないこと
- 金額が画面に収まらないときは折返しではなく `.minimumScaleFactor(0.7)` で縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Tint:           Color.accentColor (= systemBlue 推奨)
Text Primary:   .primary
Text Secondary: .secondary
Background:     Color(.systemBackground)        // 白 / 黒
Grouped BG:     Color(.systemGroupedBackground) // 設定画面用
Card BG:        Color(.secondarySystemGroupedBackground)
Separator:      Color(.separator)

Income (収入):  .green        (systemGreen)
Expense Over:   .red          (systemRed)
Warn:           .yellow       (systemYellow)

Font Body:      .font(.body)
Font Heading:   .font(.title2).fontWeight(.semibold)
Font Money:     .font(.headline).monospacedDigit()
Font Caption:   .font(.footnote).foregroundStyle(.secondary)

Corner Radius:  10〜12 (continuous)
Tap Target:     ≥ 44×44 pt
Horizontal Pad: 16 pt
Tab Bar Icons:  SF Symbols only
Modal:          .sheet + .presentationDetents([.medium, .large])
                + .presentationDragIndicator(.visible)
```

### プロンプト例

```
iOS HIG に従って、SwiftUI で家計簿アプリの XX 画面を作ってください。
- カラー: systemカラー（.primary / .secondary / systemGroupedBackground）のみ使用
- ハードコードのhex は禁止（Asset Catalog 経由の AccentColor のみ可）
- フォント: Dynamic Type の TextStyle（.body / .headline / .footnote 等）
- 金額表示は Decimal.formatted(.currency(code: "JPY")) + .monospacedDigit()
- アイコンは SF Symbols
- タブバー 5項目: 入力(plus.circle.fill) / カレンダー(calendar) / レポート(chart.pie.fill) / 予算(dollarsign.circle) / 設定(gearshape)
- リスト系画面は Form または List(.insetGrouped)
- 入力モーダルは .sheet + .presentationDetents([.medium, .large])
- ライト/ダーク両対応（自動）
- 角丸 10〜12pt continuous、ピル型は使わない
```

### SwiftUI スニペット集

```swift
// 金額表示
Text(amount, format: .currency(code: "JPY"))
    .font(.headline)
    .monospacedDigit()

// グループ化リスト（設定画面）
Form {
    Section {
        NavigationLink("カテゴリ管理") { CategoryListView() }
        NavigationLink("固定費の設定") { FixedExpenseListView() }
    }
}

// 半シートで入力
.sheet(isPresented: $showInput) {
    InputView()
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
}

// プログレスバー（予算消化）
ProgressView(value: spent, total: budget)
    .tint(spent > budget ? .red : .green)
```

---

## 10. 参考

- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- SF Symbols: https://developer.apple.com/sf-symbols/
- Dynamic Type: https://developer.apple.com/design/human-interface-guidelines/typography
- iOS Color: https://developer.apple.com/design/human-interface-guidelines/color
