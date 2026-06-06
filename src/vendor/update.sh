#!/bin/bash

set -e

main() {
    mkdir -p es-toolkit
    curl -fsSL https://github.com/toss/es-toolkit/raw/refs/heads/main/src/function/debounce.ts -o es-toolkit/debounce.ts

    fetch_zip_subfolder \
        https://github.com/antfu-collective/structured-clone-es/archive/refs/heads/main.zip \
        src \
        structured-clone
}

fetch_zip_subfolder() {
	zip_url="$1"
	subfolder="$2"
	output_dir="$3"

	tmp_dir="$(mktemp -d)"
	zip_file="$tmp_dir/archive.zip"
	extract_dir="$tmp_dir/extract"

	curl -fsSL "$zip_url" -o "$zip_file"
	unzip -q "$zip_file" -d "$extract_dir"

	src_dir="$(find "$extract_dir" -type d -path "*/$subfolder" -print -quit)"
	rm -rf "$output_dir"
	mkdir -p "$output_dir"
	cp -R "$src_dir"/. "$output_dir"/
	rm -rf "$tmp_dir"
}

main