
const environment = process.env.ENVIRONMENT;
const config = {};

config.checkEnvironment = () => {
  return environment;
};

module.exports = config;
