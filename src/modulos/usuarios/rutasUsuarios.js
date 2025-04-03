const express = require('express');
const router = express.Router();

// Se encarga de crear la ruta raiz por asi mencionarlo
router.get('/', function (req, res){
    res.send('<div style="background-color: black; display: flex"><h1 style="color: red;">Hola bienvenido</h1><br> <h2 style="color: white">Este es de usurios</h2></div>');
})

router.get('/actualizado', function (req, res){
    res.send('<h1>Usuario actualizado</h1>')
})

module.exports = router;
