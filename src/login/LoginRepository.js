const client = require("../util/databaseconection")
const loginQuery = require('../util/querys')

client.connect();
const login  = (values) => {
   return client.query(loginQuery, [values]);
}

module.exports = login;
