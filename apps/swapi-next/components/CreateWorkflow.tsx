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
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Actionbar from './Actionbar';
import { WORKFLOW_TYPE } from '@libs/types';
import { WorkflowJobs } from './WorkflowJobs';
import { save } from '@swapi-next/actions/saveWorkflow';

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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const jobList = Object.values(WORKFLOW_TYPE);

export default function CreateWorkflow({
  open,
  handleClose,
  onSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
}) {
  const [name, setName] = useState('');
  const [jobs, setJobs] = useState<WORKFLOW_TYPE[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);

  const saveWithJobs = save.bind(null, name, jobs);

  function wipeAndClose() {
    setName('');
    setJobs([]);
    handleClose();
  }

  function onChangeJob(e) {
    const newJob = jobList.find((j) => e.target.value.includes(j));
    if (!newJob) {
      console.warn(`Job ${e.target.value} not found`);
      return;
    }
    if (jobs.find((j) => j === newJob)) {
      setJobs([...jobs.filter((j) => j !== e.target.value)]);
    } else {
      setJobs([...jobs, newJob]);
    }
  }

  // function onSubmit() {
  //     console.log(name, description)
  //     wipeAndClose()
  // }

  return (
    <Modal open={open} onClose={wipeAndClose}>
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
          <Card sx={{ p: 8, my: 0 }} elevation={0}>
            <form
              ref={formRef}
              action={async (formData) => {
                await saveWithJobs(formData);
              }}
            >
              <Grid container spacing={4}>
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
                      label="Jobs"
                      fullWidth
                      required
                      renderValue={() => {
                        return (
                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={1}
                          >
                            {jobs.map((job) => (
                              <Chip key={job} label={job} />
                            ))}
                          </Grid>
                        );
                      }}
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
                <Grid xs={12}>
                  <WorkflowJobs jobs={jobs} setJobs={setJobs} />
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
        <Actionbar>
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
                  // save(name, jobs);
                  formRef?.current?.requestSubmit();
                  onSubmit();
                  wipeAndClose();
                }}
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
