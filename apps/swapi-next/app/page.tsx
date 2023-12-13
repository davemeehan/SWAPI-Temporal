import WorkflowList from '@swapi-next/components/WorkflowList';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import WorkflowActions from '@swapi-next/components/WorkflowActions';
import { revalidatePath } from 'next/cache';
import '@swapi-next/env';
import { getWorkflows } from './api/swapi/workflows/getWorkflows';
import { Workflows } from '@swapi-next/components/Workflows';

export default async function Index() {
  async function getData() {
    return await getWorkflows();
  }
  const rows = await getData();
  return (
    <Box sx={{ flexGrow: 1, width: '80vw', maxWidth: 1024 }}>
      <h1>Workflows</h1>
      <WorkflowActions
        onCreate={async () => {
          'use server';
          revalidatePath('/');
        }}
      />
      <Grid xs={12}>
        <Workflows rows={rows} />
      </Grid>
    </Box>
  );
}
