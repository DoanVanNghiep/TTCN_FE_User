// "use client";
import IeltsIntro from "@/component/introduce/IeltsIntro";
import FormRegister from "@/component/form/FormRegister";
import AnotherCoures from "@/component/course/AnotherCoures";
import Course from "@/component/studyDetail/course";
import CourseDetail from "@/component/studyDetail/couseDetail";
import BannerIelts from "@/component/banner/BannerIelts";
import { getServiceById } from "@/api/apiService";
import Image from "next/image";
import { getSlideById } from "@/api/apiSlide";

async function IeltsPage(props) {
  const serviceId = await getServiceById(11);
  let service = [];
  if (serviceId) {
    service = serviceId?.data;
  }

  const slide = await getSlideById(6);
  let slidebyId = [];
  if (slide) {
    slidebyId = slide?.data;
  }

  return (
    <div className="">
      <BannerIelts />
      <div className=" max-w-[1440px] mx-[auto] bg-[#fff] ">
        <div className="mx-[10%]">
          <div>
            <h2 className="title">Giới thiệu tổng quan</h2>
            <IeltsIntro />
          </div>

          <>
            <h2 className="title">Thông tin khóa học </h2>
            <Course service={service} />
          </>
          <>
            <CourseDetail service={service} />
          </>
          <>
            <h2 className="title">Lộ trình học </h2>
            <div className="flex justify-center">
              <Image
                src={slidebyId?.image}
                alt="pic"
                width={900}
                height={423}
              />
            </div>
          </>
          <div className="mt-[7rem]">
            <h2 className="text-[8rem] font-[500] text-center mb-[10rem] break-before-column text-[#f79500]">
              Các chương trình học khác
            </h2>
            <AnotherCoures />
          </div>
          <>
            <h2 className="title" id="resgister">
              Đăng ký nhận tư vấn
            </h2>
            <FormRegister />
          </>
        </div>
      </div>
    </div>
  );
}

export default IeltsPage;
