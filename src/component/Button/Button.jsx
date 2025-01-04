"use client";
import React, { useContext } from "react";
import { Button } from "antd";
import RegisterAccountModal from "../modal/RegisterAccountModal";
import { AppContext } from "../AppContext/AppContext";

function ButtonBanner(props) {
  const { data, dispatch } = useContext(AppContext);
  const showModalConsulting = () => {
    dispatch({ type: "modalRegisterAccOpen" });
  };
  return (
    <div>
      <Button
        className="custom-btn bg-[#fb9400] text-white  "
        onClick={() => {
          showModalConsulting();
        }}
      >
        ĐĂNG KÝ TƯ VẤN
      </Button>
      <RegisterAccountModal />
    </div>
  );
}

export default ButtonBanner;
