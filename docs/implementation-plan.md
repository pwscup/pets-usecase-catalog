# 実装計画書 — 合成データ ユースケースカタログ

作成日: 2026-02-26
対象仕様: docs/spec.md v1

---

## 1. 推奨技術スタック

### 1.1 フレームワーク: **React 19 + TypeScript**

| 候補 | 評価 | 理由 |
|------|------|------|
| **React + TS** | ★★★ 推奨 | エコシステム最大、図表ライブラリ充実、TypeScriptとの相性◎、GitHub Pagesデプロイ実績豊富 |
| Vue 3 + TS | ★★☆ | 軽量で学習コスト低いが、図表系ライブラリの選択肢がやや少ない |
| Svelte | ★★☆ | バンドルサイズ最小だが、エコシステムがまだ成熟途上 |
| バニラJS | ★☆☆ | 状態管理・ルーティング・フォームを自前実装する工数が大きい |

**選定理由**:
- 500件規模のクライアントサイド検索・フィルタを効率的に扱える仮想DOM
- Figure描画（data_flow, risk_matrix, utility_chart）に対応するライブラリが豊富
- TypeScriptでCaseスキーマの型安全性を担保

### 1.2 ビルドツール: **Vite**
- 高速HMR、React公式推奨
- `vite-plugin-gh-pages` 等でGitHub Pagesデプロイ容易
- `base` 設定でサブパスデプロイ対応

### 1.3 CSSフレームワーク: **Tailwind CSS v4**
- ユーティリティファーストで一貫性のあるUI構築
- カスタムテーマによるブランドカラー対応
- パージ機能で本番バンドルサイズ最小化

### 1.4 UIコンポーネント補助: **Headless UI（@headlessui/react）**
- ドロップダウン、モーダル、コンボボックス等のアクセシブルなインタラクション
- Tailwindとの公式連携

### 1.5 図表描画ライブラリ

| Figure type | ライブラリ | 理由 |
|-------------|-----------|------|
| `data_flow` | **React Flow** | ノード・エッジベースの図をインタラクティブに描画。nodes/edges構造と直接対応 |
| `risk_matrix` | **自前実装（CSS Grid + Tailwind）** | 2軸マトリクスはシンプルなグリッドで十分。外部ライブラリ不要 |
| `utility_chart` | **Recharts** | React向け軽量チャートライブラリ。series/pointsをLineChart/BarChartに直接マッピング可能 |

### 1.6 ルーティング: **React Router v7（HashRouter）**
- GitHub Pagesはサーバサイドリダイレクト不可のためHashRouter必須
- `/#/cases/:id`, `/#/cases/new` 等のルート設計に対応

### 1.7 状態管理: **React Context + useReducer**
- 500件規模のデータには十分
- 外部ライブラリ（Redux, Zustand）は過剰。必要に応じて後からZustandへ移行可能

### 1.8 フォームバリデーション: **React Hook Form + Zod**
- Zodスキーマで Case スキーマのバリデーションを型安全に定義
- React Hook Formで効率的なフォーム状態管理

### 1.9 その他
- **UUID生成**: `crypto.randomUUID()`（ブラウザネイティブ）
- **日付**: `Date.toISOString()`（ライブラリ不要）
- **テスト**: Vitest + React Testing Library
- **リンター**: ESLint + Prettier

---

## 2. フェーズ分割

```
Phase 1: プロジェクト初期化 + 一覧表示（MVP）
Phase 2: 検索・フィルタ・ソート機能
Phase 3: 詳細表示（Figure描画含む）
Phase 4: CRUD（新規作成・編集フォーム）
Phase 5: インポート/エクスポート・設定・About画面
Phase 6: GitHub Pagesデプロイ・CI/CD設定
```

---

## 3. 各フェーズのタスク分解

### Phase 1: プロジェクト初期化 + 一覧表示（MVP）
**ゴール**: seed_cases.json を読み込み、一覧画面にカード形式で表示

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 001 | Vite + React + TypeScript プロジェクト初期化 | `npm create vite@latest`、Tailwind CSS導入、ESLint/Prettier設定 |
| 002 | TypeScript型定義 | Case, Source, Figure, DataFlow, RiskMatrix, UtilityChart の型/インターフェース定義 |
| 003 | Zodバリデーションスキーマ定義 | Case型に対応するZodスキーマ、インポート時バリデーション用 |
| 004 | seed_cases.json 作成 | 仕様に準拠した初期データ（3〜5件のサンプルデータ） |
| 005 | データローダー実装 | seed_cases.json fetch + LocalStorage読み込み + マージロジック（id衝突時ユーザ優先） |
| 006 | HashRouter + ページレイアウト | React Router設定、共通レイアウト（ヘッダー/フッター/メインコンテンツ） |
| 007 | 一覧画面（CaseListPage） | カード形式での事例一覧表示。title, region, domain, organization, category を表示 |

### Phase 2: 検索・フィルタ・ソート機能
**ゴール**: 一覧画面でフリーワード検索、各種フィルタ、ソートが動作

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 008 | フリーワード検索 | title, summary, organization, tags を対象とした部分一致検索 |
| 009 | フィルタUI（サイドバー/ドロワー） | region, domain, usecase_category, generation_method, safety_eval, utility_eval, source のフィルタ |
| 010 | フィルタロジック | 複数フィルタの AND 結合、「調査中」値のフィルタ対応 |
| 011 | ソート機能 | title(辞書順), updated_at(新しい順/古い順), domain でのソート |
| 012 | フィルタ状態のURL同期 | クエリパラメータでフィルタ状態を保持し、ブックマーク/共有可能に |

### Phase 3: 詳細表示（Figure描画含む）
**ゴール**: 事例詳細画面で全情報と図表を表示

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 013 | 詳細画面（CaseDetailPage）基本情報 | title, region, domain, organization, category, summary, outcomes の表示 |
| 014 | 技術情報セクション | generation_method, safety_eval, utility_eval の表示 |
| 015 | 出典リンク表示 | sources配列をリンク付きリストで表示（pdf/webアイコン区別） |
| 016 | data_flow 描画コンポーネント | React Flowを使ったノード・エッジ図の表示 |
| 017 | risk_matrix 描画コンポーネント | CSS Gridベースのマトリクス表示 |
| 018 | utility_chart 描画コンポーネント | Rechartsを使ったグラフ表示 |
| 019 | Figure統合表示 | figures配列のtype判定 → 対応コンポーネントへの振り分け |

### Phase 4: CRUD（新規作成・編集フォーム）
**ゴール**: 事例の新規作成・編集・削除が可能

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 020 | フォーム基盤（React Hook Form + Zod） | Case入力フォームのスケルトン、バリデーション連携 |
| 021 | 基本項目入力フォーム | title, region, domain, organization, usecase_category, summary |
| 022 | 技術項目入力フォーム | generation_method, safety_eval, utility_eval（「調査中」プリセット付き） |
| 023 | Sources動的追加フォーム | 出典の動的追加/削除、source_type選択、URL/titleバリデーション |
| 024 | Tags入力 | タグのカンマ区切り入力 or チップ形式入力 |
| 025 | LocalStorage保存ロジック | 新規作成→LocalStorage保存、status="user"自動付与、created_at/updated_at自動設定 |
| 026 | 編集機能 | 既存Case読み込み→フォームプリフィル→更新保存、updated_at更新 |
| 027 | 削除機能 | 確認ダイアログ付き削除、seedデータの場合は「アーカイブ」扱い |

### Phase 5: インポート/エクスポート・設定・About
**ゴール**: データのポータビリティ確保、アプリ情報表示

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 028 | エクスポート機能 | 全事例(seed+user)または選択事例をJSON出力、ファイルダウンロード |
| 029 | インポート機能 | JSONファイル読み込み、Zodバリデーション、マージ（id衝突時の上書き確認） |
| 030 | 設定画面（SettingsPage） | インポート/エクスポートUI、LocalStorageクリア、保存方式表示 |
| 031 | About画面 | 免責事項、機微情報入力禁止の明記、アプリバージョン表示 |

### Phase 6: GitHub Pagesデプロイ・CI/CD
**ゴール**: mainブランチへのpushで自動デプロイ

| タスク番号 | タスク | 詳細 |
|-----------|--------|------|
| 032 | Vite設定調整 | `base` パス設定、ビルド最適化 |
| 033 | GitHub Actions ワークフロー | mainプッシュ時の自動ビルド+デプロイ（`actions/deploy-pages`） |
| 034 | 404.html 対応 | SPA用の404リダイレクト（HashRouterなので基本不要だが念のため） |
| 035 | 本番動作確認 | デプロイ後の全画面動作確認チェックリスト |

---

## 4. ディレクトリ構成案

```
src/
├── main.tsx                    # エントリーポイント
├── App.tsx                     # ルート + レイアウト
├── index.css                   # Tailwind directives
│
├── types/
│   ├── case.ts                 # Case, Source, Figure 型定義
│   └── index.ts                # 型エクスポート
│
├── schemas/
│   └── case.schema.ts          # Zod バリデーションスキーマ
│
├── hooks/
│   ├── useCases.ts             # Case CRUD カスタムフック
│   ├── useFilter.ts            # フィルタ・検索ロジック
│   └── useLocalStorage.ts      # LocalStorage永続化
│
├── lib/
│   ├── data-loader.ts          # seed_cases.json + LocalStorage マージ
│   ├── storage.ts              # LocalStorage操作ユーティリティ
│   └── export-import.ts        # エクスポート/インポート処理
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   │
│   ├── case-list/
│   │   ├── CaseCard.tsx        # 一覧カード
│   │   ├── SearchBar.tsx       # フリーワード検索
│   │   ├── FilterPanel.tsx     # フィルタサイドバー
│   │   └── SortSelect.tsx      # ソート選択
│   │
│   ├── case-detail/
│   │   ├── BasicInfo.tsx       # 基本情報セクション
│   │   ├── TechInfo.tsx        # 技術情報セクション
│   │   ├── SourceList.tsx      # 出典リスト
│   │   └── FigureRenderer.tsx  # Figure振り分け
│   │
│   ├── case-form/
│   │   ├── CaseForm.tsx        # フォーム全体
│   │   ├── BasicFields.tsx     # 基本項目
│   │   ├── TechFields.tsx      # 技術項目
│   │   ├── SourceFields.tsx    # 出典動的フォーム
│   │   └── TagInput.tsx        # タグ入力
│   │
│   ├── figures/
│   │   ├── DataFlowDiagram.tsx # React Flow
│   │   ├── RiskMatrix.tsx      # CSS Grid
│   │   └── UtilityChart.tsx    # Recharts
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       └── ...                 # 共通UIパーツ
│
├── pages/
│   ├── CaseListPage.tsx        # / 一覧
│   ├── CaseDetailPage.tsx      # /#/cases/:id 詳細
│   ├── CaseNewPage.tsx         # /#/cases/new 新規
│   ├── CaseEditPage.tsx        # /#/cases/:id/edit 編集
│   ├── SettingsPage.tsx        # /#/settings
│   └── AboutPage.tsx           # /#/about
│
├── context/
│   └── CaseContext.tsx         # Case データの Context + Provider
│
└── __tests__/                  # テスト

public/
├── seed_cases.json             # 初期データ
└── favicon.svg
```

---

## 5. GitHub Pages デプロイ手順

### 5.1 Vite 設定（vite.config.ts）
```ts
export default defineConfig({
  base: '/<repo-name>/',  // リポジトリ名に合わせる
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
```

### 5.2 GitHub Actions ワークフロー（.github/workflows/deploy.yml）
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 5.3 リポジトリ設定
1. Settings → Pages → Source: 「GitHub Actions」を選択
2. mainブランチへのpushで自動デプロイが実行される

---

## 6. 依存関係・実装順序

```
Phase 1 (MVP)
  └──→ Phase 2 (検索・フィルタ)
         └──→ Phase 3 (詳細表示)
                └──→ Phase 4 (CRUD)
                       └──→ Phase 5 (設定・About)
                              └──→ Phase 6 (デプロイ)
```

各フェーズは前フェーズの完了を前提とするが、Phase 6（CI/CD設定）は Phase 1 完了後に並行で先行着手可能（早期からデプロイパイプラインを整備し、各フェーズ完了時に動作確認可能にする運用を推奨）。

---

## 7. 主要パッケージ一覧

```json
{
  "dependencies": {
    "react": "^19.0",
    "react-dom": "^19.0",
    "react-router-dom": "^7.0",
    "react-hook-form": "^7.0",
    "@hookform/resolvers": "^3.0",
    "zod": "^3.0",
    "@xyflow/react": "^12.0",
    "recharts": "^2.0",
    "@headlessui/react": "^2.0"
  },
  "devDependencies": {
    "typescript": "^5.0",
    "vite": "^6.0",
    "@vitejs/plugin-react": "^4.0",
    "tailwindcss": "^4.0",
    "eslint": "^9.0",
    "prettier": "^3.0",
    "vitest": "^3.0",
    "@testing-library/react": "^16.0"
  }
}
```
