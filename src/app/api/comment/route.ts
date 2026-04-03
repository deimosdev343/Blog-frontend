import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ApiResponseError = {
  msg: string
}

export const POST = async (req: NextRequest) => {
  try {
    const cks = await cookies();
    const token =  cks.get("token")?.value;
    const body = await req.json();
    const backendRes = await axios.post(
      `${process.env.BACKEND_API}/comment`,
      body,
      {
        headers:{
          Authorization: `bearer ${token}`
        }
      }
    );
    return NextResponse.json(
      backendRes.data,
      {status: 200}
    );
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


export const GET = async (req: NextRequest) => {
  try {
    const {searchParams} = new URL(req.url);
    const commentId = searchParams.get("post_id");

    const skip = parseInt(searchParams.get("skip") ?? "0");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const backendRes = await axios.get(
      `${process.env.BACKEND_API}/comment/${commentId}`,
      {
        params:{
          skip,
          limit
        },
      }
    );
    return NextResponse.json(
      backendRes.data,
      {status: 200}
    );
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