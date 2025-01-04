import React from "react";
import BannerVstep from "@/component/banner/BannerVstep";
import Advertisement from "../vstep/vstep/advertisement";
import RegisterCourseVstep from "@/component/form/RegisterCourseVstep";
import Route from "@/component/route/route";
import AnotherCoures from "@/component/course/AnotherCoures";
import FormRegister from "@/component/form/FormRegister";
import { getDataDisplay } from "@/api/apiDisplay";
import Course from "@/component/course/course";
import { getAllService } from "@/api/apiService";

async function PageVstep(props) {
  const res = await getDataDisplay();
  let adList = [];
  let banner = {};
  if (res) {
    adList = res?.data?.items.slice(1, 4);
    banner = res?.data?.items[0];
  }
  let inforCourses = [];
  const res2 = await getAllService();
  if (res2) {
    inforCourses = res2?.data?.items.slice(3, 5);
  }

  return (
    <div>
      <BannerVstep banner={banner} />

      <div className="max-w-[1440px] desktop:mx-[10%] tablet:mx-[10%] phone:mx-[5%]">
        <Advertisement adList={adList} />
      </div>

      <h2 className="title">Thông tin khóa học </h2>
      <div className="  grid  tablet:grid-cols-2 phone:grid-cols-1  gap-24">
        {inforCourses.map((item, ind) => (
          <Course item={item} key={ind} />
        ))}
      </div>
      <RegisterCourseVstep />

      <div className="max-w-[1440px] desktop:mx-[10%] tablet:mx-[10%] phone:mx-[5%]">
        <>
          <h2 className="title">Lộ trình học và thi</h2>

          <Route />
        </>

        <h2 className="text-[8rem] font-[500] text-center mt-[10rem] mb-[10rem] break-before-column text-[#f79500]">
          Các chương trình học khác
        </h2>
        <AnotherCoures />
        <h2 className="title" id="resgister">
          Đăng ký nhận tư vấn{" "}
        </h2>

        <FormRegister />
      </div>
    </div>
  );
}

export default PageVstep;
