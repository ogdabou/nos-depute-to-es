const elasticsearch = require('elasticsearch');
const env = require('./env');

const client = new elasticsearch.Client({
  host: env.ES_HOST,
  log: env.ES_LOGS,
});

client.ping({
  requestTimeout: 10000,
})
  .then((body) => {
    if (body) {
      console.log('Elasticsearch client is up');
    }
  }, (error) => { console.log('Elasticsearch client is down', error); })
;

module.exports = client