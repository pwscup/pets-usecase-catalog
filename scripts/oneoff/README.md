# scripts/oneoff — 一回限りのスクリプト

データ移行・初期投入など、**一度実行すれば役目を終える**スクリプトを置く。

## 特徴
- CI からは呼び出さない（原則 CI 非依存）
- 書き捨て前提。完了後はいつでも削除可能
- 動作履歴は `docs/data-migrations/` に残すことで、将来スクリプトが消えても経緯を追跡できる

## 命名規則
`YYYY-MM-<目的>.py|.ts` 形式（例: `2026-03-cdei-import.py`）

## 現在のスクリプト

| スクリプト | 目的 | 履歴 |
|------------|------|------|
| `2026-03-cdei-import.py` | UK CDEI PETs Adoption Guide からの初期事例投入 | [docs/data-migrations/2026-03-cdei-import.md](../../docs/data-migrations/2026-03-cdei-import.md) |

## 実行時の作法
1. 対応する履歴ドキュメントを `docs/data-migrations/` に作成（または更新）する
2. 実行日・対象データ・生成された事例ID・再実行可否を記録
3. 実行後の成果物は PR でレビュー
