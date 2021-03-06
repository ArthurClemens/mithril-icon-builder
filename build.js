#! /usr/bin/env node

/**
 * Material UI Icon Builder
 * ========================
 *
 * Usage:
 *
 * node ./build.js --help
 *
 */
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Mustache = require('mustache');
var _ = require('lodash');
var glob = require('glob');
var mkdirp = require('mkdirp');
var async = require('async');
var template = fs.readFileSync(path.join(__dirname, './template/msvg.js'), {
    encoding: 'utf8'
});

const RENAME_FILTER_DEFAULT = './filters/rename/default';

const DEFAULT_OPTIONS = {
    glob: '/**/*.svg',
    renameFilter: RENAME_FILTER_DEFAULT
};

function parseArgs() {
    return require('yargs')
        .usage('Build Mithril components from SVG\'s.\nUsage: $0')
        .demand('output-dir')
            .describe('output-dir', 'Directory to output components')
        .demand('svg-dir')
            .describe('svg-dir', 'SVG directory')
        .describe('glob', 'Glob to match inside of --svg-dir. Default **/*.svg')
        .describe('rename-filter', 'Path to JS module used to rename destination filename and path. Default: ' + RENAME_FILTER_DEFAULT)
        .argv;
}

function main(options, cb) {
    var originalWrite; // todo, add wiston / other logging tool

    options = _.defaults(options, DEFAULT_OPTIONS);
    if (options.disable_log) { // disable console.log opt, used for tests.
        originalWrite = process.stdout.write;
        process.stdout.write = function() {};
    }

    rimraf.sync(options.outputDir); // Clean old files
    var dirs = fs.readdirSync(options.svgDir);

    var renameFilter = options.renameFilter;
    if (_.isString(renameFilter)) {
        renameFilter = require(renameFilter);
    }
    if (!_.isFunction(renameFilter)) {
        throw Error('renameFilter must be a function');
    }

    mkdirp(options.outputDir);
    var files = glob.sync(path.join(options.svgDir, options.glob));
    var cwd = process.cwd();
    var tasks = [];
    files.forEach(function(svgPath) {
        var svgPathObj = path.parse(svgPath);
        var innerPath = path.dirname(svgPath)
            .replace(options.svgDir, '')
            .replace(path.relative(cwd, options.svgDir), ''); // for relative dirs
        var destPath = renameFilter(svgPathObj, innerPath, options);
        tasks.push({
            svgPath: svgPath,
            destPath: destPath,
            options: options
        });
    });
    tasks.forEach(function(task) {
        processFile(task.svgPath, task.destPath, task.options);
    });

    if (cb) {
        cb();
    }

    if (options.disable_log) { // bring back stdout
        process.stdout.write = originalWrite;
    }
}

function cleanupSVG(svgString) {
    svgString = svgString.replace(/<!--.*-->/g, '');
    svgString = svgString.replace(/<!DOCTYPE.*?>/, '');
    svgString = svgString.replace(/<\?xml .*?>/, '');
    svgString = svgString.replace(/\n|\r|\t/g, ' ');
    svgString = svgString.replace(/\s+/g, ' ');
    svgString = svgString.replace(/>\s+</g, '><');
    svgString = svgString.replace(/\s+$/, '');
    svgString = svgString.replace(/^\s+/, '');
    return svgString;
}

/*
 * @param {string} svgPath
 * Absolute path to svg file to process.
 *
 * @param {string} destPath
 * Path to js file relative to {options.outputDir}
 *
 * @param {object} options
 */
function processFile(svgPath, destPath, options) {
    var outputDirJs = options.outputDir + '/msvg';
    var outputFileDirJs = path.dirname(path.join(outputDirJs, destPath));
    if (!fs.existsSync(outputFileDirJs)) {
        mkdirp.sync(outputFileDirJs);
    }

    processFileString(svgPath, destPath, outputDirJs, options);
}


/**
 * Return Pascal-Cased classname.
 *
 * @param {string} svgPath
 * @returns {string} class name
 */
function pascalCase(destPath) {
    var splitregex = new RegExp('[' + path.sep + '-]+');
    var parts = destPath.replace('.js', '').split(splitregex);
    parts = _.map(parts, function(part) {
        return part.charAt(0).toUpperCase() + part.substring(1);
    });
    var className = parts.join('');
    return className;
}

function processFileString(svgPath, destPath, outputDirJs, options) {
    var className = pascalCase(destPath);
    var data = fs.readFileSync(svgPath, {
        encoding: 'utf8'
    });

    var svgData = cleanupSVG(data);

    var fileString = Mustache.render(
        template, {
            svg: svgData
        }
    );
    var absDestPathJs = path.join(outputDirJs, destPath);
    fs.writeFileSync(absDestPathJs, fileString);

    // write SVG file with cleaned data
    var outputDirSvg = options.outputDir + '/svg';
    var destPathSvg = destPath.replace(/.js$/, '.svg');
    var outputFileDirSvg = path.dirname(path.join(outputDirSvg, destPathSvg));
    if (!fs.existsSync(outputFileDirSvg)) {
        mkdirp.sync(outputFileDirSvg);
    }
    var absDestPathSvg = path.join(outputDirSvg, destPathSvg);
    fs.writeFileSync(absDestPathSvg, svgData);
}

if (require.main === module) {
    var argv = parseArgs();
    main(argv);
}

module.exports = {
    pascalCase: pascalCase,
    processFileString: processFileString,
    processFile: processFile,
    main: main,
    RENAME_FILTER_DEFAULT: RENAME_FILTER_DEFAULT
};
