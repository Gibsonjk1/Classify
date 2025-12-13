const swaggerAutogen = require("swagger-autogen")();


const doc = {
  info: {
    title: "classify",
    description: "CSE 341 final project",
  },
  host: "classify-7nzc.onrender.com",
  schemes: ["https", "http"],
  securityDefinitions: {
    googleOAuth: {
      type: "oauth2",
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
      flow: "implicit",
      scopes: {
        "https://www.googleapis.com/auth/userinfo.profile": "Access profile information",
        "https://www.googleapis.com/auth/userinfo.email": "Access email address"
      }
    }
  },
  security: []
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
  // Post-process to add OAuth scopes to security requirements
  const fs = require('fs');
  const swaggerDoc = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  
  // Define the OAuth scopes
  const oauthScopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];
  
  // Update all security requirements to include scopes
  if (swaggerDoc.paths) {
    Object.keys(swaggerDoc.paths).forEach(path => {
      Object.keys(swaggerDoc.paths[path]).forEach(method => {
        const endpoint = swaggerDoc.paths[path][method];
        if (endpoint.security && Array.isArray(endpoint.security)) {
          endpoint.security.forEach(sec => {
            if (sec.googleOAuth !== undefined) {
              // Replace empty array with actual scopes
              sec.googleOAuth = oauthScopes;
            }
          });
        }
      });
    });
  }
  
  // Write the updated swagger.json
  fs.writeFileSync(outputFile, JSON.stringify(swaggerDoc, null, 2));
  console.log('Swagger documentation generated successfully with OAuth2 scopes');
});
