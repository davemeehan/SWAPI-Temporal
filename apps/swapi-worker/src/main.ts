import { Worker } from '@temporalio/worker';
import * as activities from '@libs/activities';

run().catch((err) => console.log(err));

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('@libs/workflows'),
    activities,
    taskQueue: process.env.SWAPI_QUEUE_NAME ?? 'swapi',
  });

  await worker.run();
}
