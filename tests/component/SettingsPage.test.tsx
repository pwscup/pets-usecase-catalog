import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from '../../src/pages/SettingsPage'
import { useCases } from '../../src/context/CaseContext'

vi.mock('../../src/context/CaseContext', async () => {
  const actual = await vi.importActual<typeof import('../../src/context/CaseContext')>('../../src/context/CaseContext')
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
