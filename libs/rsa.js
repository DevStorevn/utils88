var crypto = require("crypto");
function gen_key(prime_length = 512){
	var diffHell = crypto.createDiffieHellman(prime_length);
	diffHell.generateKeys('base64');
	return {
		publicKey: diffHell.getPublicKey('base64'),
		privateKey: diffHell.getPrivateKey('base64')
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

module.exports = {
  gen_key,
  encrypt,
  decrypt
}