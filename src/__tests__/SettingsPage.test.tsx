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
  const noop = () => {}

  beforeEach(() => {
    mockedUseCases.mockReturnValue({
      cases: [],
      loading: false,
      error: null,
      addCase: noop,
      updateCase: noop,
      deleteCase: noop,
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

  it('インポートエリアが表示される', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('インポート', { selector: 'h2' })).toBeInTheDocument()
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument()
  })

  it('LocalStorageクリアボタンが表示される', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('LocalStorageをクリア')).toBeInTheDocument()
  })
})
