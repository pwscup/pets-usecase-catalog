import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Case } from '../types'
import { loadAllCases } from '../lib/data-loader'

interface CaseContextType {
  cases: Case[]
  loading: boolean
  error: string | null
}

const CaseContext = createContext<CaseContextType | undefined>(undefined)

export function CaseProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAllCases()
      .then((data) => setCases(data))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'データの読み込みに失敗しました'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <CaseContext.Provider value={{ cases, loading, error }}>
      {children}
    </CaseContext.Provider>
  )
}

export function useCases(): CaseContextType {
  const ctx = useContext(CaseContext)
  if (ctx === undefined) {
    throw new Error('useCases must be used within a CaseProvider')
  }
  return ctx
}
