FROM node:7.10

WORKDIR /opt/nos-deputes-to-es/

COPY [ "package.json", "./" ]

RUN npm install

COPY [ "index.js", "env.js", "elasticClient.js", "./" ]

ENTRYPOINT ["node", "index.js"]