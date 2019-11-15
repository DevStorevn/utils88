var crypto = require("crypto");
var Crypt = require('hybrid-crypto-js').Crypt;
const NodeRSA = require('node-rsa');
function gen_key(prime_length = 512){
	const keygen = new NodeRSA({b: prime_length});
	return {
		publicKey: keygen.exportKey('public'),
		privateKey: keygen.exportKey('private')
	}
}
var encrypt = function(toEncrypt, publicKey) {
	var buffer = new Buffer(toEncrypt);
	var encrypted = crypto.publicEncrypt(publicKey, buffer);
	return encrypted.toString("base64");
};
var decrypt = function(toDecrypt, privateKey) {
	var buffer = new Buffer(toDecrypt, "base64");
	var decrypted = crypto.privateDecrypt(privateKey, buffer);
	return decrypted.toString("utf8");
};

var verify = function(publicKey, signature_data, text) {
	const cr = new Crypt();
	return cr.verify(publicKey, signature_data , text);
};

var signature = function(privateKey, text) {
	const cr = new Crypt();
	return cr.signature(privateKey, text)
};

module.exports = {
	verify,
	gen_key,
	encrypt,
	decrypt,
	signature
}