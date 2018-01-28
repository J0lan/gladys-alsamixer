const Promise = require('bluebird');
var exec = require('child_process').exec;

// 5%+ speaker volume up
module.exports = function speakerUp(){
		
		exec('amixer set PCM 5%+', function(error, stdout, stderr) {
            console.log('stdout: ', stdout);
            console.log('stderr: ', stderr);
            if (error !== null) {
                console.log('exec error: ', error);
            }
        });
    }
// %5- speaker volume down
module.exports = function speakerDown(){
		
    exec('amixer set PCM 5%-', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}
// speaker %percent sent by user
module.exports = function speaker(){
		
    exec('amixer set PCM %percent%%', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}
// 5%+ mic volume up
module.exports = function micUp(){
		
    exec('amixer set Headset 5%-', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}
// 5%- mic volume down
module.exports = function micDown(){
		
    exec('amixer set PCM 5%-', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}
// mic %percent sent by user
module.exports = function mic(){
		
    exec('amixer set Headset %percent%%', function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
    });
}

module.exports = function exec(scope) {
	
    switch(scope.label) {
        case 'speaker-up':
            speakerUp();
        break;
    
        case 'speaker-down':
            speakerDown();
        break;
            
        case 'speaker':
            speaker();
        break;
    
        case 'mic-up':
            micUp();
        break;
            
        case 'mic-down':
            micDown();
        break;

        case 'mic':
            mic();
        break;
    
        default:

        break;
    }
};