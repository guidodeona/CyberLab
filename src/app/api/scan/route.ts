import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(body.url);

    const headers = response.headers;

    return NextResponse.json({
      success: true,
      url: body.url,

      securityHeaders: {
        hsts: headers.get("strict-transport-security"),
        csp: headers.get("content-security-policy"),
        xFrameOptions: headers.get("x-frame-options"),
        xContentTypeOptions: headers.get("x-content-type-options"),
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "No se pudo analizar el sitio",
    });
  }
}