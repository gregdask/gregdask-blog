import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST() {
    console.log('s');

    return NextResponse.json({ success: true });
}