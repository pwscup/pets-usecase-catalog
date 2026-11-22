import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { listResourceIds } from '../generate-resource-index'

describe('listResourceIds', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'resource-index-test-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('<id>.json の id を並べて返す（index.json は除く）', () => {
    writeFileSync(join(dir, 'oecd-pets-repository.json'), '{}')
    writeFileSync(join(dir, 'ico-pets-guidance.json'), '{}')
    writeFileSync(join(dir, 'index.json'), '{}')
    expect(listResourceIds(dir)).toEqual(['ico-pets-guidance', 'oecd-pets-repository'])
  })

  it('.json 以外のファイルとフォルダは無視する', () => {
    writeFileSync(join(dir, 'a.json'), '{}')
    writeFileSync(join(dir, 'memo.md'), '')
    mkdirSync(join(dir, 'b.json'))
    expect(listResourceIds(dir)).toEqual(['a'])
  })

  it('フォルダが無ければ空の配列を返す', () => {
    expect(listResourceIds(join(dir, 'missing'))).toEqual([])
  })
})
