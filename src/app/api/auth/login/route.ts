import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const backendRes = await axios.post(
      `${process.env.BACKEND_API}/auth`,
       body
    ); 
      const cks = await cookies();
      cks.set("token", backendRes.data.token);
    return NextResponse.json(
      backendRes.data,
      {status: 200}
    )
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {msg:"Internal Server Error"}, 
      {status:500}
    );
  }
}