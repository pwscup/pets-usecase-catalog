import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Resource } from '../schemas/resource.schema'
import {
  CROSS_CUTTING,
  fetchResources,
  filterFromParams,
  filterResources,
  filterToParams,
  sortResources,
  type ResourceFilter,
} from '../lib/resource-loader'
import { RESOURCE_KIND_OPTIONS } from '../constants/resources'
import { REVIEW_STATUS_LABELS, TECHNOLOGY_CATEGORY_LABELS, TECHNOLOGY_CATEGORY_OPTIONS } from '../constants/categories'
import ResourceCard from '../components/resources/ResourceCard'

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
        active ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = useMemo(() => filterFromParams(searchParams), [searchParams])

  useEffect(() => {
    fetchResources(import.meta.env.BASE_URL.replace(/\/$/, ''))
      .then(setResources)
      .finally(() => setLoading(false))
  }, [])

  const update = (next: Partial<ResourceFilter>) => setSearchParams(filterToParams({ ...filter, ...next }), { replace: true })

  const kindsPresent = RESOURCE_KIND_OPTIONS.filter((k) => resources.some((r) => r.kind === k))
  const shown = useMemo(() => sortResources(filterResources(resources, filter)), [resources, filter])
  const hasAiGenerated = resources.some((r) => r.review_status === 'ai_generated')
  const isFiltered = filter.q || filter.kind.length || filter.tech.length || filter.japaneseOnly

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">参考資料</h1>
        <p className="text-sm text-gray-600">
          PETs を検討するときに読んでおきたい、事例集・当局のガイド・報告書・標準などをまとめています。題名を押すと資料本体が開きます。
        </p>
        {hasAiGenerated && (
          <p className="text-xs text-yellow-800 bg-yellow-50 border border-yellow-200 rounded px-3 py-2" data-testid="resources-ai-notice">
            「{REVIEW_STATUS_LABELS.ai_generated}」の付いた資料の説明文は、AI が資料をもとに作成したもので、人による確認が済んでいません。内容は必ず資料本体で確かめてください。
          </p>
        )}
      </div>

      <section className="bg-white rounded-lg border border-gray-100 p-4 space-y-3" aria-label="絞り込み">
        <input
          type="search"
          value={filter.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="題名・発行元・説明で検索"
          aria-label="参考資料を検索"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 w-12">種類</span>
          {kindsPresent.map((k) => (
            <Chip key={k} active={filter.kind.includes(k)} onClick={() => update({ kind: toggle(filter.kind, k) })}>
              {k}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 w-12">技術</span>
          <Chip active={filter.tech.includes(CROSS_CUTTING)} onClick={() => update({ tech: toggle(filter.tech, CROSS_CUTTING) })}>
            技術を横断
          </Chip>
          {TECHNOLOGY_CATEGORY_OPTIONS.map((t) => (
            <Chip key={t} active={filter.tech.includes(t)} onClick={() => update({ tech: toggle(filter.tech, t) })}>
              {TECHNOLOGY_CATEGORY_LABELS[t]}
            </Chip>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={filter.japaneseOnly} onChange={(e) => update({ japaneseOnly: e.target.checked })} />
          日本語で読めるものだけ
        </label>
      </section>

      {loading ? (
        <p className="text-gray-500">読み込み中...</p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {shown.length} 件の参考資料{isFiltered ? `（全 ${resources.length} 件中）` : ''}
            </p>
            {isFiltered && (
              <button type="button" onClick={() => setSearchParams(new URLSearchParams(), { replace: true })} className="text-xs text-blue-600 hover:underline">
                絞り込みを解除
              </button>
            )}
          </div>
          {shown.length === 0 ? (
            <p className="text-gray-500 text-sm">条件に合う参考資料はありません。</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {shown.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
