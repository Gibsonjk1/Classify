require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const config = require("./config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// Update Swagger document with correct host at runtime
if (HOST) {
  swaggerDocument.host = HOST;
  swaggerDocument.schemes = ["https"];
} else {
  swaggerDocument.host = "localhost:3000";
  swaggerDocument.schemes = ["http"];
}

const mongodb = require("./db/connection");

// Connect to MongoDB, First thing
mongodb.initDb((err, db) => {
  if (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if database connection fails
  } else {
    // Set up middleware after DB is connected
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
    // routes after DB is connected
    app
      .use("/", require("./routes/index"))
      .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Start server after everything is set up
    app.listen(PORT, () => {
      if (config.checkEnvironment() === "development") {
        console.log("Server is running on http://localhost:3000/api-docs");
      } else {
        console.log(`Server is running on https://${HOST}:${PORT}`);
      }
    });
  }
});
