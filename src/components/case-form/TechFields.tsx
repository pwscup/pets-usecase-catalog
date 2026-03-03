import { useFormContext } from 'react-hook-form'
import type { CaseFormData } from '../../schemas/case.schema'

export default function TechFields() {
  const { register } = useFormContext<CaseFormData>()

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold">技術情報</legend>

      <div>
        <label htmlFor="synthetic_generation_method" className="block text-sm font-medium">合成データ生成手法</label>
        <input id="synthetic_generation_method" type="text" {...register('synthetic_generation_method')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
      </div>

      <div>
        <label htmlFor="safety_evaluation_method" className="block text-sm font-medium">安全性評価手法</label>
        <input id="safety_evaluation_method" type="text" {...register('safety_evaluation_method')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
      </div>

      <div>
        <label htmlFor="utility_evaluation_method" className="block text-sm font-medium">有用性評価手法</label>
        <input id="utility_evaluation_method" type="text" {...register('utility_evaluation_method')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
      </div>
    </fieldset>
  )
}
