# Task 008: フリーワード検索

## フェーズ
Phase 2: 検索・フィルタ・ソート機能

## 概要
title, summary, organization, tags を対象としたフリーワード部分一致検索を実装する。

## 作業内容
1. `src/components/case-list/SearchBar.tsx`: 検索入力UI（デバウンス付き）
2. `src/hooks/useFilter.ts` に検索ロジックを追加
3. 大文字/小文字を区別しない検索
4. 日本語検索対応（全角/半角の統一は初期スコープ外）

## 完了条件
- フリーワード入力でリアルタイムに一覧が絞り込まれる
- 検索対象: title, summary, organization, tags
