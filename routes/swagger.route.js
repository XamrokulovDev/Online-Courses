const { Router } = require('express');
const router = Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;