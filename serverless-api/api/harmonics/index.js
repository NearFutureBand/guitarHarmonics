const url = require('url');
const { findHarmonic } = require('../functions');

/**
 * params: {
 *    root,
 *    scale
 * }
 */
module.exports = async (req, res) => {
  const params = url.parse(req.url, true).query;
  console.log(params);
  const result = findHarmonic(params);
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}