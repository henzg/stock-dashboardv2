export default {
    openapi: '3.0.0',
    info: {
        title: 'Stock Dashboard API',
        version: '1.0.0',
        description: 'API documentaiton for Stock Dashboard project',
    },
    servers: [
        {
            url: 'http://localhost:8000/api',
            description: 'This is for development',
        },
    ],
};