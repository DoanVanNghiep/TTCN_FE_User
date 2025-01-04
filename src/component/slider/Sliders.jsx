/* eslint-disable @next/next/no-img-element */
// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import { Autoplay, Pagination } from "swiper/modules";
// import { Col, Row } from "antd";

// export default function Sliders() {
//   const imageUrls = [
//     {
//       title: "LUYỆN THI VSTEP",
//       img: "https://images.unsplash.com/photo-1672910059109-19d499a00465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
//     },
//     {
//       title: "LUYỆN THI APTIS",
//       img: "https://plus.unsplash.com/premium_photo-1671105035576-cc0ef98ae2dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
//     },
//     {
//       title: "LUYỆN THI TOEIC",
//       img: "https://images.unsplash.com/photo-1689871176587-29efb3975d5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=269&q=80",
//     },
//     {
//       title: "ANH NGỮ HỌC THUẬT",
//       img: "https://plus.unsplash.com/premium_photo-1680402879257-48ffbbc6db1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
//     },
//     {
//       title: "LUYỆN THI IELTS",
//       img: "https://images.unsplash.com/photo-1689913834525-d5796e2a050a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
//     },
//   ];
//   return (
//     <>
//       <Swiper
//         slidesPerView={2}
//         spaceBetween={10}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Pagination, Autoplay]}
//         autoplay={{ delay: 2000 }} // Set the autoplay delay to 2000ms (2 seconds)
//         className="mySwiper mx-[100px]"
//       >
//         <Row gutter={[0, 6]} className="">
//           {imageUrls.map((item, ind) => (
//             <SwiperSlide
//               key={ind}
//               wrapperProps={{ className: "max-h-[75rem]" }}
//             >
//               <Col span={22}>
//                 <img
//                   src={item.img}
//                   alt=""
//                   className="w-full h-[300px] object-cover"
//                 />
//                 <h2 className="text-center font-[600] text-[4rem] text-[#333] bg-[#FFF4E5] py-[5rem] ">
//                   {item.title}
//                 </h2>
//               </Col>
//               {/* </Col> */}
//             </SwiperSlide>
//           ))}
//         </Row>
//       </Swiper>
//     </>
//   );
// }
