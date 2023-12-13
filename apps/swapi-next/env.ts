import { z } from 'zod';

const env = z.object({
  SWAPI_QUEUE_NAME: z.string(),
  SWAPI_PEOPLE_URL: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
