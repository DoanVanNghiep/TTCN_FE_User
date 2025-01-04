// Dùng chung b2 aptis
function Detail({ service }) {
  return (
    <div>
      <div className="flex my-[10px] gap-[5px] items-baseline ">
        <h3>Trình độ đầu vào:</h3> <p>{service.requestStudents}</p>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline ">
        <h3>Số buổi:</h3> <p>{service.numberTeachingSessions}</p>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline">
        <h3>Lịch học:</h3> <p>{service.schedule}</p>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline ">
        <h3>Hình thức học:</h3> <p>{service.learningForm}</p>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline">
        <h3>Lộ trình đào tạo:</h3>
        <ul className="list-disc ml-[5%]">
          {service.curriculum.map((item, subIndex) => (
            <li key={subIndex}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline">
        <h3>Mục tiêu đạt được:</h3> <p>{service.studyGoals}</p>
      </div>
      <div className="flex my-[10px] gap-[5px] items-baseline">
        <h3>Chi phí học:</h3> <p>{service.price}</p>
      </div>
    </div>
  );
}

export default Detail;
