'use strict';

var sh = require('shelljs');

var root = sh.pwd();
var dir = 'external-repos';
sh.mkdir('-p', dir);

function getMdi() {
    console.log('Fetching Templarian Material Design Icons');
    sh.cd(dir);
    var repoDir = 'MaterialDesign';
    sh.rm('-rf', repoDir);
    sh.mkdir('-p', repoDir);
    sh.exec('git clone git://github.com/Templarian/MaterialDesign');
}

getMdi();
