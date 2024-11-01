const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const router = express.Router();

router.use('/', swaggerUI.serve);
router.use('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
