import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CaseNewPage from '../../src/pages/CaseNewPage'

describe('CaseNewPage', () => {
  it('新規作成フォームが表示される', () => {
    render(
      <MemoryRouter>
        <CaseNewPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('新規ケース作成')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'プレビュー' })).toBeInTheDocument()
    expect(screen.getByText('出典（必須）')).toBeInTheDocument()
  })
})
