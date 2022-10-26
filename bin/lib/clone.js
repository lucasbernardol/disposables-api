const fileSystemAsync = require('node:fs/promises');

const { exec } = require('node:child_process');

const path = require('node:path');
const { promisify } = require('node:util');

const { statAsync, unix } = require('../utils');
const { _GIT_SUFFIX, _TMP_FOLDER } = require('../constants');

const execAsync = promisify(exec);

/**
 * Constants
 */

/**
 * Path: "/home/tmp/.git"
 */
const gitPath = (base) => path.join(base, _GIT_SUFFIX);

const mekeClonePath = (tmp, folder) => {
  //Example: /home/tmp/folder
  return path.resolve(__dirname, tmp, folder);
};

const makeTmpDir = async (path) => {
  const exists = statAsync(path);

  const mkdir = async () => {
    await fileSystemAsync.mkdir(path, { recursive: true });
  };

  return exists ? void 0 : mkdir();
};

const tmp = async () => makeTmpDir(path.resolve(__dirname, _TMP_FOLDER));

const renameFile = async (original, current) => {
  //wrapper
  const originalPath = await statAsync(original);

  if (originalPath) {
    // Rename file
    await fileSystemAsync.rename(original, current);
  }
};

const removeRepository = async (path) => {
  // rm -rf like
  await fileSystemAsync.rm(path, { force: true, recursive: true });
};

async function clone(url, clonePath) {
  // create "tmp" folder.
  await tmp();

  const { stderr, stdout } = await execAsync(`git clone ${url} ${clonePath}`);

  return { stderr, stdout };
}

async function cloneRepos(repos) {
  const repositories = [];

  for (const repo of repos) {
    const { fork, href, main, main_readable, author } = repo; /** object */

    const folder = unix().toString(); // unix to string.

    const pathname = mekeClonePath(_TMP_FOLDER, folder);

    // Clone repo
    await clone(href, pathname);

    // Rename main file
    await renameFile(
      path.join(pathname, main),
      path.join(pathname, main_readable)
    );

    // Clear repository
    const gitpath = gitPath(pathname);

    //console.log({ gitpath });

    await removeRepository(gitpath);

    repositories.push({
      fork,
      href,
      main,
      main_readable,
      author,
      folder,
      path: pathname,
      filename: path.join(pathname, main_readable),
    });
  }

  return repositories;
}

module.exports = {
  cloneRepos,
};
