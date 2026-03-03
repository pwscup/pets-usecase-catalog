# Task 009: フィルタUI（サイドバー/ドロワー）

## フェーズ
Phase 2: 検索・フィルタ・ソート機能

## 概要
各種フィルタ項目のUIを実装する。

## 作業内容
1. `src/components/case-list/FilterPanel.tsx`:
   - region（国内/国外）チェックボックス
   - domain セレクト/チェックボックス（データから動的に選択肢生成）
   - usecase_category セレクト
   - synthetic_generation_method セレクト
   - safety_evaluation_method セレクト
   - utility_evaluation_method セレクト
   - source フィルタ
2. モバイル: ドロワー形式、デスクトップ: サイドバー形式
3. フィルタクリアボタン

## 完了条件
- 全フィルタ項目がUIとして表示される
- モバイル/デスクトップでレイアウトが切り替わる
