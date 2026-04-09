#!/bin/bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
export NODE="/usr/local/bin/node"
cd "$(dirname "$0")"
exec /usr/local/bin/node node_modules/.bin/next dev -p 3002
