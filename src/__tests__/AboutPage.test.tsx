import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AboutPage from '../pages/AboutPage'

describe('AboutPage', () => {
  it('アプリ名が表示される', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('合成データ活用事例カタログ')).toBeInTheDocument()
  })

  it('免責事項が表示される', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('免責事項')).toBeInTheDocument()
    expect(screen.getByText(/情報提供を目的としており/)).toBeInTheDocument()
  })

  it('機微情報警告が表示される', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('機微情報に関する警告')).toBeInTheDocument()
    expect(screen.getByText(/個人情報、顧客識別情報等の機微情報を入力しないでください/)).toBeInTheDocument()
  })
})
