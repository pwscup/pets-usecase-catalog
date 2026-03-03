import { useNavigate } from 'react-router-dom'
import { useCases } from '../context/CaseContext'
import CaseForm from '../components/case-form/CaseForm'
import type { Case } from '../types'

export default function CaseNewPage() {
  const { addCase } = useCases()
  const navigate = useNavigate()

  function handleSubmit(data: Case) {
    addCase(data)
    navigate(`/cases/${data.id}`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">新規ケース作成</h1>
      <CaseForm onSubmit={handleSubmit} submitLabel="作成" />
    </div>
  )
}
