import { UserData, UserDataPayload } from "@/types/userTypes";
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
    loginUser(state, action: PayloadAction<UserDataPayload>) {
      console.log(`payload: ${action.payload}`);
      state = {...action.payload, loggedIn: true};
      return state;
    },
    logoutUser(state) {
      state = {
        loggedIn: false,
        username: "",
        email:"",
        avatar_url: ""
      }
      return state;
    }
  }
});


export const makeStore = () => {
  return configureStore({
    reducer:{
      userData: userDataSlice.reducer,
      
    }
  })
}

export const {loginUser, logoutUser} = userDataSlice.actions;

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()