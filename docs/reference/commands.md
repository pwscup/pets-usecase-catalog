# コマンド

## npm スクリプト

`package.json` の `scripts` です。リポジトリの直下で実行します。

| コマンド | すること |
|---|---|
| `npm run dev` | 開発サーバーを起動する（`http://localhost:5173`）。`index.json` も作る |
| `npm run build` | 型チェック（`tsc -b`）と本番ビルド（`dist/`） |
| `npm run preview` | ビルド結果を手元で配信する（`http://localhost:4173`） |
| `npm run test` | 単体テストを1回実行する（Vitest） |
| `npm run test:watch` | 単体テストを変更のたびに実行する |
| `npm run test:coverage` | カバレッジつきで単体テストを実行する |
| `npm run test:e2e` | E2E テストを実行する（Playwright。ビルドしてから確かめる） |
| `npm run test:e2e:ui` | E2E テストを画面つきで実行する |
| `npm run lint` | ESLint |
| `npm run validate` | case.json の検査。**`tsx` が依存に入っていないため、このままでは `tsx: not found` で失敗する**。下の `npx tsx` を使う |

## 直接実行するコマンド

| コマンド | すること |
|---|---|
| `npx tsx scripts/validate-cases.ts` | case.json の検査（CI と同じ） |
| `npx tsc -b --noEmit` | 型チェックだけ |
| `npx playwright install --with-deps chromium` | E2E 用のブラウザを入れる |
| `python3 -c "import uuid; print(uuid.uuid4())"` | 新しい事例 ID を作る |
| `python3 -m http.server 8000` | ドキュメントの閲覧ページを手元で見る（[ドキュメントを書く](../howto/write-docs.md)） |

## PR を出す前に通すもの

```bash
npx tsx scripts/validate-cases.ts
npm run test
npm run build
```

画面や操作を変えたときは `npm run test:e2e` も通します。

## Claude Code のスキル

| スキル | すること | 原本 |
|---|---|---|
| `/case-create <URL>` | 文献から新しい case.json を作る | `.claude/skills/case-create/SKILL.md` |
| `/case-enrich <事例ID> <URL>` | 既存の事例を追加の文献で補完する | `.claude/skills/case-enrich/SKILL.md` |
| `/case-review <事例ID>` | `case-reviewer` エージェントが出典と照合する | `.claude/skills/case-review/SKILL.md` |
