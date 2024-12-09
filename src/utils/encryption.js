import CryptoJS from "crypto-js";

const secretKey = "9f319746a11b7d873a58f40f426667d29071aad64b79b4f1c49e127c79d18e58";  // Your secret key
// const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;


export const encryptData = (data) => {
	console.log("secretKey - ", secretKey);

	const jsonData = JSON.stringify(data);
	const ivGenerated = CryptoJS.lib.WordArray.random(16).toString();  // Generate a 16-byte IV

	// Encrypt data with AES and attach IV
	const ciphertext = CryptoJS.AES.encrypt(jsonData, secretKey, {
		iv: CryptoJS.enc.Hex.parse(ivGenerated)
	}).toString();

	return { secretIV: ivGenerated, encryptedData: ciphertext };
};







// const jsonData = JSON.stringify(data); // Convert object to JSON string
// const ciphertext = CryptoJS.AES.encrypt(jsonData, secretKey).toString();



// Decrypt data using CryptoJS AES
// export const decryptData = (encryptDataFormate) => {

// 	const { encryptedData, secretIV } = encryptDataFormate;

// 	// Convert the IV and secretKey back to WordArray
// 	const iv = CryptoJS.enc.Hex.parse(secretIV);
// 	const key = CryptoJS.enc.Utf8.parse(secretKey);

// 	// Decrypt the data
// 	const decrypted = CryptoJS.AES.decrypt(
// 		encryptedData, // Encrypted data
// 		key,           // Secret key
// 		{ iv: iv }     // Initialization Vector
// 	);

// 	// Parse the decrypted data from Utf8
// 	const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
// 	return JSON.parse(decryptedText); // Parse back to JSON
// };
