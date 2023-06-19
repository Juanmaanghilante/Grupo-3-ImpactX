const path = require('path');

const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')




// EJS
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/products', express.static(path.join(__dirname, '../views/products')));
app.use('/users', express.static(path.join(__dirname, '../views/users')));



app.listen(3003, () => console.log('Servidor en puerto 3003'));




app.use(userRouter);
app.use(productRouter);

















