import CryptoJS from "crypto-js";

// Secret key for encryption and decryption
const secretKey = "your-secret-key";

// Utility functions
const encryptData = (data) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (ciphertext) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Redux middleware
const encryptionMiddleware = (store) => (next) => (action) => {
	if (action.encrypt) {
		// Encrypt payload before dispatching
		const encryptedPayload = encryptData(action.payload);
		const encryptedAction = {
			...action,
			payload: encryptedPayload,
			encrypt: false, // Remove encryption flag after processing
		};
		return next(encryptedAction);
	} else if (action.decrypt) {
		// Decrypt payload before handling
		const decryptedPayload = decryptData(action.payload);
		const decryptedAction = {
			...action,
			payload: decryptedPayload,
			decrypt: false, // Remove decryption flag after processing
		};
		return next(decryptedAction);
	}

	// Pass through actions that don't require encryption or decryption
	return next(action);
};

export default encryptionMiddleware;
