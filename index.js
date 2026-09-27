const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// 1. Configuración base de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api de Catálogo de Productos',
            version: '1.0.0',
            description: 'Una API de demostración documentada con Swagger (OpenAPI) aplicando prácticas de Docs-as-code',
            contact: {
                name: "Marcela Zapata Vanegas",
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            },
        ],
    },
    apis: ['./index.js'], // Le decimos a Swagger que lea los comentarios de este mismo archivo
};

// Generamos la interfaz y la montamos en la ruta /api-docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 2. Base de datos simulada (En memoria)
const products = [
    { id: 1, name: 'Laptop Pro 15"', price: 1200},
    { id: 2, name: 'Teclado Mecánico', price: 80},
    { id: 3, name: 'Monitor 4K"', price: 300},
];

// 3. Rutas y Documentación como Código

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene la lista de todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista devuelta exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Laptop Pro 15
 *                   price:
 *                     type: integer
 *                     example: 1200
 */
app.get('/products', (req, res) => {
    res.json(products);
});



// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});