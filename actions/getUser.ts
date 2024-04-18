
import { db } from "@/libs/db";
import { Course } from '@prisma/client';

interface Props {
  data: Course
}

export const createCourse = async ({data}: Props) => {

  const newCourse = await db.course.create({
    data: {
      ...data
    },
  });
  
  
}
