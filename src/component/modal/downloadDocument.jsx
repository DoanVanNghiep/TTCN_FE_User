"use client";
import { Modal, Button, List, Skeleton } from "antd";
import { AppContext } from "../AppContext/AppContext";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { DownloadOutlined } from "@ant-design/icons";
import { getAllDocument } from "@/api/apiDocument";

const DownloadDocument = () => {
  const { data, dispatch } = useContext(AppContext);
  const { modalDownloadOpen } = data;
  const [listDocs, setListDocs] = useState([]);
  const listFreeDocument = listDocs?.filter((data) => data?.status === "FREE");
  useEffect(() => {
    getAllDocument()
      .then((data) => {
        setListDocs(data?.data?.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const showDocumentDownload = async () => {
    dispatch({ type: "modalDownloadOpen" });
  };

  const handleCancelDownload = () => {
    dispatch({ type: "modalDownloadClose" });
  };

  const [expandedItems, setExpandedItems] = useState({});
  const toggleExpand = (itemID) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemID]: !prev[itemID],
    }));
  };
  // const download = () => {};

  return (
    <>
      <div className="mx-[10%] ">
        <Button
          className="custom-btn bg-[#fb9400] text-white  "
          onClick={showDocumentDownload}
        >
          Download tài liệu
        </Button>
      </div>

      <Modal
        title="DANH SÁCH TÀI LIỆU"
        open={modalDownloadOpen}
        onCancel={handleCancelDownload}
        width={708}
        className="max-h-[867px] laptop:w-[790px] tablet:w-[508px] phone:w-[340px] rounded-[38px] "
        footer={[]}
      >
        <Skeleton loading={!listFreeDocument ? true : false}>
          <List>
            {listFreeDocument.map((item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Image src={item.image} alt="pic" height={50} width={50} />
                  }
                  title={<h2>{item.name}</h2>}
                  description={
                    expandedItems[item.id]
                      ? item.content
                      : item.content.slice(0, 40) + "..."
                  }
                />

                {item.content.length > 40 && (
                  <Button onClick={() => toggleExpand(item.id)}>
                    {expandedItems[item.id] ? "Rút gọn" : "Xem thêm"}
                  </Button>
                )}
                <Button
                  href={item.file}
                  className="custom-btn ml-[5%] flex items-center bg-[#fb9400] text-white "
                >
                  <DownloadOutlined />
                  Download
                </Button>
              </List.Item>
            ))}
          </List>
        </Skeleton>
      </Modal>
    </>
  );
};
export default DownloadDocument;
