'use strict';

var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var mkdirp = require('mkdirp');
var KiPro = require("kipro").KiPro;
var Transcoder = require("./transcode.js").Transcoder;

var kipro = new KiPro("10.47.15.135");
var transcoder = new Transcoder();

var directory = '';

kipro.getClips(function(clips){

	var cliplist = clips;

	_.each(clips.clips, function(clip) {

		var timestamp = new Date(clip.timestamp);
		var newDate = "" + timestamp.getFullYear()  + numPad0(timestamp.getMonth()+1) + timestamp.getDate();


		mkdirp(directory + newDate, function (err) {
			if (err){
				console.error(err);
			} else {
				fs.exists(directory + newDate + '/' + clip.clipname, function(exists) {
					if(!exists)
					{
						kipro.getMedia(clip.clipname, directory + newDate + '/' + clip.clipname, function(status, location, file) {
							transcoder.addToQueue(location, directory + newDate + '/' + file.slice(0, -3) + "mp4");
							transcoder.run();
						});
				   	}
				});
			}
		});

	});

});

function numPad0( str ){
	var cStr = str.toString();
	if( cStr.length < 2 ){
		 str = 0 + cStr;
	}
	return str;
}