# 2026-03 CDEI PETs Adoption Guide インポート

## 概要
UK CDEI (Centre for Data Ethics and Innovation) が公開する [PETs Adoption Guide](https://cdeiuk.github.io/pets-adoption-guide/) の事例データから `case.json` を一括生成した初期投入スクリプト。

## スクリプト
- `scripts/oneoff/2026-03-cdei-import.py`

## 実行履歴
- **実行日**: 2026-03-21（コミット `a492514` 近辺）
- **対象データ**: CDEI PETs Adoption Guide 公開事例
- **生成件数**: 46 事例（`grep -l "cdei\|CDEI\|PETs Adoption Guide" public/cases/*/case.json` ベース）
- **出力先**: `public/cases/<uuid>/case.json`（review_status: `ai_generated`）

## マッピングの要点
- Technology category: Differential Privacy / Federated Learning / Synthetic Data / Multi-party Computation / Homomorphic Encryption / TEE / De-identification を本プロジェクトの 6 カテゴリに変換
- Domain: Health and Social Care → 医療、Finance → 金融、National Statistics / Crime & Justice → 公共 など
- 読み取れないフィールドは「調査中」で埋める方針

## 再実行可否
**再実行非推奨**。同じ入力で実行しても UUID が新規発行されるため、重複事例が生成される。
再取り込みする場合は、既存 CDEI 由来事例を事前に削除し、新しい `YYYY-MM-*-reimport.py` として切り直す。

## 後続作業
- レビュー済み昇格フロー（#100, #107）で順次 `human_reviewed` に昇格中
