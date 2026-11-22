# 選択肢を増やす

事例の分類に使う選択肢（分野 `domain`・ユースケース分類 `usecase_category`・技術カテゴリ `technology_category`）を足す手順です。

- 今ある選択肢は[case.json の形式](../reference/case-json.md)
- 選択肢を足すと、フィルタ・統計・フォーム・AI 用プロンプトに出ます。既存の事例の付け直しが要るかも一緒に考えます

## 直すファイル

| 足すもの | 必ず直す | 色（無いと灰色になる） | 型・検査 |
|---|---|---|---|
| 分野 `domain` | `src/constants/categories.ts` の `DOMAIN_OPTIONS` | `src/constants/styles.ts` の `DOMAIN_COLORS` | — |
| ユースケース分類 `usecase_category` | `src/constants/categories.ts` の `USECASE_CATEGORY_OPTIONS` | `src/constants/styles.ts` の `CATEGORY_COLORS` | — |
| 技術カテゴリ `technology_category` | `src/constants/categories.ts` の `TECHNOLOGY_CATEGORY_OPTIONS` と `TECHNOLOGY_CATEGORY_LABELS` | `src/constants/styles.ts` の `TECHNOLOGY_CATEGORY_COLORS` | `src/types/case.ts` の `TechnologyCategory`、`src/schemas/case.schema.ts` の `z.enum([...])`（3か所） |

AI 用のプロンプト（`src/constants/prompts.ts`）は `categories.ts` から選択肢を読むので、直す必要はありません。ただし、`usecase_category` と `technology_category` には「判断基準」の表があるので、そこに1行足します。

## 手順

1. Issue を立て、足す理由と、当てはまる事例の例を書く
2. 上の表のファイルを直す
3. 判断基準を `src/constants/prompts.ts` の表に足す（`usecase_category`・`technology_category` のとき）
4. 既存の事例で付け直すものがあれば、同じ PR で直す
5. [case.json の形式](../reference/case-json.md)の選択肢の表を直す
6. 確かめる

   ```bash
   npm run build
   npm run test
   npm run dev
   ```

   画面で、フィルタ・事例カード・統計ページ・新規作成フォームに新しい選択肢が出ることを見る

## チェックリスト

- [ ] `categories.ts` に足した
- [ ] 色を足した（`styles.ts`）
- [ ] 技術カテゴリなら、型とスキーマの3か所も足した
- [ ] プロンプトの判断基準に足した
- [ ] リファレンスの表を直した
- [ ] `npm run build` と `npm run test` が通った

## 困ったとき

| 症状 | よくある原因 | 対処 |
|---|---|---|
| バッジや棒グラフが灰色になる | 色の定義がない | `styles.ts` に足す。いまは `TECHNOLOGY_CATEGORY_COLORS` に `distributed_analytics` が無い |
| 型エラーになる | `TechnologyCategory` やスキーマの enum に足していない | 上の表の「型・検査」を直す |
| AI が新しい選択肢を選ばない | プロンプトの判断基準がない | `prompts.ts` の表に足す |
