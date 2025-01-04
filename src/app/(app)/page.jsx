/* eslint-disable @next/next/no-img-element */
// "use client";
import Image from "next/image";
import Link from "next/link";
import "animate.css";
import { Button, Col, Row } from "antd";
import StrengthDescription from "@/component/strengDescription/StrengDescription";
import Sliders from "@/component/slider/Slider";
import New from "@/component/news/New";
import FormRegister from "@/component/form/FormRegister";
import Carousels from "@/component/slider/Carousel";
import PopUp from "@/component/PopUp/PopUp";
import { getDataDisplay } from "@/api/apiDisplay";
import { getNewsById } from "@/api/apiNews";

async function Home() {
  const dataDisplay = await getDataDisplay();
  let strengList = [];
  if (dataDisplay) {
    strengList = dataDisplay?.data?.items.slice(45, 51);
  }

  const dataNew = await getNewsById(22);
  let newsById22 = [];
  if (dataNew) {
    newsById22 = dataNew?.data;
  }

  const dataNew23 = await getNewsById(23);
  let newsById23 = [];
  if (dataNew23) {
    newsById23 = dataNew23?.data;
  }

  return (
    <main className="bg-[#fff] mx-[auto]">
      <div className=" ">
        <Carousels />
        {/* banner={banner}  */}
      </div>
      <div className="  mb-[5rem] max-w-[1440px] mx-[10%]">
        <div className="animate__animated  animate__fadeInLeft">
          <div className=" mt-[30rem] text-[#333] grid gap-12 tablet:grid-cols-2 phone:grid-cols-1">
            <div className="col-span-1">
              <Link key={newsById22?.id} href={`new/${newsById22?.id}`}>
                <p
                  dangerouslySetInnerHTML={{ __html: newsById22?.content }}
                  className="font-[400] line-clamp-3 pr-[5%] block  text-[4rem] text-[3.5rem] line-clamp-5 h-[49rem] overflow-hidden"
                ></p>
                <Button className=" ml-auto px-[6rem] h-[12rem] rounded-[12rem] bg-[#FB9400] text-[#FFFFFF] hover:text-[#e7e7e8]  hover:opacity-80 border-none hover:border-none  mr-[35rem] mt-[5rem] block">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
            <div className="col-span-1 desktop:flex flex-row justify-end items-start   phone:hidden">
              <Image
                src={newsById22?.image}
                alt="pic"
                height={660}
                width={458}
              />
            </div>
          </div>
        </div>
        <div className=" mt-[25rem]">
          <h2 className="title">Thế mạnh của chúng tôi</h2>
          <Row gutter={[32, 60]} className="">
            {strengList.map((item, index) => (
              <Col className="mt-[5rem] " lg={8} md={12} sm={24} key={index}>
                <StrengthDescription item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Giới thiệu chương trình anh ngữ  */}
      <div className="my-[30rem]  mb-[120px] animate__animated  animate__fadeInLeft">
        <h2 className="text-[8rem] font-[500] text-center mb-[10rem] break-before-column text-[#f79500]">
          Chương trình Anh ngữ
        </h2>
        <Sliders />
      </div>
      <div className=" mt-[20rem] mb-[5rem] max-w-[1440px] mx-[10%] ">
        <div>
          <h2 className="text-[8rem] font-[500]  text-center mb-[10rem] break-before-column text-[#f79500]">
            Đăng ký tư vấn
          </h2>
          <FormRegister />
        </div>

        <div className="text-[#333]">
          <h2 className="text-[8rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]">
            Đội ngũ giảng viên
          </h2>
          <div className=" grid tablet:grid-cols-2 gap-8 mt-[20rem] justify-around">
            <div className="col-span-1">
              <Link key={newsById23?.id} href={`new/${newsById23?.id}`}>
                <p
                  dangerouslySetInnerHTML={{ __html: newsById23?.content }}
                  className="font-[400] pr-[5%] block  text-[4rem] text-[3.5rem] line-clamp-5 h-[49rem] overflow-hidden"
                ></p>
                <Button className=" ml-auto px-[6rem] h-[12rem] rounded-[12rem] bg-[#FB9400] text-[#FFFFFF] hover:text-[#e7e7e8]  hover:opacity-80 border-none hover:border-none  mr-[35rem] mt-[5rem] block">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
            <div className="h-[60rem] col-span-1">
              <img
                src={newsById23?.image}
                alt=""
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[8rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]">
            Tin tức
          </h2>
          <New />
        </div>
      </div>
      <PopUp />
    </main>
  );
}

export default Home;
