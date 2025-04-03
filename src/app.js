const express = require('express');
const config = require('./config');
const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutasUsuarios'); // Asegúrate de tener este módulo o coméntalo

const app = express();
app.use(express.json());

// Configuración del puerto
app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);

module.exports = app;
