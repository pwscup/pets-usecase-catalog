import React from 'react'
import type { RiskMatrixData } from '../../types'

interface RiskMatrixProps {
  data: RiskMatrixData
}

export default function RiskMatrix({ data }: RiskMatrixProps) {
  const { axes, cells } = data

  function getCellNote(impact: string, likelihood: string): string | undefined {
    return cells.find((c) => c.impact === impact && c.likelihood === likelihood)?.note
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-px bg-gray-300"
        style={{
          gridTemplateColumns: `auto ${axes.impact_levels.map(() => '1fr').join(' ')}`,
        }}
      >
        {/* Header: empty corner + impact levels */}
        <div className="bg-gray-100 p-2 text-xs font-medium text-gray-500">影響度→</div>
        {axes.impact_levels.map((impact) => (
          <div key={impact} className="bg-gray-100 p-2 text-center text-sm font-medium">
            {impact}
          </div>
        ))}

        {/* Rows: likelihood level + cells */}
        {axes.likelihood_levels.map((likelihood) => (
          <React.Fragment key={likelihood}>
            <div className="bg-gray-100 p-2 text-sm font-medium">
              {likelihood}
            </div>
            {axes.impact_levels.map((impact) => {
              const note = getCellNote(impact, likelihood)
              return (
                <div
                  key={`${likelihood}-${impact}`}
                  className="min-h-[3rem] bg-white p-2 text-xs"
                >
                  {note ?? ''}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
