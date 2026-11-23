# PETs活用事例カタログ 5分でわかる開発

- プライバシー強化技術（PETs）の実際の活用事例を、公開情報から集めて検索できるカタログ
- サーバーなし。事例データ（JSON）と画面（React）を GitHub Pages で配信
- このスライドは要点だけ。詳しくは [docs/README.md](README.md)

---

# 何を作っているか

| 画面 | 中身 |
|---|---|
| 一覧 | 検索・フィルタ（技術・分野・地域・レビュー状態）・並べ替え |
| 詳細 | 課題・価値・技術情報・出典・図 |
| 統計 | 技術カテゴリ・分野ごとの件数 |
| 参考資料 | 読んだほうがいい事例集・ガイド・報告書・標準 |
| 新規作成・編集 | フォーム、AI アシスト、「GitHubで提出」 |

---

# データの流れ

- 1事例 = `public/cases/<id>/case.json` の1ファイル
- ビルドのたびに事例 ID の一覧（`index.json`）を自動で作る
- ブラウザが一覧と各 case.json を取ってきて表示する
- 詳しく：[全体の構成](explanation/architecture.md)

---

# ブランチの流れ

| ブランチ | 役割 |
|---|---|
| `feature-<Issue番号>-<キーワード>` | 作業用。`develop` から切る |
| `develop` | 開発のベース。PR はここ向け |
| `main` | 本番。マージすると GitHub Pages に自動で公開 |

---

# 公開先

| 環境 | どこ |
|---|---|
| 手元 | `npm run dev`（5173）、`npm run preview`（4173） |
| 本番 | GitHub Pages（`main` に push で更新） |
| ドキュメント | raw.githack.com で `develop` の `docs/index.html` を表示。本番には出さない |

---

# 守ること

- 出典で確かめられる範囲だけを書く。一次資料を優先する
- 読み取れない項目は「調査中」。推測で埋めない
- AI が作った事例は `ai_generated`。人が照合して初めて `human_reviewed`
- 仕様を変えたら同じ PR でドキュメントも直す
- 判断と失敗は [history.md](explanation/history.md) に残す

---

# よくある作業と手順書

| 作業 | 手順書 |
|---|---|
| 事例を1件追加する | [add-case](howto/add-case.md) |
| 事例集からまとめて取り込む | [import-from-repository](howto/import-from-repository.md) |
| 事例をレビューする | [review-case](howto/review-case.md) |
| 本番に出す | [release](howto/release.md) |
| CI が落ちた | [fix-ci](howto/fix-ci.md) |

---

# ドキュメントの決まり

- 原本は `docs/*.md` だけ。HTML は表示するだけ
- 4種類に分ける：チュートリアル・ハウツー・リファレンス・解説
- 人と AI が同じものを読む。`CLAUDE.md` は短く、`docs/` を指す
- 足したら3か所をそろえる：`.md`・`README.md` の表・`index.html` の `DOCS`
- 詳しく：[ドキュメントを書く](howto/write-docs.md)

---

# 次に読むもの

1. [はじめての貢献](tutorial/first-contribution.md)：手元で動かして PR を出すまで
2. [全体の構成](explanation/architecture.md)：仕組みと理由
3. [用語集](glossary.md)：わからない言葉
