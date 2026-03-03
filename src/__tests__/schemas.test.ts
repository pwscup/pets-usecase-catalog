import { describe, it, expect } from "vitest";
import {
  caseSchema,
  caseCatalogSchema,
  figureSchema,
} from "../schemas/case.schema";

/** Helper: minimal valid case data (all required fields) */
function validCaseInput(overrides: Record<string, unknown> = {}) {
  return {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "合成データによる金融リスク分析",
    region: "国内" as const,
    domain: "金融",
    organization: "テスト銀行",
    usecase_category: "組織内共有",
    summary: "合成データを活用した金融リスク分析の事例",
    sources: [
      {
        source_type: "web" as const,
        title: "参考記事",
        url: "https://example.com/article",
        note: "",
      },
    ],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("caseSchema", () => {
  it("有効なCaseデータでバリデーションが通る", () => {
    const input = validCaseInput();
    const result = caseSchema.parse(input);

    expect(result.title).toBe("合成データによる金融リスク分析");
    expect(result.region).toBe("国内");
    expect(result.status).toBe("user");
  });

  it("titleが空の場合にバリデーションエラー", () => {
    const input = validCaseInput({ title: "" });
    expect(() => caseSchema.parse(input)).toThrow();
  });

  it("regionが不正値の場合にバリデーションエラー", () => {
    const input = validCaseInput({ region: "海外" });
    expect(() => caseSchema.parse(input)).toThrow();
  });

  it("sourcesが空配列の場合にバリデーションエラー", () => {
    const input = validCaseInput({ sources: [] });
    expect(() => caseSchema.parse(input)).toThrow();
  });

  it("「調査中」がデフォルト値として設定される", () => {
    const input = validCaseInput();
    const result = caseSchema.parse(input);

    expect(result.value_proposition).toBe("調査中");
    expect(result.synthetic_generation_method).toBe("調査中");
    expect(result.safety_evaluation_method).toBe("調査中");
    expect(result.utility_evaluation_method).toBe("調査中");
    expect(result.tags).toEqual([]);
    expect(result.figures).toEqual([]);
    expect(result.status).toBe("user");
  });
});

describe("figureSchema", () => {
  it("有効なFigure(data_flow)でバリデーションが通る", () => {
    const input = {
      type: "data_flow" as const,
      title: "データフロー図",
      data: {
        nodes: [{ id: "n1", label: "データソース", category: "source" }],
        edges: [{ from: "n1", to: "n2", label: "変換" }],
      },
      note: "備考",
    };
    const result = figureSchema.parse(input);
    expect(result.type).toBe("data_flow");
    expect(result.title).toBe("データフロー図");
  });

  it("有効なFigure(risk_matrix)でバリデーションが通る", () => {
    const input = {
      type: "risk_matrix" as const,
      title: "リスクマトリクス",
      data: {
        axes: {
          impact_levels: ["低", "中", "高"],
          likelihood_levels: ["低", "中", "高"],
        },
        cells: [{ impact: "高", likelihood: "中", note: "要対応" }],
      },
      note: "",
    };
    const result = figureSchema.parse(input);
    expect(result.type).toBe("risk_matrix");
  });

  it("有効なFigure(utility_chart)でバリデーションが通る", () => {
    const input = {
      type: "utility_chart" as const,
      title: "有用性チャート",
      data: {
        series: [
          {
            name: "精度",
            points: [
              { x: "2024Q1", y: 0.85 },
              { x: "2024Q2", y: 0.92 },
            ],
          },
        ],
      },
      note: "四半期ごとの精度推移",
    };
    const result = figureSchema.parse(input);
    expect(result.type).toBe("utility_chart");
  });
});

describe("caseCatalogSchema", () => {
  it("有効なカタログデータのバリデーションが通る", () => {
    const input = {
      schema_version: "1.0",
      cases: [validCaseInput()],
    };
    const result = caseCatalogSchema.parse(input);
    expect(result.schema_version).toBe("1.0");
    expect(result.cases).toHaveLength(1);
    expect(result.cases[0].title).toBe("合成データによる金融リスク分析");
  });
});
