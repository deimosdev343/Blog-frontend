"use client";

import { loginUser, logoutUser, useAppDispatch } from '@/lib/store';
import { UserDataPayload } from '@/types/userTypes';
import React, { useEffect } from 'react'

const AuthHydration = ({user} : {user?: UserDataPayload}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(user) {
      dispatch(loginUser(user));
    }
    else {
      dispatch(logoutUser());
    }
  }, [dispatch, user]);
  return (
    <></>
  )
}

export default AuthHydration