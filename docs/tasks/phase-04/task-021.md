# Task 021: 基本項目入力フォーム

## フェーズ
Phase 4: CRUD（新規作成・編集フォーム）

## 概要
title, region, domain, organization, usecase_category, summary の入力フォームを実装する。

## 作業内容
1. `src/components/case-form/BasicFields.tsx`
2. region: ラジオボタン（国内/国外）
3. domain, usecase_category: テキスト入力（将来的にはセレクト/コンボボックス）
4. summary: テキストエリア
5. 各項目は必須バリデーション

## 完了条件
- 全必須項目の入力ができる
- 必須項目未入力時にエラーが表示される
