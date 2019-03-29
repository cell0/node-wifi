var exec = require('child_process').exec;
var util = require('util');
var escapeInputForShell = require('./shell-utils').escapeInputForShell;
var env = require('./env');

function connectToWifi(config, ap, callback) {
  var commandStr = "nmcli -w 10 device wifi connect " + escapeInputForShell(ap.ssid) +
      " password " + escapeInputForShell(ap.password);

  if (config.iface) {
    commandStr += " ifname " + escapeInputForShell(config.iface);
  }

  exec(commandStr, env, function (err, resp) {
    // Errors from nmcli came from stdout, we test presence of 'Error: ' string
    if (resp.includes('Error: ')) {
      err = new Error(resp.replace('Error: ', ''));
    }
    callback && callback(err);
  });
}

module.exports = function (config) {

  return function (ap, callback) {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise(function (resolve, reject) {
        connectToWifi(config, ap, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    }
  }
}