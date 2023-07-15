import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname == "/test") {
        return NextResponse.json({
            messsage: "Test"
        });
    }
}