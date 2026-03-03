import { useFormContext } from 'react-hook-form'
import type { CaseFormData } from '../../schemas/case.schema'
import { DOMAIN_OPTIONS, USECASE_CATEGORY_OPTIONS } from '../../constants/categories'

export default function BasicFields() {
  const { register, formState: { errors } } = useFormContext<CaseFormData>()

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold">基本情報</legend>

      <div>
        <label htmlFor="title" className="block text-sm font-medium">タイトル</label>
        <input id="title" type="text" {...register('title')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium">地域</label>
        <select id="region" {...register('region')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2">
          <option value="">選択してください</option>
          <option value="国内">国内</option>
          <option value="国外">国外</option>
        </select>
        {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>}
      </div>

      <div>
        <label htmlFor="domain" className="block text-sm font-medium">分野</label>
        <select id="domain" {...register('domain')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2">
          <option value="">選択してください</option>
          {DOMAIN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.domain && <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>}
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium">組織名</label>
        <input id="organization" type="text" {...register('organization')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>}
      </div>

      <div>
        <label htmlFor="usecase_category" className="block text-sm font-medium">ユースケースカテゴリ</label>
        <select id="usecase_category" {...register('usecase_category')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2">
          <option value="">選択してください</option>
          {USECASE_CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.usecase_category && <p className="mt-1 text-sm text-red-600">{errors.usecase_category.message}</p>}
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium">概要</label>
        <textarea id="summary" rows={4} {...register('summary')} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>}
      </div>

      <div>
        <label htmlFor="value_proposition" className="block text-sm font-medium">合成データで得られた価値</label>
        <textarea id="value_proposition" rows={3} {...register('value_proposition')} placeholder="調査中" className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
      </div>
    </fieldset>
  )
}
