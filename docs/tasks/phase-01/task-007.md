# Task 007: 一覧画面（CaseListPage）

## フェーズ
Phase 1: プロジェクト初期化 + 一覧表示（MVP）

## 概要
seed_cases.json から読み込んだ事例をカード形式で一覧表示する。

## 作業内容
1. `src/context/CaseContext.tsx`: Case データの Context + Provider（データローダーと連携）
2. `src/pages/CaseListPage.tsx`: 一覧ページ
3. `src/components/case-list/CaseCard.tsx`: カードコンポーネント
   - 表示項目: title, region, domain, organization, usecase_category
   - クリックで詳細画面に遷移
4. レスポンシブ対応（モバイル1列、デスクトップ2-3列）

## 完了条件
- seed_cases.json のデータがカード形式で表示される
- カードクリックで詳細ページへ遷移する
- レスポンシブレイアウトが動作する
