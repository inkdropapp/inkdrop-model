#!/bin/bash

echo "converting yaml to json"
mkdir -p json-schema

for path in yaml-schema/*.yaml; do
  echo "processing $path"
  filename=$(basename "$path" .yaml)
  # Convert YAML to JSON, remove 'example' fields, write to json-schema/
  npx yaml --json --single < "$path" | jq 'walk(if type == "object" then del(.example) else . end)' > "json-schema/${filename}.json"
  # Wrap the JSON in a TS module so the declaration generator can type it;
  # TypeScript 7 (tsgo) does not emit declarations for imported `.json` files
  {
    printf 'const schema = '
    cat "json-schema/${filename}.json"
    printf '\nexport default schema\n'
  } > "json-schema/${filename}.ts"

  echo "compiling with ajv"
  mkdir -p ./ajv-validators
  ajv compile -s "json-schema/${filename}.json" -o "ajv-validators/${filename}.js" -c ajv-formats
done
