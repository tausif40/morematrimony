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
		tattoo: '',
		anyDisability: '',
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
					<select
						id="height"
						className="input-field text-text"
						name="height"
						value={formData.height}
						onChange={handleChange}
						required
					>
						<option value="">Select Height</option>
						<option value="4 ft 1 in">4 ft 1 in</option>
						<option value="4 ft 2 in">4 ft 2 in</option>
					</select>
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
					<select
						id="eyeColor"
						className="input-field text-text"
						name="eyeColor"
						value={formData.eyeColor}
						onChange={handleChange}
						required
					>
						<option value="">Select Eye Color</option>
						<option value="Normal">Normal</option>
						<option value="Amber">Amber</option>
						<option value="Blue">Blue</option>
						<option value="Brown">Brown</option>
						<option value="Green">Green</option>
						<option value="Hazel">Hazel</option>
					</select>
				</div>
				{/* Hair Color */}
				<div>
					<label htmlFor="hairColor" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Hair Color</label>
					<select
						id="hairColor"
						className="input-field text-text"
						name="hairColor"
						value={formData.hairColor}
						onChange={handleChange}
						required
					>
						<option value="">Select Hair Color</option>
						<option value="Black">Black</option>
						<option value="Gray">Gray</option>
						<option value="White">White</option>
					</select>
				</div>
				{/* Complexion */}
				<div>
					<label htmlFor="complexion" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Complexion</label>
					<select
						id="complexion"
						className="input-field text-text"
						name="complexion"
						value={formData.complexion}
						onChange={handleChange}
						required
					>
						<option value="">Select Complexion</option>
						<option value="Fair Skin">Fair Skin</option>
						<option value="Medium Skin">Medium Skin</option>
						<option value="Black Skin">Black Skin</option>
					</select>
				</div>
				{/* Blood Group */}
				<div>
					<label htmlFor="bloodGroup" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Blood Group</label>
					<select
						id="bloodGroup"
						className="input-field text-text"
						name="bloodGroup"
						value={formData.bloodGroup}
						onChange={handleChange}
						required
					>
						<option value="">Select Blood Group</option>
						<option value="A+">A positive (A+)</option>
						<option value="A-">A negative (A-)</option>
						<option value="O+">O positive (O+)</option>
					</select>
				</div>
				{/* Body Type */}
				<div>
					<label htmlFor="bodyType" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Body Type</label>
					<select
						id="bodyType"
						className="input-field text-text"
						name="bodyType"
						value={formData.bodyType}
						onChange={handleChange}
					>
						<option value="">Select Body Type</option>
						<option value="Slim">Slim</option>
						<option value="Fat">Fat</option>
						<option value="Average">Average</option>
					</select>
				</div>
				{/* Tattoo */}
				<div>
					<label htmlFor="tattoo" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Tattoo on Body</label>
					<select
						id="tattoo"
						className="input-field text-text"
						name="tattoo"
						value={formData.tattoo}
						onChange={handleChange}
					>
						<option value="">Select Option</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				{/* Disability */}
				<div>
					<label htmlFor="anyDisability" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Any Disability</label>
					<select
						id="anyDisability"
						className="input-field text-text"
						name="anyDisability"
						value={formData.anyDisability}
						onChange={handleChange}
					>
						<option value="">Select Option</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				{
					formData.anyDisability === 'Yes' &&
					<div>
						<label htmlFor="disability" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Disability Details</label>
						<input
							type="text"
							id="disability"
							className="input-field"
								name="disability Details"
							value={formData.disability}
							onChange={handleChange}
							placeholder="Disability"
						/>
					</div>
				}
				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default PhysicalAttributes;
