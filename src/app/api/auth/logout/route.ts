import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ApiResponseError = {
  msg: string
}

export const GET = async (req: NextRequest) => {
  try {
    const cks = await cookies();
    cks.delete("token");
  
    return NextResponse.json(
      {msg: "logged out successfully"},
      {status: 200}
    );
    
  } catch (err) {
    console.log(err);
    const axErr = err as AxiosError<ApiResponseError>;

    return NextResponse.json(
      {msg:axErr.response?.data?.msg || "Internal Server Error"}, 
      {status:axErr.response?.status || 500}
    );
  }
  
}