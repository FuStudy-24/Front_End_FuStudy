"use client"
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// IMAGES DATA FOR CAROUSEL
interface Data {
    imageSrc: string; // Thay đổi tên thuộc tính để không chứa khoảng trắng
}

const data: Data[] = [
    {
        imageSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imageSrc: "/assets/carousel/fedex.svg"
    },
    {
        imageSrc: "/assets/carousel/google.svg"
    },
    {
        imageSrc: "/assets/carousel/hubspot.svg"
    },
    {
        imageSrc: "/assets/carousel/microsoft.svg"
    },
    {
        imageSrc: "/assets/carousel/walmart.svg"
    },
    {
        imageSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imageSrc: "/assets/carousel/fedex.svg"
    }
]

// CAROUSEL SETTINGS
export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };

        return (
            <div className='text-center my-20'>
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-midnightblue text-2xl font-semibold">Trusted by companies of all sizes</h2>
                    <div className="py-14">
                        <Slider {...settings}>
                            {data.map((item, i) =>
                                <div key={i}>
                                    <Image src={item.imageSrc} alt={item.imageSrc} width={116} height={36} />
                                </div>
                            )}
                        </Slider>
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}
