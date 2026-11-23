import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  CROSS_CUTTING,
  EMPTY_RESOURCE_FILTER,
  fetchResources,
  filterFromParams,
  filterResources,
  filterToParams,
  sortResources,
} from '../lib/resource-loader'
import type { Resource } from '../schemas/resource.schema'

function make(over: Partial<Resource>): Resource {
  return {
    id: 'x',
    title: 'Title',
    publisher: 'Publisher',
    publisher_type: '政府・規制当局',
    country: '英国',
    kind: 'ガイド・ガイダンス',
    technology_category: [],
    language: ['en'],
    published_at: null,
    url: 'https://example.org/x',
    links: [],
    description: 'desc',
    recommended_for: 'someone',
    review_status: 'ai_generated',
    note: '',
    created_at: '2026-11-22T00:00:00.000Z',
    updated_at: '2026-11-22T00:00:00.000Z',
    ...over,
  }
}

const guideDp = make({ id: 'guide-dp', title: 'DP Guide', kind: 'ガイド・ガイダンス', technology_category: ['differential_privacy'], published_at: '2025-03' })
const guideOld = make({ id: 'guide-old', title: 'Old Guide', kind: 'ガイド・ガイダンス', published_at: '2021' })
const repo = make({ id: 'repo', title: 'Case Repository', kind: '事例集', publisher: 'OECD', country: '国際' })
const reportJa = make({ id: 'report-ja', title: '報告書', kind: '報告書', language: ['ja'], published_at: '2023-03-31' })
const all = [guideOld, reportJa, guideDp, repo]

describe('filterResources', () => {
  it('条件が空ならすべて返す', () => {
    expect(filterResources(all, EMPTY_RESOURCE_FILTER)).toHaveLength(4)
  })

  it('種類で絞る（複数選ぶと、どれかに当てはまるもの）', () => {
    const r = filterResources(all, { ...EMPTY_RESOURCE_FILTER, kind: ['事例集', '報告書'] })
    expect(r.map((x) => x.id).sort()).toEqual(['repo', 'report-ja'])
  })

  it('技術で絞る。技術を横断する資料は CROSS_CUTTING で選べる', () => {
    expect(filterResources(all, { ...EMPTY_RESOURCE_FILTER, tech: ['differential_privacy'] }).map((x) => x.id)).toEqual(['guide-dp'])
    expect(filterResources(all, { ...EMPTY_RESOURCE_FILTER, tech: [CROSS_CUTTING] }).map((x) => x.id).sort()).toEqual(['guide-old', 'repo', 'report-ja'])
  })

  it('日本語で読めるものだけに絞る', () => {
    expect(filterResources(all, { ...EMPTY_RESOURCE_FILTER, japaneseOnly: true }).map((x) => x.id)).toEqual(['report-ja'])
  })

  it('題名・発行元などを大文字小文字を区別せずに検索する', () => {
    expect(filterResources(all, { ...EMPTY_RESOURCE_FILTER, q: 'oecd' }).map((x) => x.id)).toEqual(['repo'])
  })
})

describe('sortResources', () => {
  it('種類の順に並べ、同じ種類では新しい順（日付なしは後ろ）', () => {
    expect(sortResources(all).map((x) => x.id)).toEqual(['repo', 'guide-dp', 'guide-old', 'report-ja'])
  })
})

describe('URL のクエリとの変換', () => {
  it('フィルタをクエリにして戻すと同じになる', () => {
    const f = { q: 'ICO', kind: ['事例集', '報告書'], tech: [CROSS_CUTTING, 'anonymization'], japaneseOnly: true }
    expect(filterFromParams(filterToParams(f))).toEqual(f)
  })

  it('空のフィルタは空のクエリになる', () => {
    expect(filterToParams(EMPTY_RESOURCE_FILTER).toString()).toBe('')
  })
})

describe('fetchResources', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('index.json の順に取り、スキーマに合わない資料は読み飛ばす', async () => {
    const files: Record<string, unknown> = {
      './resources/index.json': { resources: ['repo', 'broken'] },
      './resources/repo.json': repo,
      './resources/broken.json': { id: 'broken' },
    }
    vi.stubGlobal('fetch', vi.fn(async (url: string) => ({ ok: url in files, json: async () => files[url] })))
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const r = await fetchResources('.')
    expect(r.map((x) => x.id)).toEqual(['repo'])
  })

  it('index.json が無ければ空の配列を返す', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, json: async () => ({}) })))
    expect(await fetchResources('.')).toEqual([])
  })
})
