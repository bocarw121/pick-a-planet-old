const http = require("http");

const app = require("./app");
const db = require("./util/database");

const PORT = process.env.PORT || 3000;

db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connected to the database");
  }
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});
