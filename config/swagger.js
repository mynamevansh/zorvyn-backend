const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zorvyn Finance Dashboard API",
      version: "1.0.0",
      description: `API documentation for Finance Dashboard Backend.

🔐 Authentication:
1. Login via /api/users/login
2. Copy the JWT token
3. Click "Authorize" button (top right)
4. Enter: Bearer <your_token>`,
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
          description:
            "JWT from POST /api/users/login. Follow the Authentication steps in the API description, then use Authorize.",
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
        MonthlyIncomeExpense: {
          type: "object",
          properties: {
            month: { type: "string", description: "Short month label (Jan–Dec)" },
            income: { type: "number" },
            expense: { type: "number" },
          },
        },
        ErrorMessage: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;