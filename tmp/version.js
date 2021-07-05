const config = require('config')
const knex = require('knex')(config.get('db_customers'))

knex
  .raw('SELECT VERSION()')
  .then((version) => console.log(version[0][0]))
  .catch((err) => {
    if (err.code === 'ETIMEDOUT') {
      console.log('ERROR TIMEOUT')
    } else {
      throw err
    }
  })
  .finally(() => {
    knex.destroy()
  })
