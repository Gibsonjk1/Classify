require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();
const hostId = process.env.HOST;
const schemeId = process.env.SCHEME;


const doc = {
  info: {
    title: "classify",
    description: "CSE 341 final project",
  },
  // host: "localhost:3000",
  // schemes: ["http"],
  host: "classify-yx4j.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
