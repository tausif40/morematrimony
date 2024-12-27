import React, { useState } from 'react';
import { UserCircle, Mail, Phone, Edit2, X } from 'lucide-react';

const initialProfileData = {
	firstName: "Mohd.",
	lastName: "Tausif",
	gender: "female",
	onBehalf: "mySelf",
	dateOfBirth: "2024-11-01T00:00:00.000Z",
	email: "tausif@gmail.com",
	mobile: "+1234567890",
	createdAt: "2024-11-27T12:51:24.792Z",
	updatedAt: "2024-11-27T12:51:24.792Z"
};

const ProfileItem = ({ icon, label, value, isEditable, onEdit }) => {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div
			className="flex items-center bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="mr-4 text-gray-500">{icon}</div>
			<div className="flex-grow">
				<p className="text-sm text-gray-500">{label}</p>
				<p className="font-medium text-gray-800">{value}</p>
			</div>
			{isEditable && isHovered && (
				<button
					className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-yellow-400 rounded-full p-2 shadow-md transition-all duration-300 hover:bg-red-500"
					onClick={onEdit}
				>
					<Edit2 className="w-5 h-5 text-white" />
				</button>
			)}
		</div>
	);
};

const EditPopup = ({ field, value, onSave, onCancel }) => (
	<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
			<button
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				onClick={onCancel}
			>
				<X className="w-6 h-6" />
			</button>
			<h2 className="text-2xl font-bold mb-4">Edit {field}</h2>
			<input
				type={field === 'email' ? 'email' : 'tel'}
				className="w-full p-2 border border-gray-300 rounded mb-4"
				defaultValue={value}
				id="editInput"
			/>
			<div className="flex justify-end space-x-2">
				<button
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
					onClick={onCancel}
				>
					Cancel
				</button>
				<button
					className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded hover:opacity-90"
					onClick={() => onSave(document.getElementById('editInput').value)}
				>
					Save
				</button>
			</div>
		</div>
	</div>
);

const CreativeProfilePage = () => {
	const [ profileData, setProfileData ] = useState(initialProfileData);
	const [ editingField, setEditingField ] = useState(null);

	const handleEdit = (field) => {
		setEditingField(field);
	};

	const handleSave = (value) => {
		setProfileData(prev => ({ ...prev, [ editingField ]: value }));
		setEditingField(null);
	};

	const handleCancel = () => {
		setEditingField(null);
	};

	return (
		<div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full overflow-hidden relative">
				<div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-yellow-300 to-red-500 transform -skew-y-6"></div>
				<div className="relative z-10">
					<div className="flex flex-col items-center mb-6">
						<div className="relative mb-4">
							<UserCircle className="w-32 h-32 text-white bg-gray-300 rounded-full p-2" />
						</div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
							{`${profileData.firstName} ${profileData.lastName}`}
						</h1>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<ProfileItem
							icon={<Mail className="w-5 h-5" />}
							label="Email"
							value={profileData.email}
							isEditable={true}
							onEdit={() => handleEdit('email')}
						/>
						<ProfileItem
							icon={<Phone className="w-5 h-5" />}
							label="Mobile"
							value={profileData.mobile}
							isEditable={true}
							onEdit={() => handleEdit('mobile')}
						/>
						<ProfileItem
							icon={<UserCircle className="w-5 h-5" />}
							label="Gender"
							value={profileData.gender}
							isEditable={false}
						/>
						<ProfileItem
							icon={<UserCircle className="w-5 h-5" />}
							label="On Behalf"
							value={profileData.onBehalf}
							isEditable={false}
						/>
					</div>
				</div>
			</div>
			{editingField && (
				<EditPopup
					field={editingField}
					value={profileData[ editingField ]}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
};

export default CreativeProfilePage;

