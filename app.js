const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const salesRoutes = require("./routes/salesRoute");
const paymentRoutes = require("./routes/paymentRoutes")
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
// Connect to MongoDB
connectDB();


app.use(express.json({ extended: false }));
app.use(cookieParser());
// Route to check if API is running
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/clients", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/payments", paymentRoutes)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CRM API Documentation",
      version: "1.0.0",
      description: "API documentation for CRM application",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the routes files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
