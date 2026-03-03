import { useParams, useNavigate } from 'react-router-dom'
import { useCases } from '../context/CaseContext'
import CaseForm from '../components/case-form/CaseForm'
import type { Case } from '../types'

export default function CaseEditPage() {
  const { id } = useParams<{ id: string }>()
  const { cases, updateCase, deleteCase } = useCases()
  const navigate = useNavigate()

  const targetCase = cases.find((c) => c.id === id)

  if (!targetCase) {
    return (
      <div className="mx-auto max-w-3xl">
        <p>事例が見つかりません</p>
      </div>
    )
  }

  function handleSubmit(data: Case) {
    updateCase(data)
    navigate(`/cases/${data.id}`)
  }

  function handleDelete() {
    if (window.confirm('この事例を削除しますか？')) {
      deleteCase(targetCase!.id)
      navigate('/')
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">ケース編集</h1>
      <CaseForm defaultValues={targetCase} onSubmit={handleSubmit} submitLabel="更新" />
      <div className="mt-8 border-t pt-6">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700"
        >
          削除
        </button>
      </div>
    </div>
  )
}
