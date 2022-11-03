const { spawn } = require("node:child_process");

const fs = require("node:fs");
const { rm } = require("node:fs/promises");

const BufferListStream = require("bl");

/**
 * Error
 */
const SpawnError = require("./exceptions/SpawnError");

// const other = spawn("git", [
//   "clone",
//   "https://github.com/lucasbernardol/instagram-clone.git",
//   "x",
//   "--progress",
// ]);
const isClosdWithCompleted = (code) => code === 0;

const streamToString = (stream) => stream.toString("utf-8");

const streamsToString = (stream, rightStream) => {
  const hasLeftContent = stream.length >= 1;

  return hasLeftContent ? streamToString(stream) : streamToString(rightStream);
};

const mapper = (name, events) => {
  return events.map(([_process, buffer]) => {
    return {
      name,
      process: _process,
      buffer,
    };
  });
};

const mapperEvents = async (event, array) => {
  return new Promise((resolve, reject) => {
    try {
      const events = mapper(event, array);

      return resolve(events);
    } catch (error) {
      return reject(error);
    }
  });
};

const spawnEvents = async (event, map) => {
  const events = await mapperEvents(event, map);

  function attach(events, callback) {
    try {
      for (const event of events) {
        const { name, buffer, process: _process } = event;

        _process.on(name, (chuck) => {
          return buffer.append(chuck);
        });
      }

      return callback(null, true);
    } catch (error) {
      // with error
      return callback(error, false);
    }
  }

  return new Promise((resolve, reject) => {
    return attach(events, (_error, stats) => {
      return stats ? resolve(stats) : reject(_error, stats);
    });
  });
};

const spawnAsync = async (command, args) => {
  const _stdout = BufferListStream();

  const _stderr = BufferListStream();

  const subprocess = spawn(command, args); /** spawn events */

  await spawnEvents("data", [
    [subprocess.stdout, _stdout],
    [subprocess.stderr, _stderr],
  ]);

  const callback = (resolve, reject) => {
    function completed({ code, subprocess, _stderr, _stdout }) {
      return {
        stdout: streamsToString(_stdout, _stderr),
        code,
        spawn: {
          process: subprocess,
          _output: !_stdout.length ? _stderr : _stdout,
          _stderr,
          _stdout,
        },
      };
    }

    const onError = (error) => reject(error); /** spwan errros */

    const onClose = (code) => {
      const closeWithoutError = isClosdWithCompleted(code);

      const resolveWithoutError = () => {
        return resolve(completed({ code, subprocess, _stderr, _stdout }));
      };

      const rejectWithError = () => {
        return reject(SpawnError({ message: streamToString(_stderr), code }));
      };

      return closeWithoutError ? resolveWithoutError() : rejectWithError();
    };

    subprocess.on("error", (error) => onError(error));
    subprocess.on("close", (code) => onClose(code));
  };

  return new Promise(callback);
};

/*
(async () => {
  try {
    await rm("dir", {
      recursive: true,
      force: true,
    });

    //const { stdout, code, spawn } = await spawnAsync("node", ["-v"]);
    
        const { stdout, code, spawn } = await spawnAsync("git", [
      "clone",
      "https://github.com/lucasbernardol/instagram-clone.git",
      "dir",
      // "--depth",
      "--progress",
    ]); 

    // White file with "_std" stream
    const writter = fs.createWriteStream("file.txt", {
      flags: "a+",
    });

    // Pipeline
    spawn._output.pipe(writter);

    console.log({ stdout, code });
  } catch (error) {
    console.error("__error__", error);
  }
})();
*/

module.exports = spawnAsync;
