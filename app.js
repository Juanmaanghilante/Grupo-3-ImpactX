const express = require('express');
const path = require ('path'); // para unificar rutas utilizamos path -- es un paquete de node

const app = express();

const publicPath = path.resolve(__dirname, './public')
app.use( express.static(publicPath)); // para decirle a express que ./public contiene archivos estaticos

app.listen(3000, () => {
  console.log('Servidor en puerto 3000')
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signup.html'));
});

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/product.html'));
});

app.get('/footer', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/footer.html'));
});


app.get('/header', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/header.html'));
});