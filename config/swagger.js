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
      { name: "Auth", description: "Login and admin user listing (JWT)" },
      { name: "Register", description: "Create a new user account" },
      { name: "Records", description: "Financial records (CRUD, filters, pagination)" },
      { name: "Dashboard", description: "Summaries, trends, and recent activity" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;