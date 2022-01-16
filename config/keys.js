if (process.env.NODE_ENV === 'production') {
  // production case
  module.exports = require('./prod')
} else {
  // dev case
  module.exports = require('./dev');

}