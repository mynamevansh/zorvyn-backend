const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zorvyn Finance API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard Backend",
    },
    servers: [
      {
        url: "https://zorvyn-backend-5y48.onrender.com",
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Records", description: "Financial records APIs" },
      { name: "Dashboard", description: "Analytics APIs" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        Record: {
          type: "object",
          properties: {
            _id: { type: "string" },
            amount: { type: "number" },
            type: { type: "string", enum: ["income", "expense"] },
            category: { type: "string" },
            notes: { type: "string" },
            createdAt: { type: "string" },
          },
        },
        Summary: {
          type: "object",
          properties: {
            totalIncome: { type: "number" },
            totalExpense: { type: "number" },
            netBalance: { type: "number" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;