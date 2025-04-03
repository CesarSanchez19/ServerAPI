const express = require('express');
const router = express.Router();
const respuestas = require('../../red/respuestas');
const controlador = require('../../modulos/clientes/controlador');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await controlador.todos();
    respuestas.success(req, res, 200, clientes);
  } catch (error) {
    respuestas.error(req, res, 500, error);
  }
});

// Obtener un cliente por id
router.get('/:id', async (req, res) => {
  try {
    const cliente = await controlador.uno(req.params.id);
    if (!cliente || cliente.length === 0) {
      return respuestas.error(req, res, 404, 'Cliente no encontrado');
    }
    respuestas.success(req, res, 200, cliente);
  } catch (error) {
    respuestas.error(req, res, 500, error);
  }
});

// Agregar un nuevo cliente  
// Se asume que para insertar se envía id = 0 o no se envía id
router.post('/agregar', async (req, res) => {
  try {
    // Para insertar, forzamos id a 0 en caso de no venir definido
    const data = { ...req.body, id: 0 };
    await controlador.agregar(data);
    respuestas.success(req, res, 200, 'Cliente insertado');
  } catch (error) {
    respuestas.error(req, res, 500, error);
  }
});

// Actualizar un cliente existente  
// Se requiere que req.body incluya el id del cliente a actualizar
router.post('/actualizar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para actualizar');
    }
    await controlador.agregar(req.body);
    respuestas.success(req, res, 200, 'Cliente actualizado');
  } catch (error) {
    respuestas.error(req, res, 500, error);
  }
});

// Eliminar un cliente  
// Se requiere que req.body incluya el id del cliente a eliminar
router.post('/eliminar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para eliminar');
    }
    await controlador.eliminar(req.body.id);
    respuestas.success(req, res, 200, 'Cliente eliminado');
  } catch (error) {
    respuestas.error(req, res, 500, error);
  }
});

module.exports = router;
