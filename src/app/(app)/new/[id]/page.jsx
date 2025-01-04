/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getNewsById, getAllNews } from "@/api/apiNews";
import Link from "next/link";
import NewItem from "../../../../component/news/NewItem";

async function PageDetailNews({ params }) {
  const { id } = params;
  let itemNew = null;
  const resDetailNew = await getNewsById(params.id);
  itemNew = resDetailNew?.data;

  const listNew = await getAllNews();
  let news = null;
  let sortedNews = [];
  let latestNews = [];
  if (listNew) {
    news = listNew?.data?.items;
    sortedNews = news.sort((a, b) => b.id - a.id);
    latestNews = sortedNews.slice(0, 6);
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="grid laptop:grid-cols-3  gap-[2rem] my-[6%]">
        <div className="laptop:col-span-2  m-[5rem]">
          {/* <div dangerouslySetInnerHTML={{ __html: itemNew?.content }}></div> */}
          <NewItem params={params} />
        </div>
        <div className="col-span-1">
          {latestNews.map((item, index) => (
            <div key={index} className="flex">
              <div className="mb-[30px] phone:ml-[10px] ">
                <Link key={item.id} href={`/new/${item.id}`} className="flex">
                  <img
                    src={item?.image}
                    alt=""
                    width={190}
                    className=" phone:w-[160px] laptop:w-[170px] laptop:h-[160px] laptop:bg-cover  "
                  />
                  <div>
                    <h3 className=" ml-[15px] text-[15px] ">{item?.name} </h3>
                    <p
                      // dangerouslySetInnerHTML={{ __html: item.content }}
                      className="text-[#333]  line-clamp-1 mb-[3rem] ml-[15px] "
                    >
                      {item?.description}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageDetailNews;
