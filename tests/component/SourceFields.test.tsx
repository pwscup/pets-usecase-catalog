import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CaseForm from '../../src/components/case-form/CaseForm'

describe('SourceFields', () => {
  it('初期状態で1つの出典フォームが表示される', () => {
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    expect(screen.getByText('出典 1')).toBeInTheDocument()
    expect(screen.getByLabelText('種類')).toBeInTheDocument()
  })

  it('「出典を追加」で出典フォームが増える', async () => {
    const user = userEvent.setup()
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    await user.click(screen.getByRole('button', { name: '+ 出典を追加' }))

    expect(screen.getByText('出典 1')).toBeInTheDocument()
    expect(screen.getByText('出典 2')).toBeInTheDocument()
  })

  it('1件のみの場合は削除ボタンが表示されない', () => {
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    expect(screen.queryByText('削除')).not.toBeInTheDocument()
  })

  it('2件以上の場合は削除ボタンが表示される', async () => {
    const user = userEvent.setup()
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    await user.click(screen.getByRole('button', { name: '+ 出典を追加' }))

    const deleteButtons = screen.getAllByText('削除')
    expect(deleteButtons).toHaveLength(2)
  })
})
