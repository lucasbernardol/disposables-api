const process = require('node:process');
const path = require('node:path');

const cwd = process.cwd();

// Contants
const _JSON_ARCHIVE = 'gists.json';
const _TMP = 'tmp';

const _GIT_SUFFIX = '.git';

const _SERIALIZER_JSON_ARCHIVE = path.resolve(cwd, _JSON_ARCHIVE);
const _TMP_FOLDER = path.resolve(cwd, _TMP);

module.exports = {
  _SERIALIZER_JSON_ARCHIVE,
  _JSON_ARCHIVE,
  _TMP_FOLDER,
  _GIT_SUFFIX,
};
