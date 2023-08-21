const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cookie =require('cookie-parser')
const methodOverride = require("method-override")

// Routers
const mainRouter = require('./routes/mainRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

// API Routers
const productApiRouter = require('./routes/api/productApiRoutes')
const userApiRouter = require('./routes/api/userApiRoutes')

// App Middlewares
const error404Middleware = require('./middlewares/error404Middleware')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
  secret: 'This is a Secret',
  resave: false,
  saveUninitialized: false
}));

// Cookies
app.use(cookie());
app.use(userLoggedMiddleware);

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

app.use('/api/products', productApiRouter)
app.use('/api/users', userApiRouter)

app.use(error404Middleware);

