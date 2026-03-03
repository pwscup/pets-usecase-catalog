# spec.md — 合成データ ユースケースカタログ（GitHub Pages）

作成日: 2026-02-26
対象: GitHub Pages（静的ホスティング）で動く「事例登録・検索・詳細表示」アプリ

---

## 1. 概要（目的 / 背景）

合成データ（Synthetic Data）の実用事例（ユースケース）を、一定の整理項目で構造化して蓄積し、
- 一覧（検索・フィルタ）
- 詳細（説明＋図表）
を通じて、提案・PoC・社内啓発に再利用できる形で提供する。

本仕様は、外部資料（例：JRI PDF、NSSOL記事）から抽出した事例データを `seed_cases.json` に流し込み、
アプリの初期データとして利用することを前提とする。

---

## 2. スコープ

### 2.1 やること（Must）
- 事例データのロード
  - 同梱データ（`seed_cases.json`）の読み込み
  - ユーザ追加データ（LocalStorage）の読み込み
  - 両者をマージして表示
- 事例一覧（検索・フィルタ・ソート）
- 事例詳細（記載項目＋図表）
- 事例追加（フォーム）
- エクスポート/インポート（JSON）

### 2.2 やらないこと（初期スコープ外）
- サーバサイドDB/認証
- 機微情報（個人情報、顧客識別情報）の保管
- 画像ファイルのアップロード管理（初期は構造データ→描画のみ）

---

## 3. データモデル

### 3.1 スキーマ方針
- 事例1件を `Case` として JSON で保持する
- 生成手法/評価手法は、出典に明示がない場合は「調査中」を許容する
- 「安全性評価」と「有用性評価」を明確に分離する（混同しない）

### 3.2 Caseスキーマ（v1）

#### 3.2.1 ルート
- `schema_version` : string（例: "1.0"）
- `cases` : Case[]

#### 3.2.2 Case
- `id` : string（UUID推奨）
- `title` : string
- `region` : "国内" | "国外"
  - 原則: 企業・組織の所在（または記事記載の管轄）で判断
- `domain` : string（例: 金融、医療、公共、通信、人流、画像認識 等）
- `organization` : string（企業・組織名）
- `usecase_category` : string（例: 組織内共有、外部共有、テストデータ、R&D、フィージビリティ検証、データ販売 等）
- `summary` : string（出典記載ベースで短く）
- `outcomes` : string（効果・アウトカム。記載がない場合は「調査中」）
- `synthetic_generation_method` : string（例: カーネル密度推定、Timeseries DGAN、統計情報と関係を学習…／調査中）
- `safety_evaluation_method` : string（例: 差分プライバシー、プライバシーリスク評価…／調査中）
- `utility_evaluation_method` : string（例: 実データとの分析結果比較、下流タスク評価…／調査中）
- `tags` : string[]（検索性のための補助タグ）
- `sources` : Source[]（根拠。最低1件）
- `figures` : Figure[]（任意。構造データで保持）
- `status` : "seed" | "user" | "draft" | "published" | "archived"
- `created_at` : string（ISO8601）
- `updated_at` : string（ISO8601）

#### 3.2.3 Source
- `source_type` : "pdf" | "web"
- `title` : string
- `url` : string
- `note` : string（任意：該当箇所/補足）

#### 3.2.4 Figure（初期はテンプレ3種）
- `type` : "data_flow" | "risk_matrix" | "utility_chart"
- `title` : string
- `data` : object（typeに応じた構造）
- `note` : string（任意）

##### data_flowのdata
- `nodes`: { `id`, `label`, `category` }[]
- `edges`: { `from`, `to`, `label` }[]

##### risk_matrixのdata
- `axes`: { `impact_levels`: string[], `likelihood_levels`: string[] }
- `cells`: { `impact`: string, `likelihood`: string, `note`: string }[]

##### utility_chartのdata
- `series`: { `name`: string, `points`: { `x`: string, `y`: number }[] }[]

---

## 4. データロードと優先順位

### 4.1 データソース
- 同梱初期データ: `seed_cases.json`
- ユーザ追加データ: LocalStorage（key例: `sd_uc_catalog_cases_v1`）

### 4.2 マージルール
- 一覧表示は「同梱 + ユーザ追加」の結合
- `id` が衝突した場合は「ユーザ側」を優先（上書き）
- `status=seed` は同梱由来を示す（編集は可能）

---

## 5. 画面・UX

### 5.1 画面一覧
- `/`（一覧）
- `/#/cases/:id`（詳細）
- `/#/cases/new`（新規作成）
- `/#/cases/:id/edit`（編集）
- `/#/settings`（インポート/エクスポート、保存方式表示）
- `/#/about`（免責、入力禁止事項）

### 5.2 一覧（検索・フィルタ）
- フリーワード対象: `title`, `summary`, `organization`, `tags`
- フィルタ:
  - region（国内/国外）
  - domain
  - usecase_category
  - synthetic_generation_method（調査中含む）
  - safety_evaluation_method（調査中含む）
  - utility_evaluation_method（調査中含む）
  - source（JRI / NSSOL など）

### 5.3 詳細
- 基本情報（title, region, domain, organization, category）
- 記述（summary, outcomes）
- 技術情報（generation / safety eval / utility eval）
- 出典（sourcesをリンク表示）
- 図表（figuresがあれば表示、なければ非表示）

---

## 6. 入力（フォーム）

### 6.1 必須項目（初期）
- title
- region（国内/国外）
- domain
- organization
- usecase_category
- summary
- sources（最低1件）

### 6.2 任意項目
- outcomes（未記載でも可）
- generation / safety eval / utility eval（調査中を許容）
- tags
- figures

---

## 7. 非機能要件

- GitHub Pages上で完結
- 500件規模までのクライアント検索を想定
- 機微情報の入力を禁止（Aboutに明記）
- 互換: Chrome/Edge/Safari 最新版近傍

---

## 8. 受け入れ基準

- `seed_cases.json` を読み込み、一覧に表示できる
- フィルタ（国内/国外、領域、生成手法、安全性評価、有用性評価）で絞り込みできる
- 詳細画面で sources がリンクとして表示される
- 「調査中」値も通常の値として検索/フィルタ対象になる
- エクスポートしたJSONをインポートして復元できる

---

## 9. 未決事項
- 図表テンプレ（3種）を初期から強制するか（推奨: 任意）
- seedデータの更新運用（PR更新か、インポートで差し替えか）
- 類似事例推薦の実装方針（タグ一致 / ベクトル検索は将来）

---

## 10. 変更履歴
- 2026-02-26: v1 初版（seed_cases.json 流し込み前提のスキーマ、生成/安全性/有用性評価の分離を反映）
