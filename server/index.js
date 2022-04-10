const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use('/', function(req, res) {
  const content = fs.readFileSync('dist/pages/options.html', {encoding: 'utf-8'});
  res.send(content.replace(/(\<\/body\>)/, `<div id="${req.query.id}">test</div>$1`))
});

const server = app.listen(0, () => {
  console.log(`serve address: http://127.0.0.1:${server.address().port}`);
});