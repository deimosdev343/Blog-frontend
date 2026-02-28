import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
type ApiResponseError = {
  msg: string
}

// follow user
export const POST = async (req: NextRequest) => {
  try {
    const {user_id} = await req.json();
    const cks = await cookies();
    const token =  cks.get("token")?.value;

    const res = await axios.post(`${process.env.BACKEND_API}/user/follow`, 
      {
        follow_user_id: user_id
      },
      {
        headers:{
          Authorization: `bearer ${token}`
        }
      }
    )
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


export const DELETE = async (req: NextRequest) => {
  try {
    const {user_id} = await req.json();
    const cks = await cookies();
    const token =  cks.get("token")?.value;
    const res = await axios.delete(`/${process.env.BACKEND_API}/user/follow/${user_id}`, 
      {
        headers:{
          Authorization: `bearer ${token}`
        }
      }
    )
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