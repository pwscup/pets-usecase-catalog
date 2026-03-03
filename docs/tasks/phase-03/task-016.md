# Task 016: data_flow 描画コンポーネント

## フェーズ
Phase 3: 詳細表示（Figure描画含む）

## 概要
React Flow を使って data_flow タイプの Figure を描画する。

## 作業内容
1. `src/components/figures/DataFlowDiagram.tsx`
2. DataFlowData の nodes/edges を React Flow のノード・エッジに変換
3. node.category に応じた色分け
4. 自動レイアウト（dagre等のレイアウトアルゴリズム）
5. ズーム・パン操作対応

## 完了条件
- nodes/edges データからフロー図が表示される
- ノードのラベルとエッジのラベルが読める
