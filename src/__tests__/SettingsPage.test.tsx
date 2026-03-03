import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from '../pages/SettingsPage'
import { useCases } from '../context/CaseContext'

vi.mock('../context/CaseContext', async () => {
  const actual = await vi.importActual<typeof import('../context/CaseContext')>('../context/CaseContext')
  return {
    ...actual,
    useCases: vi.fn(),
  }
})

const mockedUseCases = vi.mocked(useCases)

describe('SettingsPage', () => {
  beforeEach(() => {
    mockedUseCases.mockReturnValue({
      cases: [],
      loading: false,
      error: null,
    })
  })

  it('エクスポートボタンが表示される', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('エクスポート', { selector: 'button' })).toBeInTheDocument()
  })

  it('保存方式がseedデータのみと表示される', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('seedデータのみ（読み取り専用）')).toBeInTheDocument()
  })
})
