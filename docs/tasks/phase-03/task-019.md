# Task 019: Figure 統合表示

## フェーズ
Phase 3: 詳細表示（Figure描画含む）

## 概要
figures配列のtypeに応じて対応する描画コンポーネントに振り分ける。

## 作業内容
1. `src/components/case-detail/FigureRenderer.tsx`
2. figure.type による振り分け: data_flow → DataFlowDiagram, risk_matrix → RiskMatrix, utility_chart → UtilityChart
3. figures が空の場合は非表示
4. 各 figure の title と note を表示

## 完了条件
- 複数の figure が正しく描画される
- figure がない場合はセクション自体が非表示
