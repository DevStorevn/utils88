let {
	request
} = require('./libs/requests.js');

let {
	gen_key,
	encrypt,
	decrypt,
	verify,
	signature
} = require('./libs/rsa.js');

let  {
    audio_write_wav,
    audio_read_wav,
    audio_concat_wav
} = require('./libs/audio.js');

let  {
    md5
} = require('./libs/md5.js');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generate_uuid() {
	let d = new Date();
  return `${d.getTime()}` + Math.random().toString().replace(".",'')
}

async function warning_notification(text, chat_id, token) {
  let data = await request(`https://api.telegram.org/bot${token}/sendMessage`,{
    text,
    chat_id,
  },  'POST', {'Content-Type': 'application/x-www-form-urlencoded'});
  return data;
}

module.exports = {
	md5,
	sleep,
	verify,
	request,
	gen_key,
	encrypt,
	decrypt,
	signature,
	generate_uuid,
	audio_write_wav,
    audio_read_wav,
    audio_concat_wav,
    warning_notification
}