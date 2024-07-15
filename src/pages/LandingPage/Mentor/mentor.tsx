"use client";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAllMentorVerify } from "@/lib/service/mentorService";
import Link from "next/link";

// CAROUSEL SETTINGS

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        background: "#D5EFFA",
        padding: "28px",
        borderRadius: "30px",
        border: "1px solid #1A21BC",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#D5EFFA",
        padding: "28px",
        borderRadius: "30px",
        border: "1px solid #1A21BC",
      }}
      onClick={onClick}
    />
  );
}

const MultipleItems = () => {
  const [mentors, setMentors] = useState<any[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getAllMentorVerify();
        setMentors(response.data.data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    speed: 4000,
    nextArrow: (
      <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />
    ),
    prevArrow: (
      <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />
    ),
    autoplaySpeed: 4500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="py-10 sm:py-24 bg-paleblue" id="mentor">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8 relative">
        <h2 className="lh-82 text-midnightblue text-4xl md:text-55xl text-center md:text-start font-semibold">
          Meet with our <br /> mentor.
          <Link href={'/mentor'} className="text-Blueviolet text-lg font-medium space-links absolute right-0 ">All mentor&nbsp;&gt;&nbsp;</Link>
        </h2>
        

        <Slider {...settings}>
          {mentors.map((mentor, i) => (
            <div key={i}>
              <div className="m-3 py-14 md:my-10 text-center">
                <div className="relative">
                <Image 
                  width={100}
                  height={100}
                src={mentor.user.avatar}
                alt="user-avatar"
                className="w-32 h-32 rounded-full mb-[50px] inline-block m-auto "
              />
                  <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
                    <Image
                      src={"/assets/mentor/linkedin.svg"}
                      alt="linkedin-image"
                      width={25}
                      height={24}
                    />
                  </div>
                </div>
                <div className="-mt-10">
                  <h3 className="text-2xl font-semibold text-lightblack">
                    {mentor.user.fullname}
                  </h3>
                  <h4 className="text-lg font-normal text-lightblack pt-2 opacity-50">
                    {mentor.profession}
                  </h4>
                  <p className="text-md font-normal text-lightblack pt-2 opacity-70">
                    {mentor.academicLevel} at {mentor.workPlace}
                  </p>
                  <p className="text-md font-normal text-lightblack pt-2 opacity-70">
                    Skill: {mentor.skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleItems;
