import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
          <img
            src="https://kvstechbuddies.com/wp-content/uploads/2021/11/student-discounts-milshop.jpg"
            alt="deals-images"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://couponswala.com/blog/wp-content/uploads/2022/02/flipkart-min.png.webp"
            alt="deals-images"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://kvstechbuddies.com/wp-content/uploads/2021/11/student-discounts-milshop.jpg"
            alt="deals-images"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://kvstechbuddies.com/wp-content/uploads/2021/11/student-discounts-milshop.jpg"
            alt="deals-images"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
