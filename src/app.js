const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routes/mainRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

const methodOverride = require("method-override")




app.use(express.static("public"));
app.use('/products', express.static(path.join(__dirname, '../views/products')));
app.use('/users', express.static(path.join(__dirname, '../views/users')));

// Para recibir info que viaja por form -> req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.listen(3003, () => console.log('Servidor en puerto 3003'));







app.use(mainRouter);
app.use(userRouter);
app.use(productRouter);

















