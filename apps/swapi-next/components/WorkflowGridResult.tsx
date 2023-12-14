import { useState } from 'react';
import WorkflowResult from './WorkflowResult';
import { Button } from '@mui/material';

export function WorkflowGridResult({
  workflowId,
  runId,
}: {
  workflowId: string;
  runId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WorkflowResult
        workflowId={workflowId}
        runId={runId}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        View
      </Button>
    </>
  );
}
