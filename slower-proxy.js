#!/usr/bin/env node

var argv = require('optimist')
	.default('latency', 0).describe('latency', 'Connection setup latency in ms')
	.default('bandwidth', Infinity).describe('bandwidth', 'Connection bandwidth in byte/sec')
.argv;

var proxy = require('http-proxy');
var stream = require('stream');
var throttle = require('throttle');
var url = require('url');





proxy.createServer(function(frontendRequest, frontendResponse, proxy) {
	
	var target = url.parse(frontendRequest.url);
	
	var options = {
		host:	target.hostname,
		port:	target.port ? target.port : 80
	};
	frontendRequest.url = target.path;
	console.log('Will proxy `'+ frontendRequest.url +'\' at `'+ options.host +'\':`'+ options.port +'\'');
	
	setTimeout(function() {
		var backendResponse = new stream.Writable();
		
		backendResponse.setHeader = function() {
			frontendResponse.setHeader.apply(frontendResponse, arguments);
		};
		backendResponse.writeHead = function() {
			frontendResponse.writeHead.apply(frontendResponse, arguments);
		};
		backendResponse._write = function(chunk, encoding, callback) {
			console.log('_write', arguments);
			callback();
		};
		
		var end = backendResponse.end;
		backendResponse.end = function() {
			console.log('end');
			end.apply(backendResponse, arguments);
			frontendResponse.end();
		};
		
		proxy.proxyRequest(frontendRequest, backendResponse, options);
	}, argv.latency);
	
	
}).listen(8080);
