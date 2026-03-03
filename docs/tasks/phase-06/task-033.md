# Task 033: GitHub Actions ワークフロー

## フェーズ
Phase 6: GitHub Pages デプロイ・CI/CD

## 概要
main ブランチへの push で自動ビルド＋デプロイする GitHub Actions ワークフローを作成する。

## 作業内容
1. `.github/workflows/deploy.yml` 作成
2. Node.js 20 + npm ci + npm run build
3. actions/deploy-pages を使用
4. permissions 設定（pages: write, id-token: write）
5. concurrency 設定（重複デプロイ防止）

## 完了条件
- main push でデプロイが自動実行される
- GitHub Pages にアプリが公開される
