import { render, screen } from '@testing-library/react'
import SourceList from '../components/case-detail/SourceList'
import type { Source } from '../types'

const mockSources: Source[] = [
  {
    source_type: 'pdf',
    title: 'PDF論文タイトル',
    url: 'https://example.com/paper.pdf',
    note: '重要な参考文献',
  },
  {
    source_type: 'web',
    title: 'Webページタイトル',
    url: 'https://example.com/page',
    note: '',
  },
]

describe('SourceList', () => {
  it('出典がリンクとして表示される', () => {
    render(<SourceList sources={mockSources} />)
    const pdfLink = screen.getByText('PDF論文タイトル')
    expect(pdfLink.closest('a')).toHaveAttribute('href', 'https://example.com/paper.pdf')
    expect(pdfLink.closest('a')).toHaveAttribute('target', '_blank')
    expect(pdfLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')

    const webLink = screen.getByText('Webページタイトル')
    expect(webLink.closest('a')).toHaveAttribute('href', 'https://example.com/page')
  })

  it('source_typeに応じたラベルが表示される', () => {
    render(<SourceList sources={mockSources} />)
    expect(screen.getByText('[PDF]')).toBeInTheDocument()
    expect(screen.getByText('[Web]')).toBeInTheDocument()
  })

  it('noteが表示される', () => {
    render(<SourceList sources={mockSources} />)
    expect(screen.getByText('重要な参考文献')).toBeInTheDocument()
  })

  it('sourcesが空の場合は何も表示しない', () => {
    const { container } = render(<SourceList sources={[]} />)
    expect(container.innerHTML).toBe('')
  })
})
