import { Connection, Client } from '@temporalio/client';

let client: Client | null = null;
let isClientInitializing = false;

const temporalClient = async () => {
  if (!client && !isClientInitializing) {
    isClientInitializing = true;

    try {
      const connection = await temporalConnection();
      client = new Client({
        connection,
        // namespace: 'foo.bar', // connects to 'default' namespace if not specified
      });
    } finally {
      isClientInitializing = false;
    }
  }

  if (!client) {
    throw new Error('Client is not initialized');
  }

  return client;
};

export const temporalConnection = () => {
  return Connection.connect({ address: 'localhost:7233' });
};

export { temporalClient };
