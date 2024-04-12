const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const authRoute = require('./routes/authRoutes');
const profileRoute = require('./Routes/profileRoute');
const taskRoute = require('./Routes/taskRoute');

const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
//app.use(cors());
app.use(
    cors()
);
app.use('/api', authRoute, profileRoute, taskRoute);
app.disable('x-powered-by');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Task Manager API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "TaskManager",
        url: "https://mysite.com",
        email: "gildasmboumen@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use( 
  "/api-docs", 
  swaggerUi.serve, 
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(PORT, (err) => {
  if(err) process.exit(1);
  console.log(`Server running on port ${PORT}`);
});