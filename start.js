'use strict';

var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var mkdirp = require('mkdirp');
var KiPro = require("kipro").KiPro;

var kipro = new KiPro("10.47.15.135");

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
						kipro.getMedia(clip.clipname, directory + newDate + '/' + clip.clipname, function(file, location) {
							console.log(file, location);
							//Add to transcode queue
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
/*
kipro.getMedia("RECORDING_1.mov", "test.mov", function(file, location) {
	console.log(file, location)
});
/*
 kipro.getMedia("RECORDING_1.mov", "test.mov", function(file, location) {
						console.log(file, location)
					});
/*
request('http://10.47.15.135/clips?action=get_playlists', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})

 */

//var x = request('http://10.47.15.135/media/RECORDING_12.mov');

/*
	console.log("ok");

var ffmpeg = child_process.spawn("ffmpeg",[
            "-i", x.pipe(x),             // path
            "-vcodec" , "libx264",         // bitrate to 64k
            "-preset", "fast", 
            "-acodec", "libfaac",
            "-b:v", "4000k",
            "-movflags", "faststart",
            "test.mp4"                     // Output to STDOUT
    ]);


ffmpeg.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ffmpeg.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ffmpeg.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

*/