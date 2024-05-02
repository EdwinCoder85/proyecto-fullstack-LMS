"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { Course, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  course: Course & {
    user: User;
  };
}

export default function CourseCard({ course }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start space-y-[1px] w-72">
      <Image
        src={course.imageUrl}
        alt={course.title}
        className="h-32 w-64"
        width={600}
        height={600}
      />
      <h2 className="font-bold text-md pt-1 text-primary-600">
        {course.title}
      </h2>
      <h2 className="text-xs text-gray-700">{course.user.username}</h2>
      <div className="flex space-x-1">
        <h3 className="text-orange-800 font-bold">{course.vote}</h3>
        <div className="flex items-center">
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
        </div>
        {/* <h3 className="text-xs">{item.students}</h3> */}
      </div>
      <div className="flex space-x-4 items-center">
        <h3 className="text-black font-bold">${course.price}</h3>
        <h3 className="text-gray-800 text-sm line-through">
          {course.oldPrice === 1 ? "" : `$${course.oldPrice}`}
        </h3>
      </div>
      {course.bestSeller ? <span className="text-xs font-semibold bg-amber-200 p-1">Lo más vendido</span> : null}
    </div>
  );
}
