const url = require('url');

const tunings = require('./tunings.json');


module.exports = async (req, res) => {
  const { id } = url.parse(req.url, true).query;
  let result = id? tunings[id] : tunings;
  res.writeHead(200, 'Content-Type', 'application/json');
  res.end( JSON.stringify(result) );
}