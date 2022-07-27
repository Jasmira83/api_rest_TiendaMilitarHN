const mysql= require('mysql');

//CONECTAR A LA BD (Mysql)

// conectar a la base de datos (MySql)
const mysqlConnection = mysql.createConnection ({
    host:'142.44.161.115',
    user:'TIENDASM', 
    password: 'Tiendas##231',
    datebase: 'TIENDASM',
    port: 3306


});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
          
    }else {
        console.log('Base de datos conectada');

    }
    

});


//Para exportar el modulo "mysqlConnection" en otras partes de la aplicacion 
module.exports = mysqlConnection;
