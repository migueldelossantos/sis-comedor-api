const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');

//Autor


//DB
mongoose.connect(
    config.get('configDB.Host'),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Conectado a MongoDB'))
    .catch(err=>console.log('No se pudo conectar a MongoDB'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

//Ruters Autor

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});