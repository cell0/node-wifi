var escapeInputForShell = function (input) {
    return `'${input.replace(/'/g, `'\\''`)}'`;
};

exports.escapeInputForShell = escapeInputForShell;
