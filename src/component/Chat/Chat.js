import React, { useState } from 'react';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

const contacts = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Smith' },
	{ id: 3, name: 'Alice Johnson' },
];

function Chat() {
	const [ selectedContact, setSelectedContact ] = useState(null);

	return (
		<div className="border rounded-md overflow-hidden">
			<div className='flex h-[70vh]'>
				{/* Contact List */}
				<div className="w-1/4 bg-gray-100 ">
					<ContactList
						contacts={contacts}
						onSelectContact={setSelectedContact}
					/>
				</div>

				{/* Chat Window */}
				<div className="w-3/4 bg-white p-4">
					{selectedContact ? (
						<ChatWindow contact={selectedContact} />
					) : (
						<div className="text-gray-500">Select a contact to start chatting</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Chat