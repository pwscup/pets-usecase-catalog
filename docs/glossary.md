# 用語集

初めての人がつまずきやすい言葉です。関係する言葉を近くに並べています。

## カタログの言葉

| 言葉 | 意味 |
|---|---|
| <a id="pets"></a>PETs | Privacy Enhancing Technologies（プライバシー強化技術）。個人データを守りながらデータを使うための技術の総称 |
| <a id="case"></a>事例 | PETs を実際に使った1つの取り組み。カタログでは1事例を1つの `case.json` で表す |
| <a id="case-json"></a>case.json | 1事例のデータを書いた JSON ファイル。`public/cases/<id>/case.json` に置く。形式は[case.json の形式](reference/case-json.md) |
| <a id="case-id"></a>事例 ID | 事例のフォルダ名。`case.json` の `id` と一致させる。新しく作るときは UUID を使う |
| <a id="index-json"></a>index.json | 事例 ID の一覧。`public/cases/index.json`。ビルド時に自動で作られるので手で直さない |
| <a id="source"></a>出典（sources） | 事例の根拠になる文献。最低1件必要 |
| <a id="primary-source"></a>一次資料 | 事例の当事者や公的機関が出した資料（報告書・論文・公式発表）。検索結果の要約や解説記事は**二次情報** |
| <a id="investigating"></a>調査中 | 文献から読み取れない項目に書く値。空欄にしない |
| <a id="review-status"></a>review_status | 事例や参考資料の確認状況。`ai_generated`（AI が作り、人の目がまだ入っていない。画面では「未レビュー」）・`under_review`・`human_reviewed`（人が確認した）・`flagged`（要確認） |
| <a id="data-flow"></a>data_flow 図 | 事例の流れを source → constraint → process → application → outcome の順に並べた図 |
| <a id="resource"></a>参考資料 | 「読んだほうがいいもの」。事例集・当局のガイド・報告書・標準など。1件 = `public/resources/<id>.json`。形式は[参考資料の形式](reference/resources-json.md) |
| <a id="repository"></a>事例集 | 事例をまとめて紹介している外部の資料（OECD PETs リポジトリ、UN の PETs ガイド、英国 CDEI のガイドなど） |

## PETs の技術

カタログの `technology_category` の6種類です。

| 言葉 | 意味 |
|---|---|
| <a id="synthetic-data"></a>合成データ（synthetic_data） | 元データの統計的な性質をまねて作った、架空のデータ |
| <a id="differential-privacy"></a>差分プライバシー（differential_privacy） | 結果にノイズを加え、1人のデータの有無で結果がほとんど変わらないことを数学的に保証する方法。強さを ε（イプシロン）で表す |
| <a id="anonymization"></a>匿名化（anonymization） | 個人を特定できないようにデータを加工する方法。k-匿名性など |
| <a id="federated-learning"></a>連合学習（federated_learning） | データを1か所に集めず、各拠点で学習した結果だけを持ち寄ってモデルを作る方法 |
| <a id="secure-computation"></a>秘密計算（secure_computation） | データを暗号化したまま計算する方法の総称。秘密分散・準同型暗号・TEE を含む |
| <a id="distributed-analytics"></a>分散データ分析（distributed_analytics） | データを動かさず各拠点で分析し、集計結果だけを集める方法 |
| <a id="mpc"></a>MPC（秘密分散） | Multi-Party Computation。データを分割して複数の参加者で計算し、誰も元データを見ない方法 |
| <a id="he"></a>準同型暗号（HE / FHE） | 暗号文のまま足し算・掛け算ができる暗号。FHE は任意の計算ができる完全準同型暗号 |
| <a id="tee"></a>TEE | Trusted Execution Environment。CPU の中の隔離された領域で計算し、管理者にも中身を見せない仕組み |
| <a id="psi"></a>PSI | Private Set Intersection（秘匿積集合）。互いのリストを見せずに、共通部分だけを知る方法 |

## Git・GitHub の言葉

| 言葉 | 意味 |
|---|---|
| <a id="repo"></a>リポジトリ | ファイルと変更履歴の置き場所。このプロジェクトは GitHub の `pwscup/pets-usecase-catalog` |
| <a id="commit"></a>コミット | 変更をひとまとまりで記録すること |
| <a id="branch"></a>ブランチ | 変更を分けて進めるための枝。このプロジェクトでは `main`（本番）・`develop`（開発のベース）・作業ブランチを使う |
| <a id="main"></a>main | 本番のブランチ。ここにマージされると公開される。直接コミットしない |
| <a id="develop"></a>develop | 開発のベースになるブランチ。PR はここ向けに出す |
| <a id="push"></a>プッシュ | 手元のコミットを GitHub に送ること |
| <a id="pr"></a>PR（プルリクエスト） | 「このブランチの変更を取り込んでください」という依頼。レビューと CI の確認を経てマージする |
| <a id="draft-pr"></a>ドラフト PR | まだレビューを頼まない段階の PR |
| <a id="merge"></a>マージ | ブランチの変更を別のブランチに取り込むこと |
| <a id="issue"></a>Issue | 課題や依頼を書く GitHub の掲示板。1つの作業を1つの Issue にする。親子関係（サブ Issue）も作れる |
| <a id="ci"></a>CI | 変更を GitHub に送るたびに、検査とテストを自動で動かす仕組み。このプロジェクトでは GitHub Actions |
| <a id="github-actions"></a>GitHub Actions | GitHub の自動処理。`.github/workflows/` に設定がある |
| <a id="github-pages"></a>GitHub Pages | GitHub が提供する静的サイトの公開先。このカタログの本番 |

## 開発の言葉

| 言葉 | 意味 |
|---|---|
| <a id="npm"></a>npm | Node.js のパッケージ管理と、`package.json` に書いたコマンドの実行に使う道具 |
| <a id="vite"></a>Vite | 開発サーバーとビルドの道具 |
| <a id="build"></a>ビルド | 公開用のファイル一式（`dist/`）を作ること |
| <a id="zod"></a>Zod | データの形をコードで定義して検査するライブラリ。`src/schemas/case.schema.ts` |
| <a id="e2e"></a>E2E テスト | 実際のブラウザで画面を操作して確かめるテスト。Playwright を使う |
| <a id="skill"></a>スキル（Claude Code） | Claude Code に決まった手順を実行させる仕組み。`/case-create` など。`.claude/skills/` |
| <a id="agent"></a>エージェント（Claude Code） | 特定の役割を持たせた Claude。`case-reviewer` が事例をレビューする。`.claude/agents/` |
| <a id="diataxis"></a>Diátaxis | ドキュメントをチュートリアル・ハウツー・リファレンス・解説の4種類に分ける考え方 |
| <a id="mermaid"></a>Mermaid | テキストで図を書く記法。このドキュメントの図はすべて Mermaid |
