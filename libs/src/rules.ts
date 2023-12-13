type Value = string | number;
type RulePredicate = (
  value1: Value,
  value2: Value
) => (...args: any[]) => boolean;

export const rulePredicates: Record<string, RulePredicate> = {
  eq,
  neq,
  contains,
  icontains,
  ncontains,
};

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
        {type: 'rule', propertyName: 'age', operator: 'eq', value: '23'},
        {type: 'rule', propertyName: 'eye_color', operator: 'eq', value: 'red'},
      ]
    },
  ]
}
*/
export function applyFilter(data: any[], filter: any): any[] {
  // console.log("applyFilter", { data, filter })
  if (!Object.keys(filter).length) {
    return data;
  }
  return data.filter((item) => {
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

export function matchesCriterion(item: any, criterion: any): boolean {
  if (criterion.type === 'rule') {
    const { propertyName, operator, value } = criterion;
    if (!item[propertyName]) {
      throw new Error(`Invalid property name: ${propertyName}`);
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
