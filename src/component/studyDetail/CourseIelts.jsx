import { Button, Col } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { getServiceById } from "../../api/apiService";

const serviceId = await getServiceById(11);
let service = [];
if (serviceId) {
  service = serviceId?.data;
}
function CourseIelts(props) {
  const { data, dispatch } = useContext(AppContext);
  const showConsultinRegister = () => {
    dispatch({ type: "consultingRegisterOpen" });
  };
  return (
    <div>
      <Col
        span={20}
        className=" shadow-xl rounded-[10px] overflow-hidden mx-auto"
      >
        <h2 className="uppercase text-[5rem] font-[700] py-[2rem] bg-primaryColor text-[#fff] text-center">
          {service?.name}
        </h2>
        <div className="px-[5%] py-[5%]  ">
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Trình độ đầu vào:</h3> <p>{service?.requestStudents}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Số buổi:</h3> <p>{service?.numberTeachingSessions}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Lịch học:</h3> <p>{service?.schedule}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Hình thức học:</h3> <p>{service?.learningForm}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Lộ trình đào tạo:</h3>
            <ul className="list-disc ml-[5%]">
              {service?.curriculum?.map((item, subIndex) => (
                <li key={subIndex}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            {service?.description}
          </div>
          <Button
            className="mx-auto block  bg-primaryColor custom-btn uppercase hover:text-[#fff]"
            onClick={() => {
              showConsultinRegister();
            }}
          >
            Đăng ký học{" "}
          </Button>
        </div>
      </Col>
    </div>
  );
}

export default CourseIelts;
