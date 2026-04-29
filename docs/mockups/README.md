# docs/mockups/ — ワイヤーフレーム資産

ミニマル家計簿（プロトタイプ）の **画面ワイヤーフレーム原本**。Claude Design でデザインを起こし、handoff bundle として書き出したものをそのまま配置している。本リポジトリは iOS アプリの設計フェーズで、Xcode プロジェクト未着手のため、これらは **「設計の視覚原本」** として参照する位置づけ。

## ファイル一覧

| ファイル                                                                         | 種別             | 役割                                                                                                        |
| -------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| [家計簿ワイヤーフレーム.html](家計簿ワイヤーフレーム.html)                       | HTML（エントリ） | **正本**。同階層の 5 つの jsx を Babel standalone で読み込む。設計を読む / 改修する際はこちら               |
| [家計簿ワイヤーフレーム.standalone.html](家計簿ワイヤーフレーム.standalone.html) | HTML（自己完結） | エントリ + 5 jsx + ランタイムを gzip 埋め込みした単独ファイル。配布・ダブルクリック閲覧用のスナップショット |
| [design-canvas.jsx](design-canvas.jsx)                                           | コンポーネント   | キャンバス枠（`DesignCanvas` / `DCSection` / `DCArtboard`）。アートボードを並べる土台                       |
| [wireframe-kit.jsx](wireframe-kit.jsx)                                           | コンポーネント   | 共通 UI キット（タブバー、リスト行、入力フィールド等の手書き風プリミティブ）                                |
| [sf-symbols.jsx](sf-symbols.jsx)                                                 | コンポーネント   | SF Symbols 風アイコンの SVG 定義                                                                            |
| [wf-spec-screens.jsx](wf-spec-screens.jsx)                                       | スクリーン       | S-01〜S-05 の **Light テーマ** 実装                                                                         |
| [wf-spec-screens-dark.jsx](wf-spec-screens-dark.jsx)                             | スクリーン       | S-01〜S-05 の **Dark テーマ** 実装                                                                          |

## 開き方

- **手軽に見るだけ**: [家計簿ワイヤーフレーム.standalone.html](家計簿ワイヤーフレーム.standalone.html) をダブルクリック（ブラウザで直接開ける）
- **構造を読む / 改修する**: [家計簿ワイヤーフレーム.html](家計簿ワイヤーフレーム.html) と 5 つの jsx を一緒に読む。ブラウザで動かす場合は Chrome 系の `file://` だと CORS で jsx 取得が失敗するので、`python3 -m http.server` などで簡易サーバを立てて開く（Safari は `file://` のまま開ける場合あり）
- **AI コーディングエージェント向け**: ブラウザでのレンダリング・スクリーンショットは不要（handoff README の指示通り）。jsx と HTML を直接読めば寸法・色・レイアウトはすべてソース上で確認できる

## 画面 ID（S-01〜S-05）の正本

ワイヤーフレームのアートボードラベルは画面 ID（S-01〜S-05）で、その意味と仕様は以下の文書で定義されている。

| 画面 ID | 名称       | 設計の正本                                                                                                                                        |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-01    | 入力       | [docs/basic-design.md](../basic-design.md)（画面一覧） / [docs/detailed-design.md](../detailed-design.md#s-01-入力画面quickentryview)             |
| S-02    | カレンダー | [docs/basic-design.md](../basic-design.md) / [docs/detailed-design.md](../detailed-design.md#s-02-カレンダー画面calendarview)                     |
| S-03    | レポート   | [docs/basic-design.md](../basic-design.md) / [docs/detailed-design.md](../detailed-design.md#s-03-レポート画面reportview)                         |
| S-04    | 予算       | [docs/basic-design.md](../basic-design.md) / [docs/detailed-design.md](../detailed-design.md#s-04-予算画面budgetview)                             |
| S-05    | 設定       | [docs/basic-design.md](../basic-design.md) / [docs/detailed-design.md](../detailed-design.md#s-05-設定画面--s-07-カテゴリ管理--s-08-固定費の設定) |

ワイヤーフレームと仕様の **どちらが正か** に矛盾が生じた場合、**仕様書（basic-design / detailed-design）が正**。ワイヤーフレームは設計時点のスナップショットで、仕様変更に追随しているとは限らない。

### S-06〜S-08 が無い理由

仕様書には S-06（収支入力シート）/ S-07（カテゴリ管理）/ S-08（固定費の設定）も定義されているが、本ワイヤーフレームには含まれない。これは欠落ではなく **意図的なスコープ**：

- **S-06**: カレンダー（S-02）からの sheet モーダル — 親画面に重ねて表示する遷移先
- **S-07 / S-08**: 設定（S-05）からの `NavigationStack` push — 画面の奥にある詳細画面

いずれも **タブ直下のトップレベル画面ではない** ため、5 タブ構成を一覧するキャンバスには並べていない。これらの仕様は [docs/basic-design.md](../basic-design.md) L282-284 と [docs/detailed-design.md](../detailed-design.md) L315-322 を参照。

## 関連文書

- プロジェクト概要: [CLAUDE.md](../../CLAUDE.md)
- 要件定義: [docs/requirements.md](../requirements.md)
- 基本設計: [docs/basic-design.md](../basic-design.md)
- 詳細設計: [docs/detailed-design.md](../detailed-design.md)
- デザイン仕様（色・タイポ・トークン）: [DESIGN.md](../../DESIGN.md)
- 開発ガイドライン: [docs/development-guide.md](../development-guide.md)

## 出自

Claude Design（claude.ai/design）の handoff bundle から書き出した資産。元 bundle に含まれていた `README.md`（コーディングエージェント向け指示）と `DESIGN.md`（リポジトリ直下の DESIGN.md と同内容）はリポジトリの該当文書に統合済みのため、ここには含めていない。
