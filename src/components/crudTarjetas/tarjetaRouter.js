'use strict';

const express = require('express');
const router = express.Router();

// rutas servicios Mantenedor TI
const {	getAllController,getIdController,createCardController,updateCardController,deleteCardController } = require('./tarjetaController');


// rutas crudUsuarios
router.get('/', getAllController);
router.get('/:id', getIdController);
router.post('/', createCardController);
router.put('/:id', updateCardController);
router.delete('/:id', deleteCardController);

module.exports = router;
