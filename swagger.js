const swaggerAutogen = require("swagger-autogen")();


const doc = {
  info: {
    title: "classify",
    description: "CSE 341 final project",
  },
  host: "classify-7nzc.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
