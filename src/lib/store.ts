import { UserData } from "@/types/userTypes";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

const initialUserData : UserData = {
  loggedIn: false,
  email: "",
  username: "",
  avatar_url: ""
}

const userDataSlice = createSlice({
  name:"user",
  initialState: initialUserData,
  reducers: {
    
  }
});

