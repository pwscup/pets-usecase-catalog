# Task 005: データローダー実装

## フェーズ
Phase 1: プロジェクト初期化 + 一覧表示（MVP）

## 概要
seed_cases.json の fetch と LocalStorage からのユーザデータ読み込み、マージロジックを実装する。

## 作業内容
1. `src/lib/data-loader.ts`:
   - `fetchSeedCases()`: seed_cases.json を fetch して Case[] を返す
   - `loadUserCases()`: LocalStorage から Case[] を読み込む
   - `mergeCases(seed, user)`: id 衝突時はユーザ側を優先してマージ
2. `src/lib/storage.ts`:
   - LocalStorage の key 管理（`sd_uc_catalog_cases_v1`）
   - 読み取り・書き込みユーティリティ

## 完了条件
- seed_cases.json を正しく読み込める
- LocalStorage にデータがない場合も正常動作する
- id衝突時にユーザデータが優先される
