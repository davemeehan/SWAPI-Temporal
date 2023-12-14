import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import WorkflowActions from '@swapi-next/components/WorkflowActions';
import '@swapi-next/env';
import { getWorkflows } from './api/swapi/workflows/getWorkflows';
import { Workflows } from '@swapi-next/components/Workflows';
import { ClientTypography } from '@swapi-next/components/ClientTypography';
import { revalidatePath } from 'next/cache';

export default async function Index() {
  async function getData() {
    return await getWorkflows();
  }
  const rows = await getData();
  return (
    <Box sx={{ flexGrow: 1, width: '80vw', maxWidth: 1024 }}>
      <ClientTypography component="h1" variant="h2">
        Workflows
      </ClientTypography>
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
