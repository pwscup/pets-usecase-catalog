import { useRef, useState } from 'react'
import { useCases } from '../context/CaseContext'
import { exportCases, importCases } from '../lib/export-import'
import { clearUserCases } from '../lib/storage'
import type { Case } from '../types'

export default function SettingsPage() {
  const { cases, addCase, updateCase } = useCases()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importResult, setImportResult] = useState<{
    cases: Case[]
    errors: string[]
  } | null>(null)
  const [importDone, setImportDone] = useState(false)

  function handleExport() {
    exportCases(cases)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImportDone(false)
    const result = await importCases(file)
    setImportResult(result)
  }

  function handleImportConfirm() {
    if (!importResult) return
    for (const c of importResult.cases) {
      if (cases.some((existing) => existing.id === c.id)) {
        updateCase(c)
      } else {
        addCase(c)
      }
    }
    setImportDone(true)
    setImportResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleImportCancel() {
    setImportResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleClearStorage() {
    if (window.confirm('LocalStorageのデータをクリアしますか？この操作は元に戻せません。')) {
      clearUserCases()
      window.location.reload()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">設定</h1>

      {/* Storage info */}
      <section className="rounded-lg border border-gray-200 p-6 space-y-2">
        <h2 className="text-lg font-semibold">保存方式</h2>
        <p className="text-gray-600">LocalStorage使用中</p>
      </section>

      {/* Export */}
      <section className="rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">エクスポート</h2>
        <p className="text-gray-600 text-sm">全事例をJSON形式でダウンロードします。</p>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          エクスポート
        </button>
      </section>

      {/* Import */}
      <section className="rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold">インポート</h2>
        <p className="text-gray-600 text-sm">JSONファイルから事例をインポートします。</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="block"
        />

        {importResult && importResult.errors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="font-semibold text-red-800">バリデーションエラー:</p>
            <ul className="list-disc ml-4 text-red-700 text-sm">
              {importResult.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {importResult && importResult.errors.length === 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md space-y-3">
            <p className="text-green-800">
              {importResult.cases.length}件の事例が見つかりました。インポートしますか？
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleImportConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                インポート実行
              </button>
              <button
                onClick={handleImportCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {importDone && (
          <p className="text-green-700">インポートが完了しました。</p>
        )}
      </section>

      {/* Clear storage */}
      <section className="rounded-lg border border-red-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-700">データクリア</h2>
        <p className="text-gray-600 text-sm">
          LocalStorageに保存されたユーザーデータをすべて削除します。シードデータは影響を受けません。
        </p>
        <button
          onClick={handleClearStorage}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          LocalStorageをクリア
        </button>
      </section>
    </div>
  )
}
