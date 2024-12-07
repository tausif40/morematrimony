import CryptoJS from 'crypto-js';

const encryptionKey = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_ENCRYPTION_KEY);
// const encryptionMethod = process.env.REACT_APP_ENCRYPTION_METHOD;
const IV_LENGTH = 16;

export function encryptData(text) {
	console.log("encryptionKey - ", encryptionKey);
	try {
		const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

		const encrypted = CryptoJS.AES.encrypt(text, encryptionKey, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
	} catch (error) {
		console.error("Encryption error:", error.message);
		throw error;
	}
}

export function decryptData(encryptedText) {
	try {
		const [ ivHex, cipherTextHex ] = encryptedText.split(':');
		if (!ivHex || !cipherTextHex) {
			throw new Error('Invalid encrypted text format');
		}
		const iv = CryptoJS.enc.Hex.parse(ivHex);
		const cipherText = CryptoJS.enc.Hex.parse(cipherTextHex);
		const decrypted = CryptoJS.AES.decrypt(
			{ ciphertext: cipherText },
			encryptionKey,
			{
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			}
		);
		return decrypted.toString(CryptoJS.enc.Utf8);
	} catch (error) {
		console.error("Decryption error:", error.message);
		throw error;
	}
}
