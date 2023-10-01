const express=require('express');                      //requerimos express
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const connection = require('express-myconnection');
const { log } = require('console');

const app = express ();        
//Importar routes 
const customerRoutes = require('./routes/customer');

//Settings
app.set('port', process.env.PORT|| 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'',
    database:'clientes'
},'single'));

app.use(express.urlencoded({extended: false}));
//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//starting the server
app.listen(app.get('port'), ()=>{                                 //Iniciamos el servidor
console.log('Inciado')
});
