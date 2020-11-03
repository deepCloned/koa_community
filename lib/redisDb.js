const redis = require('redis');
const client = redis.createClient({
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});

client.on('error', err => {
  console.error(err);
});

client.on('connect', () => {
  console.info('Connect to redis is ok!!!');
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const setRedisValue = (key, val, exprires) => {
  // if val is null or undefined or '', do nothing
  if (typeof val === 'undefined' || val === null || val === '') {
    return
  }
  if (typeof val === 'object') {
    Object.keys(val).forEach(prop => {
      client.hmset(key, prop, val[prop], redis.print);
    })
  } else {
    client.set(key, val, redis.print);
    if (typeof exprires !== 'undefined') {
      client.expire(key, exprires)
    }
  }
};

const getRedisValue = key => {
  return getAsync(key);
};

module.exports = {
  setRedisValue,
  getRedisValue,
  client,
};
