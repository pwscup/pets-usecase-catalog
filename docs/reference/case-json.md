# case.json の形式

1事例 = `public/cases/<id>/case.json` の1ファイルです。形の定義は `src/schemas/case.schema.ts`（Zod）と `src/types/case.ts`、選択肢は `src/constants/categories.ts` が原本です。食い違ったらコードが正です。

## 項目

| 項目 | 型 | 必須 | 内容 |
|---|---|---|---|
| `id` | 文字列 | ○ | 事例 ID。フォルダ名と同じ。新しく作るときは UUID |
| `title` | 文字列 | ○ | `{組織名}：{事例の内容}`。技術名は入れない。40〜60文字が目安 |
| `region` | `国内` / `国外` | | 地域 |
| `domain` | 文字列 | | 分野（下の選択肢） |
| `domain_sub` | 文字列 | | 分野のサブカテゴリ（例：保険、製薬、がん臨床）。検索の対象 |
| `organization` | 文字列 | | 実施組織。検索の対象 |
| `technology_category` | 配列 | | 技術カテゴリ（下の選択肢）。無いと読み込み時に `["synthetic_data"]` になる |
| `usecase_category` | 配列 | | ユースケース分類（下の選択肢）。文字列1つでも読める |
| `review_status` | 文字列 | | レビュー状態（下の選択肢）。無いと読み込み時に `ai_generated` になる |
| `occurred_at` | `YYYY` / `YYYY-MM` / `YYYY-MM-DD` / `null` | | 事例が起きた時期。わからなければ `null` |
| `summary` | 文字列 | ○ | 課題と背景。解決策は書かない。画面の「課題」 |
| `value_proposition` | 文字列 | | PETs による解決と成果。画面の「価値」 |
| `privacy_enhancement_method` | 文字列 | | プライバシー強化の手法（技術・パラメータ） |
| `safety_assurance_method` | 文字列 | | 安全性の保証（再識別リスク評価・監査・アクセス制御など） |
| `utility_evaluation_method` | 文字列 | | 有用性の評価（精度比較・下流タスクなど） |
| `tags` | 文字列の配列 | | 検索用のキーワード。2〜4個が目安 |
| `sources` | 配列 | ○ | 出典。最低1件（下の表） |
| `figures` | 配列 | | 図（下の表） |
| `editorial_notes` | 文字列の配列 | | 編集上のメモ |
| `image` | 文字列 | | 画像 |
| `status` | `seed` / `user` / `draft` / `published` / `archived` | | データの由来・状態 |
| `created_at` | 文字列 | ○※ | 作成日時（ISO 8601） |
| `updated_at` | 文字列 | ○※ | 更新日時（ISO 8601、UTC）。変更したら更新する |

○ は検査（`scripts/validate-cases.ts`）で必須。○※ はスキーマで必須だが、検査スクリプトでは見ていない。

文献から読み取れない文字列の項目は「調査中」と書きます。空欄にしません。

### sources（出典）

| 項目 | 型 | 内容 |
|---|---|---|
| `source_type` | `web` / `pdf` | 種類 |
| `title` | 文字列 | 文献の正式なタイトル |
| `url` | 文字列（必須） | URL |
| `note` | 文字列 | この文献から何を参照したか。本文を読めなかったら、そう書く |

### figures（図）

| `type` | `data` の形 |
|---|---|
| `data_flow` | `nodes`: `{ id, label, category }` の配列、`edges`: `{ from, to, label }` の配列 |
| `risk_matrix` | `axes`: `{ impact_levels, likelihood_levels }`、`cells`: `{ impact, likelihood, note }` の配列 |
| `utility_chart` | `series`: `{ name, points: { x, y } の配列 }` の配列 |

どの図にも `title`（必須）と `note` があります。

`data_flow` のノードの `category` と ID の付け方：

| category | 意味 | ID の先頭 |
|---|---|---|
| `source` | 元データ | `s` |
| `constraint` | 課題・制約 | `s` |
| `process` | PETs の手法 | `p` |
| `application` | 活用先 | `a` |
| `outcome` | 成果 | `a` |

並びは source → constraint → process → application → outcome の順です。

## 選択肢

| 項目 | 選択肢 |
|---|---|
| `region` | `国内`, `国外` |
| `domain` | `金融`, `医療`, `公共`, `通信`, `モビリティ`, `IT`, `エネルギー`, `小売`, `製造` |
| `usecase_category` | `組織内データ共有`, `組織間データ共有`, `外部分析者活用`, `R&D`, `データ販売`, `フィージビリティ検証`, `公的利用` |
| `technology_category` | `synthetic_data`（合成データ）, `differential_privacy`（差分プライバシー）, `anonymization`（匿名化）, `federated_learning`（連合学習）, `secure_computation`（秘密計算）, `distributed_analytics`（分散データ分析） |
| `review_status` | `ai_generated`（未レビュー）, `under_review`（レビュー中）, `human_reviewed`（レビュー済）, `flagged`（要確認） |

選択肢の判断基準は `src/constants/prompts.ts` の表にあります。選択肢を足すときは[選択肢を増やす](../howto/add-option.md)。

## 検査の内容

`npx tsx scripts/validate-cases.ts` が見ること（CI とデプロイで実行される）：

| 検査 | エラーの例 |
|---|---|
| JSON として読める | `JSON parse error` |
| 配列ではなくオブジェクト | `case.json must be a JSON object` |
| `{cases:[...]}` で包んでいない | `case.json has a "cases" array wrapper` |
| `schema_version` を持っていない | `case.json has "schema_version"` |
| `id`・`title`・`summary`・`sources` がある | `Missing required field` |
| `id` がフォルダ名と同じ | `"id" field (...) does not match directory name` |
| `sources` が空でない配列 | `"sources" is empty` |
| `title` が空でない | `"title" must be a non-empty string` |
| `index.json` があれば、フォルダと一致している | `Directories not listed in index.json` |

> この検査は Zod スキーマを使っていません。選択肢の値や `occurred_at` の形は検査されないので、レビューで確かめます。

## 例

`public/cases/rpt-0015/case.json`（長い文は途中で省略）。

```json
{
  "id": "rpt-0015",
  "title": "鹿島建設：スマートビルのデータ活用効率化を目的とした合成データによる同意要件の簡素化",
  "region": "国内",
  "domain": "製造",
  "organization": "鹿島建設 / Betterdata",
  "usecase_category": [
    "組織内データ共有"
  ],
  "technology_category": [
    "synthetic_data"
  ],
  "review_status": "human_reviewed",
  "occurred_at": null,
  "summary": "鹿島建設のスマートビル領域では、建物利用者のセンサーデータやIoTデータを活用す……",
  "value_proposition": "Betterdata社のセルフサービス型合成データ生成プラットフォームを導入し、……",
  "privacy_enhancement_method": "Betterdata社のセルフサービス型合成データ生成プラットフォームを使用。ス……",
  "safety_assurance_method": "合成データは実在の利用者情報を含まないため、個別の同意取得が不要に。規制準拠を維……",
  "utility_evaluation_method": "合成データを用いたスマートビル運用の分析・最適化の精度を検証し、運用コスト60%……",
  "tags": [
    "スマートビル",
    "IoT",
    "同意不要化",
    "60%コスト削減"
  ],
  "sources": [
    {
      "source_type": "web",
      "title": "Betterdata: Kajima Corporation",
      "url": "https://www.betterdata.ai/case-study/kajima-corporation",
      "note": "Betterdataによる鹿島建設事例紹介"
    }
  ],
  "figures": [],
  "status": "draft",
  "created_at": "2026-03-06T00:00:00+09:00",
  "updated_at": "2026-04-22T13:25:49Z"
}
```
