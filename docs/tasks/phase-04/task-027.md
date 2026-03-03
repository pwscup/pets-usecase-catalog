# Task 027: 削除機能

## フェーズ
Phase 4: CRUD（新規作成・編集フォーム）

## 概要
Case の削除機能を実装する。

## 作業内容
1. 詳細画面に削除ボタン追加
2. 確認ダイアログ（Headless UI の Dialog 使用）
3. userデータ: LocalStorage から削除
4. seedデータ: status を "archived" に変更（LocalStorage に保存）
5. 削除後は一覧画面にリダイレクト

## 完了条件
- 確認ダイアログ後に削除が実行される
- seedデータはアーカイブ扱い
