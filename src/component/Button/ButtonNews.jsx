import { Button } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ButtonNews(props) {
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    getAllNews()
      .then((data) => {
        setNewList(data?.data?.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <Link key={item.id} href={`new/${item.id}`}>
        <Button
          className="block ml-auto bg-[#FB9400] hover:bg-[#ffc00d] !important"
          type="primary"
        >
          {" "}
          Xem thêm
        </Button>
      </Link>
    </div>
  );
}

export default ButtonNews;
