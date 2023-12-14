import { ZodObject, z } from 'zod';

export const Rule = z.object({
  propertyName: z.string().min(1).max(64),
  operator: z.union([
    z.literal('eq'),
    z.literal('neq'),
    z.literal('contains'),
    z.literal('icontains'),
    z.literal('ncontains'),
  ]),
  value: z.any(), // this should likely be a union of the possible types
  type: z.literal('rule'),
});

export type RuleType = z.infer<typeof Rule>;

export type CriteriaType = {
  type: 'and' | 'or';
  criteria: (RuleType | CriteriaType)[];
};
export const Criteria = z.object({
  type: z.union([z.literal('and'), z.literal('or')]),
  criteria: z.lazy(() => z.union([z.array(Rule), z.array(Criteria)])),
}) as z.ZodType<CriteriaType>;

export const OptionalCriteria: z.ZodUnion<[typeof Criteria, ZodObject<{}>]> =
  z.union([Criteria, z.object({})]);

export const RequestIdSchema = z.object({
  requestId: z.string().min(3).max(64),
});

export const RulesSchema = z.object({
  people: OptionalCriteria.optional(),
  planets: OptionalCriteria.optional(),
  films: OptionalCriteria.optional(),
  species: OptionalCriteria.optional(),
  starships: OptionalCriteria.optional(),
  vehicles: OptionalCriteria.optional(),
});

export const SwapiRequestSchema = RequestIdSchema.merge(RulesSchema);

export type SwapiRequest = z.infer<typeof SwapiRequestSchema>;

export const isCriteriaType = (obj: any): obj is CriteriaType => {
  return obj && obj.type !== undefined && obj.criteria !== undefined;
};

export const isRuleType = (obj: any): obj is RuleType => {
  return (
    obj &&
    obj.propertyName !== undefined &&
    obj.operator !== undefined &&
    obj.value !== undefined
  );
};
