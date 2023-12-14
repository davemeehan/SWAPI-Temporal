import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Tab, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export function SortableTab(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Tab
      ref={setNodeRef}
      {...props}
      style={style}
      label={
        <Box
          sx={{
            p: 1,
            borderRight: 'none',
            position: 'relative',
            width: '100%',
            border: '1px solid transparent',
            borderColor: 'divider',
          }}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <Button
            sx={{
              width: 24,
              height: 24,
              minWidth: 24,
              marginLeft: 1,
              borderRadius: 0,
            }}
            {...listeners}
            {...attributes}
          >
            <ImportExportIcon
              sx={{
                fill: '#fff',
              }}
            />
          </Button>
          <Typography>{props.id}</Typography>
        </Box>
      }
    ></Tab>
  );
}
