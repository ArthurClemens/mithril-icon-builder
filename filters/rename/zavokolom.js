function defaultDestRewriter(pathObj, innerPath, options) {
    var path = require('path');
    var fileName = pathObj.base;
    if (options.fileSuffix) {
        fileName.replace(options.fileSuffix, '.svg');
    } else {
        fileName = fileName.replace('.svg', '.js');
    }
    innerPath = innerPath.replace(/-/g, '');
    innerPath = innerPath.replace(/\./g, '_');
    innerPath = innerPath.replace(/\s+/g, '_');

    fileName = fileName.replace(/_/g, '-');
    return path.join(innerPath, fileName);
}

module.exports = defaultDestRewriter;
