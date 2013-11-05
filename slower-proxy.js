#!/usr/bin/env node

var argv = require('optimist')
	.default('latency', 0).describe('latency', 'Connection setup latency in ms')
	.default('bandwidth', Infinity).describe('bandwidth', 'Connection bandwidth in byte/sec')
.argv;

var proxy = require('http-proxy');
var throttle = require('throttle');
var url = require('url');

proxy.createServer(function(req, res, proxy) {
	
	var target = url.parse(req.url);
	
	var options = {
		host:	target.hostname,
		port:	target.port ? target.port : 80
	};
	req.url = target.path;
	console.log('Will proxy `'+ req.url +'\' at `'+ options.host +'\':`'+ options.port +'\'');
	
	setTimeout(function() {
		proxy.proxyRequest(req, res, options);
	}, argv.latency);
	
	
}).listen(8080);
