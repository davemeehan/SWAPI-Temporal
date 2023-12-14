import { ActivityInterfaceFor } from '@temporalio/workflow';
import { CriteriaType, OptionalCriteria, SwapiRequest } from './schema';
import { z } from 'zod';

export enum EXECUTION_STATUS {
  COMPLETED = 'WORKFLOW_EXECUTION_STATUS_COMPLETED',
  RUNNING = 'WORKFLOW_EXECUTION_STATUS_RUNNING',
  FAILED = 'WORKFLOW_EXECUTION_STATUS_FAILED',
  TERMINATED = 'WORKFLOW_EXECUTION_STATUS_TERMINATED',
  CANCELED = 'WORKFLOW_EXECUTION_STATUS_CANCELED',
}

export enum WORKFLOW_TYPE {
  PEOPLE = 'people',
  FILMS = 'films',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
}

type ActivityFn = ActivityInterfaceFor<typeof import('./activities')>;

export type WorkflowActivities = {
  [key in keyof ActivityFn]?: z.infer<typeof OptionalCriteria>;
};

export const SwapiFilmKeys = {
  title: 'title',
  episode_id: 'episode_id',
  opening_crawl: 'opening_crawl',
  director: 'director',
  producer: 'producer',
  release_date: 'release_date',
  characters: 'characters',
  planets: 'planets',
  starships: 'starships',
  vehicles: 'vehicles',
  species: 'species',
  created: 'created',
  edited: 'edited',
  url: 'url',
} as const;

export type SwapiData =
  | SwapiFilm
  | SwapiPerson
  | SwapiSpecies
  | SwapiVehicle
  | SwapiStarship
  | SwapiPlanet;

export type SwapiFilm = {
  [SwapiFilmKeys.title]: string;
  [SwapiFilmKeys.episode_id]: number;
  [SwapiFilmKeys.opening_crawl]: string;
  [SwapiFilmKeys.director]: string;
  [SwapiFilmKeys.producer]: string;
  [SwapiFilmKeys.release_date]: string;
  [SwapiFilmKeys.characters]: string[];
  [SwapiFilmKeys.planets]: string[];
  [SwapiFilmKeys.starships]: string[];
  [SwapiFilmKeys.vehicles]: string[];
  [SwapiFilmKeys.species]: string[];
  [SwapiFilmKeys.created]: string;
  [SwapiFilmKeys.edited]: string;
  [SwapiFilmKeys.url]: string;
};

export const SwapiPersonKeys = {
  Name: 'name',
  Height: 'height',
  Mass: 'mass',
  HairColor: 'hair_color',
  SkinColor: 'skin_color',
  EyeColor: 'eye_color',
  BirthYear: 'birth_year',
  Gender: 'gender',
  Homeworld: 'homeworld',
  Films: 'films',
  Species: 'species',
  Vehicles: 'vehicles',
  Starships: 'starships',
  Created: 'created',
  Edited: 'edited',
  Url: 'url',
} as const;

export type SwapiPerson = {
  [SwapiPersonKeys.Name]: string;
  [SwapiPersonKeys.Height]: string;
  [SwapiPersonKeys.Mass]: string;
  [SwapiPersonKeys.HairColor]: string;
  [SwapiPersonKeys.SkinColor]: string;
  [SwapiPersonKeys.EyeColor]: string;
  [SwapiPersonKeys.BirthYear]: string;
  [SwapiPersonKeys.Gender]: string;
  [SwapiPersonKeys.Homeworld]: string;
  [SwapiPersonKeys.Films]: string[];
  [SwapiPersonKeys.Species]: string[];
  [SwapiPersonKeys.Vehicles]: string[];
  [SwapiPersonKeys.Starships]: string[];
  [SwapiPersonKeys.Created]: string;
  [SwapiPersonKeys.Edited]: string;
  [SwapiPersonKeys.Url]: string;
};

export const SwapiSpeciesKeys = {
  Name: 'name',
  Classification: 'classification',
  Designation: 'designation',
  AverageHeight: 'average_height',
  SkinColors: 'skin_colors',
  HairColors: 'hair_colors',
  EyeColors: 'eye_colors',
  AverageLifespan: 'average_lifespan',
  Homeworld: 'homeworld',
  Language: 'language',
  People: 'people',
  Films: 'films',
  Created: 'created',
  Edited: 'edited',
  Url: 'url',
} as const;

export type SwapiSpecies = {
  [SwapiSpeciesKeys.Name]: string;
  [SwapiSpeciesKeys.Classification]: string;
  [SwapiSpeciesKeys.Designation]: string;
  [SwapiSpeciesKeys.AverageHeight]: string;
  [SwapiSpeciesKeys.SkinColors]: string;
  [SwapiSpeciesKeys.HairColors]: string;
  [SwapiSpeciesKeys.EyeColors]: string;
  [SwapiSpeciesKeys.AverageLifespan]: string;
  [SwapiSpeciesKeys.Homeworld]: string;
  [SwapiSpeciesKeys.Language]: string;
  [SwapiSpeciesKeys.People]: string[];
  [SwapiSpeciesKeys.Films]: string[];
  [SwapiSpeciesKeys.Created]: string;
  [SwapiSpeciesKeys.Edited]: string;
  [SwapiSpeciesKeys.Url]: string;
};

export const SwapiVehicleKeys = {
  Name: 'name',
  Model: 'model',
  Manufacturer: 'manufacturer',
  CostInCredits: 'cost_in_credits',
  Length: 'length',
  MaxAtmospheringSpeed: 'max_atmosphering_speed',
  Crew: 'crew',
  Passengers: 'passengers',
  CargoCapacity: 'cargo_capacity',
  Consumables: 'consumables',
  VehicleClass: 'vehicle_class',
  Pilots: 'pilots',
  Films: 'films',
  Created: 'created',
  Edited: 'edited',
  Url: 'url',
} as const;

export type SwapiVehicle = {
  [SwapiVehicleKeys.Name]: string;
  [SwapiVehicleKeys.Model]: string;
  [SwapiVehicleKeys.Manufacturer]: string;
  [SwapiVehicleKeys.CostInCredits]: string;
  [SwapiVehicleKeys.Length]: string;
  [SwapiVehicleKeys.MaxAtmospheringSpeed]: string;
  [SwapiVehicleKeys.Crew]: string;
  [SwapiVehicleKeys.Passengers]: string;
  [SwapiVehicleKeys.CargoCapacity]: string;
  [SwapiVehicleKeys.Consumables]: string;
  [SwapiVehicleKeys.VehicleClass]: string;
  [SwapiVehicleKeys.Pilots]: string[];
  [SwapiVehicleKeys.Films]: string[];
  [SwapiVehicleKeys.Created]: string;
  [SwapiVehicleKeys.Edited]: string;
  [SwapiVehicleKeys.Url]: string;
};

export const SwapiStarshipKeys = {
  Name: 'name',
  Model: 'model',
  Manufacturer: 'manufacturer',
  CostInCredits: 'cost_in_credits',
  Length: 'length',
  MaxAtmospheringSpeed: 'max_atmosphering_speed',
  Crew: 'crew',
  Passengers: 'passengers',
  CargoCapacity: 'cargo_capacity',
  Consumables: 'consumables',
  HyperdriveRating: 'hyperdrive_rating',
  MGLT: 'MGLT',
  StarshipClass: 'starship_class',
  Pilots: 'pilots',
  Films: 'films',
  Created: 'created',
  Edited: 'edited',
  Url: 'url',
} as const;

export type SwapiStarship = {
  [SwapiStarshipKeys.Name]: string;
  [SwapiStarshipKeys.Model]: string;
  [SwapiStarshipKeys.Manufacturer]: string;
  [SwapiStarshipKeys.CostInCredits]: string;
  [SwapiStarshipKeys.Length]: string;
  [SwapiStarshipKeys.MaxAtmospheringSpeed]: string;
  [SwapiStarshipKeys.Crew]: string;
  [SwapiStarshipKeys.Passengers]: string;
  [SwapiStarshipKeys.CargoCapacity]: string;
  [SwapiStarshipKeys.Consumables]: string;
  [SwapiStarshipKeys.HyperdriveRating]: string;
  [SwapiStarshipKeys.MGLT]: string;
  [SwapiStarshipKeys.StarshipClass]: string;
  [SwapiStarshipKeys.Pilots]: string[];
  [SwapiStarshipKeys.Films]: string[];
  [SwapiStarshipKeys.Created]: string;
  [SwapiStarshipKeys.Edited]: string;
  [SwapiStarshipKeys.Url]: string;
};

export const SwapiPlanetKeys = {
  Name: 'name',
  RotationPeriod: 'rotation_period',
  OrbitalPeriod: 'orbital_period',
  Diameter: 'diameter',
  Climate: 'climate',
  Gravity: 'gravity',
  Terrain: 'terrain',
  SurfaceWater: 'surface_water',
  Population: 'population',
  Residents: 'residents',
  Films: 'films',
  Created: 'created',
  Edited: 'edited',
  Url: 'url',
} as const;

export type SwapiPlanet = {
  [SwapiPlanetKeys.Name]: string;
  [SwapiPlanetKeys.RotationPeriod]: string;
  [SwapiPlanetKeys.OrbitalPeriod]: string;
  [SwapiPlanetKeys.Diameter]: string;
  [SwapiPlanetKeys.Climate]: string;
  [SwapiPlanetKeys.Gravity]: string;
  [SwapiPlanetKeys.Terrain]: string;
  [SwapiPlanetKeys.SurfaceWater]: string;
  [SwapiPlanetKeys.Population]: string;
  [SwapiPlanetKeys.Residents]: string[];
  [SwapiPlanetKeys.Films]: string[];
  [SwapiPlanetKeys.Created]: string;
  [SwapiPlanetKeys.Edited]: string;
  [SwapiPlanetKeys.Url]: string;
};

export const AllSwapiDataKeys = {
  people: SwapiPersonKeys,
  films: SwapiFilmKeys,
  planets: SwapiPlanetKeys,
  species: SwapiSpeciesKeys,
  starships: SwapiStarshipKeys,
  vehicles: SwapiVehicleKeys,
} as const;
