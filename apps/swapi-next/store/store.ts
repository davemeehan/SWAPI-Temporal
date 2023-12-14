import { configureStore } from '@reduxjs/toolkit';
import workflowRulesReducer from './workflowRulesReducer';

const store = configureStore({
  reducer: {
    rules: workflowRulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
