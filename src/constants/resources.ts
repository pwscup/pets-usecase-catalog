// 参考資料（public/resources/<id>.json）の選択肢。
// 形の定義は src/schemas/resource.schema.ts、説明は docs/reference/resources-json.md

/** 発行元の種類 */
export const PUBLISHER_TYPE_OPTIONS = [
  '国際機関',
  '政府・規制当局',
  '研究機関・大学',
  '業界団体・非営利',
  '企業',
] as const

/** 資料の種類 */
export const RESOURCE_KIND_OPTIONS = [
  '事例集',
  'ガイド・ガイダンス',
  '報告書',
  '標準・評価指針',
  '入門・解説',
  '論文',
] as const

/** 事例集からの取り込み状況（貢献者向け。利用者の画面には出さない） */
export const IMPORT_STATUS_OPTIONS = [
  '取り込み済み',
  '一部取り込み',
  '未着手',
  '対象外',
] as const

/** 参考資料の id の形（英小文字・数字をハイフンでつなぐ） */
export const RESOURCE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
