import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Actionbar from './Actionbar';
import { WORKFLOW_TYPE } from '@libs/types';
import { save } from '@swapi-next/actions/saveWorkflow';
import { WorkflowTabs } from './WorkflowTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@swapi-next/store/store';
import {
  addCriteria,
  emptyRulePayload,
} from '@swapi-next/store/workflowRulesReducer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const jobList = Object.values(WORKFLOW_TYPE);

export default function WorkflowCreate({
  open,
  handleClose,
  onSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  onSubmit?: () => void;
}) {
  const [name, setName] = useState('');
  const [jobs, setJobs] = useState<WORKFLOW_TYPE[]>([]);
  const dispatch = useDispatch();
  const rules = useSelector((state: RootState) => state.rules);
  const formRef = React.useRef<HTMLFormElement>(null);

  function wipeAndClose() {
    setName('');
    setJobs([]);
    handleClose();
  }

  function onChangeJob(e: SelectChangeEvent<WORKFLOW_TYPE[]>) {
    if (typeof e.target.value === 'string') {
      return;
    }
    if (e.target.value.length > jobs.length) {
      const newJob = e.target.value.find((j) => !jobs.includes(j));
      if (!newJob) {
        return;
      }
      const payload = emptyRulePayload(rules, {
        type: newJob,
        payload: {
          id: newJob,
          criteria: { type: 'or', criteria: [] },
        },
      });
      dispatch(addCriteria(payload));
    }
    setJobs(e.target.value);
  }

  return (
    <Modal open={open} onClose={wipeAndClose}>
      <Box sx={style} data-testid="create-wrapper">
        <Box sx={{ p: 4, height: '90%', marginBottom: '10%' }}>
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
          <Card sx={{ p: 8, my: 0, height: '100%' }} elevation={0}>
            <form
              style={{ height: '100%' }}
              ref={formRef}
              action={async () => {
                const saveWithJobs = save.bind(null, rules, name, jobs);
                await saveWithJobs();
              }}
            >
              <Grid
                container
                flexDirection="column"
                flexWrap="nowrap"
                spacing={4}
                sx={{ height: '100%' }}
              >
                <Grid spacing={4} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="name"
                      name="name"
                      label="Workflow Name"
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="jobs-label">Jobs</InputLabel>
                    <Select
                      labelId="jobs-label"
                      id="jobs"
                      name="jobs"
                      value={jobs}
                      onChange={onChangeJob}
                      MenuProps={MenuProps}
                      fullWidth
                      required
                      multiple
                      renderValue={() => {
                        return (
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={1}
                            sx={{ p: 0 }}
                          >
                            {jobs.map((job) => (
                              <Chip key={job} label={job} />
                            ))}
                          </Grid>
                        );
                      }}
                      data-testid="jobs"
                    >
                      {jobList.map((type) => (
                        <MenuItem key={type} value={type}>
                          <Checkbox
                            checked={Boolean(jobs?.find((j) => j === type))}
                          />
                          <ListItemText primary={type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {jobs.length ? (
                  <Grid xs={12} sx={{ height: '70%' }}>
                    <WorkflowTabs jobs={jobs} setJobs={setJobs} />
                  </Grid>
                ) : null}
              </Grid>
            </form>
          </Card>
        </Box>
        <Actionbar
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            height: '10%',
          }}
        >
          <Grid container spacing={0} display="flex" justifyContent="end">
            <Grid display="flex" gap={2}>
              <Button
                color="error"
                onClick={wipeAndClose}
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  formRef?.current?.requestSubmit();
                  if (onSubmit) {
                    onSubmit();
                  }
                  wipeAndClose();
                }}
                disabled={!name || !jobs.length}
                variant="contained"
                startIcon={<CheckCircleIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Actionbar>
      </Box>
    </Modal>
  );
}
