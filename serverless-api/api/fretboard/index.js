const url = require('url');
const { createFretMatrix } = require('../functions');

module.exports = async (req, res) => {
  const params = url.parse(req.url, true).query;
  console.log(params);
  const result = createFretMatrix(params);
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}