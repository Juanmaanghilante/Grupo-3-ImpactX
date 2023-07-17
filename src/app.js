const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const cookie =require('cookie-parser')
const mainRouter = require('./routes/mainRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const error404Middleware = require('./middlewares/error404Middleware')

const methodOverride = require("method-override")

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');




app.use(session({
  secret: 'This is a Secret',
  resave: false,
  saveUninitialized: false
}))



app.use(express.static("public"));
app.use('/products', express.static(path.join(__dirname, '../views/products')));
app.use('/users', express.static(path.join(__dirname, '../views/users')));
// Para recibir info que viaja por form -> req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware);
app.use(cookie());




app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.listen(3003, () => console.log('Servidor en puerto 3003'));






app.use(mainRouter);
app.use(userRouter);
app.use(productRouter);
app.use(error404Middleware);
