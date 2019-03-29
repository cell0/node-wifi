var exec = require('child_process').exec;
var env = require('./env');
var escapeInputForShell = require('./shell-utils').escapeInputForShell;

function disconnect (config, callback) {
  var commandStr = "nmcli device disconnect" ;

  if (config.iface) {
      commandStr += " " + escapeInputForShell(config.iface);
  }
  
  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });

}

module.exports = function (config) {

    return function(callback) {
      if (callback) {
        disconnect(config, callback);
      } else {
        return new Promise(function (resolve, reject) {
          disconnect(config, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        })
      }
    }
}
