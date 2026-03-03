import type { Figure, DataFlowData, RiskMatrixData, UtilityChartData } from '../../types'
import DataFlowDiagram from './DataFlowDiagram'
import RiskMatrix from './RiskMatrix'
import UtilityChart from './UtilityChart'

interface FigureRendererProps {
  figure: Figure
}

export default function FigureRenderer({ figure }: FigureRendererProps) {
  return (
    <div className="rounded border border-gray-200 p-4">
      <h3 className="mb-2 font-semibold">{figure.title}</h3>
      {figure.type === 'data_flow' && (
        <DataFlowDiagram data={figure.data as DataFlowData} />
      )}
      {figure.type === 'risk_matrix' && (
        <RiskMatrix data={figure.data as RiskMatrixData} />
      )}
      {figure.type === 'utility_chart' && (
        <UtilityChart data={figure.data as UtilityChartData} />
      )}
      {figure.note && (
        <p className="mt-2 text-sm text-gray-500">{figure.note}</p>
      )}
    </div>
  )
}
