import { useFormContext, useWatch } from 'react-hook-form'
import type { CaseFormData } from '../../schemas/case.schema'

export default function TagInput() {
  const { setValue, control } = useFormContext<CaseFormData>()
  const tags = useWatch({ control, name: 'tags' }) ?? []

  const displayValue = tags.join(', ')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const parsed = value.split(',').map((t) => t.trim()).filter(Boolean)
    setValue('tags', parsed)
  }

  return (
    <fieldset className="space-y-2">
      <legend className="text-lg font-semibold">タグ</legend>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium">タグ（カンマ区切り）</label>
        <input
          id="tags"
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder="例: 医療, プライバシー, GAN"
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>
    </fieldset>
  )
}
