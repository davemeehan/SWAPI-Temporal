import { isCriteriaType, isRuleType } from '@libs/schema';
import { WorkflowActivities } from '@libs/types';

export function removeEmptyFilters(activities: WorkflowActivities) {
  const entries = Object.entries(activities);
  const filtered = Object.fromEntries(
    entries.map(([key, criteriaType]) => {
      if (!isCriteriaType(criteriaType)) {
        return [key, criteriaType];
      }

      const updatedCriteria = criteriaType.criteria.filter((criteria) => {
        if (!isRuleType(criteria)) {
          return true;
        }

        return (
          criteria.propertyName.trim() !== '' &&
          criteria.value.trim() !== '' &&
          criteria.operator.trim() !== ''
        );
      });

      return [key, { type: criteriaType.type, criteria: updatedCriteria }];
    })
  );

  return filtered;
}

/*

{
  "people": {
    "type": "or",
    "criteria": [
      {
        "propertyName": "name",
        "operator": "eq",
        "value": "RUBBBISHSHHH",
        "type": "rule"
      }
    ]
  }
}
*/
