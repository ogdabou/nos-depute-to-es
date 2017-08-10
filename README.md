# Nos-depute to ES

Tested on ES 1.7 / ES 5.5

## Quick start

*Local*
```bash
npm install
ES_HOST={domain}:{port} node --harmony-async-await index.js
```

*Docker*
```
docker build -t deputes-to-es .
docker run -e "ES_HOST={}" depute-to-es
```

## Env variables

- ES_HOST: target elasticsearch
- ES_LOG: [warning] by default, change it to debug your Elasticserch issues



