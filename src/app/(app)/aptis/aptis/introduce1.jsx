import React from "react";
import Image from "next/image";
import pic from "public/16.jpg";
import banner from "public/banner_aptis.png";
function Introduce(props) {
  const list = [
    "Cam kết chất lượng đầu ra bằng văn bản",

    "Thủ tục đơn giản - Lịch học linh hoạt",
    "90% thi đạt ngay lần đầu",
  ];
  return (
    <div className="laptop:h-[65vh]  phone:h-[45vh] overflow-hidden">
      <div className="w-[100vw] relative">
        <Image
          src={banner}
          alt="banner"
          className="w-full laptop:h-[50vh] object-cover  tablet:h-[40vh] phone:h-[30vh]"
        />
        <div className="laptop:ml-[10rem] mt-[20px] leading-loose absolute top-[10rem] left-[8rem] text-white font-medium tablet:top-[3rem] phone:ml-[1rem] phone:top-[2rem] leading-relaxed">
          <h2 className=" text-white laptop:text-[32px] phone:text-[16px]">
            THI CHỨNG CHỈ TIẾNG ANH APTIS B1 - B2
          </h2>

          <h2 className="text-black font-bold laptop:text-[32px] phone:text-[16px]">
            CHUẨN CỦA HỘI ĐỒNG ANH CẤP
          </h2>

          <h3 className="font-semibold laptop:text-[24px] phone:text-[14px]">
            CAM KÊT ĐẦU RA BẰNG VĂN BẢN
          </h3>

          <ul className="list-disc laptop:ml-[20px] phone: ml-[10px] ">
            {list.map((value, ind) => (
              <li key={ind}>
                <p className="laptop:text-[18px] phone:text-[12px]">{value}</p>
              </li>
            ))}
          </ul>
          <button className="block laptop:h-[40px] laptop:w-[140px] rounded-[8px] bg-white text-[#FE9400] font-bold laptop:text-[15px] mx-auto laptop:mt-[30px] uppercase custom-btn tablet:mt-[50px] phone:text-[12px] h-[30px] w-[120px] mt-[1rem] ml-0 ">
            ĐĂNG KÝ TƯ VẤN
          </button>
        </div>
        <div
          className="absolute laptop:h-[400px] laptop:w-[600px] laptop:top-[20%] right-[-10rem] tablet:h-[270px] tablet:w-[400px] tablet:top-[10
          %] phone:h-[170px] phone:w-[240px] phone: top-[40rem]"
        >
          <Image
            src={pic}
            alt="pic"
            className="rounded-[60%] block w-full object-cover  h-full bg-[#383a3b80] shadow-lg shadow-[#383a3b80]"
            objectPosition="center"
          />
        </div>
      </div>
    </div>
  );
}

export default Introduce;
