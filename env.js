const env = require('common-env')()

module.exports = {
  ES_HOST: env.getOrDie('ES_HOST'),
  ES_LOGS: env.getOrElse('ES_LOGS', 'error')
}