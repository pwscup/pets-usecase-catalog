# Task 023: Sources 動的追加フォーム

## フェーズ
Phase 4: CRUD（新規作成・編集フォーム）

## 概要
出典（sources）の動的追加/削除フォームを実装する。

## 作業内容
1. `src/components/case-form/SourceFields.tsx`
2. useFieldArray で動的追加/削除
3. source_type: セレクト（pdf/web）
4. title, url: テキスト入力（必須）
5. note: テキスト入力（任意）
6. 最低1件のバリデーション

## 完了条件
- 出典を動的に追加・削除できる
- 最低1件の出典がないとバリデーションエラー
