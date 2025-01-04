import { Collapse, Tabs } from "antd";
// import TableCourse from "../TableCourse";
import TableCourse from "../TableCourse";
import MyDocs from "../MyDocs/MyDocs";

function MyCourse() {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: "Khóa học của tôi",
            key: "1",
            children: <TableCourse />,
          },
          {
            label: "Tài liệu của tôi",
            key: "2",
            children: <MyDocs />,
          },
        ]}
      />
    </>
  );
}

export default MyCourse;
