'use client';
import SearchList from '@swapi-next/components/SearchList';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from '@swapi-next/store/store';
import WorkflowCreate from './WorkflowCreate';
export default function WorkflowActions({
  onCreate,
}: {
  onCreate?: () => void;
}) {
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <Provider store={store}>
      <Grid container sx={{ mb: 2 }}>
        <Grid display="flex" justifyContent="left" xs={12} sm={8}>
          <SearchList />
        </Grid>
        <Grid display="flex" justifyContent="right" xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreate(!openCreate)}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <WorkflowCreate
        open={openCreate}
        onSubmit={onCreate}
        handleClose={() => setOpenCreate(false)}
      />
    </Provider>
  );
}
