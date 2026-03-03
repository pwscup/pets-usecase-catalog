import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CaseCard from '../components/case-list/CaseCard'
import type { Case } from '../types'

const mockCase: Case = {
  id: 'case-001',
  title: 'テストケース',
  region: '国内',
  domain: '医療',
  organization: 'テスト組織',
  usecase_category: ['組織内データ共有'],
  summary: 'テスト概要',
  value_proposition: 'テスト成果',
  synthetic_generation_method: '生成方法',
  safety_evaluation_method: '安全性評価',
  utility_evaluation_method: '有用性評価',
  tags: ['tag1'],
  sources: [],
  figures: [],
  status: 'seed',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <CaseCard caseItem={mockCase} />
    </MemoryRouter>,
  )
}

describe('CaseCard', () => {
  it('titleが表示される', () => {
    renderCard()
    expect(screen.getByText('テストケース')).toBeInTheDocument()
  })

  it('organizationが表示される', () => {
    renderCard()
    expect(screen.getByText('テスト組織')).toBeInTheDocument()
  })

  it('usecase_categoryがサブテキストとして表示される', () => {
    renderCard()
    expect(screen.getByText('組織内データ共有')).toBeInTheDocument()
  })

  it('domainがバッジとして表示される', () => {
    renderCard()
    expect(screen.getByText('医療')).toBeInTheDocument()
  })

  it('regionがバッジとして表示される', () => {
    renderCard()
    expect(screen.getByText('国内')).toBeInTheDocument()
  })

  it('詳細ページへのリンクが正しい', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/cases/case-001')
  })
})
