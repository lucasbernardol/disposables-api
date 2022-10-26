const fileSystem = require('node:fs');

const _UNIX_TIMESTAMP_UNIT = 1000;

/**
 * Check if "exists" files/dirs
 */
const statAsync = (path) => {
  return new Promise((resolve, reject) => {
    fileSystem.stat(path, (error, stats) => {
      return error ? resolve(false) : resolve(true);
    });
  });
};

/**
 * Current timestamp (unix format).
 */
const unix = () => {
  const timestamp = Date.now() / _UNIX_TIMESTAMP_UNIT;

  return Math.floor(timestamp);
};

const JSONText = (json) => {
  return JSON.stringify(json);
};

module.exports = { statAsync, unix, JSONText };
