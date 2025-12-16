// CommonJS version of server.js (converted from ESM)
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

// Initialize Passport configuration after dotenv loads
require('./config/passport');

// Update Swagger document with correct host at runtime
if (process.env.HOST) {
  swaggerDocument.host = process.env.HOST;
  swaggerDocument.schemes = ['https', 'http'];
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  swaggerDocument.host = `localhost:${process.env.PORT || 3000}`;
  swaggerDocument.schemes = ['http'];
}

const app = express();
const PORT = process.env.PORT || 3000;

// Apollo Server Configuration
async function startApolloServer() {
  // Import GraphQL schema/resolvers dynamically (GraphQL module uses ESM exports)
  const gql = await import('./graphql/index.js');
  const { typeDefs, resolvers } = gql;
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  // Attach GraphQL to Express using expressMiddleware
  app.use('/graphql', express.json(), expressMiddleware(apolloServer, { context: async ({ req }) => ({}) }));
  console.log('GraphQL ready at /graphql');
}

// Session configuration
const isProduction = process.env.NODE_ENV === 'production' || process.env.HOST;
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
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Route imports
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

app.use('/auth', authRoutes);
app.use('/', indexRoutes);

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
      usePkceWithAuthorizationCodeGrant: false,
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

// Error handler middleware (must be registered after all routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// DB connection
const mongodb = require('./db/connection');

// startServer: connect to DB, start Apollo, then listen
const startServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      mongodb.initDb((err, db) => {
        if (err) return reject(err);
        resolve(db);
      });
    });

    // Start Apollo Server and attach to Express
    await startApolloServer();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

// Only start server if this file is run directly (not required by tests)
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };