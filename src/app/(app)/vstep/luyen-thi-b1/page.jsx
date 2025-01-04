import React from "react";
import BannerVstepB1 from "@/component/banner/BannerVstepB1";
import RegisterCourseVstep from "@/component/form/RegisterCourseVstep";
import Route from "@/component/route/route";
import AnotherCoures from "@/component/course/AnotherCoures";
import FormRegister from "@/component/form/FormRegister";
import { getServiceById } from "@/api/apiService";
import Detail from "@/component/studyDetail/detail";
import Detail2 from "@/component/studyDetail/detail2";
import DownloadDocument from "@/component/modal/downloadDocument";
import CourseDetail from "@/component/studyDetail/couseDetail";
import Image from "next/image";

async function PageVstepB1(props) {
  const res2 = await getServiceById(14);
  let service = [];
  if (res2) {
    service = res2?.data;
  }
  return (
    <div>
      <BannerVstepB1 />
      <div className="mx-[auto] max-w-[1440px]">
        <div className="mx-[10%] ">
          <div dangerouslySetInnerHTML={{ __html: service?.content }}></div>

          <h2 className="title">Thông tin khóa học</h2>
          <div className="grid laptop:grid-rows-2 ">
            <div className="row-span-1 grid laptop:grid-cols-2 phone:grid-cols-1 gap-48">
              <div className="col-span-1 flex items-center">
                <div>
                  <Image
                    src={service.image}
                    alt="pic"
                    className="object-cover rounded-[15px] z-100"
                    width={600}
                    height={336}
                  />
                </div>
              </div>
              <div className="col-span-1 relative ">
                <h2 className="titleAptisB1">KHÓA ÔN B1</h2>
                <Detail service={service} />
              </div>
            </div>
            <div className="row-span-1 laptop:w-[80%] phone:w-[100%]">
              <Detail2 service={service} />
            </div>
          </div>
        </div>
        <DownloadDocument />
        <>
          <CourseDetail service={service} />
        </>
        <RegisterCourseVstep />
        <div className=" mx-[10%] ">
          <>
            <h2 className="title">Lộ trình học và thi</h2>
            <Route />
          </>
          <h2 className="title"> Các chương trình học khác</h2>
          <AnotherCoures />
          <h2 className="title" id="resgister">
            Đăng ký nhận tư vấn{" "}
          </h2>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}

export default PageVstepB1;
