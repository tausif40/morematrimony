import React from 'react'
import { CiBellOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Header() {
	return (
		<>
			{/* top header */}

			<div className=' block lg:hidden w-full'>
				<img src="./assets/img/logo.png" alt="" className='w-40 md:w-44 p-2 mx-auto' />
			</div>

			<header className='hidden lg:block bg-white z-50'>
				<div className='container pt-4'>
					<div className="flex gap-4 justify-end items-center text-sm font-medium text-text pb-2">
						<p>Help Line +91 9876543210</p><p className='font-thin'>|</p>
						{/* <p><CiBellOn size={18} /></p>
						<CiMail size={18} /> */}
						{/* <div className='flex items-center'>
							<img src="./assets/img/avatar-place.png" alt="" className='w-6 mr-2 rounded-full' />
							<p className='font-semibold flex items-center' >Hi, &nbsp;<p className='text-gradient' style={{ fontSize: "14px", padding: 0 }}>
								User Name</p></p>
						</div> */}
						<Link to='/login'>
							<p>Login</p>
						</Link>
						<div className="flex space-x-4">
							<Link to={'/register'}>
								<button className="gradient-btn"><p>Registration</p></button>
							</Link>
						</div>
					</div>
				</div >
			</header>
		</>
	)
}

export default Header