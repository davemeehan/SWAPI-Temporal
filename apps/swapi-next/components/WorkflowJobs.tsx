'use client';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Fragment, useState } from 'react';
import { SortableJob } from './SortableJob';
import { WORKFLOW_TYPE } from '@libs/types';
import { Box, TextField } from '@mui/material';
import { RulesSchema } from '@libs/schema';
import { z } from 'zod';

type WorkflowJobPayload = {
  [key in WORKFLOW_TYPE]?: z.infer<typeof RulesSchema>['rulesFilter'];
};

export function WorkflowJobs({
  jobs,
  setJobs,
}: {
  jobs: WORKFLOW_TYPE[];
  setJobs: (jobs: WORKFLOW_TYPE[]) => void;
}) {
  const [selectedJob, setSelectedJob] = useState<WORKFLOW_TYPE | null>(jobs[0]);
  const [payloads, setPayloads] = useState<WorkflowJobPayload | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={jobs} strategy={verticalListSortingStrategy}>
        <Box display="flex">
          <Box
            display="flex"
            flexDirection="column"
            gap={0}
            sx={{ maxHeight: '50vh', overflowY: 'auto' }}
          >
            {jobs.map((id, idx) => (
              <Fragment key={id}>
                <SortableJob
                  isSelected={selectedJob === id}
                  onClick={() => setSelectedJob(id)}
                  setJobs={setJobs}
                  id={id}
                  sx={{
                    borderTop: idx === 0 ? 'none' : '1px solid rgba(0,0,0,0.5)',
                    bgcolor:
                      selectedJob === id ? 'primary.dark' : 'primary.main',
                  }}
                />
              </Fragment>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, bgcolor: 'primary.dark', p: 2 }}>
            <>
              {JSON.stringify(payloads ?? {})}
              <TextField
                rows={4}
                multiline
                fullWidth
                onChange={(e) => {
                  if (!selectedJob || !e.target.value) {
                    return;
                  }
                  try {
                    setPayloads((prev) => ({
                      ...prev,
                      [selectedJob]: e.target.value,
                    }));
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            </>
          </Box>
        </Box>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setJobs((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
