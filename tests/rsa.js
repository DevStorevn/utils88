let {
	gen_key,
	encrypt,
	decrypt,
	verify,
	signature
} = require('../libs/rsa.js');

(async function() { 
	let jdata = await gen_key(512);
	let data_sign = signature(jdata.privateKey, 'nguyencuong');
	console.log('data_sign', data_sign, verify(jdata.publicKey, data_sign, 'nguyencuong'))
	console.log('encrypt', encrypt(jdata.publicKey, 'xin chao'), decrypt(jdata.privateKey, encrypt(jdata.publicKey, 'xin chao')))
})().then(() => {
    process.exit();
});  