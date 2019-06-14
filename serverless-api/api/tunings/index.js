const url = require('url');

const tunings = require('../../data/tunings.json');


module.exports = async (req, res) => {
  const { id } = url.parse(req.url, true).query;
  let result = id? tunings[id] : tunings;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}