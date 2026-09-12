import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
 
type ApiResponseError = {
  msg: string;
};

const ACTIONS = ["improve", "shorten", "expand", "grammar", "tone"] as const;
const TONES = ["professional", "casual", "confident", "plain"] as const;

const MAX_TEXT = 8000;
const MAX_CONTEXT = 4000;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { text, action, tone, context } = body ?? {};
        
  } catch (err) {
    console.error(err);
    const axErr = err as AxiosError<ApiResponseError>;
    console.log(axErr.response);
    return NextResponse.json(
      { msg: axErr.response?.data?.msg || "Internal Server Error" },
      { status: axErr.response?.status || 500 }
    );

  }
}
