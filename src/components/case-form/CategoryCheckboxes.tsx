import { useFormContext } from 'react-hook-form'
import type { CaseFormData } from '../../schemas/case.schema'
import { USECASE_CATEGORY_OPTIONS } from '../../constants/categories'

export default function CategoryCheckboxes() {
  const { setValue, watch } = useFormContext<CaseFormData>()
  const current = watch('usecase_category') ?? []

  function handleToggle(value: string) {
    if (current.includes(value)) {
      setValue('usecase_category', current.filter((v) => v !== value))
    } else {
      setValue('usecase_category', [...current, value])
    }
  }

  return (
    <div>
      <span className="block text-sm font-medium mb-2">カテゴリ（複数選択可）</span>
      <div className="grid grid-cols-3 gap-2">
        {USECASE_CATEGORY_OPTIONS.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={current.includes(opt)}
              onChange={() => handleToggle(opt)}
              className="rounded border-gray-300"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
