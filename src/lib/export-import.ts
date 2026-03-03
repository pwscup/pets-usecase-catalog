import type { Case, CaseCatalog } from "../types/case"
import { caseCatalogSchema } from "../schemas/case.schema"

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

/**
 * Import cases from a JSON file. Validates against caseCatalogSchema.
 */
export async function importCases(
  file: File,
): Promise<{ cases: Case[]; errors: string[] }> {
  const text = await file.text()

  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { cases: [], errors: ["JSONの解析に失敗しました"] }
  }

  const result = caseCatalogSchema.safeParse(parsed)
  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    )
    return { cases: [], errors }
  }

  return { cases: result.data.cases as Case[], errors: [] }
}
