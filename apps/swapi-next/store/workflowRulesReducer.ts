import {
  CriteriaType,
  RuleType,
  RulesSchema,
  isCriteriaType,
  isRuleType,
} from '@libs/schema';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export type CriteriaState = z.infer<typeof RulesSchema>;

type UpdateLogicalOperatorPayload = {
  id: keyof CriteriaState;
  type: CriteriaType['type'];
};

type AddCriteriaPayload = {
  id: keyof CriteriaState;
  criteria: CriteriaType;
};

type DeleteCriteriaPayload = {
  id: keyof CriteriaState;
  index: number;
};

const workflowRulesSlice = createSlice({
  name: 'criteria',
  initialState: {} as CriteriaState,
  reducers: {
    updateLogicalOperator(
      state,
      action: PayloadAction<UpdateLogicalOperatorPayload>
    ) {
      if (!action.payload.id || !(action.payload.id in state)) {
        return;
      }
      if (!state[action.payload.id]) {
        state[action.payload.id] = {
          type: action.payload.type,
          criteria: [],
        };
      }

      (state[action.payload.id] as CriteriaType).type = action.payload.type;
    },
    addCriteria(state, action: PayloadAction<AddCriteriaPayload>) {
      if (!state[action.payload.id]) {
        state[action.payload.id] = {
          type: action.payload.criteria.type,
          criteria: [],
        } as CriteriaType;
      }
      if (!isCriteriaType(action.payload.criteria)) {
        state[action.payload.id] = { criteria: [] };
      }
      // @ts-ignore
      state[action.payload.id].criteria = action.payload.criteria.criteria.map(
        (c) => ({ ...c, type: 'rule' })
      );
    },

    deleteCriteria(state, action: PayloadAction<DeleteCriteriaPayload>) {
      if (isCriteriaType(state[action.payload.id])) {
        (state[action.payload.id] as CriteriaType).criteria.splice(
          action.payload.index,
          1
        );
      }
      return state;
    },
  },
});

export function emptyRulePayload(
  state: CriteriaState,
  action: PayloadAction<AddCriteriaPayload>
) {
  const defaultOperator: RuleType['operator'] = 'eq';

  const newRule: RuleType = {
    propertyName: '',
    operator: defaultOperator,
    value: '',
    type: 'rule',
  };
  const idSlice = state[action.payload.id] as CriteriaType;
  const criteria = idSlice?.criteria ?? [];

  return {
    id: action.payload.id,
    criteria: {
      type: action.payload.criteria.type,
      criteria: [...criteria, newRule],
    },
  };
}

// Extract the action creators object and the reducer
const { actions, reducer } = workflowRulesSlice;
// Extract and export each action creator by name
export const { addCriteria, deleteCriteria, updateLogicalOperator } = actions;
// Export the reducer, either as a default or named export
export default reducer;
