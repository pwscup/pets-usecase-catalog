# Task 006: HashRouter + ページレイアウト

## フェーズ
Phase 1: プロジェクト初期化 + 一覧表示（MVP）

## 概要
React Router（HashRouter）のルーティング設定と、共通レイアウト（ヘッダー/フッター）を実装する。

## 作業内容
1. `src/App.tsx` に HashRouter + Routes を設定:
   - `/` → CaseListPage
   - `/cases/:id` → CaseDetailPage
   - `/cases/new` → CaseNewPage
   - `/cases/:id/edit` → CaseEditPage
   - `/settings` → SettingsPage
   - `/about` → AboutPage
2. `src/components/layout/Layout.tsx`: 共通レイアウト
3. `src/components/layout/Header.tsx`: ナビゲーション
4. `src/components/layout/Footer.tsx`: フッター

## 完了条件
- 各ルートにアクセスできる（プレースホルダーページ）
- ヘッダーのナビゲーションリンクが動作する
