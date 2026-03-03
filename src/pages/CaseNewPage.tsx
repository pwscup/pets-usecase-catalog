import { useState } from 'react'
import CaseForm from '../components/case-form/CaseForm'
import CasePreview from '../components/case-detail/CasePreview'
import type { Case } from '../types'

export default function CaseNewPage() {
  const [previewData, setPreviewData] = useState<Case | null>(null)

  if (previewData) {
    return <CasePreview caseData={previewData} onBack={() => setPreviewData(null)} />
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">新規ケース作成</h1>
      <CaseForm onSubmit={setPreviewData} submitLabel="プレビュー" />
    </div>
  )
}
