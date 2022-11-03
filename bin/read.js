const fs = require("node:fs");
const process = require("node:process");

const { join } = require("node:path");
const readline = require("node:readline");

const { setTimeout } = require("node:timers/promises");

const _CWD = process.cwd();

(async () => {
  const readerStrem = fs.createReadStream(join(_CWD, "file.txt"));

  const linesInterface = readline.createInterface(readerStrem);

  for await (const line of linesInterface) {
    console.log(line);

    await setTimeout(300);
  }
})();
