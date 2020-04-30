var express = require("express");

var app = express();
appvar distDir = __dirname + "/dist/";
app.use(express.static(distDir));
