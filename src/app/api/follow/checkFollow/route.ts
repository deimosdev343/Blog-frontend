import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ApiResponseError = {
  msg: string
}

//Check Follow Status
//Also namming all your api calls GET/POST without any description surely won't cause problems
//Next.js is such dogshit
export const GET = async (req: NextRequest) => {
  try {
    const {user_id} = await req.json();
    const cks = await cookies();
    const token =  cks.get("token")?.value;
    const res = await axios.get(
      `${process.env.BACKEND_API}/user/${user_id}/is-following`,
      {
        headers:{
          Authorization:`bearer ${token}`
        }
      }
    );
    return NextResponse.json(
      res.data,
      {status:200}
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