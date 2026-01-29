#!/bin/bash

echo "converting yaml to json"
mkdir -p json-schema

for path in yaml-schema/*.yaml; do
  echo "processing $path"
  filename=$(basename "$path" .yaml)
  # Convert YAML to JSON, remove 'example' fields, write to json-schema/
  npx yaml --json --single < "$path" | jq 'walk(if type == "object" then del(.example) else . end)' > "json-schema/${filename}.json"

  echo "compiling with ajv"
  mkdir -p ./validators
  ajv compile -s "json-schema/${filename}.json" -o "validators/${filename}.js" -c ajv-formats
done
