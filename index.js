const restling = require('restling')
const esClient = require('./elasticClient')


const getDeputes = async () => {
  const responseEntity = await restling.get('http://www.nosdeputes.fr/deputes/enmandat/json')
  let hemicycle = JSON.parse(responseEntity.data).deputes.map((d) => d.depute)
  console.log(`Found ${hemicycle.length} deputes`)

  const bulkBody = []
  hemicycle.forEach((depute) => {
    bulkBody.push({ index:  { _index: 'hemicycle', _type: 'depute', _id: depute.id} })
    bulkBody.push(depute)
  })

  esClient.bulk({
    body: bulkBody
  }, function (err, resp) {
    if (err) console.error(err)
    console.log('Push success', resp)
  });
}

const getSynthesis = async () => {
  const responseEntity = await restling.get('https://www.nosdeputes.fr/synthese/data/json')
  let hemicycle = JSON.parse(responseEntity.data).deputes.map(d => d.depute)

  const bulkBody = []
  hemicycle.forEach((depute) => {
    bulkBody.push({ index:  { _index: 'hemicycle', _type: 'activity', _id: depute.id} })
    bulkBody.push(depute)
  })
  esClient.bulk({
    body: bulkBody
  }, function (err, resp) {
    if (err) console.error(err)
    console.log('Push success', resp)
  });
}

const main = async () => {
  await getDeputes()
  await getSynthesis()
  console.log('coucou')
}

module.exports = main()
