import { makeString } from "@/lib/makeString";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();
  const { stringQr, nominal, tax } = body;

  try {
    const result = makeString(stringQr, {
      nominal: nominal,
      taxtype: "r",
      fee: tax,
    });

    return NextResponse.json({
      status: 200,
      stringQr: result,
      id: crypto.randomUUID(),
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      error: e.message,
      id: crypto.randomUUID(),
    });
  }
}
