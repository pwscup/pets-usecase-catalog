# Task 013: 詳細画面 基本情報

## フェーズ
Phase 3: 詳細表示（Figure描画含む）

## 概要
事例詳細画面の基本情報セクションを実装する。

## 作業内容
1. `src/pages/CaseDetailPage.tsx`: URLパラメータからCase取得・表示
2. `src/components/case-detail/BasicInfo.tsx`: title, region, domain, organization, usecase_category, summary, outcomes の表示
3. 編集ボタン（編集画面への遷移リンク）
4. 一覧に戻るリンク

## 完了条件
- URLの:idからCaseを取得して基本情報が表示される
- 存在しないidの場合は404表示
