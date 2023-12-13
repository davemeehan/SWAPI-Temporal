import { ZodLiteral, ZodObject, ZodType, z } from 'zod';
import { activityFns } from './workflows';

export const Rule = z.object({
  propertyName: z.string().min(1).max(64),
  operator: z.union([
    z.literal('eq'),
    z.literal('neq'),
    z.literal('contains'),
    z.literal('icontains'),
    z.literal('ncontains'),
  ]),
  value: z.any(), // this should likely be a zod.union of the possible types
  type: z.literal('rule'),
});

export type CriteriaType = {
  type: 'and' | 'or';
  criteria: (z.infer<typeof Rule> | CriteriaType)[];
};
export const Criteria = z.object({
  type: z.union([z.literal('and'), z.literal('or')]),
  criteria: z.lazy(() => z.union([z.array(Rule), z.array(Criteria)])),
}) as z.ZodType<CriteriaType>;

export const OptionalCriteria: z.ZodUnion<[typeof Criteria, ZodObject<{}>]> =
  z.union([Criteria, z.object({})]);
// .refine((data) => {
//   function checkDepth(criteria: any, depth: any) {
//     if (depth > 1) {
//       throw new Error('Criteria structure is too deeply nested.')
//     }

//     for (const c of criteria) {
//       if (c.type === 'and' || c.type === 'or') {
//         // Recurse into the nested criteria with increased depth.
//         checkDepth(c.criteria, depth + 1)
//       }
//     }
//   }

//   // Start checking from depth 0.
//   checkDepth(data.criteria, 0)
//   return true
// })

/*
  {
    type: 'or',
    criteria: [
      {
        type: 'and',
        criteria: [
          {type: 'rule', propertyName: 'name', operator: 'eq', value: 'Luke'},
          {type: 'rule', propertyName: 'age', operator: 'eq', value: '23'},
        ]
      },
      {
        type: 'or',
        criteria: [
        {
          type: 'and',
          criteria: [
            {type: 'rule', propertyName: 'age', operator: 'eq', value: '23'},
            {type: 'rule', propertyName: 'eye_color', operator: 'eq', value: 'red'},
          ]
        },
      }
      },
    ]
  }
  
  {
    type: 'or', // criteria.some()
    criteria: [
      {
        type: 'and', // criteria.every()
        criteria: [
          true,
          true,
        ]
      },
      {
        true,
      },
    ]
  }
  
  
  */

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
