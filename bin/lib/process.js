const fileSystem = require('node:fs');
const readline = require('node:readline');

const { cloneRepos } = require('./clone');
const { _SERIALIZER_JSON_ARCHIVE } = require('../constants');
const { JSONText } = require('../utils');

const readLineByLine = async function* ({ filename }) {
  const stream = fileSystem.createReadStream(filename);

  const readStream = readline.createInterface(stream);

  for await (const line of readStream) {
    yield line;
  }
};

async function main(resources) {
  const data = [];

  const repositories = await cloneRepos(resources);

  const processLines = (line) => {
    const isDomainIndex = data.findIndex(({ domain }) => {
      return domain === line;
    });

    if (isDomainIndex === -1) {
      data.push({ domain: line });
    }
  };

  // files
  for (const repository of repositories) {
    for await (line of readLineByLine(repository)) {
      processLines(line);
    }
  }

  await fileSystem.promises.writeFile(
    _SERIALIZER_JSON_ARCHIVE,
    JSONText(data),
    {
      encoding: 'utf-8',
    }
  );
}

module.exports = {
  main,
};
