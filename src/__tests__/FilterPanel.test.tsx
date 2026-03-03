import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FilterPanel from '../components/case-list/FilterPanel'
import type { FilterState } from '../hooks/useFilter'

const defaultFilters: FilterState = {
  query: '',
  region: [],
  domain: [],
  usecase_category: [],
  sortBy: 'title',
}

const filterOptions: Record<string, string[]> = {
  region: ['国内', '国外'],
  domain: ['医療', '金融'],
  usecase_category: ['組織内データ共有', 'R&D'],
}

function renderPanel(filters: FilterState = defaultFilters) {
  return render(
    <MemoryRouter>
      <FilterPanel filters={filters} filterOptions={filterOptions} onToggle={vi.fn()} onClear={vi.fn()} />
    </MemoryRouter>,
  )
}

describe('FilterPanel', () => {
  it('regionフィルタが表示される（デスクトップ）', () => {
    renderPanel()
    // Desktop sidebar contains the region options
    expect(screen.getByText('地域')).toBeInTheDocument()
    expect(screen.getByText('国内')).toBeInTheDocument()
    expect(screen.getByText('国外')).toBeInTheDocument()
  })

  it('フィルタクリアボタンが存在する（アクティブなフィルタがある場合）', () => {
    const activeFilters: FilterState = {
      ...defaultFilters,
      region: ['国内'],
    }
    renderPanel(activeFilters)
    expect(screen.getByTestId('clear-filters')).toBeInTheDocument()
    expect(screen.getByText('フィルタをクリア')).toBeInTheDocument()
  })

  it('フィルタが未選択時はクリアボタンが非表示', () => {
    renderPanel()
    expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument()
  })

  it('分野フィルタが表示される', () => {
    renderPanel()
    expect(screen.getByText('分野')).toBeInTheDocument()
    expect(screen.getByText('医療')).toBeInTheDocument()
    expect(screen.getByText('金融')).toBeInTheDocument()
  })

  it('ユースケース分類フィルタが表示される', () => {
    renderPanel()
    expect(screen.getByText('ユースケース分類')).toBeInTheDocument()
    expect(screen.getByText('組織内データ共有')).toBeInTheDocument()
    expect(screen.getByText('R&D')).toBeInTheDocument()
  })
})
