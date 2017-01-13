'use strict';

var sh = require('shelljs');

var root = process.cwd();
var dir = 'external-repos';
sh.mkdir('-p', dir);

function getMdi() {
    console.log('Fetching Templarian Material Design Icons');
    sh.cd(dir);
    var repoDir = 'MaterialDesign';
    sh.rm('-rf', repoDir);
    sh.mkdir('-p', repoDir);
    sh.exec('git clone https://github.com/Templarian/MaterialDesign.git');
}

getMdi();
