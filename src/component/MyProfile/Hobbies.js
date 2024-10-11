import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const options = [
	{ label: 'Hobbies & Interests', key: 'hobbies' },
	{ label: 'Music', key: 'music' },
	{ label: 'Reading', key: 'reading' },
	{ label: 'Movie and TV shows', key: 'movies' },
	{ label: 'Sports and Fitness', key: 'sports' },
	{ label: 'Food', key: 'food' },
	{ label: 'Spoken languages', key: 'languages' }
];

const optionsData = {
	hobbies: [ 'Hiking', 'Cooking', 'Traveling' ],
	music: [ 'Remixes', 'Rock', 'Western', 'Techno' ],
	reading: [ 'Autobiographies', 'Fiction', 'Classics' ],
	movies: [ 'Action', 'Comedy', 'Drama' ],
	sports: [ 'Soccer', 'Basketball' ],
	food: [ 'Vegan', 'Fast Food', 'Italian' ],
	languages: [ 'English', 'Spanish', 'French' ]
};

const Hobbies = () => {
	const [ selectedOption, setSelectedOption ] = useState('music');
	const [ selectedValues, setSelectedValues ] = useState({
		hobbies: [],
		music: [],
		reading: [],
		movies: [],
		sports: [],
		food: [],
		languages: []
	});

	const sectionRefs = useRef({});
	const containerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			const containerTop = containerRef.current.getBoundingClientRect().top;
			const offsets = Object.keys(sectionRefs.current).map(section => {
				const top = sectionRefs.current[ section ].getBoundingClientRect().top;
				return { section, offset: Math.abs(containerTop - top) };
			});

			const closestSection = offsets.reduce((a, b) => (a.offset < b.offset ? a : b)).section;
			setSelectedOption(closestSection);
		};

		const container = containerRef.current;
		container.addEventListener('scroll', handleScroll);
		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleSelectChange = (optionKey, value) => {
		setSelectedValues(prev => ({
			...prev,
			[ optionKey ]: prev[ optionKey ].includes(value)
				? prev[ optionKey ].filter(item => item !== value)
				: [ ...prev[ optionKey ], value ]
		}));
	};

	const handleSubmit = () => {
		console.log(selectedValues);
		axios.post('/api/save-preferences', selectedValues)
			.then(response => console.log('Data submitted:', response))
			.catch(error => console.error('Error submitting data:', error));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Hobbies</p>
			<div className="w-full mx-auto">
				<div className="flex space-x-2 p-4 bg-gray-100">
					{options.map(option => (
						<button
							key={option.key}
							className={`p-2 rounded ${selectedOption === option.key ? 'bg-primary text-white' : 'bg-gray-200'}`}
							onClick={() => setSelectedOption(option.key)}
						>
							{option.label}
						</button>
					))}
				</div>

				<div className="relative h-96 overflow-y-auto customScroll-bar border-b" ref={containerRef}>
					{options.map(option => (
						<div
							key={option.key}
							ref={el => sectionRefs.current[ option.key ] = el}
							className={`p-4 mt-4 ${selectedOption === option.key ? 'bg-red-50' : 'bg-white'} `}
						>
							<h3 className="font-bold mb-2">{option.label}</h3>
							<div className="flex flex-wrap space-x-2">
								{optionsData[ option.key ].map(item => (
									<button
										key={item}
										onClick={() => handleSelectChange(option.key, item)}
										className={`p-2 border rounded ${selectedValues[ option.key ].includes(item)
											? 'bg-gold text-white'
											: 'bg-gray-200'
											}`}
									>
										{item}
									</button>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-end pb-4 pr-4">
					<button
						onClick={handleSubmit}
						className="gradient-btn mt-4 text-white py-2 px-4 rounded right"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hobbies;
