#!/usr/bin/env node

//var http = require('http');
var proxy = require('http-proxy');
var url = require('url');

proxy.createServer(function(req, res, proxy) {
	
	var target = url.parse(req.url);
	
	var options = {
		host:	target.hostname,
		port:	target.port
	};
	req.url = target.path;
	console.log('Will proxy `'+ req.url +'\' at `'+ options.host +'\':`'+ options.port +'\'');
	
	proxy.proxyRequest(req, res, options);
	
}).listen(8080);
