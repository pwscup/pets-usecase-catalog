import { Link } from 'react-router-dom'
import type { Case } from '../../types'

interface CaseCardProps {
  caseItem: Case
}

export default function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Link
      to={`/cases/${caseItem.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4"
    >
      <h2 className="text-lg font-semibold mb-1 line-clamp-2">{caseItem.title}</h2>
      <p className="text-sm font-medium text-gray-700 mb-1">{caseItem.organization}</p>
      {caseItem.usecase_category.length > 0 && (
        <p className="text-xs text-gray-500 mb-3">{caseItem.usecase_category.join(', ')}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {caseItem.region}
        </span>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {caseItem.domain}
        </span>
      </div>
    </Link>
  )
}
