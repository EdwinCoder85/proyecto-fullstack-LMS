"use client";

import Image from "next/image";
import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface AuthLayoutProps {
  children: ReactNode;
}

const courses = [
  {
    id: 1,
    name: "Machine Learning",
    description: "This course introduces the fundamental concepts and techniques of machine learning, including supervised and unsupervised learning, neural networks, and deep learning algorithms.",
    image: "/images/img_1.jpg",
  },
  {
    id: 2,
    name: "Introduction to Computer Science",
    description: "This course provides an introduction to the key concepts and principles of computer science, including programming in Python, algorithms, and data structures.",
    image: "/images/img_2.jpg",
  },
  {
    id: 3,
    name: "Python Basics for Data Science",
    description: "This course focuses on Python programming for data science applications, covering topics such as data manipulation, data visualization, and basic machine learning algorithms.",
    image: "/images/img_3.jpg",
  },
  {
    id: 4,
    name: "HTML & CSS",
    description: "These courses teach the basics of HTML and CSS, as well as more advanced topics like responsive design and CSS frameworks.",
    image: "/images/img_4.jpg",
  },
];

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 p-5 mx-auto">
      <section className="hidden h-full lg:h-[calc(100vh-7rem)] lg:flex flex-col items-center justify-center gap-y-5 bg-primary rounded-2xl ">
        <div className="w-[90%] h-96 mx-auto relative">
          <Swiper
            modules={[
              Autoplay,
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              EffectFade,
            ]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            effect="fade"
            slidesPerView={1}
            spaceBetween={30}
            className="h-full w-full rounded-2xl"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={course.image}
                  alt={course.name}
                  className="block w-full h-full"
                  width={800}
                  height={800}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                  <p className="text-lg font-semibold">{course.name}</p>
                  {course.description && (
                    <p className="text-sm mt-2">{course.description}</p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <h3 className="text-white text-4xl font-semibold text-center my-5">
            Help You Switch Careers <br /> To Become a Programmer
          </h3>
          <p className="text-gray-300 text-center text-xl">
            Additional Classes that you can learn
          </p>
          <p className="text-gray-300 text-center">anywhere and anytime!</p>
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
