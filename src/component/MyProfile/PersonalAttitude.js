import React, { useState } from 'react';

const PersonalAttitude = () => {
	const [ formData, setFormData ] = useState({
		affection: '',
		humor: '',
		politicalViews: '',
		religiousService: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Personal Attitude & Behavior</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Affection */}
				<div>
					<label htmlFor="affection" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Affection</label>
					<input
						type="text"
						id="affection"
						className="input-field"
						placeholder="Affection"
						name="affection"
						value={formData.affection}
						onChange={handleChange}
					/>
				</div>
				{/* Humor */}
				<div>
					<label htmlFor="humor" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Humor</label>
					<input
						type="text"
						id="humor"
						className="input-field"
						placeholder="Humor"
						name="humor"
						value={formData.humor}
						onChange={handleChange}
					/>
				</div>
				{/* Political Views */}
				<div>
					<label htmlFor="politicalViews" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Political Views</label>
					<input
						type="text"
						id="politicalViews"
						className="input-field"
						placeholder="Political Views"
						name="politicalViews"
						value={formData.politicalViews}
						onChange={handleChange}
					/>
				</div>
				{/* Religious Service */}
				<div>
					<label htmlFor="religiousService" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Religious Service</label>
					<input
						type="text"
						id="religiousService"
						className="input-field"
						placeholder="Religious Service"
						name="religiousService"
						value={formData.religiousService}
						onChange={handleChange}
					/>
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default PersonalAttitude