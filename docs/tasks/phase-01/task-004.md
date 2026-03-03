# Task 004: seed_cases.json 作成

## フェーズ
Phase 1: プロジェクト初期化 + 一覧表示（MVP）

## 概要
spec.md のスキーマに準拠した初期データ（3〜5件）を作成する。

## 作業内容
1. `public/seed_cases.json` にサンプルデータを作成
2. schema_version: "1.0" を設定
3. 各事例は異なる domain, region, usecase_category を含める
4. 最低1件はfiguresを含める（各typeの動作確認用）
5. sources は必ず1件以上含める

## 完了条件
- JSON が valid である
- Zodスキーマでバリデーションが通る
- 一覧・詳細表示のデバッグに十分なデータ量
