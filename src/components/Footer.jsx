import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
         <div>
            <img src={assets.logo} className='mb-5 w-32' alt=""></img>
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maiores architecto facere consectetur in odio est saepe fuga, minima, totam veniam blanditiis provident rerum, corrupti voluptatem nihil accusamus voluptas eligendi!
            </p>
         </div>
         <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
         </div>
         <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>01012345678</li>
              <li>contact@fabfit.com</li>
            </ul> 
         </div>
      </div>
      <div>
        <hr></hr>
        <p className='py-5 text-sm text-center'>Copyright 2024@ fabfit.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
