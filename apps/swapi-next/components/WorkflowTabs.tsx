import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { WORKFLOW_TYPE } from '@libs/types';
import { SortableTab } from './SortableTab';
import RuleBuilder from './RuleBuilder';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps & DefaultComponentProps<BoxTypeMap>) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3, pt: 0, opacity: value === index ? 1 : 0 }}>
        {children}
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function WorkflowTabs({
  jobs,
  setJobs,
}: {
  jobs: WORKFLOW_TYPE[];
  setJobs: (jobs: WORKFLOW_TYPE[]) => void;
}) {
  const [value, setValue] = React.useState(0);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setJobs((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={jobs} strategy={verticalListSortingStrategy}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: '100%',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: 180 }}
          >
            {jobs.map((id, idx) => (
              <SortableTab key={id} {...a11yProps(0)} id={id} />
            ))}
          </Tabs>
          {jobs.map((id, idx) => (
            <TabPanel
              value={value}
              index={idx}
              sx={{ width: '100%', height: '100%', overflow: 'auto' }}
            >
              <Typography
                component="h2"
                variant="h5"
                sx={{ textTransform: 'capitalize' }}
              >
                {id}
              </Typography>
              <RuleBuilder id={id} sx={{ pt: 4 }} />
            </TabPanel>
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}
