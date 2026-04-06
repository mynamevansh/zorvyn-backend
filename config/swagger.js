const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zorvyn Finance API",
      version: "1.0.0",
      description: `
🚀 Finance Dashboard Backend API

🔹 **How to use:**
1. Register -> Login -> Get Token
2. Click "Authorize" and paste token
3. Test protected APIs

----------------------------------------

📘 **Below section shows API documentation (not actual response)**

⚡ After clicking "Execute", check the **Server Response above**
      `,
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