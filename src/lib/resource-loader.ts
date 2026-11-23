import { resourceSchema, type Resource } from '../schemas/resource.schema'
import { RESOURCE_KIND_OPTIONS } from '../constants/resources'

interface ResourceIndex {
  resources: string[]
}

/**
 * public/resources/index.json と各 <id>.json を取ってくる。
 * スキーマに合わない資料は表示せずに読み飛ばす（検査は scripts/validate-resources.ts が CI で行う）。
 */
export async function fetchResources(basePath = '.'): Promise<Resource[]> {
  try {
    const indexRes = await fetch(`${basePath}/resources/index.json`)
    if (!indexRes.ok) return []
    const index: ResourceIndex = await indexRes.json()
    const results = await Promise.all(
      (index.resources ?? []).map(async (id) => {
        try {
          const res = await fetch(`${basePath}/resources/${id}.json`)
          if (!res.ok) return null
          const parsed = resourceSchema.safeParse(await res.json())
          if (!parsed.success) {
            console.warn(`[resource-loader] Skipping invalid resource: ${id}`)
            return null
          }
          return parsed.data
        } catch {
          return null
        }
      }),
    )
    return results.filter((r): r is Resource => r !== null)
  } catch {
    return []
  }
}

export interface ResourceFilter {
  q: string
  kind: string[]
  tech: string[]
  japaneseOnly: boolean
}

export const EMPTY_RESOURCE_FILTER: ResourceFilter = { q: '', kind: [], tech: [], japaneseOnly: false }

/** 技術を横断する資料（technology_category が空）を選ぶためのフィルタ値 */
export const CROSS_CUTTING = 'cross_cutting'

export function filterResources(resources: Resource[], f: ResourceFilter): Resource[] {
  const q = f.q.trim().toLowerCase()
  return resources.filter((r) => {
    if (f.kind.length > 0 && !f.kind.includes(r.kind)) return false
    if (f.tech.length > 0) {
      const techs = r.technology_category.length > 0 ? r.technology_category : [CROSS_CUTTING]
      if (!techs.some((t) => f.tech.includes(t))) return false
    }
    if (f.japaneseOnly && !r.language.includes('ja')) return false
    if (q) {
      const haystack = [r.title, r.title_ja ?? '', r.publisher, r.country, r.description, r.recommended_for]
        .join('\n')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

/** 種類の順（RESOURCE_KIND_OPTIONS の並び）→ 新しい順（日付なしは後ろ）→ 題名の順 */
export function sortResources(resources: Resource[]): Resource[] {
  const kindOrder = (k: string) => {
    const i = (RESOURCE_KIND_OPTIONS as readonly string[]).indexOf(k)
    return i < 0 ? RESOURCE_KIND_OPTIONS.length : i
  }
  return [...resources].sort((a, b) => {
    const byKind = kindOrder(a.kind) - kindOrder(b.kind)
    if (byKind !== 0) return byKind
    const da = a.published_at ?? ''
    const db = b.published_at ?? ''
    if (da !== db) return da < db ? 1 : -1
    return a.title.localeCompare(b.title)
  })
}

/** URL のクエリ ⇔ フィルタ（kind・tech はカンマ区切り、ja=1） */
export function filterFromParams(params: URLSearchParams): ResourceFilter {
  const list = (key: string) => (params.get(key) ? params.get(key)!.split(',').filter(Boolean) : [])
  return { q: params.get('q') ?? '', kind: list('kind'), tech: list('tech'), japaneseOnly: params.get('ja') === '1' }
}

export function filterToParams(f: ResourceFilter): URLSearchParams {
  const p = new URLSearchParams()
  if (f.q) p.set('q', f.q)
  if (f.kind.length > 0) p.set('kind', f.kind.join(','))
  if (f.tech.length > 0) p.set('tech', f.tech.join(','))
  if (f.japaneseOnly) p.set('ja', '1')
  return p
}
