#!/bin/bash

# Rename key `$id` to `id`
for path in json-schema/*.json; do
  filename=$(basename $path)
  schemaName=${filename%.*}

  mkdir -p ./json-schema-doc
  jq '.["id"] = .["$id"] | del(.["$id"])' $path > json-schema-doc/${filename}
done

bundle exec prmd combine --meta docs/meta.json json-schema-doc/ > schema.json
bundle exec prmd doc schema.json > docs/schema.md
rm schema.json

rm -rf json-schema-doc
