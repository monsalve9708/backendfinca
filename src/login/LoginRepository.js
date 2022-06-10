const {Client} = require('pg')
const {loginQuery} = require('../util/querys')

const login  = async (values) => {
   const client = new Client();
   client.connect();
   try {
   return  await client.query(loginQuery, [values])
       .then(data => data.rows[0]);
   }catch (e){
      console.error(e);
   }finally {
      client.end();
   }
}

module.exports = login;
