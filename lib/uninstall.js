const Promise = require('bluebird');
var sentences = require('./sentences.js');
var answers = require('./answers.js');
var shared = require('./shared.js');

function deleteParam(param){
   
	return gladys.param.delete(param)
		 .then(() => {
			 sails.log.info('Alsamixer: Param deleted !')
			 return Promise.resolve();
		 })
		 .catch((err) => {
			 sails.log.error(`Alsamixer: Error when deleting param: ${err}`)
			 return Promise.reject()
		 })
 }
module.exports = function uninstall(){

	var boxIdent = { id: shared.boxIdent }

	gladys.boxType.delete(boxIdent)

	gladys.param.delete({name: 'gladysSpeakerName'});
	gladys.param.delete({name: 'gladysMicrophoneName'});

	return gladys.utils.sql('select language from user where 1').then(function(lang){
		if(lang[0].language!='fr-FR')
			return gladys.utils.sql('DELETE FROM sentence WHERE uuid in (?,?,?,?,?,?,?)', [sentences.sentenceSpeakerUPEn.sentences[0].uuid, sentences.sentenceSpeakerDOWNEn.sentences[0].uuid, sentences.sentenceMicUPEn.sentences[0].uuid, sentences.sentenceMicDOWNEn.sentences[0].uuid, sentences.sentenceSpeakerPercentEn.sentences[0].uuid, sentences.sentenceMicPercentEn.sentences[0].uuid, sentences.sentenceMicMuteEn.sentences[0].uuid])
			.then(() => gladys.utils.sql('DELETE FROM answer WHERE uuid in (?,?,?,?,?,?,?)', [answers.answerSpeakerUPEn.answers[0].uuid, answers.answerSpeakerDOWNEn.answers[0].uuid, answers.answerMicUPEn.answers[0].uuid, answers.answerMicDOWNEn.answers[0].uuid, answers.answerSpeakerPercentEn.answers[0].uuid, answers.answerMicPercentEn.answers[0].uuid, answers.answerMicMuteEn.answers[0].uuid]));
		else
			return gladys.utils.sql('DELETE FROM sentence WHERE uuid in (?,?,?,?,?,?,?)', [sentences.sentenceSpeakerUPFr.sentences[0].uuid, sentences.sentenceSpeakerDOWNFr.sentences[0].uuid, sentences.sentenceMicUPFr.sentences[0].uuid, sentences.sentenceMicDOWNFr.sentences[0].uuid, sentences.sentenceSpeakerPercentFr.sentences[0].uuid, sentences.sentenceMicPercentFr.sentences[0].uuid, sentences.sentenceMicMuteFr.sentences[0].uuid])
			.then(() => gladys.utils.sql('DELETE FROM answer WHERE uuid in (?,?,?,?,?,?,?)', [answers.answerSpeakerUPFr.responses[0].uuid, answers.answerSpeakerDOWNFr.responses[0].uuid, answers.answerMicUPFr.responses[0].uuid, answers.answerMicDOWNFr.responses[0].uuid, answers.answerSpeakerPercentFr.responses[0].uuid, answers.answerMicPercentFr.responses[0].uuid, answers.answerMicMuteFr.responses[0].uuid]));
	})
	.then(() => {
		gladys.device.getByService({'service':'alsamixer'})
		.then((devices) => {
			devices.forEach(function(device) {
				gladys.device.delete(device)
			})
		})
	})
	.then(() => {
		deleteParam()
	})
	.then(() => {;
		gladys.brain.trainNew()
		sails.log.info('Alsamixer : Module uninstalled');
		return Promise.resolve();
	})
};
