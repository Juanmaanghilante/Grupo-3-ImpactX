const path = require('path');

const express = require('express');
const app = express();
const mainRouter =  require ('./routes/mainRoutes')


app.use(express.static("public"));
// EJS
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.listen( 3003, () => console.log('Servidor en puerto 3003') );

app.use (mainRouter);  

















