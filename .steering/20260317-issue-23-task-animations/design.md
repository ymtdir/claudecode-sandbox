# 設計書

## アーキテクチャ概要

コンポーネントベースのアニメーションシステムを採用し、各アニメーションを独立したコンポーネントとして実装します。React Native Reanimatedのワークレットを活用してUIスレッドで動作させることで、高パフォーマンスを実現します。

```
┌─────────────────────────────────────────┐
│      AnimatedTaskItem（統合）            │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │Checkmark │  │  Ripple  │  │Stamp │ │
│  └──────────┘  └──────────┘  └──────┘ │
│  ┌──────────┐  ┌──────────┐           │
│  │Strikethrough│ │Swipeable│           │
│  └──────────┘  └──────────┘           │
├─────────────────────────────────────────┤
│         Haptic Feedback Service         │
└─────────────────────────────────────────┘
```

## コンポーネント設計

### 1. CheckmarkAnimation

**責務**:
- SVGパスアニメーションの管理
- チェックマークの描画アニメーション
- 完了コールバックの実行

**実装の要点**:
- useAnimatedPropsでSVGパスのstrokeDashoffsetを制御
- interpolateで0から1の進捗を40から0のダッシュオフセットに変換
- runOnJSでJSスレッドのコールバックを実行

### 2. RippleEffect

**責務**:
- タップ位置からの波紋拡大
- スケールと透明度のアニメーション制御

**実装の要点**:
- useSharedValueでアニメーション値を管理
- withTimingで同期的なアニメーション
- 絶対位置でオーバーレイ表示

### 3. StampAnimation

**責務**:
- スタンプのバウンス表示
- スケールと回転の複合アニメーション

**実装の要点**:
- withSequenceで連続アニメーション
- withSpringでバウンス効果
- dampingパラメータでバウンスの強さを調整

### 4. StrikethroughAnimation

**責務**:
- テキストへの取り消し線描画
- アニメーションの開始遅延制御

**実装の要点**:
- withDelayで400ms遅延後に開始
- 幅を0%から100%へアニメーション
- 絶対位置でテキスト中央に配置

### 5. SwipeableTask

**責務**:
- スワイプジェスチャーの検出
- 完了/延期アクションのトリガー
- スプリングバックアニメーション

**実装の要点**:
- useAnimatedGestureHandlerでジェスチャー処理
- 100px以上のスワイプで反応
- withSpringで元の位置に戻る

### 6. HapticFeedback Service

**責務**:
- 振動パターンの管理
- プラットフォーム別の振動実装

**実装の要点**:
- Expo Hapticsを使用
- 異なる強度の振動パターン
- エラーハンドリング（振動非対応デバイス）

### 7. AnimatedTaskItem（統合コンポーネント）

**責務**:
- 全アニメーションコンポーネントの統合
- アニメーションのタイミング制御
- ステート管理

**実装の要点**:
- 各アニメーショントリガーの順序制御
- パフォーマンス最適化（不要な再レンダリング防止）
- メモリリーク対策（cleanup処理）

## データフロー

### タスク完了フロー
```
1. ユーザーがタスクをタップ/スワイプ
2. AnimatedTaskItemがisCompletedステートを更新
3. CheckmarkAnimationが開始（0-300ms）
4. RippleEffectが同時に開始（0-600ms）
5. StampAnimationが100ms後に開始
6. StrikethroughAnimationが400ms後に開始
7. HapticFeedbackが即座に実行
8. 800ms後にonCompleteコールバック実行
```

## エラーハンドリング戦略

### アニメーションエラー
- アニメーションが失敗してもUIは機能的に動作
- try-catchでラップしてクラッシュを防止
- console.warnでデバッグ情報を出力

### 振動エラー
- デバイスが振動非対応の場合はスキップ
- Web環境では振動を実行しない
- エラー時は視覚的フィードバックのみ

## テスト戦略

### ユニットテスト
- 各アニメーションコンポーネントのレンダリング
- アニメーション値の変化
- コールバックの実行タイミング

### 統合テスト
- タスク完了フロー全体の動作
- 複数タスクの同時アニメーション
- メモリリークのチェック

## 依存ライブラリ

新たに追加が必要なライブラリ:

```json
{
  "dependencies": {
    "react-native-reanimated": "^3.0.0",
    "react-native-gesture-handler": "^2.0.0",
    "react-native-svg": "^13.0.0",
    "expo-haptics": "^12.0.0"
  }
}
```

## ディレクトリ構造

```
src/
├── components/
│   └── animations/
│       ├── CheckmarkAnimation.tsx
│       ├── RippleEffect.tsx
│       ├── StampAnimation.tsx
│       ├── StrikethroughAnimation.tsx
│       └── SwipeableTask.tsx
├── components/
│   └── task/
│       └── AnimatedTaskItem.tsx
└── utils/
    ├── animations.ts
    └── haptics.ts
```

## 実装の順序

1. アニメーションライブラリのインストールと設定
2. 基本的なアニメーションユーティリティの実装
3. 個別アニメーションコンポーネントの実装（Checkmark → Ripple → Stamp → Strikethrough → Swipeable）
4. 振動フィードバックサービスの実装
5. 統合タスクコンポーネントの実装
6. 既存タスクリストへの統合
7. テストの実装と実行

## セキュリティ考慮事項

- ユーザー入力のサニタイズ（スワイプ距離の上限設定）
- メモリリーク防止（useEffectのクリーンアップ）
- アニメーション無限ループの防止

## パフォーマンス考慮事項

- useAnimatedStyleでUIスレッドアニメーション
- メモ化による不要な再レンダリング防止
- アニメーション値の事前計算
- 60fps維持のための最適化

## 将来の拡張性

- アニメーション速度のカスタマイズ機能
- テーマ別アニメーションセット
- Lottieアニメーションの追加
- カスタムアニメーションエディタ