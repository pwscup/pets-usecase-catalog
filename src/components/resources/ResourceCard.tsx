import { Link } from 'react-router-dom'
import type { Resource } from '../../schemas/resource.schema'
import { REVIEW_STATUS_COLORS, TECHNOLOGY_CATEGORY_COLORS } from '../../constants/styles'
import { REVIEW_STATUS_LABELS, TECHNOLOGY_CATEGORY_LABELS } from '../../constants/categories'

const LANGUAGE_LABELS: Record<string, string> = { ja: '日本語', en: '英語', sv: 'スウェーデン語', he: 'ヘブライ語', ko: '韓国語' }

function formatDate(d: string | null): string | null {
  if (!d) return null
  const [y, m, day] = d.split('-')
  if (day) return `${y}年${Number(m)}月${Number(day)}日`
  if (m) return `${y}年${Number(m)}月`
  return `${y}年`
}

// import_status・import_note は貢献者向けなので、ここでは表示しない
export default function ResourceCard({ resource }: { resource: Resource }) {
  const date = formatDate(resource.published_at)
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col gap-2" data-testid="resource-card">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${REVIEW_STATUS_COLORS[resource.review_status]?.badge ?? 'bg-gray-100 text-gray-600'}`}>
          {REVIEW_STATUS_LABELS[resource.review_status] ?? resource.review_status}
        </span>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{resource.kind}</span>
        {resource.technology_category.map((tech) => (
          <span key={tech} className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white ${TECHNOLOGY_CATEGORY_COLORS[tech] ?? 'bg-slate-400'}`}>
            {TECHNOLOGY_CATEGORY_LABELS[tech] ?? tech}
          </span>
        ))}
      </div>

      <h2 className="text-base font-semibold text-gray-900 leading-snug">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {resource.title}
        </a>
      </h2>
      {resource.title_ja && <p className="text-sm text-gray-600 -mt-1">{resource.title_ja}</p>}

      <p className="text-xs text-gray-500">
        {[resource.publisher, resource.country, date].filter(Boolean).join(' ・ ')}
        {' ・ '}
        {resource.language.map((l) => LANGUAGE_LABELS[l] ?? l).join('・')}
      </p>

      <p className="text-sm text-gray-700 leading-relaxed">{resource.description}</p>

      <p className="text-sm text-gray-700 bg-blue-50 rounded px-3 py-2">
        <span className="font-semibold text-blue-800">こんな人に：</span>
        {resource.recommended_for}
      </p>

      {(resource.links.length > 0 || resource.related_case_tag) && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {resource.links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.label}
              </a>
            </li>
          ))}
          {resource.related_case_tag && (
            <li>
              <Link to={`/?q=${encodeURIComponent(resource.related_case_tag)}`} className="text-blue-600 hover:underline">
                この事例集から取り込んだ事例を見る
              </Link>
            </li>
          )}
        </ul>
      )}
    </article>
  )
}
