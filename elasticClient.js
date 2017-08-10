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

client.bulkPromise = (body) => new Promise((resolve, reject) => {
  client.bulk({
    body: body
  }, function (err, resp) {
    if (err) {
      console.error(err)
      return reject(err)
    }
    return resolve(resp)
  });
})

module.exports = client