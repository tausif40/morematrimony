import { useState, useRef } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import { HiPlusSmall } from "react-icons/hi2";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import toast from 'react-hot-toast';

function Accordion({ items }) {
	const [ openIndex, setOpenIndex ] = useState(null);

	const toggleItem = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="">
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					number={index}
					isOpen={openIndex === index}
					onClick={() => toggleItem(index)}
					question={item.question}
					answer={item.answer}
				/>
			))}
		</div>
	);
}

function AccordionItem({ number, isOpen, onClick, question, answer }) {
	const contentRef = useRef(null);

	return (
		<div className="border-b py-4 px-5 bg-[#fffcf3]">
			<button onClick={onClick} className="py-2 w-full text-left flex items-center justify-between">
				<p>{number + 1})&nbsp;&nbsp;{question}</p><p>{isOpen ? <HiOutlineMinusSmall size={24} /> : <HiPlusSmall size={24} />}</p>
			</button>
			<div
				ref={contentRef}
				className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
					}`}
				style={{ maxHeight: isOpen ? contentRef.current.scrollHeight : 0 }}
			>
				<div className="text-gray-500 mt-2 pl-6 pr-8">
					{answer || "Content not available"}
				</div>
			</div>
		</div>
	);
}

export default function Help() {
	const faqs = [
		{
			question: "Is there a free trial available for the paid options?",
			answer: ""
		},
		{
			question: "Is it possible to subscribe to the app annually?",
			answer: ""
		},
		{
			question: "Is it possible to cancel my subscription?",
			answer: "Yes, of course. Just send us an email at contact@bookapp.com, and you will get a refund within 1-2 business days.",
		},
		{
			question: "How do I change my account email?",
			answer: ""
		},
		{
			question: "How can I change my payment method?",
			answer: ""
		},
	];

	const copyEmail = () => {
		navigator.clipboard.writeText('contact@bookapp.com');
		toast.success("copied");
	};

	return (
		<div className="w-full px-4 py-12 md:py-24 lg:py-16">
			<div className="mx-auto max-w-4xl space-y-16">

				{/* Header */}
				<div className="space-y-6 text-center">
					<h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl flex flex-col items-center justify-center">
						<p className="text-headingGray pb-2">
							Frequently asked
						</p>
						<p className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
							questions
						</p>
					</h1>
					<p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
						Do you need help with something or have questions about some features?
					</p>
				</div>

				<Accordion items={faqs} />

				{/* Contact Section */}
				<div className="space-y-2 text-center">
					<h2 className="text-2xl font-semibold tracking-tighter sm:text-3xl text-gray-700">
						Have any other questions?
					</h2>
					<p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
						Don't hesitate to send us an email at:
					</p>
					<div className="max-w-min m-auto px-2 mt-4 flex items-center justify-center gap-2 border bg-gray-50 rounded-md">
						<span className="text-sm text-black">contact@morematrimony.com</span>
						<button
							onClick={copyEmail}
							className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-900"
							aria-label="Copy email address"
						>
							<MdOutlineContentCopy />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
