"use client";

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../../lib/store'

export default function ReduxProvider({
  children
}: {children: React.ReactNode}) {

  const reduxRef = useRef<AppStore>(null);
  if(!reduxRef.current) {
    reduxRef.current = makeStore();
  }
  return (
    <Provider store={reduxRef.current}>
      {children}
    </Provider>
  )
}

