#!/usr/bin/env node

//var http = require('http');
var proxy = require('http-proxy');

proxy.createServer(function(req, res, proxy) {
	
	var options = {
		target: req.headers.host
	};
	proxy.proxyRequest(req, res, options);
	
}).listen(8080);
