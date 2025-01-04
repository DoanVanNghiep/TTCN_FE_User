// "use client";
// import { Image } from "antd";
// import React, { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import { getUserProfile } from "@/api/user";
// import UploadAvatar from "@/component/modal/UploadAvatar";
// import { AppContext } from "@/component/AppContext/AppContext";

// function PageUsers(props) {
//   const [userProfile, setUserProfile] = useState({});
//   const { data, dispatch } = useContext(AppContext);

//   const handleGetInforUser = () => {
//     getUserProfile().then((res) => {
//       setUserProfile(res?.data?.data);
//     });
//   };

//   const showModalUploadAvatar = () => {
//     dispatch({ type: "modalUploadAvatarOpen" });
//   };

//   useEffect(() => {
//     handleGetInforUser();
//   }, []);

//   return (
//     <>
//       <div style={{ margin: "45px auto", maxWidth: "1440px" }}>
//         <div className="mx-[10%]">
//           <div className="w-[187.5rem]  m-[auto] bg-white border-2 border-solid border-[#808080/40]">
//             <div className="grid gap-12 tablet:grid-cols-3  phone:grid-cols-1 flex-row items-center justify-evenly mx-[10rem] my-[10px] ">
//               <Image
//                 src={userProfile?.avatar}
//                 alt="avatar"
//                 height={150}
//                 width={150}
//                 className="col-span-1 phone:mx-auto my-[10px] "
//               />
//               <button
//                 onClick={() => {
//                   showModalUploadAvatar();
//                 }}
//                 className="custom-btn mr-[4rem] block px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full col-span-1 "
//               >
//                 Tải ảnh đại diện mới
//               </button>
//               <button className="custom-btn  px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full  col-span-1">
//                 <Link href="/user/edit-account">Đổi mật khẩu</Link>
//               </button>
//             </div>
//             <div className="mt-10px">
//               <div className="mb-[3rem] ">
//                 <p className="mx-[4rem]">Họ và tên: </p>
//                 <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem] ">
//                   {userProfile?.name}
//                 </p>
//               </div>
//               <div className="mb-[3rem]">
//                 <p className="mx-[4rem]">Tên tài khoản: </p>
//                 <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem] ">
//                   {userProfile?.username}
//                 </p>
//               </div>
//               <div className="mb-[3rem]">
//                 <p className="mx-[4rem]">Email: </p>
//                 <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem] ">
//                   {userProfile?.email}
//                 </p>
//               </div>
//               <div className="mb-[3rem]">
//                 <p className="mx-[4rem]">Số điện thoại: </p>
//                 <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem] ">
//                   {userProfile?.phone}
//                 </p>
//               </div>
//               <div className="mb-[3rem]">
//                 <p className="mx-[4rem]">Địa chỉ: </p>
//                 <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem] ">
//                   {userProfile?.address}
//                 </p>
//               </div>
//             </div>
//             <div className="flex justify-end m-[10rem]  ">
//               <Link
//                 className="bg-[#FB9400] hover:opacity-80 px-[5rem] border-solid	rounded-[2rem] text-white py-[6px] "
//                 href="/user/edit-profile"
//               >
//                 Chỉnh sửa
//               </Link>
//               <UploadAvatar />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PageUsers;

"use client";
import { Image, Button, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getUserProfile } from "@/api/user";
import UploadAvatar from "@/component/modal/UploadAvatar";
import { AppContext } from "@/component/AppContext/AppContext";

function PageUsers(props) {
  const [userProfile, setUserProfile] = useState(null); // Đặt ban đầu là null để kiểm tra loading
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const { data, dispatch } = useContext(AppContext);

  const handleGetInforUser = async () => {
    try {
      const res = await getUserProfile();
      setUserProfile(res?.data?.data || {}); // Đảm bảo dữ liệu không null
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi dữ liệu tải xong
    }
  };

  const showModalUploadAvatar = () => {
    dispatch({ type: "modalUploadAvatarOpen" });
  };

  useEffect(() => {
    handleGetInforUser();
  }, []);

  if (loading) {
    return <Skeleton active />; // Hiển thị loading khi đang fetch dữ liệu
  }

  return (
    <div style={{ margin: "45px auto", maxWidth: "1440px" }}>
      <div className="mx-[10%]">
        <div className="w-[187.5rem] m-[auto] bg-white border-2 border-solid border-[#808080/40]">
          <div className="grid gap-12 tablet:grid-cols-3 phone:grid-cols-1 flex-row items-center justify-evenly mx-[10rem] my-[10px]">
            <Image
              src={userProfile?.avatar || "/default-avatar.png"} // Thêm avatar mặc định nếu không có avatar
              alt="avatar"
              height={150}
              width={150}
              className="col-span-1 phone:mx-auto my-[10px]"
            />
            <Button
              onClick={showModalUploadAvatar}
              className="custom-btn mr-[4rem] block px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full col-span-1"
            >
              Tải ảnh đại diện mới
            </Button>
            <Button className="custom-btn px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full col-span-1">
              <Link href="/user/edit-account">Đổi mật khẩu</Link>
            </Button>
          </div>

          <div className="mt-10px">
            {/* Hiển thị thông tin người dùng */}
            <div className="mb-[3rem]">
              <p className="mx-[4rem]">Họ và tên: </p>
              <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem]">
                {userProfile?.name || "Chưa cập nhật"}
              </p>
            </div>
            <div className="mb-[3rem]">
              <p className="mx-[4rem]">Tên tài khoản: </p>
              <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem]">
                {userProfile?.username || "Chưa cập nhật"}
              </p>
            </div>
            <div className="mb-[3rem]">
              <p className="mx-[4rem]">Email: </p>
              <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem]">
                {userProfile?.email || "Chưa cập nhật"}
              </p>
            </div>
            <div className="mb-[3rem]">
              <p className="mx-[4rem]">Số điện thoại: </p>
              <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem]">
                {userProfile?.phone || "Chưa cập nhật"}
              </p>
            </div>
            <div className="mb-[3rem]">
              <p className="mx-[4rem]">Địa chỉ: </p>
              <p className="border-solid border-[1px] rounded-[2rem] border-neutral-600 px-[2rem] py-[2rem] mt-[4rem] mx-[4rem]">
                {userProfile?.address || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex justify-end m-[10rem]">
            <Link
              className="bg-[#FB9400] hover:opacity-80 px-[5rem] border-solid rounded-[2rem] text-white py-[6px]"
              href="/user/edit-profile"
            >
              Chỉnh sửa
            </Link>
            <UploadAvatar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageUsers;
