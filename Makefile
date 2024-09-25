SHELL := /bin/bash

build: install prereqs
	@# pnpm exec tsc --outDir dist
	@set -x; STAGE=$${STAGE} pnpm exec cdk -o dist synth

lint:
	pnpm exec eslint ./src ./cdk --ext .ts

lint-fix:
	pnpm exec eslint . --ext .ts --fix

test: unit-tests

unit-tests:
	pnpm exec jest --verbose

clean:
	rm -rf node_modules
	rm -rf dist

all: build lint test

install:
	corepack enable
	pnpm install --frozen-lockfile --config.dedupe-peer-dependents=false

deploy: prereqs
	@set -x; pnpm exec cdk -o dist deploy --method-direct --require-approval never

undeploy: prereqs
	@set -x; pnpm exec cdk -o dist destroy -f --require-approval never

prereqs:
	@if [ "$${STAGE}" == "" ]; then \
		echo "ENV STAGE is required"; \
		exit 1; \
	fi

build-slugs: copy-cows
	esbuild src/cow-slug.ts src/slug.ts --bundle --outdir=dist --platform=node	

run-slug:
	node ./dist/slug.js

copy-cows:    
	cp -R node_modules/cowsay/cows .

run-cow-slug:
	node ./dist/cow-slug.js
