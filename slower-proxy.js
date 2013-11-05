#!/usr/bin/env node

//var http = require('http');
var proxy = require('http-proxy');

proxy.createServer(function(req, res, proxy) {
	
	var host = req.headers.host;
	var colon = host.lastIndexOf(':');
	
	var options = {
		host: -1 === colon ? host : host.substr(0, colon),
		port: -1 === colon ? 80 : parseInt(host.substr(colon))
	};
	console.log(options);
	
	proxy.proxyRequest(req, res, options);
	
}).listen(8080);
