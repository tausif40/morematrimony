import React from 'react';
import ProfileOption from './ProfileOption';
import { IoCloseCircleOutline } from "react-icons/io5";

const SideMenu = ({ isOpen, closeMenu }) => {
	console.log('SideMenu isOpen:', isOpen);
	return (
		<div
			className={`fixed top-0 left-0 w-64 h-full text-white transition-transform duration-300 overflow-y-auto ${isOpen ? '' : '-translate-x-full'
				}`}
			id="sideMenu"
		>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={closeMenu}
				/>
			)}
			<div className="relative z-50">
				<div className="absolute top-3 right-3 cursor-pointer text-primary" onClick={closeMenu}>
					<IoCloseCircleOutline size={28} />
				</div>
				<div className='w-full '>
					<ProfileOption />
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
