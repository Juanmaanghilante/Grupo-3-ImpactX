const express = require('express')
const path = require ('path') // para unificar rutas utilizamos path -- es un paquete de node

const app = express()

const publicPath = path.resolver(__dirname, './public')
app.use( express.static(publicPath) ) // para decirle a express que ./public contiene archivos estaticos

app.listen(3000, () => {
  console.log('Servidor en puerto 3000')
})

