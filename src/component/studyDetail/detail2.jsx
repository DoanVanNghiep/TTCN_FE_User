// Dùng chung
function Detail2({ service }) {
  return (
    <div>
      <div className=" mt-[10px] gap-[5px] items-baseline">
        <h3>Mô tả:</h3>
        <ul className="list-disc ml-[5%]">
          {service.detailDescription?.map((item, subIndex) => (
            <li key={subIndex}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail2;
