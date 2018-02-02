const Promise = require('bluebird');
var exec = require('child_process').exec;

// 5%+ speaker volume up
module.exports = function micUp(){
    exec('amixer set Headset 5%+', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}