# 要求事項: /add-featureコマンドを削除し、Issue駆動開発に統一

## 概要
現在、新機能追加のためのコマンドが `/add-feature` と `/resolve-issue` の2つ存在し、役割が重複しています。開発フローをシンプルにするため、`/add-feature` コマンドを削除し、Issue駆動開発に統一します。

## 背景
- `/add-feature`: 機能名から新規機能を計画・実装
- `/resolve-issue`: GitHub Issue番号から実装

両コマンドは実質的に同じような処理（ステアリングファイル作成、実装、テスト）を行っており、重複が多い状態です。

## 提案内容
1. `/add-feature` コマンドを削除
2. 新機能追加のワークフローを以下に変更：
   ```bash
   # 現在のワークフロー
   /add-feature ユーザープロフィール編集

   # 新しいワークフロー
   /create-issue ユーザープロフィール編集機能の追加
   /resolve-issue [作成されたIssue番号]
   ```

## 期待される効果
- **トレーサビリティ向上**: すべての変更がIssueに紐付く
- **コマンド数削減**: シンプルで理解しやすい
- **標準的なGitHubフロー**: Issue駆動開発のベストプラクティスに沿う

## タスク
- [ ] `/add-feature` コマンドファイル (`.claude/commands/add-feature.md`) を削除
- [ ] CLAUDE.mdの「日常的な使い方」セクションを更新
- [ ] 必要に応じて、関連ドキュメントを更新

## 関連ファイル
- `.claude/commands/add-feature.md`
- `.claude/commands/resolve-issue.md`
- `CLAUDE.md`