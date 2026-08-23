.PHONY: fresh

## Wipe Next.js cache, install deps if needed, then start the dev server
fresh:
	@rm -rf .next
	@if [ ! -d node_modules ]; then echo "Installing npm dependencies..."; npm install; fi
	npm run dev
