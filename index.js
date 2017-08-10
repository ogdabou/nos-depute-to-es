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

  await esClient.bulkPromise(bulkBody);
}

const getSynthesis = async () => {
  const responseEntity = await restling.get('https://www.nosdeputes.fr/synthese/data/json')
  let hemicycle = JSON.parse(responseEntity.data).deputes.map(d => d.depute)

  const bulkBody = []
  hemicycle.forEach((depute) => {
    bulkBody.push({ index:  { _index: 'hemicycle', _type: 'activity', _id: depute.id} })
    bulkBody.push(depute)
  })
  await esClient.bulkPromise(bulkBody);
  console.log('synthesis ')
}

const main = async () => {
  try {
    await Promise.all([
      getDeputes(),
      getSynthesis()
    ])
  } catch (error) {
    console.error(error)
  }

  console.log('Done')
}

module.exports = main()
