import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';

function FilterProfileEdit({ onClose, filterData }) {

	const [ showModal, setShowModal ] = useState(true);

	// const handleVerification = () => {
	// 	// submit(true);
	// 	setShowModal(false);
	// 	onClose();
	// };
	// useEffect(() => {
	// 	console.log(filterData);
	// }, [])

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>
				<p className="text-md font-semibold text-headingGray border-b pb-2 mb-2">Edit Filter</p>
				<div>
					{filterData}
				</div>
			</Modal>
		</>
	)
}

export default FilterProfileEdit