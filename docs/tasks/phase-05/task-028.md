# Task 028: エクスポート機能

## フェーズ
Phase 5: インポート/エクスポート・設定・About

## 概要
事例データをJSONファイルとしてエクスポートする機能を実装する。

## 作業内容
1. `src/lib/export-import.ts` にエクスポートロジック
2. 全事例(seed+user) or 選択事例のエクスポート
3. schema_version を含めた JSON 出力
4. ファイルダウンロード（Blob + URL.createObjectURL）

## 完了条件
- JSONファイルがダウンロードされる
- ダウンロードしたJSONが spec.md のスキーマに準拠している
