import React from 'react'
import img1 from "../public/img1.jpg"
import Image from 'next/image';

export default function Main() {
  return (
    <div className="w-full h-96 border-gray-100 relative">
      <Image src={img1} alt="" className="h-full w-full object-cover bg-no-repeat bg-bottom" priority={true}/>
      <div className="absolute bg-white top-12 left-8 p-4 flex flex-col items-start justify-center shadow-lg h-40 w-[440px]">
        <h2 className="text-3xl font-bold mb-2">Hi guys welcome</h2>
        <h3 className="text-xl">{`Look at this project!!! Let's go`}</h3>
        <h3 className="text-xl">The goal is to learn without stress</h3>
      </div>
    </div>
  ) 
}
