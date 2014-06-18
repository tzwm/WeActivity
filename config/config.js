var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');


module.exports = {
  development: {
    db: 'mongodb://localhost/we_activity',
    root: rootPath,
    app: {
      name: 'WeActivity'
    },
    domain: '192.168.1.233',
    port: 2333
  },
  production: {}
};
