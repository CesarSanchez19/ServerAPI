const db = require('../../BD/mysqlUser');
const TABLA = 'usuarios';
const bcrypt = require('bcrypt');

// Función para encriptar la contraseña
async function encryptPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Función para comparar contraseñas
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Obtiene todos los usuarios
async function todos() {
  const result = await db.todos(TABLA);
  console.log('Obteniendo todos los usuarios:', result);
  return result;
}

// Obtiene un usuario por su id
async function uno(id) {
  const result = await db.uno(TABLA, id);
  console.log(`Obteniendo usuario con id ${id}:`, result);
  return result;
}

// Registra (crea) un nuevo usuario con contraseña encriptada
async function registrar(data) {
  if (!data.password) {
    throw new Error('La contraseña es requerida');
  }
  const encryptedPassword = await encryptPassword(data.password);
  const userData = { ...data, password: encryptedPassword, id: 0 }; // fuerza inserción
  const result = await db.insertar(TABLA, userData);
  console.log('Usuario registrado:', { ...userData, id: result.insertId });
  return result;
}

// Actualiza un usuario existente; encripta la contraseña si se actualiza
async function actualizar(data) {
  if (!data.id || data.id == 0) {
    throw new Error('El id es requerido para actualizar');
  }
  if (data.password) {
    data.password = await encryptPassword(data.password);
  }
  const result = await db.actualizar(TABLA, data);
  console.log(`Usuario actualizado con id ${data.id}:`, data);
  return result;
}

// Elimina un usuario por su id
async function eliminar(id) {
  const result = await db.eliminar(TABLA, id);
  console.log(`Usuario eliminado con id ${id}`);
  return result;
}

// Login: autentica al usuario verificando el email y la contraseña
async function login(data) {
  if (!data.email || !data.password) {
    throw new Error('Email y contraseña son requeridos');
  }
  const user = await db.unoByEmail(TABLA, data.email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }
  console.log(`Usuario logueado con email ${data.email}`);
  return user;
}

module.exports = {
  todos,
  uno,
  registrar,
  actualizar,
  eliminar,
  login
};