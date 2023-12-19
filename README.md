# SWAPI Workflow Generator

This project is a workflow generator for fetching and filtering data from the Star Wars API (SWAPI). It is built using Typescript, Next.js, Nx, and Temporal.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js and npm: Download and install from [Node.js official website](https://nodejs.org/en/download/).
- Nx CLI: Install it globally using npm: `npm install -g nx`.
- Temporal: Follow the instructions on the [Temporal official website](https://docs.temporal.io/docs/server/quick-install) to install Temporal.
- An IDE like Visual Studio Code.

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository: `git clone https://github.com/davemeehan/SWAPI-Temporal`.
2. Navigate into the cloned repository: `cd SWAPI-Temporal`.
3. Install the dependencies: `npm install`.

## Running the Application

To run all services, use:

```bash
make
```

To start the Temporal dev server, run the following command:

```bash
npx nx temporal:server
```

To start the worker, use:

```bash
npx nx temporal:worker
```

To open the Temporal UI, use:

```bash
npx nx temporal:ui
```

To start the Next.js app, use:

```bash
npx nx serve swapi-next
```

To start EnvyJs, use:

```bash
npx nx envy
```

Open your browser and navigate to http://localhost:4200
