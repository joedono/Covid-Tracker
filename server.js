var express = require("express");
var path = require("path");

var app = express();
var distDir = __dirname + "/dist";
app.use(express.static(distDir));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 3000);
