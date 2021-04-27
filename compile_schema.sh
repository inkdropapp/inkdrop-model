#!/bin/bash

for path in json-schema/*.json; do
  filename=$(basename $path)
  schemaName=${filename%.*}
  mkdir -p ./validators
  ajv compile -s $path -o validators/${schemaName}.js --strict=false
done
