const db = require('../../BD/mysql');
const TABLA = 'clientes';

// Obtiene todos los clientes
function todos() {
  return db.todos(TABLA);
}

// Obtiene un cliente específico por su id
function uno(id) {
  return db.uno(TABLA, id);
}

// Agrega un cliente nuevo o actualiza si se pasa un id distinto de 0
function agregar(data) {
  return db.agregar(TABLA, data);
}

// Elimina un cliente por su id
function eliminar(id) {
  return db.eliminar(TABLA, { id });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar
};
