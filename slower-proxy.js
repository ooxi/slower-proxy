#!/usr/bin/env node

//var http = require('http');
var proxy = require('http-proxy');

proxy.createServer(function(req, res, proxy) {
	
	proxy.proxyRequest(req, res);
	
}).listen(8080);
