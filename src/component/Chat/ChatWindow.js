import React, { useState } from 'react';

const ChatWindow = ({ contact }) => {
	const [ messages, setMessages ] = useState([]);
	const [ input, setInput ] = useState('');

	const sendMessage = () => {
		if (input.trim()) {
			setMessages([ ...messages, { sender: 'You', text: input } ]);
			setInput('');
		}
	};

	return (
		<div className="flex flex-col h-full">
			<h2 className="text-xl font-semibold mb-4">
				Chat with {contact.name}
			</h2>
			<div className="flex-1 overflow-y-auto mb-4">
				{messages.map((message, index) => (
					<div key={index} className={`mb-2 ${message.sender === 'You' ? 'text-right' : ''}`}>
						<span className="inline-block p-2 rounded-lg bg-gray-200">
							{message.sender}: {message.text}
						</span>
					</div>
				))}
			</div>
			<div className="flex">
				<input
					type="text"
					className="flex-1 py-2 px-3 border rounded-md mr-2 outline-none focus:border-primary transition-all"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type a message..."
				/>
				<button
					className="px-6 py-2 bg-primary text-white rounded-md"
					onClick={sendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatWindow;
