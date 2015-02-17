"use strict";

var events = require("events");
var _ = require("underscore");
var ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

var transcoderQueue = [];
var activeTranscodes = 0;
var maxConcurrentTranscodes = 1;


function Transcoder () {

}

Transcoder.prototype.addToQueue = function (source, destination, cb) {

	transcoderQueue.push({source: source, destination: destination, callb: cb});	

}

Transcoder.prototype.run = function()
{

	if(transcoderQueue.length > 0)
	{
		if(activeTranscodes < maxConcurrentTranscodes)
		{
			Transcoder.prototype.transcode(transcoderQueue.pop());
			console.log("Started Transcode");
		}
	} 
	
}

Transcoder.prototype.transcode = function (data, cb)
{
	activeTranscodes++;
	ffmpeg(data.source)
	.videoCodec('libx264')
	.audioCodec('libfaac')
	.videoBitrate('4000k')
	.audioBitrate('320k')
	.inputOptions('-preset fast')
	.on('end', function() {
		activeTranscodes--;
		Transcoder.prototype.run();
	})
	.save(data.destination);
}


exports.Transcoder = Transcoder