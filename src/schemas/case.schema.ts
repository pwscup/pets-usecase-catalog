import { z } from "zod";

// Source schema
export const sourceSchema = z.object({
  source_type: z.enum(["pdf", "web"]),
  title: z.string().min(1),
  url: z.string().min(1),
  note: z.string().default(""),
});

// Data Flow
const dataFlowNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: z.string().min(1),
});

const dataFlowEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().min(1),
});

export const dataFlowDataSchema = z.object({
  nodes: z.array(dataFlowNodeSchema),
  edges: z.array(dataFlowEdgeSchema),
});

// Risk Matrix
const riskMatrixAxesSchema = z.object({
  impact_levels: z.array(z.string()),
  likelihood_levels: z.array(z.string()),
});

const riskMatrixCellSchema = z.object({
  impact: z.string().min(1),
  likelihood: z.string().min(1),
  note: z.string().default(""),
});

export const riskMatrixDataSchema = z.object({
  axes: riskMatrixAxesSchema,
  cells: z.array(riskMatrixCellSchema),
});

// Utility Chart
const utilityChartPointSchema = z.object({
  x: z.string(),
  y: z.number(),
});

const utilityChartSeriesSchema = z.object({
  name: z.string().min(1),
  points: z.array(utilityChartPointSchema),
});

export const utilityChartDataSchema = z.object({
  series: z.array(utilityChartSeriesSchema),
});

// Figure schema (discriminated union on type)
export const figureSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("data_flow"),
    title: z.string().min(1),
    data: dataFlowDataSchema,
    note: z.string().default(""),
  }),
  z.object({
    type: z.literal("risk_matrix"),
    title: z.string().min(1),
    data: riskMatrixDataSchema,
    note: z.string().default(""),
  }),
  z.object({
    type: z.literal("utility_chart"),
    title: z.string().min(1),
    data: utilityChartDataSchema,
    note: z.string().default(""),
  }),
]);

// Case schema
export const caseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  region: z.enum(["国内", "国外"]),
  domain: z.string().min(1),
  organization: z.string().min(1),
  usecase_category: z.string().min(1),
  summary: z.string().min(1),
  value_proposition: z.string().default("調査中"),
  synthetic_generation_method: z.string().default("調査中"),
  safety_evaluation_method: z.string().default("調査中"),
  utility_evaluation_method: z.string().default("調査中"),
  tags: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(1),
  figures: z.array(figureSchema).default([]),
  status: z
    .enum(["seed", "user", "draft", "published", "archived"])
    .default("user"),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

// Form schema (id, created_at, updated_at, status, figures are auto-set)
export const caseFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  region: z.enum(['国内', '国外'], { message: '地域は必須です' }),
  domain: z.string().min(1, '分野は必須です'),
  organization: z.string().min(1, '組織名は必須です'),
  usecase_category: z.string().min(1, 'ユースケースカテゴリは必須です'),
  summary: z.string().min(1, '概要は必須です'),
  value_proposition: z.string().default(''),
  synthetic_generation_method: z.string().default('調査中'),
  safety_evaluation_method: z.string().default('調査中'),
  utility_evaluation_method: z.string().default('調査中'),
  tags: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(1, '出典は最低1件必要です'),
})

export type CaseFormData = z.infer<typeof caseFormSchema>

// Case Catalog schema
export const caseCatalogSchema = z.object({
  schema_version: z.string().min(1),
  cases: z.array(caseSchema),
});
