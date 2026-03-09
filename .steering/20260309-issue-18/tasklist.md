# タスクリスト

## 1. セットアップ
- [x] ブランチ作成: issue-18-navigation-implementation
- [x] ステアリングファイル作成
- [ ] 必要なパッケージのインストール

## 2. 型定義
- [ ] src/navigation/types.tsの作成
  - [ ] ルートスタックパラメータ型
  - [ ] メインタブパラメータ型
  - [ ] 各スタックパラメータ型
  - [ ] 画面プロップス型

## 3. プレースホルダー画面
- [ ] カレンダー関連画面
  - [ ] CalendarScreen.tsx
  - [ ] MonthViewScreen.tsx
  - [ ] WeekViewScreen.tsx
  - [ ] DayViewScreen.tsx
- [ ] 統計画面
  - [ ] StatisticsScreen.tsx
- [ ] 設定画面
  - [ ] SettingsScreen.tsx
- [ ] モーダル画面
  - [ ] TaskAddScreen.tsx
  - [ ] TaskEditScreen.tsx
  - [ ] ReminderScreen.tsx

## 4. ナビゲーション実装
- [ ] React Router v6の設定
  - [ ] ルーティング設定
  - [ ] レイアウトコンポーネント
- [ ] タブナビゲーション
  - [ ] MainTabNavigator.tsx
  - [ ] タブバーコンポーネント
- [ ] モーダル制御
  - [ ] モーダルコンテキスト
  - [ ] モーダル表示ロジック

## 5. 統合とテスト
- [ ] App.tsxへの統合
- [ ] 型チェック (npm run typecheck)
- [ ] Lint実行 (npm run lint)
- [ ] 動作確認
  - [ ] タブ切り替え
  - [ ] 画面遷移
  - [ ] モーダル表示
  - [ ] パラメータ受け渡し

## 6. ドキュメント更新
- [ ] 実装内容の記録
- [ ] 今後の改善点のメモ

## コミット履歴
- [ ] feat: ナビゲーション型定義を追加
- [ ] feat: カレンダー関連のプレースホルダー画面を作成
- [ ] feat: 統計と設定のプレースホルダー画面を作成
- [ ] feat: モーダル画面のプレースホルダーを作成
- [ ] feat: React Router v6の基本設定を追加
- [ ] feat: タブナビゲーションコンポーネントを実装
- [ ] feat: モーダル制御機能を実装
- [ ] feat: App.tsxにナビゲーションを統合
- [ ] test: ナビゲーション動作確認用のテストを追加