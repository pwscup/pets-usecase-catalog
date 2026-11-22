# 画面と URL

アプリはハッシュ方式のルーティング（`HashRouter`）です。URL の `#` より後ろで画面が決まります。原本は `src/App.tsx` と `src/hooks/useFilter.ts`。

## 画面

| URL | 画面 | 中身 |
|---|---|---|
| `#/` | 一覧 | 検索・フィルタ・並べ替え・集計・ページ送り |
| `#/cases/<id>` | 詳細 | 課題・価値・技術情報・出典・図 |
| `#/cases/<id>/edit` | 編集 | フォーム・レビュー状況・AI アシスト・プレビュー・GitHub で提出 |
| `#/cases/new` | 新規作成 | フォーム・AI アシスト・プレビュー・GitHub で提出 |
| `#/stats` | 統計 | 技術カテゴリ・分野などの集計 |
| `#/settings` | 設定 | 保存方式の表示・エクスポート |
| `#/about` | About | 概要・免責・入力してはいけない情報 |

## 一覧のクエリパラメータ

フィルタの状態は URL に入るので、URL を共有すれば同じ絞り込みを再現できます（例：`#/?technology_category=secure_computation&region=国外`）。

| パラメータ | 値 | 例 |
|---|---|---|
| `q` | 検索語。`title`・`summary`・`organization`・`domain_sub`・`tags` を部分一致（大文字小文字を区別しない） | `q=TEE` |
| `region` | カンマ区切り | `region=国内` |
| `domain` | カンマ区切り | `domain=金融,医療` |
| `usecase_category` | カンマ区切り | `usecase_category=公的利用` |
| `technology_category` | カンマ区切り | `technology_category=secure_computation` |
| `review_status` | カンマ区切り | `review_status=human_reviewed` |
| `sortBy` | `updated_at_desc`（既定。URL には出ない）・`updated_at_asc`・`title`・`domain` | `sortBy=title` |
| `page` | ページ番号（1ページ12件。1のときは URL に出ない） | `page=2` |

フィルタや並べ替えを変えると `page` は1に戻ります。同じ項目の中で複数の値を選ぶと「どれかに当てはまる」、別の項目どうしは「すべてに当てはまる」で絞ります。

## 「GitHubで提出」が開く URL

原本は `src/components/case-detail/CasePreview.tsx`。

| 画面 | 開く URL |
|---|---|
| 新規作成 | `https://github.com/pwscup/syntheticdata-usecase-catalog/new/main?filename=public/cases/<id>/case.json` |
| 編集 | `https://github.com/pwscup/syntheticdata-usecase-catalog/edit/main/public/cases/<id>/case.json` |

リポジトリの旧名（`syntheticdata-usecase-catalog`）のままですが、GitHub が今の名前（`pets-usecase-catalog`）に転送します。どちらも `main` を開くので、PR の base は `develop` に変えます（[事例をレビューする](../howto/review-case.md)）。
