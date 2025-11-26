"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react";
import qrcode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

export default function QRCode() {
  const [text, setText] = useState(null);
  const [resultURL, setResultURL] = useState(null);
  const canvasRef = useRef(null);
  const uuidv4 = v4();

  useEffect(() => {
    const canvas = canvasRef.current;

    qrcode
      .toDataURL(canvas, text, { margin: 4, width: 400, height: 400 })
      .then((result) => {
        setResultURL(result);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [text]);

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex flex-col border border-zinc-200 rounded-2xl mx-4 dark:border-zinc-700">
        {!text ? (
          <QrCode width={400} height={400} className="opacity-50" />
        ) : (
          <div className="max-w">
            <canvas ref={canvasRef} width={400} height={400}></canvas>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-6 p-8 border border-zinc-200 rounded-2xl mx-4 dark:border-zinc-700">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="text">Masukkan Text</Label>
          <Input
            type="text"
            id="text"
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Button
          onClick={() => {
            if (!text) return;
            const link = document.createElement("a");
            link.href = resultURL;
            link.download = `result_${uuidv4}`;
            link.click();
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
