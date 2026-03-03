import { loadUserCases, saveUserCases, clearUserCases } from "../lib/storage"
import type { Case } from "../types/case"

const STORAGE_KEY = "sd_uc_catalog_cases_v1"

function makeCase(overrides: Partial<Case> = {}): Case {
  return {
    id: "case-1",
    title: "テストケース",
    region: "国内",
    domain: "医療",
    organization: "テスト組織",
    usecase_category: "テストカテゴリ",
    summary: "概要",
    value_proposition: "成果",
    synthetic_generation_method: "方法A",
    safety_evaluation_method: "安全性評価",
    utility_evaluation_method: "有用性評価",
    tags: ["tag1"],
    sources: [],
    figures: [],
    status: "seed",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    ...overrides,
  }
}

function createMockLocalStorage() {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((_index: number) => null),
    _store: store,
  }
}

describe("storage", () => {
  let mockStorage: ReturnType<typeof createMockLocalStorage>

  beforeEach(() => {
    mockStorage = createMockLocalStorage()
    vi.stubGlobal("localStorage", mockStorage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe("loadUserCases", () => {
    it("LocalStorageが空なら空配列を返す", () => {
      expect(loadUserCases()).toEqual([])
      expect(mockStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY)
    })

    it("有効なデータを読み込める", () => {
      const cases = [makeCase({ id: "c1" }), makeCase({ id: "c2" })]
      mockStorage.getItem.mockReturnValue(JSON.stringify(cases))

      const result = loadUserCases()
      expect(result).toHaveLength(2)
      expect(result[0].id).toBe("c1")
      expect(result[1].id).toBe("c2")
    })

    it("不正なJSONでも空配列を返す（クラッシュしない）", () => {
      mockStorage.getItem.mockReturnValue("not-valid-json{{{")

      expect(loadUserCases()).toEqual([])
    })
  })

  describe("saveUserCases", () => {
    it("データが正しく保存される", () => {
      const cases = [makeCase({ id: "save-1" })]
      saveUserCases(cases)

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(cases),
      )
    })
  })

  describe("clearUserCases", () => {
    it("データが削除される", () => {
      clearUserCases()
      expect(mockStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY)
    })
  })
})
