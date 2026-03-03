import { exportCases, importCases } from '../lib/export-import'
import type { Case } from '../types'

const validCase: Case = {
  id: 'case-001',
  title: 'テストケース',
  region: '国内',
  domain: '医療',
  organization: 'テスト組織',
  usecase_category: 'プライバシー保護',
  summary: '概要',
  value_proposition: '成果',
  synthetic_generation_method: '方法',
  safety_evaluation_method: '安全性',
  utility_evaluation_method: '有用性',
  tags: ['tag1'],
  sources: [{ source_type: 'web', title: 'ソース', url: 'https://example.com', note: '' }],
  figures: [],
  status: 'seed',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

describe('exportCases', () => {
  it('Blobが作成されダウンロードリンクが生成される', () => {
    const mockUrl = 'blob:test-url'
    const createObjectURL = vi.fn(() => mockUrl)
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })

    const clickSpy = vi.fn()
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node)
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node)
    vi.spyOn(document, 'createElement').mockReturnValue({
      set href(_: string) {},
      set download(_: string) {},
      click: clickSpy,
    } as unknown as HTMLAnchorElement)

    exportCases([validCase])

    expect(createObjectURL).toHaveBeenCalledOnce()
    const blob = createObjectURL.mock.calls[0][0] as Blob
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('application/json')
    expect(clickSpy).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith(mockUrl)

    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })
})

describe('importCases', () => {
  function makeFile(content: string): File {
    return new File([content], 'test.json', { type: 'application/json' })
  }

  it('有効なJSONファイルでCaseが返る', async () => {
    const catalog = { schema_version: '1.0', cases: [validCase] }
    const file = makeFile(JSON.stringify(catalog))

    const result = await importCases(file)

    expect(result.errors).toHaveLength(0)
    expect(result.cases).toHaveLength(1)
    expect(result.cases[0].id).toBe('case-001')
  })

  it('不正なJSONでエラーが返る', async () => {
    const file = makeFile('not valid json{{{')

    const result = await importCases(file)

    expect(result.cases).toHaveLength(0)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]).toContain('JSON')
  })

  it('スキーマ不正でエラーが返る', async () => {
    const invalidCatalog = { schema_version: '1.0', cases: [{ id: '' }] }
    const file = makeFile(JSON.stringify(invalidCatalog))

    const result = await importCases(file)

    expect(result.cases).toHaveLength(0)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})
