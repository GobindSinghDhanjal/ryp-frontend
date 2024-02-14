import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <Link href="/about" passHref>
          <img
            className="banner-mobile"
            src="/images/banner/ryp-banner.jpg"
            alt="deals-images"
          />
            <img
            className="banner-desktop"
            src="/images/banner/ryp-banner-desktop-1.jpg"
            alt="deals-images"
          />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link href="/offers" passHref>
          <img
            className="banner-mobile"
            src="/images/banner/ryp-banner2.jpg"
            alt="deals-images"
          />
            <img
            className="banner-desktop"
            src="/images/banner/ryp-banner2-desktop.jpg"
            alt="deals-images"
          />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
