class SpawnError extends Error {
  code = 1;

  constructor({ message, code }) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 *
 * @param {String} message Custom `ERROR` message.
 * @returns
 */
const spawnError = (message) => {
  return new SpawnError(message);
};

module.exports = spawnError;
exports.SpawnError = SpawnError;
