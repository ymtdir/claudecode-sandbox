# UnifiedCal - カレンダー統合管理アプリ

React Native + Expo + TypeScriptで構築されたクロスプラットフォーム対応のカレンダー統合管理アプリケーションです。

## 📱 プロジェクト概要

UnifiedCalは、複数のカレンダーサービス（Google Calendar、iCal、Outlookなど）を一元管理できるモバイルアプリケーションです。

### 主な機能（予定）

- 複数カレンダーの統合表示
- イベントの一括管理
- スマート通知
- オフライン対応
- クロスプラットフォーム対応（iOS/Android）

## 🚀 環境構築

### 必要な要件

- Node.js v20以上（推奨: v25.2.1）
- npm または yarn
- Expo CLI
- iOS開発: Xcode（Mac環境のみ）
- Android開発: Android Studio

### セットアップ手順

1. **リポジトリのクローン**

```bash
git clone [repository-url]
cd UnifiedCal
```

2. **依存関係のインストール**

```bash
npm install
```

3. **開発サーバーの起動**

```bash
npm start
```

4. **アプリの実行**

iOS Simulator（Macのみ）:

```bash
npm run ios
```

Android Emulator:

```bash
npm run android
```

Expo Goアプリ（実機）:

- `npm start`実行後に表示されるQRコードをスキャン

## 📂 ディレクトリ構造

```
UnifiedCal/
├── app/                    # アプリケーションコード（今後Expo Router用に使用予定）
├── components/            # 再利用可能なコンポーネント
├── screens/               # 画面コンポーネント
├── hooks/                 # カスタムフック
├── utils/                 # ユーティリティ関数
├── constants/             # 定数定義
├── types/                 # TypeScript型定義
├── assets/                # 画像、フォントなどのアセット
├── .vscode/               # VS Code設定
├── node_modules/          # 依存パッケージ
├── .eslintrc.json         # ESLint設定
├── .prettierrc            # Prettier設定
├── .editorconfig          # EditorConfig設定
├── tsconfig.json          # TypeScript設定
├── app.json               # Expo設定
├── package.json           # プロジェクト設定
└── README.md              # このファイル
```

## 🛠️ 開発コマンド

### 基本コマンド

```bash
# 開発サーバー起動
npm start

# プラットフォーム別起動
npm run ios         # iOS Simulator
npm run android     # Android Emulator
npm run web         # Web ブラウザ

# コード品質チェック
npm run lint        # ESLintチェック
npm run lint:fix    # ESLint自動修正
npm run format      # Prettier フォーマット
npm run format:check # フォーマットチェック
npm run type-check  # TypeScript型チェック

# 総合チェック
npm run check       # 型チェック + Lint + フォーマットチェック
```

## 🔧 開発環境設定

### VS Code推奨拡張機能

以下の拡張機能のインストールを推奨します：

- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code
- Expo Tools
- React Native Tools
- ES7+ React/Redux/React-Native snippets

### エディタ設定

- 自動フォーマット: 保存時に有効
- Linting: リアルタイムで有効
- インデント: スペース2つ
- 行末: LF
- 文字コード: UTF-8

## 🏗️ 技術スタック

- **フレームワーク**: React Native 0.83.2
- **開発ツール**: Expo SDK 55
- **言語**: TypeScript 5.9.2
- **スタイル**: React Native StyleSheet（今後Styled Components検討）
- **状態管理**: 今後実装予定（Redux Toolkit or Zustand）
- **ナビゲーション**: 今後実装予定（React Navigation or Expo Router）
- **テスト**: 今後実装予定（Jest + React Native Testing Library）

## 📝 開発ガイドライン

### コーディング規約

- TypeScript strictモード有効
- 関数コンポーネント + Hooks を使用
- 命名規則:
  - コンポーネント: PascalCase
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - 型・インターフェース: PascalCase

### コミット規約

Conventional Commits形式を使用:

- `feat:` 新機能追加
- `fix:` バグ修正
- `docs:` ドキュメント変更
- `style:` コードスタイル変更
- `refactor:` リファクタリング
- `test:` テスト追加・修正
- `chore:` ビルド・ツール変更

## 🐛 トラブルシューティング

### よくある問題と解決方法

#### Metro バンドラーエラー

```bash
# キャッシュクリア
npx expo start -c
```

#### iOS Simulator が起動しない

```bash
# Xcode のコマンドラインツールを設定
xcode-select --install
```

#### Android Emulator が起動しない

- Android Studio で AVD Manager から仮想デバイスを作成
- 環境変数 `ANDROID_HOME` を設定

#### 依存関係の問題

```bash
# node_modules を削除して再インストール
rm -rf node_modules
npm install
```

## 📜 ライセンス

[ライセンスを後で追加]

## 🤝 コントリビューション

[コントリビューションガイドラインを後で追加]

## 📞 サポート

問題が発生した場合は、GitHubのIssueを作成してください。

---

最終更新: 2026年3月7日
