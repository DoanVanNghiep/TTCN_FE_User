/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { getDataDisplay } from "@/api/apiDisplay";
import Link from "next/link";
function AnotherCoures() {
  const [anotherCoures, setAnotherCoures] = useState([]);

  useEffect(() => {
    getDataDisplay()
      .then((data) => {
        setAnotherCoures(data?.data?.items.slice(9, 14));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000 }} // Set the autoplay delay to 2000ms (2 seconds)
        className="mySwiper mx-[100px]"
        breakpoints={{
          120: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        <Row gutter={[0, 6]} className="">
          {anotherCoures.map((item, ind) => (
            <SwiperSlide key={ind} wrapperProps={{ className: " " }}>
              <Col
                span={22}
                className="hover:scale-x-[1.2] hover:scale-y-[1.3] h-[450px] hover:delay-100 hover:duration-300 hover:ease-in-out"
              >
                <img
                  src={item.image}
                  alt="anh"
                  className="w-full h-[300px] object-cover rounded-tl-[5px] rounded-tr-[5px] "
                />
                <h2 className="text-center font-[600] text-[4rem] text-[#333] bg-[#FFF4E5] py-[5rem] ">
                  {item.title}
                </h2>
              </Col>
            </SwiperSlide>
          ))}
        </Row>
      </Swiper>
    </>
  );
}

export default AnotherCoures;
