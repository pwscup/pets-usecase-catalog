# Task 026: 編集機能

## フェーズ
Phase 4: CRUD（新規作成・編集フォーム）

## 概要
既存 Case の編集機能を実装する。

## 作業内容
1. `src/pages/CaseEditPage.tsx`: URLの:idからCase取得→フォームプリフィル
2. CaseForm を新規/編集で共用（mode prop）
3. 更新時: updated_at を現在時刻に更新
4. seedデータの編集: LocalStorage にコピーして保存（元のseedは変更しない）

## 完了条件
- 既存データをフォームに読み込んで編集できる
- 更新が LocalStorage に保存される
