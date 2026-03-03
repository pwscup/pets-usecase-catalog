import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CaseNewPage from '../pages/CaseNewPage'
import { useCases } from '../context/CaseContext'

vi.mock('../context/CaseContext', async () => {
  const actual = await vi.importActual<typeof import('../context/CaseContext')>('../context/CaseContext')
  return {
    ...actual,
    useCases: vi.fn(),
  }
})

const mockedUseCases = vi.mocked(useCases)

describe('CaseNewPage', () => {
  beforeEach(() => {
    mockedUseCases.mockReturnValue({
      cases: [],
      loading: false,
      error: null,
      addCase: vi.fn(),
      updateCase: vi.fn(),
      deleteCase: vi.fn(),
    })
  })

  it('新規作成フォームが表示される', () => {
    render(
      <MemoryRouter>
        <CaseNewPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('新規ケース作成')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '作成' })).toBeInTheDocument()
    expect(screen.getByLabelText('タイトル')).toBeInTheDocument()
  })
})
