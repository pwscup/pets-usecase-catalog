import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Case } from '../types'
import { loadAllCases } from '../lib/data-loader'
import { saveUserCases } from '../lib/storage'

interface CaseContextType {
  cases: Case[]
  loading: boolean
  error: string | null
  addCase: (c: Case) => void
  updateCase: (c: Case) => void
  deleteCase: (id: string) => void
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

  function addCase(c: Case) {
    setCases((prev) => {
      const next = [...prev, c]
      saveUserCases(next.filter((item) => item.status !== 'seed'))
      return next
    })
  }

  function updateCase(c: Case) {
    setCases((prev) => {
      const next = prev.map((item) => (item.id === c.id ? c : item))
      saveUserCases(next.filter((item) => item.status !== 'seed'))
      return next
    })
  }

  function deleteCase(id: string) {
    setCases((prev) => {
      const next = prev.filter((item) => item.id !== id)
      saveUserCases(next.filter((item) => item.status !== 'seed'))
      return next
    })
  }

  return (
    <CaseContext.Provider value={{ cases, loading, error, addCase, updateCase, deleteCase }}>
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
