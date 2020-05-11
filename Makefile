VERSION := $(shell jq -r ".version" package.json)

APP_NAME := crounch-front
BUILDER_IMAGE_NAME := $(APP_NAME)-builder:$(VERSION)
TEST_IMAGE_NAME := $(APP_NAME)-test-$(VERSION)
DOCKER_USER := sehsyha

.PHONY: bump-version
bump-version:
	@echo "+ $@"
	git config --global user.email "action@github.com"
	git config --global user.name "Github Action"
	git checkout master
	git fetch --tags
	npm i -g standard-version@4.2.0
	standard-version --skip.commit true --skip.tag true
	NEW_VERSION=`jq -r ".version" package.json`;\
		COMMIT_MESSAGE=`sed "s/NEW_VERSION/$$NEW_VERSION/" 'bumpVersionCommitMessage'`;\
		git add CHANGELOG.md;\
		git add package.json;\
		git commit -m "$$COMMIT_MESSAGE"
# 	git tag $$NEW_VERSION

.PHONY: build
build:
	@echo "+ $@"
	npm run build

.PHONY: build-image
build-image:
	@echo "+ $@"
	docker build -f containers/Dockerfile -t $(APP_NAME):$(VERSION) .
	docker tag $(APP_NAME):$(VERSION) $(DOCKER_USER)/$(APP_NAME):$(VERSION)
	docker tag $(APP_NAME):$(VERSION) $(DOCKER_USER)/$(APP_NAME):latest

.PHONY: publish-image
publish-image:
	@echo "+ $@"
	docker login -u $(DOCKER_USER) -p $(DOCKER_PASSWORD)
	docker push $(DOCKER_USER)/crounch-front:$(VERSION)
	docker push $(DOCKER_USER)/crounch-front:latest

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

.PHONY: run-image
run-image:
	@echo "+ $@"
	docker-compose -p $(APP_NAME) -f containers/docker-compose.acceptance.yml down || true;
	docker-compose -p $(APP_NAME) -f containers/docker-compose.acceptance.yml pull;
	docker-compose -p $(APP_NAME) -f containers/docker-compose.acceptance.yml up -d --build

.PHONY: acceptance-test
acceptance-test:
	@echo "+ $@"
	make run-image
	npm run test:e2e:ci
