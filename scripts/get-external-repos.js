'use strict';

const sh = require('shelljs');
const http = require('http');
const fs = require('fs');
const AdmZip = require('adm-zip');

const root = process.cwd();
const dir = 'external-repos';
sh.mkdir('-p', dir);

const getMdi = () => {
  console.log('Fetching Templarian Material Design Icons');
  sh.cd(root);
  sh.cd(dir);
  const repoDir = 'MaterialDesign';
  sh.rm('-rf', repoDir);
  sh.mkdir('-p', repoDir);
  sh.exec('git clone https://github.com/Templarian/MaterialDesign.git');
}

const getZondicons = () => {
  console.log('Fetching Zondicons');
  sh.cd(root);
  sh.cd(dir);
  const repoDir = 'Zondicons';
  sh.rm('-rf', repoDir);
  sh.mkdir('-p', repoDir);
  
  const downloadZip = function(filename, url) {
    const tmpFilePath = "/tmp/" + filename + ".zip"
    http.get(url, function(response) {
      response.on('data', function(data) {
        fs.appendFileSync(tmpFilePath, data)
      });
      response.on('end', function() {
        const zip = new AdmZip(tmpFilePath)
        zip.extractAllTo(repoDir + "/" + filename)
        fs.unlink(tmpFilePath, function() {
          //
        })
      })
    });
  }
  downloadZip("zondicons", "http://www.zondicons.com/zondicons.zip");
}

getMdi();
getZondicons();