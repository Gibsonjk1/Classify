require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
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
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
