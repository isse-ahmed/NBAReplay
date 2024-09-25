const express = require("express");
const cors = require("cors");
const app = express();
const port = 3010;

//Setting up cors to allow other applications to use the api's
app.use(cors());

// Middleware
app.use(express.json());

// Import Routes
const nbaRoutes = require("./src/routes/nbaRoutes");

//  Use Routes
app.use("/api/nba", nbaRoutes);

//Homepage route
app.get("/", (req, res) => {
  res.send("Welcome to the NBA Game Data API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
