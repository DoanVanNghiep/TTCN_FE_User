/* eslint-disable @next/next/no-img-element */

import BannerToeic from "@/component/banner/BannerToeic";
import Advantage from "@/component/introduce/advantage";
import Course from "@/component/studyDetail/course";
import CourseDetail from "@/component/studyDetail/couseDetail";
import AnotherCoures from "@/component/course/AnotherCoures";
import FormRegister from "@/component/form/FormRegister";
import { getServiceById } from "@/api/apiService";
import { getSlideById } from "@/api/apiSlide";

async function PageToeic(props) {
  const serviceId = await getServiceById(11);
  let service = [];
  if (serviceId) {
    service = serviceId?.data;
  }

  const slideId1 = await getSlideById(7);
  let slidebyId1 = [];
  if (slideId1) {
    slidebyId1 = slideId1?.data;
  }

  const slideId2 = await getSlideById(8);
  let slidebyId2 = [];
  if (slideId2) {
    slidebyId2 = slideId2?.data;
  }

  return (
    <div>
      <BannerToeic />
      <div className=" mx-[auto] max-w-[1440px]">
        <div className="mx-[10%]">
          <div>
            <h2 className="title">Ưu điểm của chúng tôi </h2>
            <div className="justify-between grid gap-12 phone:grid-cols-1 tablet:grid-cols-2">
              <Advantage />
            </div>
          </div>
          <>
            <h2 className="title">Thông tin khóa học </h2>
            <Course service={service} />
          </>
          <br />

          <>
            <CourseDetail service={service} />
          </>

          <div className="">
            <img
              src={slidebyId1?.image}
              className="w-full "
              alt="toeic3"
              width={950}
              height={347}
            />
          </div>
          <div>
            <h2 className="title ">Lộ trình học</h2>
            <div className="grid grid-cols-3">
              <img
                src={slidebyId2?.image}
                className=" h-full w-full object-cover col-span-3"
                alt="pic"
                height={520}
                width={1043}
              />
            </div>
          </div>

          <div>
            <h2 className="text-[8rem] font-[500] text-center mb-[10rem] break-before-column text-[#f79500]">
              Các chương trình học khác
            </h2>
            <AnotherCoures />
          </div>
          <div id="resgister">
            <h2 className="title">Đăng ký tư vấn</h2>
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageToeic;
