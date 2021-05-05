const http = require("http");
const enforce = require("express-sslify");

const app = require("./app");
const { connectDatabase } = require("./util/database");

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
