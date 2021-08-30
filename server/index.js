const express = require("express");

const app = express();
const PORT = 8000;

const routes = require("./routes/index");

// Adding the CORS policy setting
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// Adding the body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.use("/", routes);

// Express server listening to the port
app.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
