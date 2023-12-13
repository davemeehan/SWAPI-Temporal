import { ActivityInterfaceFor } from '@temporalio/workflow';
import { CriteriaType, SwapiRequest } from './schema';

export enum EXECUTION_STATUS {
  COMPLETED = 'WORKFLOW_EXECUTION_STATUS_COMPLETED',
  RUNNING = 'WORKFLOW_EXECUTION_STATUS_RUNNING',
  FAILED = 'WORKFLOW_EXECUTION_STATUS_FAILED',
}

export enum WORKFLOW_TYPE {
  PEOPLE = 'people',
  FILMS = 'films',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
}

export type SwapiPerson = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

type ActivityFn = ActivityInterfaceFor<typeof import('./activities')>;

export type WorkflowActivities = {
  [key in keyof ActivityFn]?: CriteriaType;
};
