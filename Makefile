.PHONY: all start-server start-worker start-ui start-next start-envy cleanup

all: start-server start-worker start-ui start-envy start-next

start-server:
	@echo "Starting Temporal server..."
	@npx nx temporal:server &

start-worker:
	@echo "Starting Temporal worker..."
	@npx nx temporal:worker &

start-ui:
	@echo "Opening Temporal UI..."
	@npx nx temporal:ui &

start-envy:
	@echo "Starting EnvyJs..."
	@npx nx envy &

start-next:
	@echo "Starting Next.js app..."
	@npx nx serve swapi-next

cleanup:
	@echo "Cleaning up..."
	@pkill -f "temporal" || true
	@pkill -f "node" || true
	@pkill -f "envy" || true

trap-interrupt:
	@trap 'make cleanup' INT

run: trap-interrupt all