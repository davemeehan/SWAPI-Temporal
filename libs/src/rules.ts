import { CriteriaType, RuleType } from './schema';
import { SwapiData } from './types';

type Value = string | number;
type RulePredicate = (
  value1: Value,
  value2: Value
) => (...args: any[]) => boolean;

const _rulePredicates = {
  eq,
  neq,
  contains,
  icontains,
  ncontains,
} as const;

export type RulePredicateKeys = keyof typeof _rulePredicates;
export const rulePredicates: Record<RulePredicateKeys, RulePredicate> =
  _rulePredicates;

export function eq(value1: Value, value2: Value): ReturnType<RulePredicate> {
  return function apply() {
    return value1 === value2;
  };
}
export function neq(value1: Value, value2: Value) {
  return function apply() {
    return !eq(value1, value2)();
  };
}
export function contains(value1: Value, value2: Value) {
  return function apply(modifier: 'i' | '' = '') {
    // probably needs a more specific implementation than just allowing any regex
    const regex = new RegExp(value2.toString(), modifier);
    return regex.test(value1.toString());
  };
}
export function ncontains(value1: Value, value2: Value) {
  return function apply() {
    return !contains(value1, value2)();
  };
}
export function icontains(value1: Value, value2: Value) {
  return function apply() {
    return contains(value1, value2)('i');
  };
}

export function applyFilter(
  data: SwapiData[],
  filter: CriteriaType | RuleType
): SwapiData[] {
  if (!Object.keys(filter).length) {
    return data;
  }
  return data?.filter((item) => {
    if (filter.type === 'and') {
      return filter.criteria.every((criterion: any) =>
        matchesCriterion(item, criterion)
      );
    } else if (filter.type === 'or') {
      return filter.criteria.some((criterion: any) =>
        matchesCriterion(item, criterion)
      );
    }
    return false;
  });
}

export function matchesCriterion(
  item: SwapiData,
  criterion: RuleType
): boolean {
  if (criterion.type === 'rule') {
    const { propertyName, operator, value } = criterion;
    if (!item[propertyName]) {
      throw new Error(`Invalid property name: "${propertyName}"`);
    }
    if (!rulePredicates[operator]) {
      throw new Error(`Invalid operator: ${operator}`);
    }
    const itemValue = item[propertyName];
    return rulePredicates[operator](itemValue, value)();
  } else if (criterion.type === 'and') {
    return applyFilter([item], criterion).length > 0;
  } else if (criterion.type === 'or') {
    return applyFilter([item], criterion).length > 0;
  }
  return false;
}
