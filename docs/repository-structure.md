# リポジトリ構造定義書

## 1. 概要

### 1.1 ドキュメント情報
- **プロジェクト名**: UnifiedCal
- **バージョン**: 1.0.0
- **作成日**: 2026-03-04
- **技術スタック**: React Native + TypeScript + Expo

### 1.2 目的
本ドキュメントは、UnifiedCalプロジェクトのディレクトリ構造、ファイル配置規則、命名規則を定義し、開発チーム全体で一貫性のあるコード管理を実現することを目的とする。

---

## 2. ディレクトリ構造

### 2.1 ルートディレクトリ構造

```
UnifiedCal/
├── .github/                    # GitHub設定
│   ├── workflows/              # GitHub Actions
│   ├── ISSUE_TEMPLATE/         # Issueテンプレート
│   └── pull_request_template.md
├── .vscode/                    # VSCode設定
├── android/                    # Android固有コード
├── ios/                        # iOS固有コード
├── src/                        # ソースコード（メイン）
├── assets/                     # 静的リソース
├── __tests__/                  # テストファイル
├── docs/                       # ドキュメント
├── scripts/                    # ビルド・デプロイスクリプト
├── .env.example                # 環境変数テンプレート
├── .eslintrc.js                # ESLint設定
├── .gitignore                  # Git除外設定
├── .prettierrc                 # Prettier設定
├── app.json                    # Expo設定
├── babel.config.js             # Babel設定
├── metro.config.js             # Metro設定
├── package.json                # パッケージ定義
├── README.md                   # プロジェクト説明
├── tsconfig.json               # TypeScript設定
└── yarn.lock / package-lock.json # 依存関係ロックファイル
```

### 2.2 src/ディレクトリ詳細構造

```
src/
├── screens/                    # 画面コンポーネント
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── calendar/
│   │   ├── CalendarMonthScreen.tsx
│   │   ├── CalendarWeekScreen.tsx
│   │   ├── CalendarDayScreen.tsx
│   │   └── components/
│   ├── task/
│   │   ├── TaskListScreen.tsx
│   │   ├── TaskDetailScreen.tsx
│   │   ├── TaskEditScreen.tsx
│   │   └── components/
│   ├── statistics/
│   │   ├── DashboardScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   └── components/
│   └── settings/
│       ├── SettingsScreen.tsx
│       ├── ProfileScreen.tsx
│       └── components/
│
├── components/                 # 共通UIコンポーネント
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── LoadingSpinner/
│   ├── calendar/
│   │   ├── CalendarGrid/
│   │   ├── DatePicker/
│   │   └── TimeSlot/
│   ├── task/
│   │   ├── TaskCard/
│   │   ├── TaskList/
│   │   └── TaskForm/
│   └── layout/
│       ├── Header/
│       ├── TabBar/
│       └── Drawer/
│
├── navigation/                 # ナビゲーション設定
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   ├── types.ts
│   └── linking.ts
│
├── store/                      # Redux Store
│   ├── index.ts
│   ├── hooks.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── taskSlice.ts
│   │   ├── calendarSlice.ts
│   │   ├── reminderSlice.ts
│   │   └── syncSlice.ts
│   ├── middleware/
│   │   ├── syncMiddleware.ts
│   │   └── errorMiddleware.ts
│   └── selectors/
│       ├── taskSelectors.ts
│       └── calendarSelectors.ts
│
├── services/                   # 外部サービス連携
│   ├── api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   └── interceptors.ts
│   ├── auth/
│   │   ├── authService.ts
│   │   └── tokenManager.ts
│   ├── notification/
│   │   ├── notificationService.ts
│   │   └── pushNotification.ts
│   ├── storage/
│   │   ├── localStorage.ts
│   │   └── secureStorage.ts
│   └── sync/
│       ├── syncService.ts
│       └── conflictResolver.ts
│
├── repositories/               # データアクセス層
│   ├── TaskRepository.ts
│   ├── CalendarRepository.ts
│   ├── ReminderRepository.ts
│   └── UserRepository.ts
│
├── models/                     # データモデル
│   ├── Task.ts
│   ├── Calendar.ts
│   ├── Reminder.ts
│   ├── User.ts
│   └── index.ts
│
├── database/                   # ローカルDB
│   ├── schema.ts
│   ├── migrations/
│   └── database.ts
│
├── hooks/                      # カスタムフック
│   ├── useAuth.ts
│   ├── useTask.ts
│   ├── useCalendar.ts
│   ├── useSync.ts
│   └── useNotification.ts
│
├── utils/                      # ユーティリティ関数
│   ├── date.ts
│   ├── validation.ts
│   ├── format.ts
│   ├── crypto.ts
│   └── platform.ts
│
├── constants/                  # 定数定義
│   ├── colors.ts
│   ├── dimensions.ts
│   ├── config.ts
│   └── messages.ts
│
├── types/                      # TypeScript型定義
│   ├── global.d.ts
│   ├── api.types.ts
│   ├── store.types.ts
│   └── navigation.types.ts
│
├── i18n/                      # 国際化
│   ├── index.ts
│   ├── locales/
│   │   ├── ja.json
│   │   └── en.json
│   └── translations.ts
│
└── App.tsx                     # アプリケーションエントリポイント
```

### 2.3 テストディレクトリ構造

```
__tests__/
├── unit/                       # ユニットテスト
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
├── integration/                # 統合テスト
│   ├── api/
│   ├── database/
│   └── sync/
├── e2e/                        # E2Eテスト
│   ├── auth.test.ts
│   ├── task.test.ts
│   └── calendar.test.ts
├── fixtures/                   # テストデータ
└── mocks/                      # モック
    ├── api/
    └── services/
```

### 2.4 ドキュメントディレクトリ構造

```
docs/
├── product-requirements.md     # PRD
├── functional-design.md        # 機能設計書
├── architecture.md             # アーキテクチャ設計書
├── repository-structure.md     # リポジトリ構造定義書（本書）
├── development-guidelines.md   # 開発ガイドライン
├── glossary.md                 # 用語集
├── api/                        # API仕様書
│   └── openapi.yaml
├── guides/                     # 開発ガイド
│   ├── setup.md
│   ├── testing.md
│   └── deployment.md
└── decisions/                  # アーキテクチャ決定記録
    ├── ADR-001-react-native.md
    └── ADR-002-redux-toolkit.md
```

---

## 3. ファイル命名規則

### 3.1 基本規則

| ファイルタイプ | 命名規則 | 例 |
|---------------|---------|-----|
| React Component | PascalCase + .tsx | `TaskCard.tsx` |
| TypeScript Module | camelCase + .ts | `authService.ts` |
| Style File | Component名 + .styles.ts | `TaskCard.styles.ts` |
| Test File | 対象ファイル名 + .test.ts(x) | `TaskCard.test.tsx` |
| Type Definition | camelCase + .types.ts | `api.types.ts` |
| Constants | UPPER_SNAKE_CASE (変数) | `MAX_RETRY_COUNT` |
| Hook | use + PascalCase | `useTaskManager.ts` |

### 3.2 ディレクトリ内のindex.ts

```typescript
// components/common/Button/index.ts
export { default as Button } from './Button';
export * from './Button.types';
```

### 3.3 バレルエクスポート

```typescript
// components/common/index.ts
export * from './Button';
export * from './Input';
export * from './Modal';
```

---

## 4. コード配置ガイドライン

### 4.1 画面コンポーネント（screens/）

**配置基準**:
- ナビゲーションで直接遷移される画面
- 独立したルートを持つコンポーネント

**例**:
```typescript
// screens/calendar/CalendarMonthScreen.tsx
export const CalendarMonthScreen: React.FC = () => {
  // 画面ロジック
};
```

### 4.2 共通コンポーネント（components/）

**配置基準**:
- 2箇所以上で使用される
- 独立した機能を持つ
- UIの再利用可能な部品

**ディレクトリ構成**:
```
components/common/Button/
├── Button.tsx              # メインコンポーネント
├── Button.styles.ts        # スタイル定義
├── Button.types.ts         # 型定義
├── Button.test.tsx         # テスト
└── index.ts               # エクスポート
```

### 4.3 サービス層（services/）

**配置基準**:
- 外部APIとの通信
- プラットフォーム固有の機能
- サードパーティサービス連携

**例**:
```typescript
// services/api/client.ts
export class ApiClient {
  private baseURL: string;

  async request<T>(config: RequestConfig): Promise<T> {
    // API通信ロジック
  }
}
```

### 4.4 状態管理（store/）

**配置基準**:
- グローバルな状態
- 複数画面で共有される状態
- 永続化が必要な状態

**例**:
```typescript
// store/slices/taskSlice.ts
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      // ロジック
    },
  },
});
```

---

## 5. 設定ファイル

### 5.1 環境変数（.env）

```bash
# .env.development
API_BASE_URL=https://dev-api.unifiedcal.com
FIREBASE_API_KEY=xxx
SENTRY_DSN=xxx

# .env.production
API_BASE_URL=https://api.unifiedcal.com
FIREBASE_API_KEY=yyy
SENTRY_DSN=yyy
```

### 5.2 TypeScript設定（tsconfig.json）

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@constants/*": ["src/constants/*"]
    }
  }
}
```

### 5.3 ESLint設定（.eslintrc.js）

```javascript
module.exports = {
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react-native/no-inline-styles': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
```

---

## 6. Git管理

### 6.1 .gitignore

```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Expo
.expo/
dist/
web-build/

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Testing
coverage/

# Build
android/app/build/
ios/build/
```

### 6.2 ブランチ戦略

```
main                    # 本番環境
├── develop            # 開発環境
│   ├── feature/xxx    # 機能開発
│   ├── bugfix/xxx     # バグ修正
│   └── chore/xxx      # その他の変更
├── release/x.x.x      # リリース準備
└── hotfix/xxx         # 緊急修正
```

---

## 7. ビルド成果物

### 7.1 iOS

```
ios/build/
├── Build/
│   └── Products/
│       └── Release-iphoneos/
│           └── UnifiedCal.app
└── UnifiedCal.ipa
```

### 7.2 Android

```
android/app/build/
├── outputs/
│   ├── apk/
│   │   └── release/
│   │       └── app-release.apk
│   └── bundle/
│       └── release/
│           └── app-release.aab
```

---

## 8. スクリプト

### 8.1 package.json scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "build:ios": "eas build --platform ios",
    "build:android": "eas build --platform android",
    "submit:ios": "eas submit --platform ios",
    "submit:android": "eas submit --platform android"
  }
}
```

### 8.2 カスタムスクリプト（scripts/）

```
scripts/
├── setup.sh              # 初期セットアップ
├── generate-component.js # コンポーネント生成
├── update-version.js     # バージョン更新
└── clean.sh             # クリーンアップ
```

---

## 9. 依存関係管理

### 9.1 主要パッケージ

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "expo": "~50.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-navigation": "^6.0.0",
    "react-native-calendars": "^1.1300.0",
    "react-native-reanimated": "^3.6.0",
    "react-native-gesture-handler": "^2.14.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 9.2 バージョン管理ポリシー

- **メジャー更新**: 四半期ごとに検討
- **マイナー更新**: 月次で適用
- **パッチ更新**: 発見次第即座に適用
- **セキュリティ更新**: 24時間以内に対応

---

## 10. まとめ

### 10.1 重要な原則

1. **一貫性**: 命名規則とディレクトリ構造を厳守
2. **モジュール性**: 機能ごとに適切に分離
3. **再利用性**: 共通コンポーネントの活用
4. **保守性**: 明確な責任分離と配置

### 10.2 チェックリスト

新しいコードを追加する際は、以下を確認：

- [ ] 適切なディレクトリに配置されているか
- [ ] 命名規則に従っているか
- [ ] 必要なテストが含まれているか
- [ ] TypeScript型が定義されているか
- [ ] エクスポートが適切に設定されているか

この構造定義に従うことで、スケーラブルで保守しやすいコードベースを維持できます。