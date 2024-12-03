import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PhysicalAttributesData } from '../../utils/data/MyProfileData';

const PhysicalAttributes = ({ onFormSubmit }) => {

	const [ formData, setFormData ] = useState({
		height: { feet: '', inches: '' },
		weight: '',
		eyeColor: '',
		hairColor: '',
		complexion: '',
		bloodGroup: '',
		bodyType: '',
		tattoo: '',
		disability: {
			disability: '',
			type: '',
			details: ''
		}
	});
	const [ errors, setErrors ] = useState({});

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] ? 'border-red-500' : ''} text-gray-700`;

	const handleSubmit = async (e) => {
		e.preventDefault();

		let validationErrors = {};
		if (!formData.height.feet) validationErrors.height = 'Height (feet) is required';
		if (!formData.weight) validationErrors.weight = 'Weight is required';
		if (!formData.eyeColor) validationErrors.eyeColor = 'Eye Color is required';
		if (!formData.hairColor) validationErrors.hairColor = 'Hair Color is required';
		if (!formData.complexion) validationErrors.complexion = 'Complexion is required';
		if (!formData.bloodGroup) validationErrors.bloodGroup = 'Blood Group is required';
		if (!formData.bodyType) validationErrors.bodyType = 'Body Type is required';
		if (!formData.tattoo) validationErrors.tattoo = 'Tattoo details are required';
		if (!formData.disability.disability) validationErrors.disability = 'Disability status is required';
		if (formData.disability.disability === 'yes' && !formData.disability.type) validationErrors.type = 'Disability Type is required';
		if (formData.disability.type === 'other' && !formData.disability.details) validationErrors.details = 'Disability Details are required';

		const cleanedData = { ...formData };
		if (cleanedData.disability.disability === 'no') {
			delete cleanedData.disability.type;
			delete cleanedData.disability.details;
		} else if (cleanedData.disability.type != 'other') {
			delete cleanedData.disability.details;
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			onFormSubmit({ physicalAttributes: formData });
		}
	};


	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.includes('height')) {
			const [ group, field ] = name.split('.');
			setFormData((prev) => ({
				...prev,
				[ group ]: { ...prev[ group ], [ field ]: value },
			}));

			if (errors.height) {
				setErrors((prev) => ({ ...prev, height: '' }));
			}
		} else if (name === 'disability') {
			setFormData((prev) => ({
				...prev,
				disability: {
					disability: value,
					type: value === 'yes' ? prev.disability.type : null,
					details: value === 'yes' ? prev.disability.details : '',
				},
			}));

			if (value === 'no') {
				setFormData((prev) => ({
					...prev,
					disability: { disability: 'no', type: '', details: '' },
				}));
			}

			if (errors.disability || errors.type || errors.details) {
				setErrors((prev) => ({
					...prev,
					disability: '',
					type: '',
					details: '',
				}));
			}
		} else if (name === 'type') {
			setFormData((prev) => ({
				...prev,
				disability: {
					...prev.disability,
					type: value,
					details: value === 'other' ? prev.disability.details : '',
				},
			}));

			if (errors.type || errors.details) {
				setErrors((prev) => ({ ...prev, type: '', details: '' }));
			}
		} else if (name === 'details') {
			setFormData((prev) => ({
				...prev,
				disability: { ...prev.disability, details: value },
			}));
			if (errors.details) {
				setErrors((prev) => ({ ...prev, details: '' }));
			}
		} else {
			setFormData((prev) => ({ ...prev, [ name ]: value }));

			if (errors[ name ]) {
				setErrors((prev) => ({ ...prev, [ name ]: '' }));
			}
		}
	};


	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Physical Attributes</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Height */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Height <span className="text-red-500">*</span></label>
					<div className="rounded-md flex gap-4">
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height.feet"
							value={formData.height.feet}
							onChange={handleChange}
						>
							<option value="" disabled>Feet</option>
							{PhysicalAttributesData.foot.map((status, index) => (
								<option key={index} value={status}>
									{status}
								</option>
							))}
						</select>

						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height.inches"
							value={formData.height.inches}
							onChange={handleChange}
						>
							<option value="" disabled>Inches</option>
							{PhysicalAttributesData.inch.map((status, index) => (
								<option key={index} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
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
						{PhysicalAttributesData.eyeColor.map((status, index) => (
							<option key={index} value={status}>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</option>
						))}
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
						{PhysicalAttributesData.eyeColor.map((color, index) => (
							<option key={index} value={color}>
								{color.charAt(0).toUpperCase() + color.slice(1)}
							</option>
						))}
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
						{PhysicalAttributesData.complexion.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
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
						{PhysicalAttributesData.bloodGroup.map((value, index) => (
							<option key={index} value={value}>
								{value}
							</option>
						))}
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
						{PhysicalAttributesData.bodyType.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
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
						<option value='true'>Yes</option>
						<option value='false'>No</option>
					</select>
					{errors.tattoo && <p className="text-red-500 text-xs">{errors.tattoo}</p>}
				</div>

				{/* Any Disability */}
				<div>
					<label htmlFor="disability" className="block font-medium mb-1 mt-1 text-headingGray">
						Any Disability <span className="text-red-500">*</span>
					</label>
					<select
						id="disability"
						className={getInputClasses('disability')}
						name="disability"
						value={formData.disability.disability}
						onChange={handleChange}
					>
						<option value="" disabled>Select Option</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
					{errors.disability && <p className="text-red-500 text-xs">{errors.disability}</p>}
				</div>

				{/* disability Type */}
				{formData.disability.disability === 'yes' && (
					<div>
						<label htmlFor="type" className="block font-medium mb-1 mt-1 text-headingGray">
							Select Disability Type <span className="text-red-500">*</span>
						</label>
						<select
							id="disabilityType"
							className={getInputClasses('disabilityType')}
							name="type"
							value={formData.disability.type}
							onChange={handleChange}
						>
							<option value="" disabled>Select Option</option>
							{PhysicalAttributesData?.disabilityType?.map((value, index) => (
								<option key={index} value={value}>
									{value.charAt(0).toUpperCase() + value.slice(1)}
								</option>
							))}
						</select>
						{errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
					</div>
				)}

				{/* Disability Details */}
				{formData.disability.disability === 'yes' && formData.disability.type === 'other' && (
					<div>
						<label htmlFor="disabilityDetails" className="block font-medium mb-1 mt-1 text-headingGray">
							Disability Details <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="disabilityDetails"
							className={getInputClasses('disabilityDetails')}
							placeholder="Disability Details"
							name="details"
							value={formData.disability.details}
							onChange={handleChange}
						/>
						{errors.details && <p className="text-red-500 text-xs">{errors.details}</p>}
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
