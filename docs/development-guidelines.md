# 開発ガイドライン

## 1. 概要

### 1.1 ドキュメント情報

- **プロジェクト名**: UnifiedCal
- **バージョン**: 1.0.0
- **作成日**: 2026-03-04
- **対象**: 開発チーム全体

### 1.2 目的

本ドキュメントは、UnifiedCalプロジェクトにおける一貫性のあるコード品質を保ち、効率的な開発プロセスを実現するためのガイドラインを定義する。

### 1.3 基本原則

- **可読性優先**: 巧妙なコードより読みやすいコード
- **一貫性重視**: チーム全体で統一されたスタイル
- **品質第一**: テストとレビューによる品質保証
- **継続的改善**: フィードバックによる改善サイクル

---

## 2. コーディング規約

### 2.1 TypeScript/JavaScript規約

#### 基本設定

```typescript
// tsconfig.json の strict オプションを有効化
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

#### 変数宣言

```typescript
// ❌ Bad
var count = 0;
let data = getData();

// ✅ Good
const MAX_RETRY_COUNT = 3; // 定数は UPPER_SNAKE_CASE
const userData = getUserData(); // 変更されない場合は const
let currentIndex = 0; // 変更される場合のみ let
```

#### 型定義

```typescript
// ❌ Bad
function processUser(user: any): any {
  // 処理
}

// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

function processUser(user: User): ProcessedUser {
  // 処理
}
```

### 2.2 React/React Native規約

#### コンポーネント定義

```typescript
// ❌ Bad
export default function Button(props) {
  return <TouchableOpacity>{props.label}</TouchableOpacity>;
}

// ✅ Good
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles[variant]}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
```

#### Hooks使用規則

```typescript
// ✅ Good: カスタムフックの命名と実装
export const useTaskManager = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const [loading, setLoading] = useState(false);

  // Hooks は条件分岐の外で宣言
  useEffect(() => {
    // 副作用処理
  }, []);

  const addTask = useCallback(
    async (task: TaskInput) => {
      setLoading(true);
      try {
        await dispatch(createTask(task)).unwrap();
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    tasks,
    loading,
    addTask,
  };
};
```

### 2.3 命名規則

| 要素                       | 規則                                | 例                       |
| -------------------------- | ----------------------------------- | ------------------------ |
| ファイル（コンポーネント） | PascalCase                          | `TaskCard.tsx`           |
| ファイル（その他）         | camelCase                           | `authService.ts`         |
| React コンポーネント       | PascalCase                          | `CalendarView`           |
| 関数・変数                 | camelCase                           | `getUserData`            |
| 定数                       | UPPER_SNAKE_CASE                    | `API_BASE_URL`           |
| 型・インターフェース       | PascalCase                          | `UserProfile`            |
| enum                       | PascalCase（値は UPPER_SNAKE_CASE） | `TaskStatus.IN_PROGRESS` |
| プライベートメソッド       | \_ prefix                           | `_validateInput`         |

### 2.4 関数設計

#### 単一責任の原則

```typescript
// ❌ Bad: 複数の責任を持つ関数
async function handleTaskSubmit(formData: FormData) {
  // バリデーション
  if (!formData.title) throw new Error('Title required');

  // データ変換
  const task = {
    ...formData,
    createdAt: new Date(),
  };

  // API呼び出し
  const response = await api.post('/tasks', task);

  // 状態更新
  dispatch(addTask(response.data));

  // 通知表示
  showNotification('Task created');
}

// ✅ Good: 単一責任に分割
function validateTaskForm(formData: FormData): void {
  if (!formData.title) {
    throw new ValidationError('Title is required');
  }
}

function transformToTask(formData: FormData): Task {
  return {
    ...formData,
    createdAt: new Date(),
  };
}

async function handleTaskSubmit(formData: FormData): Promise<void> {
  validateTaskForm(formData);
  const task = transformToTask(formData);
  const savedTask = await taskService.create(task);
  dispatch(addTask(savedTask));
  notificationService.show('Task created successfully');
}
```

### 2.5 エラーハンドリング

#### カスタムエラークラス

```typescript
// errors/AppError.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 0);
  }
}
```

#### エラー処理パターン

```typescript
// ✅ Good: 適切なエラーハンドリング
export const useApiCall = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);

      // エラーの種類に応じた処理
      if (error instanceof NetworkError) {
        // オフライン処理
      } else if (error instanceof ValidationError) {
        // バリデーションエラー表示
      } else {
        // 汎用エラー処理
        Sentry.captureException(error);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, execute };
};
```

### 2.6 コメント規約

#### JSDocコメント

````typescript
/**
 * タスクを作成し、データベースに保存します
 *
 * @param input - タスクの入力データ
 * @param options - 作成オプション
 * @returns 作成されたタスク
 * @throws {ValidationError} 入力データが不正な場合
 * @throws {NetworkError} ネットワークエラーの場合
 *
 * @example
 * ```typescript
 * const task = await createTask({
 *   title: '会議の準備',
 *   dueDate: new Date('2024-12-31'),
 * });
 * ```
 */
export async function createTask(
  input: TaskInput,
  options?: CreateOptions
): Promise<Task> {
  // 実装
}
````

#### インラインコメント

```typescript
// ✅ Good: なぜそうするかを説明
// iOS では特定のアニメーションがクラッシュを引き起こすため無効化
if (Platform.OS === 'ios') {
  animationConfig.enabled = false;
}

// ❌ Bad: 何をしているかを説明（コードから明らか）
// ユーザーIDを取得
const userId = user.id;
```

---

## 3. 開発プロセス

### 3.1 Git運用ルール

#### ブランチ戦略（Git Flow）

```
main                    # 本番環境（保護ブランチ）
├── develop            # 開発統合ブランチ
│   ├── feature/UC-123-task-list    # 機能開発
│   ├── bugfix/UC-456-fix-crash     # バグ修正
│   └── chore/update-dependencies    # その他
├── release/1.2.0      # リリース準備
└── hotfix/UC-789-critical-fix      # 緊急修正
```

#### ブランチ命名規則

- `feature/[チケット番号]-[簡潔な説明]`
- `bugfix/[チケット番号]-[簡潔な説明]`
- `hotfix/[チケット番号]-[簡潔な説明]`
- `chore/[簡潔な説明]`

### 3.2 コミットメッセージ規約（Conventional Commits）

#### フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### タイプ

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: フォーマット変更
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルドプロセスや補助ツールの変更

#### 例

```bash
feat(task): タスクの一括削除機能を追加

- 複数タスクを選択して削除できるように
- 削除前に確認ダイアログを表示
- アンドゥ機能も実装

Closes #123
```

### 3.3 プルリクエスト（PR）プロセス

#### PRテンプレート

```markdown
## 概要

<!-- 変更の概要を簡潔に記載 -->

## 変更内容

<!-- 主な変更点をリスト形式で記載 -->

- [ ] 機能Aの実装
- [ ] バグBの修正

## スクリーンショット

<!-- UI変更がある場合は必須 -->

## テスト

<!-- 実施したテストを記載 -->

- [ ] ユニットテスト追加
- [ ] E2Eテスト実行
- [ ] 手動テスト完了

## チェックリスト

- [ ] コードがコーディング規約に準拠している
- [ ] セルフレビュー実施済み
- [ ] テストが全てパスしている
- [ ] ドキュメントを更新した（必要な場合）

## 関連Issue

Closes #XXX
```

#### レビュープロセス

1. **セルフレビュー**: PR作成前に自己チェック
2. **自動チェック**: CI/CDによる自動テスト
3. **コードレビュー**: 最低1名のレビュー必須
4. **修正対応**: レビューコメントへの対応
5. **承認とマージ**: Squash and merge を使用

### 3.4 コードレビューガイドライン

#### レビュアーの心得

```typescript
// ✅ Good: 建設的なフィードバック
"このロジックを別関数に切り出すと再利用性が上がりそうです。
例: `validateTaskInput()`"

// ❌ Bad: 非建設的な批判
"このコードは読みにくい"
```

#### レビューチェックポイント

- [ ] **機能性**: 要件を満たしているか
- [ ] **可読性**: コードが理解しやすいか
- [ ] **保守性**: 将来の変更が容易か
- [ ] **パフォーマンス**: 効率的な実装か
- [ ] **セキュリティ**: 脆弱性はないか
- [ ] **テスト**: 適切にテストされているか

---

## 4. テスト戦略

### 4.1 テストピラミッド

```
        E2E Tests (10%)
       /            \
    Integration (30%)
   /                \
  Unit Tests (60%)
```

### 4.2 テストカバレッジ目標

| テストタイプ | カバレッジ目標 | 対象                             |
| ------------ | -------------- | -------------------------------- |
| Unit         | 80%            | ビジネスロジック、ユーティリティ |
| Integration  | 60%            | API連携、データベース操作        |
| E2E          | Critical Path  | 主要ユーザーフロー               |

### 4.3 テストコード例

#### ユニットテスト

```typescript
// TaskService.test.ts
describe('TaskService', () => {
  describe('createTask', () => {
    it('should create a task with valid input', async () => {
      const input: TaskInput = {
        title: 'Test Task',
        dueDate: new Date('2024-12-31'),
      };

      const task = await taskService.createTask(input);

      expect(task).toMatchObject({
        title: 'Test Task',
        status: TaskStatus.PENDING,
      });
      expect(task.id).toBeDefined();
    });

    it('should throw ValidationError for empty title', async () => {
      const input: TaskInput = {
        title: '',
        dueDate: new Date(),
      };

      await expect(taskService.createTask(input)).rejects.toThrow(
        ValidationError
      );
    });
  });
});
```

#### 統合テスト

```typescript
// TaskAPI.integration.test.ts
describe('Task API Integration', () => {
  let server: Server;

  beforeAll(() => {
    server = startTestServer();
  });

  afterAll(() => {
    server.close();
  });

  it('should create and retrieve a task', async () => {
    const createResponse = await api.post('/tasks', {
      title: 'Integration Test Task',
    });

    expect(createResponse.status).toBe(201);

    const getResponse = await api.get(`/tasks/${createResponse.data.id}`);

    expect(getResponse.data.title).toBe('Integration Test Task');
  });
});
```

---

## 5. パフォーマンス最適化

### 5.1 React Native 最適化

#### メモ化の活用

```typescript
// ✅ Good: 適切なメモ化
const TaskList: React.FC<Props> = ({ tasks, onTaskPress }) => {
  // 重い計算はメモ化
  const sortedTasks = useMemo(
    () => tasks.sort((a, b) => a.priority - b.priority),
    [tasks]
  );

  // コールバックはuseCallbackでメモ化
  const handlePress = useCallback(
    (taskId: string) => {
      onTaskPress(taskId);
    },
    [onTaskPress]
  );

  return (
    <FlatList
      data={sortedTasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onPress={handlePress} />
      )}
      // パフォーマンス最適化プロパティ
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
    />
  );
};
```

### 5.2 画像最適化

```typescript
// ✅ Good: 画像の最適化
import FastImage from 'react-native-fast-image';

const Avatar: React.FC<{ uri: string }> = ({ uri }) => {
  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={styles.avatar}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
```

---

## 6. セキュリティガイドライン

### 6.1 データ保護

```typescript
// ✅ Good: セキュアストレージの使用
import * as Keychain from 'react-native-keychain';

export class SecureStorageService {
  async storeToken(token: string): Promise<void> {
    await Keychain.setInternetCredentials(
      'unifiedcal.com',
      'accessToken',
      token
    );
  }

  async getToken(): Promise<string | null> {
    const credentials = await Keychain.getInternetCredentials('unifiedcal.com');
    return credentials ? credentials.password : null;
  }
}
```

### 6.2 入力検証

```typescript
// ✅ Good: 入力の検証とサニタイゼーション
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  dueDate: z.date().min(new Date()),
});

export function validateAndSanitizeTask(input: unknown): Task {
  // スキーマバリデーション
  const validated = TaskSchema.parse(input);

  // HTMLサニタイゼーション
  return {
    ...validated,
    title: DOMPurify.sanitize(validated.title),
    description: validated.description
      ? DOMPurify.sanitize(validated.description)
      : undefined,
  };
}
```

---

## 7. CI/CD設定

### 7.1 GitHub Actions ワークフロー

```yaml
name: CI

on:
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test:ci

      - name: Build
        run: npm run build
```

### 7.2 pre-commit フック

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run type-check
npm run lint-staged
npm run test:staged
```

---

## 8. デバッグとロギング

### 8.1 ロギング戦略

```typescript
// utils/logger.ts
import { logger } from 'react-native-logs';

const log = logger.createLogger({
  severity: __DEV__ ? logger.severity.DEBUG : logger.severity.ERROR,
  transport: [logger.chromeConsoleTransport, logger.sentryTransport],
});

export const Logger = {
  debug: (message: string, data?: any) => log.debug(message, data),
  info: (message: string, data?: any) => log.info(message, data),
  warn: (message: string, data?: any) => log.warn(message, data),
  error: (message: string, error?: Error) => {
    log.error(message, error);
    if (!__DEV__) {
      Sentry.captureException(error);
    }
  },
};
```

### 8.2 デバッグツール

- **React Native Debugger**: React DevTools + Redux DevTools
- **Flipper**: ネットワーク監視、レイアウト検査
- **Reactotron**: 状態管理、API呼び出しの監視

---

## 9. リリースプロセス

### 9.1 バージョニング（Semantic Versioning）

```
MAJOR.MINOR.PATCH

1.0.0 -> 1.0.1 (バグ修正)
1.0.0 -> 1.1.0 (機能追加)
1.0.0 -> 2.0.0 (破壊的変更)
```

### 9.2 リリースチェックリスト

- [ ] 全テストがパス
- [ ] コードレビュー完了
- [ ] ドキュメント更新
- [ ] CHANGELOG.md 更新
- [ ] バージョン番号更新
- [ ] リリースノート作成
- [ ] タグ付けとリリース作成

---

## 10. トラブルシューティング

### 10.1 よくある問題と解決策

| 問題                 | 原因              | 解決策                                 |
| -------------------- | ----------------- | -------------------------------------- |
| Metro バンドルエラー | キャッシュ問題    | `npx react-native start --reset-cache` |
| iOS ビルドエラー     | Pod 依存関係      | `cd ios && pod install`                |
| Android ビルドエラー | Gradle キャッシュ | `cd android && ./gradlew clean`        |

### 10.2 パフォーマンス問題

```typescript
// ✅ Good: パフォーマンス計測
import { PerformanceObserver } from 'perf_hooks';

export function measurePerformance(name: string, fn: () => void) {
  performance.mark(`${name}-start`);
  fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);

  const measure = performance.getEntriesByName(name)[0];
  Logger.info(`Performance: ${name}`, { duration: measure.duration });
}
```

---

## 11. まとめ

本ガイドラインに従うことで：

1. **コードの一貫性**: チーム全体で統一されたコーディングスタイル
2. **高い保守性**: 明確な構造と適切なドキュメント
3. **品質の確保**: テストとレビューによる継続的な品質改善
4. **効率的な開発**: 明確なプロセスとツールの活用

定期的にこのガイドラインを見直し、チームのフィードバックを反映して改善していく。
