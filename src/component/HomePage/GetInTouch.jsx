import React from 'react'
import { IoLogoInstagram } from "react-icons/io5";
import { FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

function GetInTouch() {
	return (
		<>
			<div className='container pt-8 pb-14 flex gap-10 text-gray-700'>
				<div className='w-full md:w-[50%]'>
					<p className='font-normal text-[36px] '>Get in touch</p>
					<div className='details mt-10'>
						<p className='font-semibold'>Call</p>
						<a className='hover:text-primary transition-all' href="tel:+91 9876543210" >+91 9876543210</a>
					</div>
					<div className='details mt-6'>
						<p className='font-semibold'>email</p>
						<a className='hover:text-primary transition-all' href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=mail@matrimony.in" target='_blank' rel="noreferrer">mail@matrimony.in</a>
					</div>
					<div className='details mt-6'>
						<p className='font-semibold'>social link</p>
						<div className='mt-2 flex items-center gap-6'>
							<a className='hover:text-primary transition-all' href="" target='_blank' rel="noreferrer"><IoLogoInstagram size={22} /></a>
							<a className='hover:text-primary transition-all' href="" target='_blank' rel="noreferrer"><FaWhatsapp size={22} /></a>
							<a className='hover:text-primary transition-all' href="" target='_blank' rel="noreferrer"><FiFacebook size={22} /></a>
							<a className='hover:text-primary transition-all' href="" target='_blank' rel="noreferrer"><LuMail size={22} /></a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default GetInTouch