import { fetchSeedCases, mergeCases } from "../lib/data-loader"
import type { Case } from "../types/case"

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

describe("mergeCases", () => {
  it("seedのみの場合そのまま返す", () => {
    const seeds = [makeCase({ id: "s1" }), makeCase({ id: "s2" })]
    const result = mergeCases(seeds, [])
    expect(result).toEqual(seeds)
  })

  it("userのみの場合そのまま返す", () => {
    const users = [makeCase({ id: "u1" })]
    const result = mergeCases([], users)
    expect(result).toEqual(users)
  })

  it("id衝突時にuserが優先される", () => {
    const seed = makeCase({ id: "dup", title: "Seed版" })
    const user = makeCase({ id: "dup", title: "User版", status: "user" })

    const result = mergeCases([seed], [user])
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe("User版")
    expect(result[0].status).toBe("user")
  })

  it("user独自のcaseが末尾に追加される", () => {
    const seeds = [makeCase({ id: "s1" }), makeCase({ id: "s2" })]
    const users = [makeCase({ id: "u1" })]

    const result = mergeCases(seeds, users)
    expect(result).toHaveLength(3)
    expect(result[2].id).toBe("u1")
  })

  it("seed順序が保持される", () => {
    const seeds = [
      makeCase({ id: "a" }),
      makeCase({ id: "b" }),
      makeCase({ id: "c" }),
    ]
    const users = [makeCase({ id: "b", title: "User版B" })]

    const result = mergeCases(seeds, users)
    expect(result.map((c) => c.id)).toEqual(["a", "b", "c"])
    expect(result[1].title).toBe("User版B")
  })
})

describe("fetchSeedCases", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("fetch成功時にCase[]を返す", async () => {
    const cases = [makeCase({ id: "seed-1" })]
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ schema_version: "1.0", cases }),
    }
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse))

    const result = await fetchSeedCases("/data")
    expect(fetch).toHaveBeenCalledWith("/data/seed_cases.json")
    expect(result).toEqual(cases)
  })

  it("fetch失敗時に空配列を返す", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")))

    const result = await fetchSeedCases()
    expect(result).toEqual([])
  })
})
