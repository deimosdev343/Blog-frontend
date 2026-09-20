import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
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
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ msg: "No text selected." }, { status: 400 });
    }
    if (text.length > MAX_TEXT) {
      return NextResponse.json(
        { msg: "Selection is too long to rewrite." },
        { status: 413 }
      );
    }
    if (!ACTIONS.includes(action)) {
      return NextResponse.json({ msg: "Unknown action." }, { status: 400 });
    }
    if (action === "tone" && !TONES.includes(tone)) {
      return NextResponse.json({ msg: "Unknown tone." }, { status: 400 });
    }
    const cks = await cookies();
    const token =  cks.get("token")?.value;
    const backendRes = await axios.post(`${process.env.BACKEND_API}/ai/transform`, 
      {
        text,
        action,
        tone: action === "tone" ? tone : undefined,
        context: typeof context === "string" ? context.slice(0, MAX_CONTEXT) : "",
      },
      {
        headers:{Authorization: `bearer ${token}`}
      }
    );
    return NextResponse.json(backendRes.data, { status: 200 });

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
