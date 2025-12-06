require("dotenv").config();
const express = require("express");
const config = require("./config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Update Swagger document with correct host at runtime
if (process.env.HOST) {
  swaggerDocument.host = process.env.HOST;
  swaggerDocument.schemes = ["https", "http"];
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  swaggerDocument.host = `localhost:${process.env.PORT || 3000}`;
  swaggerDocument.schemes = ["http"];
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (safe to set up before DB connection)
app.use(express.json()).use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes and swagger can be registered now; request handlers should call db.getDb()
app.use("/", require("./routes/index")).use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const mongodb = require("./db/connection");

// startServer: connect to DB and then start listening. Exported so tests can call init separately.
const startServer = () => {
  mongodb.initDb((err, db) => {
    if (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

// Only start server if this file is run directly (not required by tests)
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };