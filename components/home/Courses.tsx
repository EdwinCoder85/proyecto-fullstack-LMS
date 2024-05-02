import React from "react";
import prisma from "@/libs/db";
import CourseCard from '@/components/courses/CourseCard';

export default async function Courses() {
  const courses = await prisma.course.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className="flex flex-col items-start mx-8 space-y-3 mt-14 mb-8">
      <h2 className="text-4xl font-bold">A broad selection of courses</h2>
      <h3 className="text-xl">
        Choose from 183,000 online video courses with new addition published
        every month
      </h3>
      <div className="text-xs lg:text-xl flex flex-wrap gap-y-2 space-x-4 ml-1 font-bold text-primary-600 cursor-pointer">
        <h3>Python</h3>
        <h3>Excel</h3>
        <h3>Web Development</h3>
        <h3 className="text-black">Javascript</h3>
        <h3>Data Science</h3>
        <h3>AWS Certification</h3>
        <h3>Drawing</h3>
      </div>

      <div className="text-left w-[95%] border border-gray-300 p-7 mx-auto my-10">
        {/* <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"> */}
        <div className="">
          <h2 className="text-2xl font-bold mb-2">
            Expand your career opportunities with Course Programming
          </h2>
          <h3>{`Below you can see some of my projects, already on my Youtubr channel, and also whta I'm preparing guys. Subscribe to the channel and click the Like button, thanks for tth`}</h3>
          <button className="border border-black font-bold text-sm p-2 mt-4 mb-8">
            Code Programming
          </button>
          <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
            {courses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
