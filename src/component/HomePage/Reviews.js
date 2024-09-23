import React from 'react'

function Reviews() {
	return (
		<>
			<section
				className="w-full lg:h-screen"
				style={{
					backgroundImage: `url(${require('../../img/img14.jpg')})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				}}
			>
				<div className="flex flex-col items-center text-white">
					<p className='text-3xl text-center font-semibold pt-[4%]'>Reviews of Members</p>
					<img src="./assets/img/review.jpg" alt="Member" className="rounded-full mx-auto size-48 object-cover border-4 border-white mt-[4%]" />
					<p className='pt-14 px-2 max-w-3xl text-center text-[#ffeced]'>
						But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
						born and / will give you a complete account of the system, and expound the actual teachings of
						the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
						avoids pleasure itself, because it is pleasure.
					</p>
					<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32">
						<path fill="rgb(244, 205, 12)" d="M4 8v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zm14 0v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zM6 10h6v6H6zm14 0h6v6h-6z" />
					</svg>
				</div>
			</section>

		</>
	)
}

export default Reviews