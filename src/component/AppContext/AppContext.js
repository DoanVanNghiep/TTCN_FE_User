"use client";
import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialData = {
  //   getAllUser: {},
  modalStudyScheduleOpen: false,
  modalDownloadOpen: false,
  modalLoginOpen: false,
  modalRegisterOpen: false,
  modalRegisterAccOpen: false,
  consultingRegisterOpen: false,
  modalForgetPasswordOpen: false,
  modalUploadAvatar : false,
  listDataDocument: [],
  studyScheduleDetail: [],
  expand: false,
  //   drawerOpen: false,
  //   userID: null,
  isLogin: false
};

const reducer = (state, action) => {
 
  switch (action.type) {
    case "getDocument":
      return { ...state, listDataDocument: action.payload };
    case "modalUploadAvatarOpen" :
      return {...state,   modalUploadAvatar : true,}
      case "modalUploadAvatarClose" :
      return {...state,   modalUploadAvatar : false,}
    case "modalDownloadOpen":
      return { ...state, modalDownloadOpen: true, userID: action.payload };
    case "modalDownloadClose":
      return { ...state, modalDownloadOpen: false };
    case "modalLoginOpen":
      return { ...state, modalLoginOpen: true };
    case "modalLoginClose":
      return { ...state, modalLoginOpen: false };
    case "isLogin": 
      return{...state, isLogin: action.payload}
    case "modalForgetPasswordOpen":
      return { ...state, modalForgetPasswordOpen: true };
    case "modalForgetPasswordClose":
      return { ...state, modalForgetPasswordOpen: false };
    case "modalRegisterOpen":
      return { ...state, modalRegisterOpen: true };
    case "modalRegisterClose":
      return { ...state, modalRegisterOpen: false };
    case "modalRegisterAccOpen":
      return { ...state, modalRegisterAccOpen: true };
    case "modalRegisterAccClose":
      return { ...state, modalRegisterAccOpen: false };
    case "modalStudyScheduleOpen":
      return { ...state, modalStudyScheduleOpen: true };
    case "modalStudyScheduleClose":
      return { ...state, modalStudyScheduleOpen: false };
    case "consultingRegisterOpen":
        return { ...state, consultingRegisterOpen: true };
    case "getStudyScheduleDetail":
      return { ...state, studyScheduleDetail: action.payload };
    case "documentExpand":
      return { ...state, expand: true };
    case "documentCompact":
      return { ...state, expand: false };

    default:
      return state;
  }
};

function AppProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, initialData);

  return (
    <AppContext.Provider value={{ data, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
