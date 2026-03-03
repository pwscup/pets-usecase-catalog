import type { Case } from "../types/case"

interface CaseIndex {
  cases: string[]
}

export async function fetchSeedCases(basePath = "."): Promise<Case[]> {
  try {
    const indexRes = await fetch(`${basePath}/cases/index.json`)
    if (!indexRes.ok) return []
    const index: CaseIndex = await indexRes.json()

    const results = await Promise.all(
      index.cases.map(async (id) => {
        try {
          const res = await fetch(`${basePath}/cases/${id}/case.json`)
          if (!res.ok) return null
          return (await res.json()) as Case
        } catch {
          return null
        }
      })
    )

    return results.filter((c): c is Case => c !== null)
  } catch {
    return []
  }
}

export async function loadAllCases(basePath?: string): Promise<Case[]> {
  return fetchSeedCases(basePath)
}
