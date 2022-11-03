const fileSystemAsync = require("node:fs/promises");
//const { which } = require("shelljs");

const spawn = require("./spawn");

const _DECIMAL = 10;
const _FOLDER = "repository";

const repository = async () => {
  const { stdout } = await spawn("git", [
    "clone",
    "https://gist.github.com/8710649.git",
    _FOLDER,
  ]);

  return { stdout };
};

const replacer = (text) => text.replace(/(?<replacer>[a-zA-Z|\n|\r])/gi, "");

(async () => {
  //console.log(which("node"));

  await fileSystemAsync.rm(_FOLDER, {
    force: true,
    recursive: true,
  });

  const { stdout } = await spawn("node", ["--version"]);

  const version = replacer(stdout);

  console.log({
    version,
  });
})();
