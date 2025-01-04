// import axiosServer from "./axios";
import axios from "./axios";


export const getUserProfile = async (params) => {
  return axios.get('/user/profile/service')
  };
export const updateUser = (values) =>{
  const update = {
    name: values.name,
    email : values.email,
    phone : values.phone,
    dateOfBirth : values.dateOfBirth,
    address : values.address,
  }
    // return axiosServer.put('/user/update', values)
    return axios.put('/user/update', update)
}

export const uploadImage = (file) =>{
  console.log("data res: ",file)
  const formData = new FormData()
  formData.append("file", file)
  return axios.post('/file/upload', formData)
}

export const updateAvatar = (values) =>{
  return axios.put('/user/update/avatar', values)
}