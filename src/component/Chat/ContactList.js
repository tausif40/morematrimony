import React from 'react';

const ContactList = ({ contacts, onSelectContact }) => {
	return (
		<ul className="">
			{contacts.map((contact, index) => (
				<li
					key={index}
					className="cursor-pointer p-3 bg-gray-50 text-headingGray hover:bg-gray-200 border-b"
					onClick={() => onSelectContact(contact)}
				>
					{contact.name}
				</li>
			))}
		</ul>
	);
};

export default ContactList;
