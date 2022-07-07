const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')

//Autor
const auth = require('./routers/auth');
const cajas = require('./routers/cajas');
const clientes = require('./routers/clientes');
const detallesPedidos = require('./routers/detallesPedidos');
const direcciones = require('./routers/direcciones');
const empleados = require('./routers/empleados');
const mesas = require('./routers/mesas');
const pedidos = require('./routers/pedidos');
const productos = require('./routers/productos');
const roles = require('./routers/roles');
const secciones = require('./routers/secciones');
const tipoPedidos = require('./routers/tipoPedidos');
const usuarios = require('./routers/usuarios');

const whiteList = ['http://localhost:4200'];

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
app.use( cors({origin:whiteList}) );
app.use(morgan('tiny'));

//Ruters Autor
app.use("/api/login",auth);
app.use("/api/cajas",cajas);
app.use("/api/clientes",clientes);
app.use("/api/detallesPedidos",detallesPedidos);
app.use("/api/direcciones",direcciones);
app.use("/api/empleados",empleados);
app.use("/api/mesas",mesas);
app.use("/api/pedidos",pedidos);
app.use("/api/productos",productos);
app.use("/api/roles",roles);
app.use("/api/secciones",secciones);
app.use("/api/tiposPedido",tipoPedidos);
app.use("/api/usuarios",usuarios);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});