module.exports = {
  apps: [
    {
      name: "pick-a-panet",
      script: "./server.js",
      instances: "max",
      node_args: "-r dotenv/config",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
