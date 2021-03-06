const url = require('url');
const { findHarmonic } = require('../../controllers/index');

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}