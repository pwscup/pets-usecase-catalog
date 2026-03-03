# Task 017: risk_matrix 描画コンポーネント

## フェーズ
Phase 3: 詳細表示（Figure描画含む）

## 概要
CSS Grid ベースでリスクマトリクスを描画する。

## 作業内容
1. `src/components/figures/RiskMatrix.tsx`
2. axes.impact_levels × axes.likelihood_levels のグリッド表示
3. cells のデータを対応するセルにマッピング
4. セルの note をツールチップ or インライン表示
5. 色分け（影響度×可能性でヒートマップ風）

## 完了条件
- マトリクスが正しく表示される
- セルの note が確認できる
