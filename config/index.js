/********************************************************************
 Default Settings, will be overridden by any environment specific
 settings.
 ********************************************************************/
var nconf = require('nconf');
var path  = require('path');

// load command line args and environment variables.
nconf.argv().env();

// set a default environment.
var env = process.env['MODUSCREATE_NODE_ENV'] || 'development';

// Default to the environment variable config.
// Note usually you want to use a  a .env
// don't use the environment json file.
nconf.defaults({
  log: {
    level: 'debug',
    file: path.join(process.cwd(), 'logs', env + '.log')
  },
  nhtsa: {
    url: "https://one.nhtsa.gov/webapi/api/SafetyRatings"
  },
  port: 8888
});


module.exports = nconf;
