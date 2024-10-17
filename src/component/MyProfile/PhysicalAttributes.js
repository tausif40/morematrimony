import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
	const [ errors, setErrors ] = useState({});

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] ? 'border-red-500' : ''} text-gray-700`;

	const handleSubmit = async (e) => {
		e.preventDefault();

		let validationErrors = {};
		if (!formData.height) validationErrors.height = 'Height is required';
		if (!formData.weight) validationErrors.weight = 'Weight is required';
		if (!formData.eyeColor) validationErrors.eyeColor = 'Eye Color is required';
		if (!formData.hairColor) validationErrors.hairColor = 'Hair Color is required';
		if (!formData.complexion) validationErrors.complexion = 'Complexion is required';
		if (!formData.bloodGroup) validationErrors.bloodGroup = 'Blood Group is required';
		if (!formData.bodyType) validationErrors.bodyType = 'Body Type is required';
		if (!formData.tattoo) validationErrors.tattoo = 'Tattoo details are required';
		if (!formData.anyDisability) validationErrors.anyDisability = 'Disability details are required';

		if (formData.anyDisability === 'Yes' && !formData.disability) {
			validationErrors.disability = 'Disability details are required';
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			console.log(formData);
			try {
				const response = await axios.post('/api/physical-attributes', formData);
				toast.success('Form submitted successfully!');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Failed to submit form!');
				console.error('Error submitting form:', error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
		if (errors[ name ]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[ name ]: '',
			}));
		}
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Physical Attributes</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Height */}
				<div>
					<label htmlFor="height" className="block font-medium mb-1 mt-1 text-headingGray">
						Height (in Feet) <span className="text-red-500">*</span>
					</label>
					<select
						id="height"
						className={getInputClasses('height')}
						name="height"
						value={formData.height}
						onChange={handleChange}
					>
						<option value="" disabled>Select Height</option>
						<option value="4 ft 1 in">4 ft 1 in</option>
						<option value="4 ft 2 in">4 ft 2 in</option>
					</select>
					{errors.height && <p className="text-red-500 text-xs">{errors.height}</p>}
				</div>

				{/* Weight */}
				<div>
					<label htmlFor="weight" className="block font-medium mb-1 mt-1 text-headingGray">
						Weight (in Kg) <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						id="weight"
						className={getInputClasses('weight')}
						placeholder="Weight"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
					/>
					{errors.weight && <p className="text-red-500 text-xs">{errors.weight}</p>}
				</div>

				{/* Eye Color */}
				<div>
					<label htmlFor="eyeColor" className="block font-medium mb-1 mt-1 text-headingGray">
						Eye Color <span className="text-red-500">*</span>
					</label>
					<select
						id="eyeColor"
						className={getInputClasses('eyeColor')}
						name="eyeColor"
						value={formData.eyeColor}
						onChange={handleChange}
					>
						<option value="" disabled>Select Eye Color</option>
						<option value="Normal">Normal</option>
						<option value="Amber">Amber</option>
						<option value="Blue">Blue</option>
						<option value="Brown">Brown</option>
						<option value="Green">Green</option>
						<option value="Hazel">Hazel</option>
					</select>
					{errors.eyeColor && <p className="text-red-500 text-xs">{errors.eyeColor}</p>}
				</div>

				{/* Hair Color */}
				<div>
					<label htmlFor="hairColor" className="block font-medium mb-1 mt-1 text-headingGray">
						Hair Color <span className="text-red-500">*</span>
					</label>
					<select
						id="hairColor"
						className={getInputClasses('hairColor')}
						name="hairColor"
						value={formData.hairColor}
						onChange={handleChange}
					>
						<option value="" disabled>Select Hair Color</option>
						<option value="Black">Black</option>
						<option value="Gray">Gray</option>
						<option value="White">White</option>
					</select>
					{errors.hairColor && <p className="text-red-500 text-xs">{errors.hairColor}</p>}
				</div>

				{/* Complexion */}
				<div>
					<label htmlFor="complexion" className="block font-medium mb-1 mt-1 text-headingGray">
						Complexion <span className="text-red-500">*</span>
					</label>
					<select
						id="complexion"
						className={getInputClasses('complexion')}
						name="complexion"
						value={formData.complexion}
						onChange={handleChange}
					>
						<option value="" disabled>Select Complexion</option>
						<option value="Fair Skin">Fair Skin</option>
						<option value="Medium Skin">Medium Skin</option>
						<option value="Black Skin">Black Skin</option>
					</select>
					{errors.complexion && <p className="text-red-500 text-xs">{errors.complexion}</p>}
				</div>

				{/* Blood Group */}
				<div>
					<label htmlFor="bloodGroup" className="block font-medium mb-1 mt-1 text-headingGray">
						Blood Group <span className="text-red-500">*</span>
					</label>
					<select
						id="bloodGroup"
						className={getInputClasses('bloodGroup')}
						name="bloodGroup"
						value={formData.bloodGroup}
						onChange={handleChange}
					>
						<option value="" disabled>Select Blood Group</option>
						<option value="A+">A positive (A+)</option>
						<option value="A-">A negative (A-)</option>
						<option value="O+">O positive (O+)</option>
					</select>
					{errors.bloodGroup && <p className="text-red-500 text-xs">{errors.bloodGroup}</p>}
				</div>

				{/* Body Type */}
				<div>
					<label htmlFor="bodyType" className="block font-medium mb-1 mt-1 text-headingGray">
						Body Type <span className="text-red-500">*</span>
					</label>
					<select
						id="bodyType"
						className={getInputClasses('bodyType')}
						name="bodyType"
						value={formData.bodyType}
						onChange={handleChange}
					>
						<option value="" disabled>Select Body Type</option>
						<option value="Slim">Slim</option>
						<option value="Fat">Fat</option>
						<option value="Average">Average</option>
					</select>
					{errors.bodyType && <p className="text-red-500 text-xs">{errors.bodyType}</p>}
				</div>

				{/* Tattoo */}
				<div>
					<label htmlFor="tattoo" className="block font-medium mb-1 mt-1 text-headingGray">
						Tattoo <span className="text-red-500">*</span>
					</label>
					<select
						id="tattoo"
						className={getInputClasses('tattoo')}
						name="tattoo"
						value={formData.tattoo}
						onChange={handleChange}
					>
						<option value="" disabled>Select Tattoo Option</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					{errors.tattoo && <p className="text-red-500 text-xs">{errors.tattoo}</p>}
				</div>

				{/* Any Disability */}
				<div>
					<label htmlFor="anyDisability" className="block font-medium mb-1 mt-1 text-headingGray">
						Any Disability <span className="text-red-500">*</span>
					</label>
					<select
						id="anyDisability"
						className={getInputClasses('anyDisability')}
						name="anyDisability"
						value={formData.anyDisability}
						onChange={handleChange}
					>
						<option value="" disabled>Select Option</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					{errors.anyDisability && <p className="text-red-500 text-xs">{errors.anyDisability}</p>}
				</div>

				{/* Disability Details */}
				{formData.anyDisability === 'Yes' && (
					<div>
						<label htmlFor="disability" className="block font-medium mb-1 mt-1 text-headingGray">
							Disability Details <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="disability"
							className={getInputClasses('disability')}
							placeholder="Disability Details"
							name="disability"
							value={formData.disability}
							onChange={handleChange}
						/>
						{errors.disability && <p className="text-red-500 text-xs">{errors.disability}</p>}
					</div>
				)}

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default PhysicalAttributes;
