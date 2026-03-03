import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { caseFormSchema, type CaseFormData } from '../../schemas/case.schema'
import type { Case } from '../../types'
import BasicFields from './BasicFields'
import TechFields from './TechFields'
import SourceFields from './SourceFields'
import TagInput from './TagInput'

interface CaseFormProps {
  defaultValues?: Partial<Case>
  onSubmit: (data: Case) => void
  submitLabel: string
}

export default function CaseForm({ defaultValues, onSubmit, submitLabel }: CaseFormProps) {
  const isEdit = !!defaultValues?.id

  const methods = useForm({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      region: defaultValues?.region,
      domain: defaultValues?.domain ?? '',
      organization: defaultValues?.organization ?? '',
      usecase_category: defaultValues?.usecase_category ?? '',
      summary: defaultValues?.summary ?? '',
      value_proposition: defaultValues?.value_proposition ?? '',
      synthetic_generation_method: defaultValues?.synthetic_generation_method ?? '調査中',
      safety_evaluation_method: defaultValues?.safety_evaluation_method ?? '調査中',
      utility_evaluation_method: defaultValues?.utility_evaluation_method ?? '調査中',
      tags: defaultValues?.tags ?? [],
      sources: defaultValues?.sources ?? [{ source_type: 'web', title: '', url: '', note: '' }],
    },
  })

  function handleSubmit(formData: CaseFormData) {
    const now = new Date().toISOString()
    const fullCase: Case = {
      ...formData,
      id: isEdit ? defaultValues!.id! : crypto.randomUUID(),
      figures: defaultValues?.figures ?? [],
      status: isEdit ? defaultValues!.status! : 'user',
      created_at: isEdit ? defaultValues!.created_at! : now,
      updated_at: now,
    }
    onSubmit(fullCase)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => handleSubmit(data as CaseFormData))} className="space-y-8">
        <BasicFields />
        <TechFields />
        <SourceFields />
        <TagInput />
        <div>
          <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            {submitLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
