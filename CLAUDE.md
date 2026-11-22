# CLAUDE.md

**応答はすべて日本語で行うこと。** 最終回答だけでなく、途中経過の報告・コミットメッセージ・PR本文・Issue本文も日本語で書く（`.claude/settings.json` の `language` でも指定済み）。

プライバシー強化技術（PETs）の実世界の活用事例を、公開情報から集めて整理し、検索・閲覧できる Web カタログ。

## 作業の前に `docs/` を読む

入口は [`docs/README.md`](docs/README.md)。人と AI が同じドキュメントを読む。AI 向けの別資料はない。

| 知りたいこと | 場所 |
|---|---|
| 初めて一通り体験する | `docs/tutorial/` |
| 決まった作業のやり方（事例の追加・レビュー・リリースなど） | `docs/howto/` |
| 正確な値（case.json の項目、コマンド、URL、環境） | `docs/reference/` |
| 仕組みと理由、これまでの判断と失敗 | `docs/explanation/`（判断の記録は `docs/explanation/history.md`） |
| 用語 | `docs/glossary.md` |

## 守ること

1. **ブランチ**：`main` に直接コミットしない。`develop` から作業ブランチを切り、PR は `develop` 向け。`develop` → `main` のマージで本番に出る → [`docs/howto/release.md`](docs/howto/release.md)
2. **事例データ**：1事例 = `public/cases/<id>/case.json`。`sources` は最低1件。文献から読み取れない項目は「調査中」と書き、推測で埋めない → [`docs/reference/case-json.md`](docs/reference/case-json.md)
3. **出典で確認できる範囲だけ書く**：一次資料を優先する。二次情報（検索結果の要約・解説記事）を一次資料のように扱わない。読めなかった出典は `note` にそう書く → [`docs/explanation/principles.md`](docs/explanation/principles.md)
4. **レビュー状態**：AI が作った事例は `review_status: "ai_generated"`。`human_reviewed` に上げるのは人が出典と照合したときだけ → [`docs/howto/review-case.md`](docs/howto/review-case.md)
5. **画面**：本文の文言は出典に基づく。技術名をタイトルに入れない。summary は課題、value_proposition は解決と成果
6. **ドキュメントも一緒に直す**：仕様を変えたら同じ PR で `docs/` を直す。食い違ったらコードが正
7. **原本は Markdown**：本文は `docs/*.md` にだけ書く。`docs/index.html` と `docs/slides.html` は表示するだけで本文を持たない
8. **判断と失敗は記録する**：`docs/explanation/history.md` の先頭に足す
9. **確認してから PR**：`npx tsx scripts/validate-cases.ts`・`npm run test`・`npm run build` を通す

## よく使うコマンド

```
npm run dev          # 開発サーバー（http://localhost:5173）
npx tsx scripts/validate-cases.ts  # case.json の検査（npm run validate は tsx 未導入で動かない）
npm run test         # 単体テスト
npm run build        # 本番ビルド（型チェック込み）
npm run test:e2e     # E2E テスト
```

詳しくは [`docs/reference/commands.md`](docs/reference/commands.md)。事例作業用の Claude Code スキルは `/case-create`・`/case-enrich`・`/case-review`（[`docs/howto/add-case.md`](docs/howto/add-case.md)）。
