import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ message, setMessage ] = useState("");

	const handleResetPassword = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post("/api/reset-password", password);

			setMessage(response.data.message || "Password reset successful!");
		} catch (error) {
			setMessage(error.response?.data?.message || "An error occurred");
		}
	};

	return (
		<section className="min-h-screen bg-gray-100">
			<div className="flex justify-center pt-14 mx-1">
				<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-semibold mb-4 text-center text-black">Reset Password</h2>
					{message && <p className="text-red-500 mb-4 text-center">{message}</p>}
					<form onSubmit={handleResetPassword} className="">
						<input
							type="password"
							placeholder="New password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="input-field"
						/>
						<input
							type="password"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="input-field mt-4"
						/>
						<button
							type="submit"
							className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
						>
							Save Password
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;
