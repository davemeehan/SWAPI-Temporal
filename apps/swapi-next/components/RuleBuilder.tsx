import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  BoxProps,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  CriteriaState,
  addCriteria,
  deleteCriteria,
  emptyRulePayload,
  updateLogicalOperator,
} from '@swapi-next/store/workflowRulesReducer';
import { RootState } from '@swapi-next/store/store';
import { CriteriaType, isRuleType } from '@libs/schema';
import { AllSwapiDataKeys } from '@libs/types';
import { RulePredicateKeys, rulePredicates } from '@libs/rules';

const predicateLabels = {
  eq: 'Equals',
  neq: 'Not Equals',
  contains: 'Contains',
  ncontains: 'Not Contains',
  icontains: 'Contains (insensitive)',
};

type Props = {
  id: keyof CriteriaState;
} & BoxProps;
const RuleForm = ({ id, ...props }: Props) => {
  const dispatch = useDispatch();
  const rules = useSelector((state: RootState) => state.rules);
  const criteria = useSelector(
    (state: RootState) => (state.rules?.[id] as CriteriaType)?.criteria ?? []
  );
  const logicOperator = useSelector(
    (state: RootState) => (state.rules?.[id] as CriteriaType)?.type ?? 'or'
  );

  const attributeValues = Object.values(AllSwapiDataKeys[id]);

  const handleAddRule = () => {
    const payload = emptyRulePayload(rules, {
      type: id,
      payload: {
        id,
        criteria: { type: logicOperator, criteria: [] },
      },
    });
    dispatch(addCriteria(payload));
  };

  const handleDeleteRule = (index: number) => {
    dispatch(deleteCriteria({ index, id }));
  };

  const handleRuleChange = (index: number, key: string, value: string) => {
    dispatch(
      addCriteria({
        id,
        criteria: {
          type: logicOperator,
          criteria: criteria.map((item, currentIndex) => {
            if (currentIndex === index) {
              // Update the specific element at the given index
              return {
                ...item,
                [key]: value,
              };
            }
            // Keep other elements unchanged
            return item;
          }),
        },
      })
    );
  };

  const handleLogicOperatorChange = (
    _: unknown,
    type: CriteriaType['type']
  ) => {
    dispatch(updateLogicalOperator({ id, type }));
  };

  return (
    <Box {...props}>
      <Grid container>
        <Grid xs={12} md={3} lg={1}>
          <ToggleButtonGroup
            value={logicOperator}
            exclusive
            onChange={handleLogicOperatorChange}
            aria-label="logic-operator"
            title="Operator"
            orientation="vertical"
            data-testid="logic-operator"
          >
            <ToggleButton value="and" aria-label="and" data-testid="and">
              AND
            </ToggleButton>
            <ToggleButton value="or" aria-label="or" data-testid="or">
              OR
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid xs={12} md={9} lg={11}>
          {(criteria ?? []).map((rule, index) => {
            if (!isRuleType(rule)) {
              return null;
            }
            return (
              <Paper
                key={index}
                elevation={3}
                sx={{ padding: '15px', marginBottom: '10px' }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>Attribute</InputLabel>
                      <Select
                        value={rule.propertyName}
                        onChange={(e) =>
                          handleRuleChange(
                            index,
                            'propertyName',
                            e.target.value
                          )
                        }
                        data-testid={`attributes-${id}`}
                      >
                        {attributeValues.map((a) => (
                          <MenuItem value={a}>{a}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>Condition</InputLabel>
                      <Select
                        value={rule.operator}
                        onChange={(e) =>
                          handleRuleChange(index, 'operator', e.target.value)
                        }
                        data-testid={`conditions-${id}`}
                      >
                        {Object.keys(rulePredicates).map((r) => {
                          const key = r as RulePredicateKeys;
                          return (
                            <MenuItem value={key}>
                              {predicateLabels[key]}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      fullWidth
                      label="Value"
                      value={rule.value}
                      onChange={(e) =>
                        handleRuleChange(index, 'value', e.target.value)
                      }
                      data-testid={`value-${id}`}
                    />
                  </Grid>
                  <Grid xs={2}>
                    <IconButton onClick={() => handleDeleteRule(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
          <Button variant="outlined" color="primary" onClick={handleAddRule}>
            Add Property
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RuleForm;
