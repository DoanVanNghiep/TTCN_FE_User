/* eslint-disable @next/next/no-img-element */
// "use client";
import { Carousel } from "antd";
import { getAllSlide } from "@/api/apiSlide";
// import { useEffect, useState } from "react";
//{ banner }
async function Carousels() {
  // const [banner, setBanner] = useState();
  const data = await getAllSlide();
  let banner = [];
  if (data) {
    banner = data?.data?.items.slice(0, 4);
  }

  // useEffect(() => {
  //   getAllSlide()
  //     .then((data) => {
  //       setBanner(data?.data?.items.slice(0, 4));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <div className="mt-[51px] ">
      <Carousel autoplay>
        {banner?.map((item, index) => (
          <div
            className=" text-center bg-[#364d79] w-[100vw] h-[50vh]"
            key={index}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
              height={100}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousels;
