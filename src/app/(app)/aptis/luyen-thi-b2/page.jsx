import React from "react";
import Intro from "@/component/banner/BannerAptisB2";
import Image from "next/image";
import Detail from "@/component/studyDetail/detail";
import Detail2 from "@/component/studyDetail/detail2";
import RegisterCourseVstep from "@/component/form/RegisterCourseVstep";
import Route from "@/component/route/route";
import AnotherCoures from "@/component/course/AnotherCoures";
import FormRegister from "@/component/form/FormRegister";
import DownloadDocument from "@/component/modal/downloadDocument";
import ButtonPayment from "@/component/Button/ButtonPayment";
import { getServiceById } from "@/api/apiService";
import CourseDetail from "@/component/studyDetail/couseDetail";

async function PageAptisB2(props) {
  const res2 = await getServiceById(17);
  let service = [];
  if (res2) {
    service = res2?.data;
  }

  return (
    <section>
      <Intro />
      <div style={{ margin: "0 auto", maxWidth: "1440px" }}>
        <div
          className=" mx-[10%]"
          dangerouslySetInnerHTML={{ __html: service?.content }}
        ></div>
        <div className="mx-[10%]">
          <h2 className="title">Thông tin khóa học</h2>
          <div className="grid laptop:grid-rows-2 ">
            <div className="row-span-1 grid laptop:grid-cols-2 phone:grid-cols-1 gap-48">
              <div className="col-span-1 flex items-center">
                <div>
                  <Image
                    src={service?.image}
                    alt="pic"
                    className="object-cover rounded-[15px] z-100"
                    width={600}
                    height={336}
                  />
                </div>
              </div>
              <div className="col-span-1 relative ">
                <h2 className="titleAptisB1">KHÓA ÔN B2</h2>
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
        <div className="mx-[10%]">
          <h2 className="title">Lộ trình học và thi</h2>
          <Route />
          <h2 className="title"> Các chương trình học khác</h2>
          <AnotherCoures />

          <h2 className="title" id="resgister">
            Đăng ký nhận tư vấn
          </h2>
          <FormRegister />
        </div>
      </div>
    </section>
  );
}

export default PageAptisB2;
