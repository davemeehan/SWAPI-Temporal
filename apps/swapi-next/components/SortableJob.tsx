import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { CancelOutlined, Close, DragHandle } from '@mui/icons-material';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export function SortableJob(props) {
  const theme = useTheme();
  const { setJobs, isSelected, id, onClick, sx } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function removeThis(e) {
    setJobs((items) => items.filter((item) => item !== id));
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Box
        sx={{
          width: '200px',
          p: 4,
          borderRight: 'none',
          position: 'relative',
          ...sx,
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClick}
      >
        <Button
          sx={{
            position: 'absolute',
            top: 'calc(50% - 12px)',
            left: 0,
            width: 24,
            height: 24,
            zIndex: 100,
            minWidth: 24,
            marginLeft: 1,
            borderRadius: 0,
            border: `1px solid ${
              isSelected ? theme.palette.primary.main : '#fff'
            }`,
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
        <Button
          onClick={removeThis}
          sx={{
            position: 'absolute',
            top: 2,
            right: 0,
            width: 24,
            height: 24,
            zIndex: 100,
          }}
        >
          <Close sx={{ fill: '#fff' }} />
        </Button>
        <Typography>{props.id}</Typography>
      </Box>
    </div>
  );
}
