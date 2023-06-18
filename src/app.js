const path = require('path');

const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRoutes')


// EJS
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/products', express.static(path.join(__dirname, '../views/products')));
app.use('/users', express.static(path.join(__dirname, '../views/users')));

app.listen(3003, () => console.log('Servidor en puerto 3003'));

app.use(mainRouter);

















