import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CaseForm from '../components/case-form/CaseForm'
import type { Case } from '../types'

const mockCase: Case = {
  id: 'case-edit-001',
  title: '編集テスト事例',
  region: '国内',
  domain: '医療',
  organization: 'テスト病院',
  usecase_category: '組織内データ共有',
  summary: 'テスト概要',
  value_proposition: 'テスト成果',
  synthetic_generation_method: 'GAN',
  safety_evaluation_method: 'k-匿名性',
  utility_evaluation_method: 'ベンチマーク',
  tags: ['医療', 'GAN'],
  sources: [
    { source_type: 'web', title: '出典1', url: 'https://example.com', note: 'メモ' },
  ],
  figures: [],
  status: 'user',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

describe('CaseForm', () => {
  it('フォームが表示される（全フィールドが存在）', () => {
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    expect(screen.getByLabelText('タイトル')).toBeInTheDocument()
    expect(screen.getByLabelText('地域')).toBeInTheDocument()
    expect(screen.getByLabelText('分野')).toBeInTheDocument()
    expect(screen.getByLabelText('組織名')).toBeInTheDocument()
    expect(screen.getByLabelText('ユースケースカテゴリ')).toBeInTheDocument()
    expect(screen.getByLabelText('概要')).toBeInTheDocument()
    expect(screen.getByLabelText('合成データで得られた価値')).toBeInTheDocument()
    expect(screen.getByLabelText('合成データ生成手法')).toBeInTheDocument()
    expect(screen.getByLabelText('安全性評価手法')).toBeInTheDocument()
    expect(screen.getByLabelText('有用性評価手法')).toBeInTheDocument()
    expect(screen.getByLabelText('タグ（カンマ区切り）')).toBeInTheDocument()
    expect(screen.getByText('出典')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '作成' })).toBeInTheDocument()
  })

  it('必須項目が空の場合にバリデーションエラーが表示される', async () => {
    const user = userEvent.setup()
    render(<CaseForm onSubmit={() => {}} submitLabel="作成" />)

    await user.click(screen.getByRole('button', { name: '作成' }))

    await waitFor(() => {
      expect(screen.getByText('タイトルは必須です')).toBeInTheDocument()
    })
    expect(screen.getByText('分野は必須です')).toBeInTheDocument()
    expect(screen.getByText('組織名は必須です')).toBeInTheDocument()
    expect(screen.getByText('概要は必須です')).toBeInTheDocument()
  })

  it('有効なデータで submit できる', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CaseForm onSubmit={onSubmit} submitLabel="作成" />)

    await user.type(screen.getByLabelText('タイトル'), 'テストタイトル')
    await user.selectOptions(screen.getByLabelText('地域'), '国内')
    await user.selectOptions(screen.getByLabelText('分野'), '金融')
    await user.type(screen.getByLabelText('組織名'), 'テスト組織')
    await user.selectOptions(screen.getByLabelText('ユースケースカテゴリ'), 'R&D')
    await user.type(screen.getByLabelText('概要'), 'テスト概要文')

    // Fill source fields
    await user.type(screen.getByLabelText('出典タイトル'), '出典タイトル')
    await user.type(screen.getByLabelText('URL'), 'https://example.com')

    await user.click(screen.getByRole('button', { name: '作成' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    const submitted = onSubmit.mock.calls[0][0] as Case
    expect(submitted.title).toBe('テストタイトル')
    expect(submitted.region).toBe('国内')
    expect(submitted.domain).toBe('金融')
    expect(submitted.id).toBeTruthy()
    expect(submitted.status).toBe('user')
    expect(submitted.created_at).toBeTruthy()
    expect(submitted.updated_at).toBeTruthy()
  })

  it('defaultValues がフォームにプリフィルされる', () => {
    render(<CaseForm defaultValues={mockCase} onSubmit={() => {}} submitLabel="更新" />)

    expect(screen.getByLabelText('タイトル')).toHaveValue('編集テスト事例')
    expect(screen.getByLabelText('地域')).toHaveValue('国内')
    expect(screen.getByLabelText('分野')).toHaveValue('医療')
    expect(screen.getByLabelText('組織名')).toHaveValue('テスト病院')
    expect(screen.getByLabelText('ユースケースカテゴリ')).toHaveValue('組織内データ共有')
    expect(screen.getByLabelText('概要')).toHaveValue('テスト概要')
    expect(screen.getByLabelText('合成データで得られた価値')).toHaveValue('テスト成果')
    expect(screen.getByLabelText('合成データ生成手法')).toHaveValue('GAN')
    expect(screen.getByLabelText('安全性評価手法')).toHaveValue('k-匿名性')
    expect(screen.getByLabelText('有用性評価手法')).toHaveValue('ベンチマーク')
    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
  })

  it('編集時はidとcreated_atが保持される', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CaseForm defaultValues={mockCase} onSubmit={onSubmit} submitLabel="更新" />)

    await user.click(screen.getByRole('button', { name: '更新' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    const submitted = onSubmit.mock.calls[0][0] as Case
    expect(submitted.id).toBe('case-edit-001')
    expect(submitted.created_at).toBe('2026-01-01T00:00:00Z')
    expect(submitted.status).toBe('user')
  })
})
