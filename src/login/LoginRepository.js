import cliente from '../util/databaseconection '
import loginquery from '../util/querys'

cliente.connect()
const login = cliente.query(loginquery,(err,res) =>{
    console.log(err,res);
    cliente.end();
});