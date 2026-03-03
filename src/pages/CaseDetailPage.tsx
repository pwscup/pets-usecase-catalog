import { useParams, Link } from 'react-router-dom'
import { useCases } from '../context/CaseContext'
import CaseDetailView from '../components/case-detail/CaseDetailView'

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { cases, loading } = useCases()

  if (loading) {
    return <p>読み込み中...</p>
  }

  const caseData = cases.find((c) => c.id === id)

  if (!caseData) {
    return (
      <div>
        <p>事例が見つかりません</p>
        <Link to="/" className="text-blue-700 underline">一覧に戻る</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-blue-700 underline text-sm mb-4 inline-block">← 一覧に戻る</Link>

      <CaseDetailView caseData={caseData} />

      {/* Edit link */}
      <div className="mt-4 mb-6">
        <Link
          to={`/cases/${caseData.id}/edit`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          編集
        </Link>
      </div>
    </div>
  )
}
