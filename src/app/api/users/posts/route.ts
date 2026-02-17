import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ApiResponseError = {
  msg: string
}

export const GET = async (req: NextRequest) => { 
  try {
    const {searchParams} = new URL(req.url);

    const skip = searchParams.get("skip") ?? "0";
    const limit = searchParams.get("limit") ?? "10";
    const user_id = searchParams.get("user_id");
    console.log(user_id);
    const backendRes = await axios.get(
      `${process.env.BACKEND_API}/user/posts/${user_id}`,
      {
        params:{
          skip,
          limit
        }
      }
    );
    console.log(backendRes);
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