/**
 * public/resources/ 配下の参考資料（<id>.json）を Zod スキーマで検査するスクリプト。
 * CI とデプロイで実行し、不正なデータが公開されるのを防ぐ。
 *
 * Usage: npx tsx scripts/validate-resources.ts
 */
import { readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { resourceSchema } from '../src/schemas/resource.schema'
import { listResourceIds } from '../plugins/generate-resource-index'

const dir = resolve('public/resources')

export function validateResource(id: string, raw: string): string[] {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch (e) {
    return [`JSON parse error: ${e instanceof Error ? e.message : String(e)}`]
  }
  const result = resourceSchema.safeParse(data)
  const errors = result.success
    ? []
    : result.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
  if (result.success && result.data.id !== id) {
    errors.push(`"id" ("${result.data.id}") がファイル名 ("${id}.json") と一致しない`)
  }
  return errors
}

function main() {
  const ids = listResourceIds(dir)
  const failures: { id: string; errors: string[] }[] = []
  const seenUrls = new Map<string, string>()

  for (const id of ids) {
    const raw = readFileSync(join(dir, `${id}.json`), 'utf-8')
    const errors = validateResource(id, raw)
    if (errors.length === 0) {
      const url = (JSON.parse(raw) as { url: string }).url
      const other = seenUrls.get(url)
      if (other) errors.push(`url が ${other} と重複している（同じ資料を二重に登録していないか）`)
      else seenUrls.set(url, id)
    }
    if (errors.length > 0) failures.push({ id, errors })
  }

  console.log(`Validated ${ids.length} resource(s)`)
  if (failures.length > 0) {
    console.error(`\n${failures.length} resource(s) have errors:\n`)
    for (const f of failures) {
      console.error(`  ${f.id}:`)
      for (const e of f.errors) console.error(`    - ${e}`)
    }
    process.exit(1)
  }
  console.log('\nAll resources are valid.')
}

// テストから import されたときは実行しない
if (process.argv[1] && resolve(process.argv[1]) === resolve('scripts/validate-resources.ts')) {
  main()
}
