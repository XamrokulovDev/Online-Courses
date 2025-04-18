const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Courses API',
            version: '1.0.0',
            description: 'Node JS API with Swagger',
        },
        servers: [
            {
                url: 'https://online-courses-dev.onrender.com',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;