#!/bin/bash

yaml2json -p -s yaml-schema/
mkdir -p json-schema

for path in yaml-schema/*.json; do
  filename=$(basename $path)
  schemaName=${filename%.*}
  jq 'del(.properties[].example)' $path > json-schema/${filename}
  mkdir -p ./validators
  ajv compile -s json-schema/${filename} -o validators/${schemaName}.js
done

rm yaml-schema/*.json
