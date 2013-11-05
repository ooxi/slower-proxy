#!/usr/bin/env node

var http = require('http');
var proxy = require('http-proxy');

http.createServer(function(req, res) {
	proxy.proxyRequest(req, res);
}).listen(8080);
