require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const listEndpoints = require("express-list-endpoints");
const app = express();
const router = require("./routes/index");
const chalk = require("chalk");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./voting-swagger.yaml"); 
app.use("/voting-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

// api logger
app.use(morgan("combined")); 

app.use(express.json());

let port = process.env.PORT || 8080;
let appName = process.env.APP_NAME || "voting"

app.use(`/${appName}/api`, router); 


const endpoints = listEndpoints(app);
console.log(chalk.blue("Created Endpoints:"));
endpoints.forEach((endpoint) => {
  console.log(
    chalk.green("INFO:"),
    `${endpoint.methods.join(", ")} ${endpoint.path}`
  );
});

const server = app.listen(port, () => {
  console.log(
    `[API] App started and listening on port ${port}`,
    `\n[DATABASE] App is connected to database`
  );
});

module.exports = server;
