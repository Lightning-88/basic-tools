import { NextResponse } from "next/server";

export async function GET(request) {
  const url = request.nextUrl.searchParams.get("url");
  const type = request.nextUrl.searchParams.get("type");

  if (!url || !type)
    return NextResponse.json({ errors: "tidak ada url" }, { status: 400 });

  const getVideo = await fetch(
    `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
  );
  const result = await getVideo.json();

  if (!result.data)
    return NextResponse.json({ errors: "url is not valid" }, { status: 400 });

  const stream = await fetch(result.data.play);

  return new NextResponse(stream.body, {
    status: 200,
    headers: {
      "Content-Type":
        stream.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": "attachment",
    },
  });
}
