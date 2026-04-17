# scripts/ops — 継続運用スクリプト

CI および日常運用で繰り返し実行するスクリプトを配置する。

## 特徴
- CI（`.github/workflows/ci.yml`, `deploy.yml`）や `npm run` スクリプトから参照される
- 長期的にメンテナンスされる
- 破壊的な変更時は CI 側の参照パスも併せて更新する

## 現在のスクリプト

| スクリプト | 役割 | 呼び出し口 |
|------------|------|-----------|
| `validate-cases.ts` | `public/cases/**/case.json` をスキーマ（`src/schemas/case.schema.ts`）で検証 | `npm run validate` / CI |

## 追加ルール
- 単発の移行・投入スクリプトは `scripts/oneoff/` に置く
- 依存ライブラリを増やす前に、既存ツール（`tsx` + `zod` 等）で済ませられないか検討
