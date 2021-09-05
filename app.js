const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// DB Config
require("./config/db");

const app = express();

const campaign = require("./routes/campaign");

// public folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Enable CORS
app.use(cors());

app.use("/campaign", campaign);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API for Voting App",
      descrption: "API Info",
      contact: {
        name: "developer",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 5000;

// Start Server
app.listen(port, () => console.log("server starting on port", port));
