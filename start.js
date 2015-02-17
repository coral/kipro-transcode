'use strict';

var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var child_process = require("child_process");


request('http://10.47.15.135/clips?action=get_playlists', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})

 

var x = request('http://10.47.15.135/media/RECORDING_12.mov');

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