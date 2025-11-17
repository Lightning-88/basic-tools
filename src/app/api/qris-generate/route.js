import { makeString } from "@/lib/makeString";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { stringQr, nominal, tax } = body;

  try {
    const result = makeString(stringQr, {
      nominal: nominal,
      taxtype: "r",
      fee: toString(tax),
    });

    return NextResponse.json({
      status: 200,
      stringQr: result,
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      error: e.message,
    });
  }
}
