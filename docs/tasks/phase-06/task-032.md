# Task 032: Vite 設定調整

## フェーズ
Phase 6: GitHub Pages デプロイ・CI/CD

## 概要
GitHub Pages デプロイ用に Vite 設定を調整する。

## 作業内容
1. `vite.config.ts` の `base` をリポジトリ名に設定
2. ビルド最適化（chunk splitting等）
3. 本番ビルドの動作確認

## 完了条件
- `npm run build` で正しいベースパスのアセットが生成される
