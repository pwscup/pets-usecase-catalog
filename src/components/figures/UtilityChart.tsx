import type { UtilityChartData } from '../../types'

interface UtilityChartProps {
  data: UtilityChartData
}

export default function UtilityChart({ data }: UtilityChartProps) {
  return (
    <div className="space-y-3">
      {data.series.map((s, i) => (
        <div key={i}>
          <h4 className="mb-1 font-medium">{s.name}</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-50 px-2 py-1 text-left">X</th>
                <th className="border border-gray-300 bg-gray-50 px-2 py-1 text-left">Y</th>
              </tr>
            </thead>
            <tbody>
              {s.points.map((p, j) => (
                <tr key={j}>
                  <td className="border border-gray-300 px-2 py-1">{p.x}</td>
                  <td className="border border-gray-300 px-2 py-1">{p.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
