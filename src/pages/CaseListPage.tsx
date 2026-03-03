import { useCases } from '../context/CaseContext'
import { useFilter } from '../hooks/useFilter'
import CaseCard from '../components/case-list/CaseCard'
import SearchBar from '../components/case-list/SearchBar'
import FilterPanel from '../components/case-list/FilterPanel'
import SortSelect from '../components/case-list/SortSelect'

export default function CaseListPage() {
  const { cases, loading, error } = useCases()
  const { filters, setQuery, toggleFilter, clearFilters, setSortBy, filteredCases, filterOptions } = useFilter(cases)

  if (loading) {
    return <p>読み込み中...</p>
  }

  if (error) {
    return <p className="text-red-600">エラー: {error}</p>
  }

  if (cases.length === 0) {
    return <p>ユースケースが見つかりません。</p>
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={filters.query} onChange={setQuery} />
        </div>
        <SortSelect value={filters.sortBy} onChange={setSortBy} />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {cases.length}件中 {filteredCases.length}件表示
      </p>

      <div className="flex gap-6">
        <FilterPanel filters={filters} filterOptions={filterOptions} onToggle={toggleFilter} onClear={clearFilters} />

        <div className="flex-1">
          {filteredCases.length === 0 ? (
            <p className="text-gray-500">条件に一致するユースケースがありません。</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCases.map((c) => (
                <CaseCard key={c.id} caseItem={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
