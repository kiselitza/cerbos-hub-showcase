start:
	docker-compose -f infra/docker/docker-compose.yaml up --build

reset:
	docker-compose -f infra/docker/docker-compose.yaml rm -v

dev:
	docker-compose -f infra/docker/docker-compose.dev.yaml up --build	

release:
	docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag ghcr.io/cerbos/demo-app-expenses:latest -f infra/Dockerfile .
