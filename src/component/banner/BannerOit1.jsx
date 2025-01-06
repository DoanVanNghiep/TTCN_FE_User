import React from "react";
import { getDataDisplay } from "../../api/apiDisplay";
import ButtonBanner from "../Button/Button";

async function BannerOit0() {
  const res = await getDataDisplay();
  let proit = {};
  if (res) {
    proit = res?.data?.items?.[60] || {}; // Lấy dữ liệu tại mục số 60
  }

  return (
    <>
      <div className="w-[100%] relative">
        <img
          style={{ height: "300px" }}
          src={proit.image || "/S9.png"}
          className="w-full h-[73vh] object-cover"
          alt={proit.title || "Banner Image"}
        />
        
        <div className="laptop:w-[50%] phone:w-[80%] mx-auto text-center absolute top-[15%] left-[50%] translate-x-[-50%] border-[10px] p-[3%] border-primaryColor border-solid text-[#020202]">
          <h2 className="laptop:text-[8rem] phone:font-[700] my-[5%] uppercase">
            {proit.title || "Tin Học Văn Phòng từ cơ bản đến nâng cao "}
          </h2>
          <p className="text-[4.5rem] font-[500] line-clamp-6 h-[41rem]">
            {proit.description ||
              "Đào tạo kĩ năng cần thiết cho người học về ứng dụng tin học trong công việc và chiến lược học tập rõ ràng đối với chương trình đào tạo chứng chỉ kỹ năng. Các chuyên gia của EduStar sẽ tư vấn cho bạn lộ trình học tập phù hợp nhất."}
          </p>
          <ButtonBanner />
        </div>
      </div>
    </>
  );
}

export default BannerOit0;
