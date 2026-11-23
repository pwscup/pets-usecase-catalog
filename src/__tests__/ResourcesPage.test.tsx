import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi, afterEach } from 'vitest'
import ResourcesPage from '../pages/ResourcesPage'

const base = {
  publisher_type: '政府・規制当局',
  country: '英国',
  technology_category: [],
  language: ['en'],
  published_at: '2024',
  links: [],
  review_status: 'ai_generated',
  note: '',
  created_at: '2026-11-22T00:00:00.000Z',
  updated_at: '2026-11-22T00:00:00.000Z',
}
const files: Record<string, unknown> = {
  '/resources/index.json': { resources: ['repo', 'guide'] },
  '/resources/repo.json': {
    ...base,
    id: 'repo',
    title: 'Case Repository',
    publisher: 'OECD',
    kind: '事例集',
    url: 'https://example.org/repo',
    description: '事例を集めたリポジトリ',
    recommended_for: '事例を見渡したい人',
    related_case_tag: 'Example Repository',
    import_status: '一部取り込み',
    import_note: '#232 の内部メモ',
  },
  '/resources/guide.json': {
    ...base,
    id: 'guide',
    title: 'Anonymisation Guide',
    publisher: 'ICO',
    kind: 'ガイド・ガイダンス',
    technology_category: ['anonymization'],
    language: ['ja'],
    url: 'https://example.org/guide',
    description: '匿名化のガイド',
    recommended_for: '匿名化を判断する人',
    review_status: 'human_reviewed',
  },
}

function renderPage(path = '/resources') {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const key = url.replace(/^.*?(\/resources\/)/, '$1')
      return { ok: key in files, json: async () => files[key] }
    }),
  )
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ResourcesPage />
    </MemoryRouter>,
  )
}

describe('ResourcesPage', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('参考資料をカードで表示し、題名が資料本体へのリンクになる', async () => {
    renderPage()
    const link = await screen.findByRole('link', { name: 'Case Repository' })
    expect(link).toHaveAttribute('href', 'https://example.org/repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getAllByTestId('resource-card')).toHaveLength(2)
    expect(screen.getByText('2 件の参考資料')).toBeInTheDocument()
  })

  it('取り込み状況（import_status・import_note）は表示しない', async () => {
    renderPage()
    await screen.findByText('Case Repository')
    expect(screen.queryByText('一部取り込み')).not.toBeInTheDocument()
    expect(screen.queryByText(/内部メモ/)).not.toBeInTheDocument()
  })

  it('AI 生成の資料があれば注意書きを出す', async () => {
    renderPage()
    expect(await screen.findByTestId('resources-ai-notice')).toBeInTheDocument()
  })

  it('事例集には、取り込んだ事例の一覧へのリンクを出す', async () => {
    renderPage()
    const link = await screen.findByRole('link', { name: 'この事例集から取り込んだ事例を見る' })
    expect(link).toHaveAttribute('href', '/?q=Example%20Repository')
  })

  it('種類で絞り込める', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByText('Case Repository')
    await user.click(screen.getByRole('button', { name: 'ガイド・ガイダンス' }))
    const cards = screen.getAllByTestId('resource-card')
    expect(cards).toHaveLength(1)
    expect(within(cards[0]).getByText('Anonymisation Guide')).toBeInTheDocument()
    expect(screen.getByText('1 件の参考資料（全 2 件中）')).toBeInTheDocument()
  })

  it('URL のクエリから絞り込みを復元する（日本語で読めるものだけ）', async () => {
    renderPage('/resources?ja=1')
    await screen.findByText('Anonymisation Guide')
    expect(screen.queryByText('Case Repository')).not.toBeInTheDocument()
    expect(screen.getByLabelText('日本語で読めるものだけ')).toBeChecked()
  })

  it('条件に合う資料が無ければ、そう表示する', async () => {
    renderPage('/resources?q=該当なし')
    expect(await screen.findByText('条件に合う参考資料はありません。')).toBeInTheDocument()
  })
})
