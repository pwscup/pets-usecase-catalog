# Task 002: TypeScript 型定義

## フェーズ
Phase 1: プロジェクト初期化 + 一覧表示（MVP）

## 概要
spec.md の Case スキーマに基づき、TypeScript の型/インターフェースを定義する。

## 作業内容
1. `src/types/case.ts` に以下の型を定義:
   - `Case` (全フィールド)
   - `Source` (source_type, title, url, note)
   - `Figure` (type, title, data, note)
   - `DataFlowData` (nodes, edges)
   - `RiskMatrixData` (axes, cells)
   - `UtilityChartData` (series)
   - `CaseStatus` = "seed" | "user" | "draft" | "published" | "archived"
   - `Region` = "国内" | "国外"
   - `SourceType` = "pdf" | "web"
   - `FigureType` = "data_flow" | "risk_matrix" | "utility_chart"
2. `src/types/index.ts` で全型をre-export

## 完了条件
- 全型がspec.md 3.2節のスキーマと一致している
- TypeScriptコンパイルが通る
