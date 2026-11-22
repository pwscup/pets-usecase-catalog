import { describe, it, expect } from 'vitest'
import { resourceSchema } from '../schemas/resource.schema'
import { validateResource } from '../../scripts/validate-resources'

const valid = {
  id: 'example-guide',
  title: 'Example Guide on PETs',
  publisher: 'Example Authority',
  publisher_type: '政府・規制当局',
  country: '英国',
  kind: 'ガイド・ガイダンス',
  language: ['en'],
  url: 'https://example.org/guide',
  description: 'PETs の導入を検討する組織向けのガイド。',
  recommended_for: 'PETs の導入を検討している担当者',
  review_status: 'ai_generated',
  created_at: '2026-11-22T00:00:00.000Z',
  updated_at: '2026-11-22T00:00:00.000Z',
}

describe('resourceSchema', () => {
  it('必須項目だけの資料を受け付け、任意項目に既定値を入れる', () => {
    const r = resourceSchema.parse(valid)
    expect(r.technology_category).toEqual([])
    expect(r.links).toEqual([])
    expect(r.published_at).toBeNull()
    expect(r.note).toBe('')
  })

  it('任意項目をすべて書いた資料を受け付ける', () => {
    const r = resourceSchema.safeParse({
      ...valid,
      title_ja: '例のガイド',
      technology_category: ['differential_privacy', 'synthetic_data'],
      published_at: '2026-10',
      links: [{ label: 'PDF', url: 'https://example.org/guide.pdf' }],
      related_case_tag: 'Example Repository',
      import_status: '一部取り込み',
      import_note: '#232',
      note: '本文を確認',
    })
    expect(r.success).toBe(true)
  })

  it.each([
    ['id に大文字', { id: 'Example-Guide' }],
    ['id に空白', { id: 'example guide' }],
    ['選択肢にない種類', { kind: 'ブログ' }],
    ['選択肢にない発行元の種類', { publisher_type: '個人' }],
    ['選択肢にない技術カテゴリ', { technology_category: ['blockchain'] }],
    ['言語が空', { language: [] }],
    ['言語コードが2文字でない', { language: ['eng'] }],
    ['URL が http(s) でない', { url: 'example.org/guide' }],
    ['発行日の形が違う', { published_at: '2026/10' }],
    ['発行日の月が13', { published_at: '2026-13' }],
    ['説明が空', { description: '  ' }],
    ['選択肢にないレビュー状態', { review_status: 'approved' }],
    ['選択肢にない取り込み状況', { import_status: '完了' }],
    ['更新日時が日付だけ', { updated_at: '2026-11-22' }],
  ])('%s を弾く', (_label, patch) => {
    expect(resourceSchema.safeParse({ ...valid, ...patch }).success).toBe(false)
  })

  it('定義にない項目（打ち間違い）を弾く', () => {
    expect(resourceSchema.safeParse({ ...valid, descripton: 'typo' }).success).toBe(false)
  })

  it('必須項目が欠けていると弾く', () => {
    const { recommended_for: _omit, ...rest } = valid
    void _omit
    expect(resourceSchema.safeParse(rest).success).toBe(false)
  })
})

describe('validateResource', () => {
  it('正しい資料ではエラーを返さない', () => {
    expect(validateResource('example-guide', JSON.stringify(valid))).toEqual([])
  })

  it('id とファイル名が違うとエラーを返す', () => {
    const errors = validateResource('other-name', JSON.stringify(valid))
    expect(errors.some((e) => e.includes('ファイル名'))).toBe(true)
  })

  it('JSON として読めないとエラーを返す', () => {
    expect(validateResource('example-guide', '{ broken')[0]).toMatch(/JSON parse error/)
  })

  it('どの項目が誤っているかをエラーに含める', () => {
    const errors = validateResource('example-guide', JSON.stringify({ ...valid, kind: 'ブログ' }))
    expect(errors.some((e) => e.startsWith('kind:'))).toBe(true)
  })
})
