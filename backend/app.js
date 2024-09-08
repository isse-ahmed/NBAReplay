const express = require("express");
const db = require(`.src/config/db`);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Import Routes
//const nbaRoutes = require(".src/routes/nbaRoutes");

//  Use Routes
app.use("/api/nba", nbaRoutes);

//Homepage route
app.get("/", (req, res) => {
  res.send("Welcome to the NBA Game Data API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
