import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
type ApiResponseError = {
  msg: string
}


export const GET = async (req: NextRequest) => {
  try {
    const backendRes = await axios.get('/')
  } catch (err) {
    console.log(err);
    const axErr = err as AxiosError<ApiResponseError>;
    console.log(axErr.response);
    return NextResponse.json(
      {msg:axErr.response?.data?.msg || "Internal Server Error"}, 
      {status:axErr.response?.status || 500}
    );
  }
}