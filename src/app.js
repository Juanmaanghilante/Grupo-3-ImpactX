const express = require('express');
const mainRouter =  require ('./routes/mainRoutes')
const app = express();


app.use(express.static("public"));

app.listen( 3003, () => console.log('Servidor en puerto 3000') );

app.use (mainRouter);  

















