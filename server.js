const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const seedAll = require("./seeds");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced");
    return seedAll(); // Start seeding
  })
  .then(() => {
    console.log("Database seeded");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing/seeding database:", err);
  });
