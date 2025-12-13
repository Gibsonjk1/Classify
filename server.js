require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const config = require("./config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Initialize Passport configuration
require("./config/passport");

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

// Session configuration
const isProduction = process.env.NODE_ENV === "production" || process.env.HOST;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // Only send over HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware (safe to set up before DB connection)
app.use(express.json()).use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes and swagger can be registered now; request handlers should call db.getDb()
// Register auth routes before other routes
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));

// Swagger UI with OAuth2 configuration
const swaggerUiOptions = {
  swaggerOptions: {
    oauth: {
      clientId: process.env.CLIENT_ID,
      realm: 'google',
      appName: 'Classify API',
      scopeSeparator: ' ',
      scopes: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      additionalQueryStringParams: {},
      useBasicAuthenticationWithAccessCodeGrant: false,
      usePkceWithAuthorizationCodeGrant: false
    }
  }
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

// Error handler middleware (must be registered after all routes)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

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