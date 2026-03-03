import type { Case } from "../types/case"

const STORAGE_KEY = "sd_uc_catalog_cases_v1"

export function loadUserCases(): Case[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Case[]
  } catch {
    return []
  }
}

export function saveUserCases(cases: Case[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases))
}

export function clearUserCases(): void {
  localStorage.removeItem(STORAGE_KEY)
}
