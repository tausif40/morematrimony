import React, { useState } from 'react';

const Hobbies = () => {
	const [ formData, setFormData ] = useState({
		hobbies: {
			music: '',
			books: '',
			movies: '',
			tvShows: '',
			sports: '',
			fitnessActivities: '',
			cuisines: '',
			dressStyles: '',
		},
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
			hobbies: {
				...prevFormData.hobbies,
				[ name ]: value,
			},
		}));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Hobbies & Interest</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Music */}
				<div>
					<label htmlFor="music" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Music</label>
					<input
						type="text"
						id="music"
						className="input-field"
						placeholder="Music"
						name="music"
						value={formData.hobbies.music}
						onChange={handleChange}
					/>
				</div>
				{/* Books */}
				<div>
					<label htmlFor="books" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Books</label>
					<input
						type="text"
						id="books"
						className="input-field"
						placeholder="Books"
						name="books"
						value={formData.hobbies.books}
						onChange={handleChange}
					/>
				</div>
				{/* Movies */}
				<div>
					<label htmlFor="movies" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Movies</label>
					<input
						type="text"
						id="movies"
						className="input-field"
						placeholder="Movies"
						name="movies"
						value={formData.hobbies.movies}
						onChange={handleChange}
					/>
				</div>
				{/* TV Shows */}
				<div>
					<label htmlFor="tvShows" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">TV Shows</label>
					<input
						type="text"
						id="tvShows"
						className="input-field"
						placeholder="TV Shows"
						name="tvShows"
						value={formData.hobbies.tvShows}
						onChange={handleChange}
					/>
				</div>
				{/* Sports */}
				<div>
					<label htmlFor="sports" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Sports</label>
					<input
						type="text"
						id="sports"
						className="input-field"
						placeholder="Sports"
						name="sports"
						value={formData.hobbies.sports}
						onChange={handleChange}
					/>
				</div>
				{/* Fitness Activities */}
				<div>
					<label htmlFor="fitnessActivities" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Fitness Activities</label>
					<input
						type="text"
						id="fitnessActivities"
						className="input-field"
						placeholder="Fitness Activities"
						name="fitnessActivities"
						value={formData.hobbies.fitnessActivities}
						onChange={handleChange}
					/>
				</div>
				{/* Cuisines */}
				<div>
					<label htmlFor="cuisines" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Cuisines</label>
					<input
						type="text"
						id="cuisines"
						className="input-field"
						placeholder="Cuisines"
						name="cuisines"
						value={formData.hobbies.cuisines}
						onChange={handleChange}
					/>
				</div>
				{/* Dress Styles */}
				<div>
					<label htmlFor="dressStyles" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Dress Styles</label>
					<input
						type="text"
						id="dressStyles"
						className="input-field"
						placeholder="Dress Styles"
						name="dressStyles"
						value={formData.hobbies.dressStyles}
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

export default Hobbies;
