import CryptoJS from "crypto-js";

const secretKey = "9f319746a11b7d873a58f40f426667d29071aad64b79b4f1c49e127c79d18e58";
// const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
// const generateIV = () => CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);


// export const encryptData = (data) => {
// 	const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
// 	return encryptedData;
// };

// Encryption function
export const encryptData = (data) => {
	const stringData = JSON.stringify(data);
	return CryptoJS.AES.encrypt(stringData, secretKey).toString();
};

// Decryption function
export const decryptData = (encryptedData) => {
	const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// export const encryptData = (data) => {
// 	const iv = generateIV();
// 	const key = CryptoJS.enc.Hex.parse(AES_SECRET_KEY);
// 	// Convert CryptoJS key to a Node.js Buffer
// 	const keyBuffer = Buffer.from(key.toString(CryptoJS.enc.Hex), 'hex');

// 	console.log("keyBuffer - ", keyBuffer); // Logs the Buffer representation of the key

// 	const ivHex = CryptoJS.enc.Hex.parse(iv);

// 	const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
// 		iv: ivHex,
// 		mode: CryptoJS.mode.CBC,
// 		padding: CryptoJS.pad.Pkcs7,
// 	}).toString();

// 	return { encryptedData: encrypted, secretIV: iv };
// };
