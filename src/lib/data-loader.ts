import type { Case, CaseCatalog } from "../types/case"
import { loadUserCases } from "./storage"

export async function fetchSeedCases(basePath = "."): Promise<Case[]> {
  try {
    const res = await fetch(`${basePath}/seed_cases.json`)
    if (!res.ok) return []
    const data: CaseCatalog = await res.json()
    return data.cases
  } catch {
    return []
  }
}

export function mergeCases(seedCases: Case[], userCases: Case[]): Case[] {
  const userMap = new Map(userCases.map((c) => [c.id, c]))
  const seenIds = new Set<string>()

  const merged: Case[] = seedCases.map((seed) => {
    seenIds.add(seed.id)
    const userOverride = userMap.get(seed.id)
    return userOverride ?? seed
  })

  for (const uc of userCases) {
    if (!seenIds.has(uc.id)) {
      merged.push(uc)
    }
  }

  return merged
}

export async function loadAllCases(basePath?: string): Promise<Case[]> {
  const [seedCases, userCases] = await Promise.all([
    fetchSeedCases(basePath),
    Promise.resolve(loadUserCases()),
  ])
  return mergeCases(seedCases, userCases)
}
