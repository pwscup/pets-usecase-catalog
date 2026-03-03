import type { FilterState } from '../../hooks/useFilter'

interface SortSelectProps {
  value: FilterState['sortBy']
  onChange: (value: FilterState['sortBy']) => void
}

const sortOptions: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'title', label: 'タイトル順' },
  { value: 'updated_at_desc', label: '更新日（新しい順）' },
  { value: 'updated_at_asc', label: '更新日（古い順）' },
  { value: 'domain', label: '分野順' },
]

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      aria-label="ソート"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
