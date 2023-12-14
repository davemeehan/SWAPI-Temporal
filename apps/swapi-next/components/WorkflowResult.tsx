import { Box, Button, Card, Modal, Typography } from '@mui/material';
import Actionbar from './Actionbar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useQuery } from '@tanstack/react-query';
import { wfIdPrefix } from '@libs/constants';
import { TreeItem, TreeView } from '@mui/x-tree-view';

type RenderTree = Record<PropertyKey, string | string[]>;

const renderTree = (nodes: RenderTree, parentKey?: string) => {
  if (!nodes) {
    return null;
  }

  if (Array.isArray(nodes)) {
    return nodes.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return (
          <TreeItem
            key={`${parentKey}-${index}-parent`}
            nodeId={`${parentKey}-${index}-parent`}
            label={<>{Object.values(item)[0]}</>}
            data-debug={`value-object::first-key`}
          >
            {renderTree(item, `${parentKey}-${index}`)}
          </TreeItem>
        );
      }

      return (
        <TreeItem
          key={`${parentKey}-${index}`}
          nodeId={`${parentKey}-${index}`}
          label={renderTree(item, `${parentKey}-${index}`)}
          data-debug={`array-${parentKey}-${index}-zz-${typeof item}`}
        />
      );
    });
  }

  const keys = Object.keys(nodes);
  return keys.map((key) => {
    const value = nodes[key];

    if (Array.isArray(value)) {
      return (
        <TreeItem
          key={key}
          nodeId={key}
          label={key}
          data-debug={`value-array::${key}`}
        >
          {value.map((item, index) => {
            if (typeof item === 'object') {
              return renderTree(item, `${key}-${index}`);
            }
          })}
        </TreeItem>
      );
    }

    return <TreeItem key={key} nodeId={key} label={`${key}: ${value}`} />;
  });
};

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
    height: '80vh',
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  const { data, error } = useQuery({
    enabled: open,
    queryKey: ['workflowResult', workflowId, runId],
    queryFn: async () => {
      const res = await fetch(
        `/api/swapi/${workflowId.replace(wfIdPrefix, '')}?runId=${runId}`
      );

      return await res.json();
    },
  });
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Box sx={{ p: 4, height: '80%' }}>
          <Typography
            variant="h2"
            sx={{ textTransform: 'uppercase' }}
            component="h2"
          >
            Results
          </Typography>
          <Card
            sx={{ p: 8, my: 0, height: '100%', overflow: 'auto' }}
            elevation={0}
          >
            {!data ? 'Loading...' : null}
            <TreeView
              aria-label="rich object"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {data &&
                Object.keys(data).map((inner) => (
                  <TreeItem
                    key={`top-${inner}`}
                    nodeId={`top-${inner}`}
                    label={inner}
                  >
                    {renderTree(data[inner])}
                  </TreeItem>
                ))}
            </TreeView>
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
