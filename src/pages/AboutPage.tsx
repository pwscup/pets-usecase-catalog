export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">合成データ活用事例カタログ</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">概要</h2>
        <p className="text-gray-700">
          本アプリケーションは、合成データの活用事例を収集・整理し、検索・閲覧できるカタログです。
          国内外の多様な分野における合成データの活用方法、安全性評価、有用性評価の情報を提供します。
        </p>
      </section>

      <section className="p-4 bg-yellow-50 border border-yellow-300 rounded-md space-y-2">
        <h2 className="text-lg font-semibold text-yellow-800">免責事項</h2>
        <p className="text-yellow-900 text-sm">
          本アプリケーションは情報提供を目的としており、掲載内容の正確性・完全性を保証するものではありません。
          掲載情報に基づく判断・行動については、利用者ご自身の責任において行ってください。
        </p>
      </section>

      <section className="p-4 bg-red-50 border border-red-300 rounded-md space-y-2">
        <h2 className="text-lg font-semibold text-red-800">機微情報に関する警告</h2>
        <p className="text-red-900 text-sm">
          個人情報、顧客識別情報等の機微情報を入力しないでください。
          本アプリケーションはLocalStorageにデータを保存するため、機微情報の安全な管理には適していません。
        </p>
      </section>

      <section className="text-sm text-gray-500">
        <p>バージョン: v0.1.0</p>
      </section>
    </div>
  )
}
