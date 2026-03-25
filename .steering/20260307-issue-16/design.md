# 設計書

## 概要

React Native + TypeScriptプロジェクトの基本構造を確立し、今後の開発の土台となるベースコードを実装する。

## アプローチ

### 1. ディレクトリ構成戦略

#### レイヤードアーキテクチャの採用

- **Presentation層**: screens, components, navigation
- **Business Logic層**: store, hooks
- **Service層**: services (api, auth, notification)
- **Data Access層**: repositories, models
- **Utilities層**: utils, constants, types

#### 各ディレクトリの役割

##### screens/

- 画面単位のコンポーネントを配置
- 各画面フォルダにindex.tsx、styles.ts、types.tsを含む
- 例: Calendar/index.tsx, Calendar/styles.ts

##### components/

- 再利用可能なUIコンポーネント
- common: 汎用コンポーネント（Button, Input等）
- calendar: カレンダー関連コンポーネント
- task: タスク関連コンポーネント

##### services/

- 外部APIとの通信ロジック
- 認証処理
- プッシュ通知処理

##### repositories/

- データアクセス抽象化層
- ローカルDBとAPIの切り替えを管理

##### models/

- ビジネスロジックを含むドメインモデル
- データ変換ロジック

### 2. TypeScript型定義戦略

#### 基本型定義

```typescript
// Enumの活用
export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

// インターフェースの階層化
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  category: Category;
  date: Date;
  time?: string;
  priority: TaskPriority;
  status: TaskStatus;
  reminders: Reminder[];
  attachments: Attachment[];
}
```

#### 型の再利用性

- 共通プロパティは基底インターフェースに定義
- Enumを使用して型安全性を確保
- Utility Typesを活用（Partial, Pick, Omit等）

### 3. 定数管理戦略

#### 定数の分類

- **アプリケーション定数**: APP_NAME, VERSION等
- **UI定数**: COLORS, SPACING, FONT_SIZES
- **設定定数**: API_TIMEOUT, MAX_RETRY_COUNT
- **メッセージ定数**: ERROR_MESSAGES, SUCCESS_MESSAGES

#### 名前空間の活用

```typescript
export const COLORS = {
  primary: {
    main: '#4A90E2',
    light: '#6BA3E5',
    dark: '#2E7CD6',
  },
  secondary: {
    main: '#FF6B6B',
    light: '#FF8E8E',
    dark: '#FF4848',
  },
} as const;
```

### 4. ユーティリティ関数設計

#### 日付処理（dateUtils.ts）

- formatDate: 日付フォーマット
- parseDate: 文字列から日付への変換
- getRelativeTime: 相対時間表示（3時間前等）
- addDays/subtractDays: 日付演算

#### バリデーション（validationUtils.ts）

- isValidEmail: メールアドレス検証
- isValidTaskTitle: タスクタイトル検証
- validateTaskForm: フォーム全体の検証

#### ストレージ（storageUtils.ts）

- AsyncStorageのラッパー
- 型安全なget/set/remove操作
- データの暗号化対応（将来的）

### 5. App.tsx設計

#### 基本構成

```typescript
export default function App() {
  // グローバルエラーハンドリング設定
  useEffect(() => {
    ErrorUtils.setGlobalHandler(handleError);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* 後のステップで追加 */}
      {/* <Provider store={store}> */}
      {/* <NavigationContainer> */}
      <View style={styles.container}>
        <Text>UnifiedCal</Text>
      </View>
      {/* </NavigationContainer> */}
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}
```

## 実装順序

1. **基本ディレクトリ構造の作成**
   - src/以下の全ディレクトリ作成
   - 各ディレクトリに.gitkeepファイル配置

2. **型定義ファイルの実装**
   - types/index.ts: 基本型定義
   - types/task.ts: タスク関連型
   - types/calendar.ts: カレンダー関連型

3. **定数ファイルの実装**
   - constants/index.ts: メインエクスポート
   - constants/colors.ts: カラー定義
   - constants/config.ts: アプリ設定

4. **ユーティリティ関数の実装**
   - utils/dateUtils.ts
   - utils/validationUtils.ts
   - utils/storageUtils.ts

5. **App.tsxの更新**
   - SafeAreaProviderの設定
   - 基本UIの実装

6. **動作確認**
   - TypeScriptコンパイルチェック
   - アプリ起動確認

## エラーハンドリング方針

- 各層で適切なエラー処理を実装
- カスタムエラークラスの活用
- ユーザーフレンドリーなエラーメッセージ

## テスト方針

- 型定義の正確性を確認
- ユーティリティ関数の単体テスト実装（将来的）
- アプリ起動の成功を確認

## 今後の拡張性

- 各ディレクトリ構造は後続のIssueで詳細実装
- 型定義は必要に応じて拡張
- ユーティリティ関数は随時追加
