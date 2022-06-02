const {Client} = require('pg')

exports.connect = () => {
    const cliente = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'Finca',
        password: 'admin',
        port: 5432,
    });
    cliente.connect().then(() => {
        console.log("Conexion a base de datos exitosa");
    }).catch((error) => {
        console.log("Fallo conexion a base de datos");
        console.error(error);
        process.exit(1);
    });
}