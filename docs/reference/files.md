# ファイルとフォルダ

リポジトリのどこに何があるかの一覧です。パスはリポジトリの直下からの相対です。

## 直下

| パス | 中身 |
|---|---|
| `README.md` | リポジトリの紹介（GitHub のトップに出る） |
| `CLAUDE.md` | AI（Claude Code）の入口。守ることとコマンドだけ |
| `index.html` | アプリの HTML（Vite が読む） |
| `package.json` / `package-lock.json` | 依存パッケージと npm スクリプト |
| `vite.config.ts` | Vite と Vitest の設定。`base: './'`、index.json を作るプラグインの登録 |
| `playwright.config.ts` | E2E テストの設定。ビルドして `http://localhost:4173` で確かめる |
| `eslint.config.js` | ESLint の設定 |
| `tsconfig*.json` | TypeScript の設定 |

## アプリ（`src/`）

| パス | 中身 |
|---|---|
| `src/main.tsx` / `src/App.tsx` | 起動とルーティング（[画面と URL](url.md)） |
| `src/pages/` | 画面。`CaseListPage`（一覧）・`CaseDetailPage`（詳細）・`CaseNewPage`（新規作成）・`CaseEditPage`（編集）・`StatsPage`（統計）・`ResourcesPage`（参考資料）・`SettingsPage`（設定）・`AboutPage`（About） |
| `src/components/case-list/` | 一覧の部品（カード・フィルタ・検索・並べ替え・集計・ページ送り） |
| `src/components/case-detail/` | 詳細の部品（技術情報・出典・プレビューと「GitHubで提出」） |
| `src/components/case-form/` | フォームの部品（基本項目・技術項目・出典・タグ・図・レビュー状況・AI アシスト） |
| `src/components/figures/` | 図の表示（`DataFlowDiagram`・`RiskMatrix`・`UtilityChart`・振り分けの `FigureRenderer`） |
| `src/components/resources/` | 参考資料のカード |
| `src/components/layout/` | ヘッダー・フッター・レイアウト |
| `src/context/CaseContext.tsx` | 事例データを読み込み、画面全体に渡す |
| `src/hooks/useFilter.ts` | 検索・フィルタ・並べ替え・ページ送り。URL と同期する |
| `src/lib/data-loader.ts` | `index.json` と各 `case.json` を取ってくる |
| `src/lib/resource-loader.ts` | 参考資料の読み込み（スキーマに合わないものは読み飛ばす）・絞り込み・並べ替え・URL との変換 |
| `src/lib/import-case.ts` | 「AIの出力をインポート」で貼った JSON を読み取る |
| `src/lib/export-import.ts` | 設定画面のエクスポート（JSON のダウンロード） |
| `src/lib/summary.ts` | 集計・統計の計算 |
| `src/schemas/case.schema.ts` | case.json の形（Zod）。フォームの検査に使う |
| `src/schemas/resource.schema.ts` | 参考資料の形（Zod）。検査スクリプトで使う |
| `src/types/case.ts` | case.json の型（TypeScript） |
| `src/constants/categories.ts` | 選択肢（地域・分野・ユースケース分類・技術カテゴリ・レビュー状態・図のノード） |
| `src/constants/styles.ts` | 選択肢ごとの色 |
| `src/constants/prompts.ts` | AI アシストのプロンプト（新規作成用・補完用）の原本 |
| `src/constants/resources.ts` | 参考資料の選択肢（発行元の種類・資料の種類・取り込み状況） |
| `src/__tests__/` | 単体テスト（Vitest） |

## データ（`public/cases/`・`public/resources/`）

| パス | 中身 |
|---|---|
| `public/cases/<id>/case.json` | 1事例のデータ（[case.json の形式](case-json.md)） |
| `public/cases/index.json` | 事例 ID の一覧。ビルド時と開発サーバーで自動で作られる。`.gitignore` 済みでコミットしない |
| `public/resources/<id>.json` | 参考資料1件（[参考資料の形式](resources-json.md)） |
| `public/resources/index.json` | 参考資料 ID の一覧。自動で作られる。コミットしない |

## スクリプトとプラグイン

| パス | 中身 |
|---|---|
| `scripts/validate-cases.ts` | 全 case.json の検査（[case.json の形式](case-json.md)の「検査の内容」） |
| `scripts/validate-resources.ts` | 全参考資料の検査（[参考資料の形式](resources-json.md)の「検査の内容」） |
| `scripts/generate-cdei-cases.py` | 英国 CDEI の PETs ガイドから事例を作ったときのスクリプト（一度きりの取り込み用。PR #80） |
| `plugins/generate-case-index.ts` | `public/cases/index.json` を作る Vite プラグイン |
| `plugins/generate-resource-index.ts` | `public/resources/index.json` を作る Vite プラグイン |
| `plugins/__tests__/` | プラグインのテスト |
| `tests/e2e/cases.spec.ts` | E2E テスト（Playwright） |

## 自動処理（`.github/workflows/`）

| パス | 中身 |
|---|---|
| `.github/workflows/ci.yml` | CI。PR と `main`・`develop` への push で動く |
| `.github/workflows/deploy.yml` | `main` への push で GitHub Pages に公開する |

詳しくは[環境と自動処理](environments.md)。

## Claude Code（`.claude/`）

| パス | 中身 |
|---|---|
| `.claude/settings.json` | 応答言語（`language`）など |
| `.claude/skills/case-create/` | `/case-create`：文献から case.json を作る |
| `.claude/skills/case-enrich/` | `/case-enrich`：既存の事例を補完する |
| `.claude/skills/case-review/` | `/case-review`：出典と照合してレビューする |
| `.claude/agents/case-reviewer.md` | レビューを行うエージェント |

## ドキュメント（`docs/`）

| パス | 中身 |
|---|---|
| `docs/README.md` | 入口 |
| `docs/glossary.md` | 用語集 |
| `docs/slides.md` | スライドの原本 |
| `docs/tutorial/` `docs/howto/` `docs/reference/` `docs/explanation/` | 4種類のドキュメント |
| `docs/index.html` | 閲覧ページ（Markdown を表示するだけ） |
| `docs/slides.html` | スライドの表示（`slides.md` を表示するだけ） |
