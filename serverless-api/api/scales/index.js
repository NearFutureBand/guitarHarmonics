const url = require('url');
const SCALES = require('../../data/scales.json');

/**
 * params: {
 *    scaleId | null
 * }
 */
module.exports = async (req, res) => {
  const params = url.parse(req.url, true).query;
  console.log(params);
  const result = params.scale ? SCALES[params.scale] : SCALES;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}