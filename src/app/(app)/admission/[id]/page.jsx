/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getAdmissionsById, getAllAdmissions } from "@/api/apiAdmission";
import Link from "next/link";
import AdmissionItem from "../../../../component/admission/AdmissionItem";

async function PageDetailAdmissions({ params }) {
  const { id } = params;
  let itemAdmission = null;
  const resDetailAdmission = await getAdmissionsById(params.id);
  itemAdmission = resDetailAdmission?.data;

  const listAdmission = await getAllAdmissions();
  let admissions = null;
  let sortedAdmissions = [];
  let latestAdmissions = [];
  if (listAdmission) {
    admissions = listAdmission?.data?.items;
    sortedAdmissions = admissions.sort((a, b) => b.id - a.id);
    latestAdmissions = sortedAdmissions.slice(0, 6);
  }

  return (
    <div className="flex flex-col items-center px-4 py-12" style={{
      backgroundColor :"#ffffff"
    }}>
      {/* Bài viết chính */}
      <div className="w-[90%] ">
        <AdmissionItem params={params} />
      </div>
      {/* khối div trên  rounded-lg p-8 mb-12 max-w-[1400px] */}
      {/* Các bài viết nhỏ */}
      <div className="flex flex-wrap justify-center gap-4 w-[90%] " style={{margin:"20px 15px 15px 20px"}}>
        {latestAdmissions.map((item, index) => (
          <div
            key={index}
            className={`group flex flex-col items-center justify-between p-4 rounded-lg shadow-md w-[250px] h-[300px] transition-transform duration-300 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
            } hover:scale-105 hover:shadow-lg`}
          >
            <Link href={`/admission/${item.id}`} className="w-full h-full">
              <div className="relative w-full h-2/3 overflow-hidden rounded-lg mt-4">
                <img
                  src={item?.image}
                  alt="Admission"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-md font-semibold text-gray-800 mt-3 text-center group-hover:text-blue-500">
                {item?.program}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageDetailAdmissions;
