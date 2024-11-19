
const dotenv = require('dotenv')
const mysql = require('mysql');
dotenv.config();

var conexion = mysql.createConnection(
        {  host      : process.env.DB_HOST || 'localhost',  
            user     : process.env.DB_USERNAME || 'root',  
            password : process.env.DB_PASSWORD || '',
            database : process.env.DB_DATABASE || 'blog'
        });
module.exports =  conexion;
