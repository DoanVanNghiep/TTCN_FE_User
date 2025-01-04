import React from "react";
const contentIntroductVstepb1 = [
  {
    title: "Đối tượng cần chứng chỉ tiếng Anh VSTEP B1",
    description:
      "Học viên chuẩn bị bảo vệ thạc sỹ và chuẩn bị nộp hồ sơ NCS. Học sinh, sinh viên các trường Đại học Cao Đẳng (B1). Những bạn chuẩn bị thi thạc sỹ được miễn thi tiếng Anh đầu vào nếu có chứng chỉ VSTEP B1. Thi công chức hoặc đang là công chức hạng chuyên viên chính.",
  },
  {
    title: "Thời hạn của chứng chỉ B1 VSTEP",
    description:
      "Bằng B1 Vstep của Bộ GD&ĐT theo định dạng cũ sau đại học có giá trị hai năm, B1 Vstep và chứng chỉ B1 châu Âu có giá trị vĩnh viễn. Tuy nhiên, hầu như nhiều đơn vị tại Việt Nam vẫn chỉ công nhận chứng chỉ với thời hạn 2 năm.Bạn có thể thi Vstep B1 bao nhiêu lần tùy ý bạn vì kỳ thi không giới hạn số lượng lần thi. Mặt khác thi càng nhiều thì tốn kém cả về tiền bạc và thời gian. Một lần thi có lệ phí từ 1,5 – 1,8 triệu đồng tùy vào trường tổ chức thi. Do vậy, bạn cần ôn tập lên kế hoạch luyện thi thật tốt trước khi đi thi B1 Vstep.        ",
  },
];
function VstepB1Intro(props) {
  return (
    <div className="grid tablet:grid-cols-2 phone:grid-cols-1 gap-24 mt-[15rem] flex items-center  ">
      <div className="col-span-1 relative block mx-auto pb-[10rem]">
        <div className="image-bottom-vstep-b1  h-[50vh]">
          <img
            src="/doituong_lichthi.png"
            className="w-full h-full object-cover rounded-[15px] z-100  "
            alt=""
          />
        </div>
      </div>
      <div className="col-span-1">
        {contentIntroductVstepb1.map((item, index) => (
          <div className="my-[5rem]" key={index}>
            <h2 className="text-primaryColor font-[600] font-[5.5rem] mb-4">
              {item.title}
            </h2>
            <p className="ml-[2rem] font-[400] text-[4rem] line-clamp-6">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VstepB1Intro;
