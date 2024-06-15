import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.geo?.country) {
    const response = NextResponse.next();
    response.headers.set("x-country", request.geo.country);
    return response;
  }
}
