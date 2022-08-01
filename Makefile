DOCKER_COMPOSE?="docker-compose.yml"
DOCKER_COMPOSE_TEST?="docker-compose.test.yml"

cmd-exists-%:
	@hash $(*) > /dev/null 2>&1 || \
		(echo "ERROR: '$(*)' must be installed and available on your PATH."; exit 1)

.PHONY: run
run: cmd-exists-docker-compose
	@docker-compose -f "${DOCKER_COMPOSE}" up --build --detach

.PHONY: test
test: cmd-exists-docker-compose
	@docker-compose -f "${DOCKER_COMPOSE}" -f "${DOCKER_COMPOSE_TEST}" up --build

.PHONY: up
up: cmd-exists-docker-compose		
	@docker-compose -f "${DOCKER_COMPOSE}"  up --detach

.PHONY: down
down: cmd-exists-docker-compose
	@docker-compose -f "${DOCKER_COMPOSE}" down

.PHONY: clean
clean: cmd-exists-docker-compose		
	@docker stop `docker ps -qa`
	@docker system prune -a -f	