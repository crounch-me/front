VERSION := $(shell jq -r ".version" package.json)

APP_NAME := crounch-front

.PHONY: run
run: run-dependencies run-app

.PHONY: run-app
run-app:
	@echo "+ $@"
	npm run serve

.PHONY: run-dependencies
run-dependencies:
	@echo "+ $@"
	docker-compose -p $(APP_NAME) -f containers/docker-compose.dependencies.yml down || true;
	docker-compose -p $(APP_NAME) -f containers/docker-compose.dependencies.yml pull;
	docker-compose -p $(APP_NAME) -f containers/docker-compose.dependencies.yml up -d --build
