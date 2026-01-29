import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {
    const cks = await cookies();
    const token =  cks.get("token")?.value;

    const backendRes = await axios.get(
      `${process.env.BACKEND_API}/auth`,
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

    return NextResponse.json(
      {msg:"Internal Server Error"}, 
      {status:500}
    );
  }
  
}