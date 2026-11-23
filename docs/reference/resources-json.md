# 参考資料の形式

「読んだほうがいいもの」（事例集・当局のガイド・報告書・標準など）を1件ずつ置くデータの形式です。1件 = `public/resources/<id>.json` の1ファイルです。

形の定義は `src/schemas/resource.schema.ts`（Zod）、選択肢は `src/constants/resources.ts` が原本です。食い違ったらコードが正です。足し方は[参考資料を1件追加する](../howto/add-resource.md)。

## 項目

| 項目 | 型 | 必須 | 内容 |
|---|---|---|---|
| `id` | 文字列 | ○ | 英小文字・数字をハイフンでつなぐ（例：`oecd-pets-repository`）。ファイル名と同じ |
| `title` | 文字列 | ○ | 原題のまま |
| `title_ja` | 文字列 | | 日本語の仮題（原題が日本語でないとき） |
| `publisher` | 文字列 | ○ | 発行元（例：`英国 情報コミッショナー事務局（ICO）`） |
| `publisher_type` | 選択肢 | ○ | 発行元の種類（下の表） |
| `country` | 文字列 | ○ | 国・地域（例：`国際`・`英国`・`シンガポール`・`日本`） |
| `kind` | 選択肢 | ○ | 資料の種類（下の表） |
| `technology_category` | 配列 | | 事例と同じ6種類。空なら技術を横断する資料 |
| `language` | 配列 | ○ | 2文字の言語コード（`ja`・`en`・`sv` など）。1つ以上 |
| `published_at` | `YYYY` / `YYYY-MM` / `YYYY-MM-DD` / `null` | | 公開日（改訂版なら改訂日）。本文で確かめられた粒度で書く |
| `url` | 文字列 | ○ | 資料の本体。`http(s)://` で始める |
| `links` | 配列 | | 本体以外の入口。`{ label, url }`（PDF 版・RSS・原語版など） |
| `description` | 文字列 | ○ | 何が書いてあるか。2〜3文。本文で確かめた範囲だけ |
| `recommended_for` | 文字列 | ○ | 誰が、どんな場面で読むとよいか。1文 |
| `related_case_tag` | 文字列 | | 事例集のとき、そこから取り込んだ事例に付けたタグ |
| `import_status` | 選択肢 | | 事例集からの取り込み状況（下の表）。**利用者の画面には出さない** |
| `import_note` | 文字列 | | 取り込みの経緯（Issue・PR 番号、未着手の理由など）。**利用者の画面には出さない** |
| `review_status` | 選択肢 | ○ | 事例と同じ4種類（`ai_generated`・`under_review`・`human_reviewed`・`flagged`） |
| `note` | 文字列 | | 何を確かめたか。本文を読めなかったら、そう書く |
| `created_at` / `updated_at` | 文字列 | ○ | ISO 8601 の日時（例：`2026-11-22T06:00:00.000Z`） |

定義にない項目は、打ち間違いとして検査で弾かれます。

## 画面での使われ方

参考資料は `#/resources`（[画面と URL](url.md)）に表示されます。

| 画面に出す | 画面に出さない |
|---|---|
| `title`（資料本体へのリンク）・`title_ja`・`publisher`・`country`・`published_at`・`language`・`kind`・`technology_category`・`description`・`recommended_for`・`links`・`review_status`（バッジ） | `import_status`・`import_note`（貢献者向け）・`publisher_type`・`note`・`created_at`・`updated_at` |

`related_case_tag` があると、カードに「この事例集から取り込んだ事例を見る」（一覧をそのタグで検索するリンク）が出ます。スキーマに合わない資料は、画面では読み飛ばします。

## 選択肢

| 項目 | 選択肢 |
|---|---|
| `publisher_type` | `国際機関`, `政府・規制当局`, `研究機関・大学`, `業界団体・非営利`, `企業` |
| `kind` | `事例集`, `ガイド・ガイダンス`, `報告書`, `標準・評価指針`, `入門・解説`, `論文` |
| `import_status` | `取り込み済み`, `一部取り込み`, `未着手`, `対象外` |

## 検査の内容

`npx tsx scripts/validate-resources.ts` が見ること（CI とデプロイで実行される）：

| 検査 | エラーの例 |
|---|---|
| JSON として読める | `JSON parse error` |
| スキーマに合う（必須項目・選択肢・形・定義にない項目） | `kind: Invalid option`、`published_at: YYYY / YYYY-MM / YYYY-MM-DD のどれか` |
| `id` がファイル名と同じ | `"id" (...) がファイル名 (...) と一致しない` |
| 同じ `url` の資料が二重に登録されていない | `url が ... と重複している` |

事例の検査（`validate-cases.ts`）と違い、Zod スキーマで全項目を検査します。

## 一覧（index.json）

`public/resources/index.json` は、ビルド時と開発サーバーの起動時に `plugins/generate-resource-index.ts` が自動で作ります。`.gitignore` 済みで、コミットしません。

## 例

```json
{
  "id": "nist-sp-800-226",
  "title": "NIST SP 800-226: Guidelines for Evaluating Differential Privacy Guarantees",
  "title_ja": "NIST SP 800-226 差分プライバシーの保証を評価するためのガイドライン",
  "publisher": "米国 国立標準技術研究所（NIST）",
  "publisher_type": "政府・規制当局",
  "country": "米国",
  "kind": "標準・評価指針",
  "technology_category": ["differential_privacy"],
  "language": ["en"],
  "published_at": "2025-03-06",
  "url": "https://csrc.nist.gov/pubs/sp/800/226/final",
  "links": [{ "label": "DOI", "url": "https://doi.org/10.6028/NIST.SP.800-226" }],
  "description": "差分プライバシーを使った製品や公開データについて、その保証が何を守り何を守らないかを評価するためのガイドライン。……",
  "recommended_for": "「差分プライバシー対応」とうたう製品やデータ公開の主張を、自分で評価できるようになりたい人",
  "review_status": "ai_generated",
  "note": "NIST の公開ページ（題名・著者・公開日）を確認",
  "created_at": "2026-11-22T06:00:00.000Z",
  "updated_at": "2026-11-22T06:00:00.000Z"
}
```
