var escapeInputForShell = function (input) {
    return '"' + input.replace(/(["'$`\\])/g, '\\$1') + '"';
};

exports.escapeInputForShell = escapeInputForShell;
