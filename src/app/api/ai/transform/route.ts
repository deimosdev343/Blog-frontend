import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
 
type ApiResponseError = {
  msg: string;
};
 
