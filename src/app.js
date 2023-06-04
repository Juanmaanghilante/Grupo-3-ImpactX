const express = require('express');
const mainRouter =  require ('./routes/mainRoutes')


const app = express();


app.use(express.static("public")); // para decirle a express que ./public contiene archivos estaticos

app.listen(3000, () => {
  console.log('Servidor en puerto 3000')
});

// router
app.use('/',mainRouter )  

















