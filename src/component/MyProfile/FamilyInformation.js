import React, { useState } from 'react';

const FamilyInformation = () => {
	const [ formData, setFormData ] = useState({
		father: '',
		mother: '',
		sibling: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Family Information</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Father */}
				<div>
					<label htmlFor="father" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Father</label>
					<input
						type="text"
						id="father"
						className="input-field"
						placeholder="Father's Name"
						name="father"
						value={formData.father}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Mother */}
				<div>
					<label htmlFor="mother" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Mother</label>
					<input
						type="text"
						id="mother"
						className="input-field"
						placeholder="Mother's Name"
						name="mother"
						value={formData.mother}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Sibling */}
				<div>
					<label htmlFor="sibling" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Sibling</label>
					<input
						type="text"
						id="sibling"
						className="input-field"
						placeholder="Sibling's Name"
						name="sibling"
						value={formData.sibling}
						onChange={handleChange}
						required
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

export default FamilyInformation;
