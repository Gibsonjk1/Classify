const express = require("express");
const { MongoClient } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
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
      .use("/", require("./routes"))
      .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Start server after everything is set up
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
});
