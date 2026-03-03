# Task 025: LocalStorage 保存ロジック

## フェーズ
Phase 4: CRUD（新規作成・編集フォーム）

## 概要
新規作成した Case を LocalStorage に保存するロジックを実装する。

## 作業内容
1. `src/hooks/useCases.ts` に addCase, updateCase, deleteCase を実装
2. 新規作成時: id=UUID自動生成, status="user", created_at/updated_at=現在時刻
3. CaseContext と連携してUIを即時更新
4. LocalStorage への永続化

## 完了条件
- 新規作成したデータが LocalStorage に保存される
- 一覧画面にリアルタイムで反映される
