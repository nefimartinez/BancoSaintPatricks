'use strict';

const express = require('express');
const router = express.Router();
const validateSchema = require('../../middlewares/validateSchemaHandler');

// rutas Schemas
const { listadoComunaSchema } = require('../../schemas/listadoComunasSchema');


// rutas Controllers
const { listadoComunasController } = require('./listadoComunasController');


router.post('/',
       validateSchema(listadoComunaSchema , 'body'),
       listadoComunasController
);

module.exports = router;
