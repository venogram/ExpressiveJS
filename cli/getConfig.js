const fs = require('fs');
const path = require('path');

function getConfig(directory, dirQueue = []) {
  const allFiles = fs.readdirSync(directory);
  const files = [];
  allFiles.forEach(fileName => {
    const absPath = path.join(directory, fileName);
    fs.lstatSync(absPath).isDirectory() ? dirQueue.push(absPath) : files.push(absPath);
  });
  let userConfig = null;
  let configPath = null;
  files.forEach(path => {
    if (path.slice(-20) === 'expressive.config.js') {
      configPath = path;
      userConfig = require(path);
    }
  });
  if (!dirQueue.length || userConfig) {
    return { userConfig, configPath };
  }

  const nextDir = dirQueue.shift();
  return getConfig(nextDir, dirQueue);
}

module.exports = getConfig;
