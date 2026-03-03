import { useFormContext, useFieldArray } from 'react-hook-form'
import type { CaseFormData } from '../../schemas/case.schema'

export default function SourceFields() {
  const { register, control, formState: { errors } } = useFormContext<CaseFormData>()
  const { fields, append, remove } = useFieldArray({ control, name: 'sources' })

  return (
    <div className="space-y-4">
      <span className="block text-lg font-semibold">出典（必須）</span>
      {errors.sources?.root && (
        <p className="text-sm text-red-600">{errors.sources.root.message}</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-lg border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">出典 {index + 1}</span>
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="text-sm text-red-600 hover:underline">
                削除
              </button>
            )}
          </div>

          <div>
            <label htmlFor={`sources.${index}.url`} className="block text-sm font-medium">
              URL<span className="text-red-600">*</span>
            </label>
            <input
              id={`sources.${index}.url`}
              type="text"
              {...register(`sources.${index}.url`)}
              placeholder="https://..."
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
            {errors.sources?.[index]?.url && (
              <p className="mt-1 text-sm text-red-600">{errors.sources[index].url.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`sources.${index}.source_type`} className="block text-sm font-medium">種類</label>
              <select id={`sources.${index}.source_type`} {...register(`sources.${index}.source_type`)} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2">
                <option value="web">Web</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            <div>
              <label htmlFor={`sources.${index}.title`} className="block text-sm font-medium">タイトル</label>
              <input
                id={`sources.${index}.title`}
                type="text"
                {...register(`sources.${index}.title`)}
                placeholder="例: 参考記事のタイトル"
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`sources.${index}.note`} className="block text-sm font-medium">備考</label>
            <input id={`sources.${index}.note`} type="text" {...register(`sources.${index}.note`)} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ source_type: 'web', title: '', url: '', note: '' })}
        className="rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
      >
        + 出典を追加
      </button>
    </div>
  )
}
