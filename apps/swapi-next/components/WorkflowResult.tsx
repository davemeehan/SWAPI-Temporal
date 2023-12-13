import { Box, Button, Card, Modal, Typography } from '@mui/material';
import Actionbar from './Actionbar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function WorkflowResult({
  open,
  handleClose,
  workflowId,
  runId,
}: {
  open: boolean;
  handleClose: () => void;
  workflowId: string;
  runId: string;
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxwidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h2"
            sx={{ textTransform: 'uppercase' }}
            component="h2"
          >
            Create Workflow
          </Typography>
          <Typography variant="subtitle2" component="p">
            Get started on your Workflow
          </Typography>
          <Card sx={{ p: 8, my: 0 }} elevation={0}></Card>
        </Box>
        <Actionbar>
          <Grid container spacing={0} display="flex" justifyContent="end">
            <Grid display="flex" gap={2}>
              <Button
                onClick={handleClose}
                variant="contained"
                startIcon={<CheckCircleIcon />}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Actionbar>
      </Box>
    </Modal>
  );
}
