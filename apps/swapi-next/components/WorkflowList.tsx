'use client';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Box,
  CircularProgress,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useQuery } from '@tanstack/react-query';
import { EXECUTION_STATUS } from '@libs/types';

function transformStatus(status: string) {
  switch (status) {
    case EXECUTION_STATUS.COMPLETED:
      return 'Completed';
    case EXECUTION_STATUS.RUNNING:
      return 'Running';
    case EXECUTION_STATUS.FAILED:
      return 'Failed';
    default:
      return 'Unknown';
  }
}

const columns: GridColDef[] = [
  {
    field: 'runId',
    headerName: 'ID',
    valueGetter: (params: GridValueGetterParams) => params.row.execution.runId,
  },
  {
    field: 'type',
    headerName: 'Type',
    valueGetter: (params: GridValueGetterParams) => params.row.type.name,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: { row: { status: EXECUTION_STATUS } }) => {
      const readableStatus = transformStatus(params.row.status);
      const statusIcons = {
        [EXECUTION_STATUS.COMPLETED]: (
          <CheckCircleIcon sx={{ color: 'green' }} />
        ),
        [EXECUTION_STATUS.RUNNING]: <HourglassBottomIcon />,
        [EXECUTION_STATUS.FAILED]: <CancelIcon sx={{ color: 'red' }} />,
      };
      const statusIcon = statusIcons[params.row.status] ?? <HelpCenterIcon />;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={readableStatus} arrow>
            {statusIcon}
          </Tooltip>
        </Box>
      );
    },
    valueGetter: (params: GridValueGetterParams) =>
      transformStatus(params.row.status),
  },
  {
    field: 'startTime',
    headerName: 'Start Time',
    type: 'dateTime',
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.startTime.seconds * 1000),
  },
  {
    field: 'duration',
    headerName: 'Duration',
    renderCell: (params) => {
      if (params.row.status === EXECUTION_STATUS.RUNNING) {
        return <CircularProgress size={20} />;
      }
      if (!params.row.closeTime) {
        return null;
      }
      const close = new Date(params.row.closeTime.seconds * 1000);
      const start = new Date(params.row.startTime.seconds * 1000);
      return `${(close.getTime() - start.getTime()) / 1000} sec`;
    },
  },
  {
    field: 'result',
    headerName: 'Result',
    renderCell: (params) => {
      if (params.row.status === EXECUTION_STATUS.RUNNING) {
        return null;
      }
      return JSON.stringify(params.row.result);
    },
  },
];

export default function WorkflowList({
  rows,
}: {
  rows: { executions: Record<string, any>[] };
}) {
  const { data, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const res = await fetch('/api/swapi/workflows');
      return (await res.json()).data.executions;
    },
    initialData: rows.executions,
    // Refetch the data every 3 seconds
    refetchInterval: 3_000,
  });

  if (error) {
    return (
      <Typography color="error">
        Error fetching data. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={(row) => row.execution.runId}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </Box>
  );
}
