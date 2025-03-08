import React, { useEffect, useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';


function Plans() {
	const [ plans, setPlans ] = useState([])
	const getPlan = useSelector((state) => state.planSlice.plans);
	console.log(getPlan?.data?.plans);

	useEffect(() => {
		const activePlans = getPlan?.data?.plans?.filter(plan => plan.isActive);
		setPlans(activePlans)
	}, [ getPlan ])

	const getColorScheme = (index) => {
		const schemes = [
			{
				bg: 'bg-rose-100',
				accent: 'text-rose-600',
				button: 'bg-rose-600 hover:bg-rose-700',
				icon: 'text-rose-500',
				border: 'border-rose-200'
			},
			{
				bg: 'bg-cyan-100',
				accent: 'text-cyan-600',
				button: 'bg-cyan-600 hover:bg-cyan-700',
				icon: 'text-cyan-500',
				border: 'border-cyan-200'
			},
			{
				bg: 'bg-amber-100',
				accent: 'text-amber-600',
				button: 'bg-amber-600 hover:bg-amber-700',
				icon: 'text-amber-500',
				border: 'border-amber-200'
			}
		];
		return schemes[ index % schemes.length ];
	};

	return (
		<div className="py-16 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Choose Your Perfect Plan
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Select the plan that best fits your needs and start your journey today
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{plans?.map((plan, index) => {
						const colors = getColorScheme(index);
						return (
							<div
								key={plan._id}
								className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${colors.bg} border-2 ${colors.border}`}
							>
								{plan.Popular && (
									<div className="absolute top-0 right-0 left-0 text-center py-2 bg-yellow-400 text-yellow-900 font-semibold text-sm flex items-center justify-center gap-1">
										<Star className="w-4 h-4" />
										Most Popular
										<Star className="w-4 h-4" />
									</div>
								)}

								<div className="p-8 pt-4">
									<div className="h-44 flex items-center justify-center mb-8">
										<img
											src={plan.image}
											alt={plan.name}
											className="max-h-full w-auto object-contain "
										/>
									</div>

									<h3 className={`text-2xl font-bold mb-2 ${colors.accent}`}>
										{plan.name}
									</h3>

									<div className="mb-6 flex items-baseline gap-1">
										<span className={`text-4xl font-bold ${colors.accent}`}>
											BD {plan.price}
										</span>
										<span className="text-gray-500">/{plan.duration} {plan.duration === '1' ? 'Month' : 'Months'}</span>
									</div>

									<div className="space-y-4 mb-8">
										<div className="flex items-center gap-3">
											<div className={`p-1 rounded-full ${colors.bg}`}>
												<Zap className={`w-5 h-5 ${colors.icon}`} />
											</div>
											<span className="text-gray-700">Up to {plan.profileLimit} profiles</span>
										</div>
										<div className="flex items-center gap-3">
											<div className={`p-1 rounded-full ${colors.bg}`}>
												<Check className={`w-5 h-5 ${colors.icon}`} />
											</div>
											<span className="text-gray-700">{plan.userDescription}</span>
										</div>
										{/* <div className="flex items-center gap-3">
											<div className={`p-1 rounded-full ${colors.bg}`}>
												<Check className={`w-5 h-5 ${colors.icon}`} />
											</div>
											<span className="text-gray-700">{plan.adminDescription}</span>
										</div> */}
									</div>

									<button
										className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-colors ${colors.button} shadow-lg`}
									>
										Get Started Now
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default Plans


// import React from 'react'

// function Plans() {
// 	return (
// 		<>
// 			<section id='plans' className="py-10">
// 				<div className="container text-center flex flex-col items-center">
// 					<div className="flex items-center w-80 m-auto my-4">
// 						<div className="flex-grow border-t-4 border-gold"></div>
// 						<h2 className="text-3xl font-bold px-2 text-gray-800">PREMIUM PLANS</h2>
// 						<div className="flex-grow border-t-4 border-gold"></div>
// 					</div>

// 					<p className="mt-4 text-gray-600 max-w-3xl">Choose any of our packages as per your need. You'll get your money back anytime if we're unable to satisfy your need.</p>

// 					<div className="bg-white border shadow-lg mt-10 p-6 inline-block text-[#6d6e6f] rounded-md">
// 						<img src="/assets/img/searchingPartner.jpg" alt="img" className='w-72' />
// 						<h3 className="text-2xl font-semibold text-headingGray mt-6 ">Default</h3>
// 						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 5 Express Interests</p>
// 						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 2 Gallery Photo U load</p>
// 						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> O Contact Info View</p>
// 						<p className="mt-4 flex"> <p className='text-red-500'> ☓&nbsp;&nbsp; </p> <del className='text-text'>Contact Info View</del></p>
// 						<p className='font-semibold text-6xl mt-14 text-black'>Free</p>
// 						<p className='text-primary text-sm font-medium'>10 days</p>
// 						<button className="mt-6 bg-gray-100 text-black text-sm px-6 py-3 rounded"><del>Purchase this Package</del></button>
// 					</div>
// 				</div>
// 			</section>
// 		</>
// 	)
// }

// export default Plans