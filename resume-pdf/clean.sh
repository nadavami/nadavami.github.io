#!/bin/bash
set -e

dir="$(cd "$(dirname "$0")/out" 2>/dev/null && pwd)" || { echo "Nothing to clean."; exit 0; }
files=("$dir"/*.pdf)
[[ -e "${files[0]}" ]] || { echo "Nothing to clean."; exit 0; }

echo "Found ${#files[@]} PDF(s):"
printf '  %s\n' "${files[@]##*/}"
read -rp $'\nDelete all? [y/N] ' answer
[[ "$answer" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }
rm "${files[@]}"
echo "Deleted ${#files[@]} PDF(s)."
