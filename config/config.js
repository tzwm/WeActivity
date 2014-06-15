var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');


module.exports = {
  development: {
    db: 'mongodb://localhost/we_activity',
    root: rootPath,
    app: {
      name: 'WeActivity'
    },
    port: 4444 
  },
  production: {}
};
