import {base_url} from "./baseURL"
// const base_url = "http://localhost:8080/"

export const getAllNews = async (params) => {
  
  // const response = await fetch('https://service.edustar.com.vn/news/all'); 
  const response = await fetch(`${base_url}/news/all`); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};
export const getNewsById = async (id) => {
  const response = await fetch(`${base_url}/news/${id}`); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  
};

