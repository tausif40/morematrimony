// components/BasicInformation.js
import React from 'react';

function BasicInformation() {
	return (
		<div className="p-4 bg-white shadow-md rounded-lg">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<h3 className="font-bold">First Name:</h3>
					<p>Mohd.</p>
				</div>
				<div>
					<h3 className="font-bold">Last Name:</h3>
					<p>Tausif</p>
				</div>
				<div>
					<h3 className="font-bold">Gender:</h3>
					<p>Male</p>
				</div>
				<div>
					<h3 className="font-bold">Age:</h3>
					<p>23</p>
				</div>
				{/* Add other details similarly */}
			</div>
		</div>
	);
}

export default BasicInformation;
