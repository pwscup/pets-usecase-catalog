import { useCases } from '../context/CaseContext'
import { exportCases } from '../lib/export-import'

export default function SettingsPage() {
  const { cases } = useCases()

  function handleExport() {
    exportCases(cases)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">設定</h1>

      {/* Storage info */}
      <section className="rounded-lg border border-gray-200 p-6 space-y-2">
        <h2 className="text-lg font-semibold">保存方式</h2>
        <p className="text-gray-600">seedデータのみ（読み取り専用）</p>
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
    </div>
  )
}
