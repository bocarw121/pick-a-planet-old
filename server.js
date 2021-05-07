const http = require("http");
const enforce = require("express-sslify");

const { connectDatabase } = require("./services/database");

const app = require("./app");

const PORT = process.env.PORT || 3000;

connectDatabase();

const server = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(
    enforce.HTTPS({
      trustProtoHeader: true,
    })
  );
}

server.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});
