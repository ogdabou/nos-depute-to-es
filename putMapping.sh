#!/bin/bash

curl -XPUT "http://$ES_HOST/hemicycle?pretty" -H 'Content-Type: application/json' -d'
{
"mappings": {
    "depute": {
      "dynamic_templates": [
        { "notanalyzed": {
          "match":              "*",
          "match_mapping_type": "string",
          "mapping": {
            "type":        "string",
            "index":       "not_analyzed"
          }
        }
        }
      ]
    },
    "activity": {
      "dynamic_templates": [
        { "notanalyzed": {
          "match":              "*",
          "match_mapping_type": "string",
          "mapping": {
            "type":        "string",
            "index":       "not_analyzed"
          }
        }
        }
      ]
    }
  }
}
'
