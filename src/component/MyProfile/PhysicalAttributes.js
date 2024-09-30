import React, { useState } from 'react';
import axios from 'axios';

const PhysicalAttributes = () => {
	const [ formData, setFormData ] = useState({
		height: '',
		weight: '',
		eyeColor: '',
		hairColor: '',
		complexion: '',
		bloodGroup: '',
		bodyType: '',
		bodyArt: '',
		disability: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[ e.target.name ]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('/api/physical-attributes', formData)
			.then(response => {
				console.log('Data updated successfully:', response.data);
			})
			.catch(error => {
				console.error('Error updating data:', error);
			});
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Physical Attributes</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Height */}
				<div>
					<label htmlFor="height" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Height (in Feet)</label>
					<input
						type="number"
						id="height"
						className="input-field"
						name="height"
						value={formData.height}
						onChange={handleChange}
						placeholder="Height"
						required
					/>
				</div>
				{/* Weight */}
				<div>
					<label htmlFor="weight" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Weight (in Kg)</label>
					<input
						type="number"
						id="weight"
						className="input-field"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
						placeholder="Weight"
						required
					/>
				</div>
				{/* Eye Color */}
				<div>
					<label htmlFor="eyeColor" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Eye Color</label>
					<input
						type="text"
						id="eyeColor"
						className="input-field"
						name="eyeColor"
						value={formData.eyeColor}
						onChange={handleChange}
						placeholder="Eye Color"
						required
					/>
				</div>
				{/* Hair Color */}
				<div>
					<label htmlFor="hairColor" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Hair Color</label>
					<input
						type="text"
						id="hairColor"
						className="input-field"
						name="hairColor"
						value={formData.hairColor}
						onChange={handleChange}
						placeholder="Hair Color"
						required
					/>
				</div>
				{/* Complexion */}
				<div>
					<label htmlFor="complexion" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Complexion</label>
					<input
						type="text"
						id="complexion"
						className="input-field"
						name="complexion"
						value={formData.complexion}
						onChange={handleChange}
						placeholder="Complexion"
						required
					/>
				</div>
				{/* Blood Group */}
				<div>
					<label htmlFor="bloodGroup" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Blood Group</label>
					<input
						type="text"
						id="bloodGroup"
						className="input-field"
						name="bloodGroup"
						value={formData.bloodGroup}
						onChange={handleChange}
						placeholder="Blood Group"
						required
					/>
				</div>
				{/* Body Type */}
				<div>
					<label htmlFor="bodyType" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Body Type</label>
					<input
						type="text"
						id="bodyType"
						className="input-field"
						name="bodyType"
						value={formData.bodyType}
						onChange={handleChange}
						placeholder="Body Type"
						required
					/>
				</div>
				{/* Body Art */}
				<div>
					<label htmlFor="bodyArt" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Body Art</label>
					<input
						type="text"
						id="bodyArt"
						className="input-field"
						name="bodyArt"
						value={formData.bodyArt}
						onChange={handleChange}
						placeholder="Body Art"
					/>
				</div>
				{/* Disability */}
				<div>
					<label htmlFor="disability" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Disability</label>
					<input
						type="text"
						id="disability"
						className="input-field"
						name="disability"
						value={formData.disability}
						onChange={handleChange}
						placeholder="Disability"
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

export default PhysicalAttributes;
