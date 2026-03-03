import type { DataFlowData } from '../../types'

interface DataFlowDiagramProps {
  data: DataFlowData
}

export default function DataFlowDiagram({ data }: DataFlowDiagramProps) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {data.nodes.map((node) => (
          <div
            key={node.id}
            className="rounded border border-gray-300 bg-white px-3 py-2 shadow-sm"
          >
            <div className="font-medium">{node.label}</div>
            <div className="text-xs text-gray-500">{node.category}</div>
          </div>
        ))}
      </div>
      {data.edges.length > 0 && (
        <ul className="space-y-1 text-sm">
          {data.edges.map((edge, i) => (
            <li key={i}>
              {edge.from} → {edge.to}
              {edge.label && <span className="ml-1 text-gray-500">({edge.label})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
