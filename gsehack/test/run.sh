#!/usr/bin/env bash
# Headless test runner for the GRIZZLY_SE Cyber Range.
# Uses gjs (SpiderMonkey) because the game is a dependency-free browser script
# and Node.js is not assumed to be installed.
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v gjs >/dev/null 2>&1; then
  echo "gjs is required (e.g. 'sudo apt install gjs' or 'sudo dnf install gjs')." >&2
  exit 1
fi

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

python3 - "$tmp" <<'PY'
import re, sys
html = open("index.html").read()
code = re.search(r"<script>([\s\S]*?)</script>", html).group(1)
# Disable the auto-boot so the test driver controls execution.
i = code.rfind("boot();")
code = code[:i] + "/* boot disabled in tests */" + code[i + len("boot();"):]
with open(sys.argv[1], "w") as f:
    f.write(open("test/prelude.js").read())
    f.write("\n")
    f.write(code)
    f.write("\n")
    f.write(open("test/tests.js").read())
    f.write("\n")
PY

gjs "$tmp"
