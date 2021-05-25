const enforce = require("express-sslify");

const enforceHttps = enforce.HTTPS({
  trustProtoHeader: true,
});

module.exports = {
  enforceHttps,
};
