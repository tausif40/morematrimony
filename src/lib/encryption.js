import CryptoJS from "crypto-js";

// const secretKey = "9f319746a11b7d873a58f40f426667d29071aad64b79b4f1c49e127c79d18e58";
const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;

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