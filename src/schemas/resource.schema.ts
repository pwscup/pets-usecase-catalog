import { z } from 'zod'
import { TECHNOLOGY_CATEGORY_OPTIONS, REVIEW_STATUS_OPTIONS } from '../constants/categories'
import {
  PUBLISHER_TYPE_OPTIONS,
  RESOURCE_KIND_OPTIONS,
  IMPORT_STATUS_OPTIONS,
  RESOURCE_ID_PATTERN,
} from '../constants/resources'

// 参考資料（読んだほうがいいもの）1件の形。
// 1件 = public/resources/<id>.json。説明は docs/reference/resources-json.md
// 未定義の項目は打ち間違いとして弾くため strictObject にしている。

const nonEmpty = z.string().trim().min(1)
const httpUrl = z.string().regex(/^https?:\/\/\S+$/, 'http(s) で始まる URL を書く')
// YYYY / YYYY-MM / YYYY-MM-DD
const partialDate = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/, 'YYYY / YYYY-MM / YYYY-MM-DD のどれか')
const isoDateTime = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, 'ISO 8601 の日時')

export const resourceLinkSchema = z.strictObject({
  label: nonEmpty,
  url: httpUrl,
})

export const resourceSchema = z.strictObject({
  id: z.string().regex(RESOURCE_ID_PATTERN, '英小文字・数字をハイフンでつなぐ（例：oecd-pets-repository）'),
  title: nonEmpty,
  title_ja: nonEmpty.optional(),
  publisher: nonEmpty,
  publisher_type: z.enum(PUBLISHER_TYPE_OPTIONS),
  country: nonEmpty,
  kind: z.enum(RESOURCE_KIND_OPTIONS),
  technology_category: z.array(z.enum(TECHNOLOGY_CATEGORY_OPTIONS)).default([]),
  language: z.array(z.string().regex(/^[a-z]{2}$/, '2文字の言語コード（ja・en など）')).min(1),
  published_at: partialDate.nullable().default(null),
  url: httpUrl,
  links: z.array(resourceLinkSchema).default([]),
  description: nonEmpty,
  recommended_for: nonEmpty,
  related_case_tag: nonEmpty.optional(),
  import_status: z.enum(IMPORT_STATUS_OPTIONS).optional(),
  import_note: nonEmpty.optional(),
  review_status: z.enum(REVIEW_STATUS_OPTIONS),
  note: z.string().default(''),
  created_at: isoDateTime,
  updated_at: isoDateTime,
})

export type Resource = z.infer<typeof resourceSchema>
export type ResourceLink = z.infer<typeof resourceLinkSchema>
