"use client";
import React, { useEffect, useState } from "react";
import { getNewsById } from "@/api/apiNews";

function NewItem({ params }) {
  // console.log("params", params);
  const [newItem, setNewItem] = useState();
  useEffect(() => {
    getNewsById(params.id).then((res) => {
      const data = res?.data;
      setNewItem(res?.data);
    });
  }, [params.id]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: newItem?.content }}></div>
    </div>
  );
}

export default NewItem;
