# Detect the operating system
UNAME := $(shell uname)

# Use conditional statements based on the operating system
ifeq ($(UNAME), Darwin)  # macOS
    KILL_COMMAND := pgrep -f
else ifeq ($(UNAME), Linux)  # Linux
    KILL_COMMAND := pkill -f
else
    $(error Unsupported operating system: $(UNAME))
endif

.PHONY: all start-server start-worker start-ui start-envy start-next cleanup

all: start-server start-worker start-ui start-envy start-next

start-server:
	@echo "Starting Temporal server..."
	@npx nx temporal:server & disown

start-worker:
	@echo "Starting Temporal worker..."
	@npx nx temporal:worker & disown

start-ui:
	@echo "Opening Temporal UI..."
	@npx nx temporal:ui & disown

start-envy:
	@echo "Starting EnvyJs..."
	@npx nx envy & disown

start-next:
	@echo "Starting Next.js app..."
	@npx nx serve swapi-next & disown

cleanup:
	@echo "Cleaning up..."
	@$(KILL_COMMAND) "temporal" || true
	@$(KILL_COMMAND) "node" || true
	@$(KILL_COMMAND) "envy" || true