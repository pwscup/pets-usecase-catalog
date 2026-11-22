import { readdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import type { Plugin } from 'vite'

/**
 * public/resources/ 配下の <id>.json（index.json を除く）を数え、
 * 参考資料の id 一覧を public/resources/index.json に書き出す Vite プラグイン。
 * dev サーバー起動時・ビルド時に自動実行される（index.json は .gitignore 済み）。
 */
export function listResourceIds(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.json') && d.name !== 'index.json')
    .map((d) => d.name.replace(/\.json$/, ''))
    .sort()
}

export default function generateResourceIndex(): Plugin {
  const dir = resolve('public/resources')

  function generate() {
    if (!existsSync(dir)) return
    const indexPath = join(dir, 'index.json')
    const newContent = JSON.stringify({ resources: listResourceIds(dir) }, null, 2) + '\n'
    const current = existsSync(indexPath) ? readFileSync(indexPath, 'utf-8') : ''
    if (current !== newContent) {
      writeFileSync(indexPath, newContent)
      console.log(`[generate-resource-index] Updated index.json (${listResourceIds(dir).length} resources)`)
    }
  }

  return {
    name: 'generate-resource-index',
    buildStart() {
      generate()
    },
    configureServer(server) {
      const onChange = (path: string) => {
        if (path.startsWith(dir) && path.endsWith('.json') && !path.endsWith('index.json')) generate()
      }
      server.watcher.on('add', onChange)
      server.watcher.on('unlink', onChange)
    },
  }
}
