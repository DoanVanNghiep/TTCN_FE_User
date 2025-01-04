/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  PhoneOutlined,
  EnvironmentFilled,
  MailOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import Image from "next/image";
const listImageFooter = [
  {
    img: "/đv_1.jpg",
  },
  {
    img: "/đv_2.png",
  },
  {
    img: "/đv_3.png",
  },
  {
    img: "/đv_4.png",
  },
  {
    img: "/đv_5.png",
  },
  {
    img: "/đv_6.jpg",
  },
];
function Footer() {
  return (
    <div>
      <div className="bg-[#fff] mx-[auto]">
        <div className=" max-w-[1440px] mx-[10%] ">
          <h2 className="text-[8rem] font-[500] text-center pt-[20rem] pb-[10rem] break-before-column text-[#f79500]">
            Các đơn vị tổ chức thi và cấp chứng chỉ
          </h2>
          <div className=" justify-center pb-[10%] gap-12 grid tablet:grid-cols-6 phone:grid-cols-3">
            {listImageFooter.map((item, index) => (
              <div
                key={index}
                className=" relative mb-[15rem] tablet: col-span-1 phone:col-span-1 m-auto"
              >
                <Image
                  className=" h-fit object-cover"
                  src={item.img}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="px-[3%] bg-[#F3F3F3]  grid  relative  ">
            <div>
              <div className="flex">
                <img
                  src="/logoCamTrongSuot.png"
                  alt=""
                  className="  h-[38rem] w-[50rem] relative left-[-6px] top-[-9px] phone:w-[37rem] phone:left-[-32px] " //phone:hidden
                />
                <h2 className=" mb-[6px] text-[#fb9400] mt-[54px] text-8xl font-medium absolute  phone:left-[22rem] tablet:left-[24rem] laptop:left-[31rem]">
                  EduStar
                </h2>
              </div>
              <p className="w-[65rem] text-[#fb9400] absolute top-[20rem] phone:left-[22rem] tablet:left-[24rem] laptop:left-[31rem]  ">
                Make English become your power
              </p>
            </div>
            {/* grid-cols-3 */}
            <div className=" ml-[28rem] row-span-1 grid laptop:grid-cols-3  phone:ml-[7rem] laptop:ml-[10rem] ">
              <div className=" col-span-1  ">
                <div className="flex  items-center mb-[3rem] ">
                  <PhoneOutlined className="text-[7rem] w-[17%] text-[#F69050]" />
                  <h3 className="w-[30%] phone:w-[25%] text-[16px] ">
                    {" "}
                    Liên hệ
                  </h3>
                  <h3 className="w-[38%] phone:w-[70%] text-[16px] ">
                    {" "}
                    0978 476 980 hoặc 0961 174 239
                  </h3>
                </div>
                <div className="flex items-center mb-[3rem] laptop:grid-cols-2">
                  <EnvironmentFilled className="text-[7rem] w-[20%] text-[#F69050]" />
                  <h3 className="w-[30%] phone:w-[31%] text-[16px]">Địa chỉ</h3>
                  <h3 className="w-[85%] text-[16px]">
                    {" "}
                    Công ty Cổ phần Giáo dục EduStar
                  </h3>
                </div>
                <div className="flex items-center mb-[3rem]">
                  <MailOutlined className="text-[7rem] w-[14.8%] text-[#F69050]" />
                  <h3 className="w-[30%] phone:w-[22.8%] text-[16px]">Email</h3>
                  <h3 className="w-[50%] text-[16px] ">
                    edustar1910@gmail.com
                  </h3>
                </div>
                <div className="flex items-center mb-[3rem] ">
                  <div>
                    <a
                      href="https://www.facebook.com/ngoaingu.edustar"
                      className="w-[10%]"
                    >
                      <img src="/facebook-blue.png" alt="" width={30} />
                    </a>
                  </div>
                  <h3 className="w-[30%] ml-[37px] phone:w-[32%] tablet:w-[23%] text-[16px] ">
                    Facebook
                  </h3>
                  <h3 className="w-[50%] text-[16px] ">Ngoại ngữ EduStar</h3>
                </div>
              </div>

              <div className="col-span-1 w-[70rem] mb-[20px] mt-[0] ml-[auto] ">
                <h2 className="text-[#F69050] ">Dịch vụ</h2>
                <div className="flex ">
                  <RightSquareOutlined className="text-[#F69050] mr-[5px] " />
                  <a href="/vstep" className="text-[#7B7B7D]">
                    Luyện thi VSTEP
                  </a>
                </div>
                <div className="flex ">
                  <RightSquareOutlined className="text-[#F69050] mr-[5px] " />
                  <a href="/aptis" className="text-[#7B7B7D]">
                    Luyện thi APTIS
                  </a>
                </div>
                <div className="flex ">
                  <RightSquareOutlined className="text-[#F69050] mr-[5px] " />
                  <a href="/vstep" className="text-[#7B7B7D]">
                    Luyện thi TOEIC
                  </a>
                </div>
                <div className="flex ">
                  <RightSquareOutlined className="text-[#F69050] mr-[5px] " />
                  <a href="/ielts" className="text-[#7B7B7D]">
                    Luyện thi IELTS
                  </a>
                </div>
                <div className="flex ">
                  <RightSquareOutlined className="text-[#F69050] mr-[5px] " />
                  <a href="/englishacademic" className="text-[#7B7B7D]">
                    Luyện thi Anh Ngữ Học Thuật
                  </a>
                </div>
              </div>
              <div className="col-span-1 w-[70rem]  my-[0] ml-[auto] ">
                <h2 className="text-[#F69050]">Lịch làm việc</h2>
                <div>
                  <p className="text-[#7B7B7D]">Tư vấn 24/24</p>
                  <p className="text-[#7B7B7D] mb-[5rem] ">Thi thử miễn phí</p>
                </div>
                <div>
                  <p className="text-[#7B7B7D]">Lịch ôn tập các chứng chỉ</p>
                  <p className="text-[#7B7B7D]">Lịch thi các trường Đại học</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-solid border-transparent  px-[3%] py-[2%]  bg-[#EAEAEA]"></div>
    </div>
  );
}

export default Footer;
