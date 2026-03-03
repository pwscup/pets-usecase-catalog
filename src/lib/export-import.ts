import type { Case, CaseCatalog } from "../types/case"

/**
 * Export cases as a JSON file download.
 */
export function exportCases(cases: Case[]): void {
  const catalog: CaseCatalog = {
    schema_version: "1.0",
    cases,
  }
  const json = JSON.stringify(catalog, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const today = new Date().toISOString().slice(0, 10)
  const a = document.createElement("a")
  a.href = url
  a.download = `usecase-catalog-export-${today}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
