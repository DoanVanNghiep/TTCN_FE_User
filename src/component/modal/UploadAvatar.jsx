import { ProForm, ProFormUploadButton } from "@ant-design/pro-components";
import { Button, Form, Modal, message, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getUserProfile, updateAvatar, uploadImage } from "../../api/user";
import { AppContext } from "../AppContext/AppContext";
import "./style.css";

function UploadAvatar(props) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const { data, dispatch } = useContext(AppContext);
  const [userProfile, setUserProfile] = useState({});

  const { modalUploadAvatar } = data;

  const handleGetInforUser = () => {
    getUserProfile().then((res) => {
      setUserProfile(res?.data?.data);
    });
  };

  const handleUploadAvatar = (values) => {
    updateAvatar(values).then((res) => {
      if (res?.data?.success) {
        message.success("Cập nhật ảnh đại diện thành công");
        handleGetInforUser();
        dispatch({ type: "modalUploadAvatarClose" });
      } else if (res?.data?.error?.statusCode === 2) {
        message.error(res?.data?.error?.message);
      }
    });
  };
  useEffect(() => {
    handleGetInforUser();
  }, []);

  const handleUpload = async (file) => {
    const res = await uploadImage(file.file);
    console.log("res upload avatar", res);

    if (res?.data?.success) {
      setListFile([{ url: res?.data?.data?.downloadUrl }]);
      setFieldFile(res?.data?.data?.downloadUrl);
      notification.success({ message: "Tải file lên thành công" });
      //   handleGetInforUser();
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };
  return (
    <div>
      <Modal
        open={modalUploadAvatar}
        footer={[]}
        onCancel={() => {
          dispatch({ type: "modalUploadAvatarClose" });
        }}
      >
        <ProForm
          onFinish={(values) => handleUploadAvatar(values)}
          submitter={false}
        >
          <ProFormUploadButton
            name="avatar"
            label="Avatar"
            title="Click to upload"
            fileList={listFile}
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống ảnh",
              },
            ]}
            transform={(value) => {
              return {
                avatar: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
              };
            }}
            fieldProps={{
              listType: "picture-card",
              method: "POST",
              name: "file",
              customRequest: handleUpload,
              multiple: true,
              onRemove: () => setListFile([]),
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file:: ", file);
              },
            }}
            action="https://service.edustar.com.vn/file/upload"
          />
          <Form.Item>
            <Button
              // className="bg-white text-black ml-1.5"
              style={{ border: "1px solid #d9d9d9" }}
              type="primary"
              htmlType="submit"
            >
              Đồng ý
            </Button>{" "}
            <Button
              style={{
                border: "1px solid #d9d9d9",
                backgroundColor: "#fff",
                color: "black",
              }}
              onClick={() => {
                dispatch({ type: "modalUploadAvatarClose" });
              }}
              type="primary"
            >
              Hủy
            </Button>{" "}
          </Form.Item>
        </ProForm>
      </Modal>
    </div>
  );
}

export default UploadAvatar;
