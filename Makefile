.PHONY: fresh

## Install dependencies if needed, then start Next.js dev server
fresh:
	@if [ ! -d node_modules ]; then echo "Installing npm dependencies..."; npm install; fi
	npm run dev
