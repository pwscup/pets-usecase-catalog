interface TechInfoProps {
  synthetic_generation_method: string
  safety_evaluation_method: string
  utility_evaluation_method: string
}

function TechValue({ value }: { value: string }) {
  if (value === '調査中') {
    return (
      <span className="inline-block rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-600">
        調査中
      </span>
    )
  }
  return <span>{value}</span>
}

export default function TechInfo({
  synthetic_generation_method,
  safety_evaluation_method,
  utility_evaluation_method,
}: TechInfoProps) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold">技術情報</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium text-gray-600">合成データ生成手法</dt>
        <dd><TechValue value={synthetic_generation_method} /></dd>
        <dt className="font-medium text-gray-600">安全性評価手法</dt>
        <dd><TechValue value={safety_evaluation_method} /></dd>
        <dt className="font-medium text-gray-600">有用性評価手法</dt>
        <dd><TechValue value={utility_evaluation_method} /></dd>
      </dl>
    </section>
  )
}
