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
  const [color, setColor] = useState({ dark: "#000009", light: "#ffffff" });
  const canvasRef = useRef(null);
  const uuidv4 = v4();

  useEffect(() => {
    const canvas = canvasRef.current;

    qrcode
      .toDataURL(canvas, text, {
        margin: 4,
        width: 400,
        height: 400,
        color: {
          dark: color.dark,
          light: color.light,
        },
      })
      .then((result) => {
        setResultURL(result);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [text, color]);

  return (
    <div className="flex justify-center items-center py-4 flex-col gap-4 md:flex-row">
      <div className="flex flex-col border border-zinc-200 rounded-2xl mx-4 dark:border-zinc-700">
        {!text ? (
          <QrCode className="opacity-50 h-[400px] w-[400px] max-w-full max-h-[24rem] sm:max-h-full" />
        ) : (
          <div className="max-w">
            <canvas
              ref={canvasRef}
              className="rounded-2xl max-w-full max-h-[24rem] sm:max-h-full"
            ></canvas>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-6 p-8 border border-zinc-200 rounded-2xl mx-4 dark:border-zinc-700">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="text">Masukkan Teks</Label>
          <Input
            className="text-xs"
            type="text"
            id="text"
            placeholder="Abc..."
            onChange={(e) => setText(e.target.value)}
          />
          <div className="space-y-2">
            <h1>Atur Warna</h1>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="background">Background</Label>
                <Input
                  className="w-12"
                  type="color"
                  id="background"
                  onChange={(e) =>
                    setColor((prev) => {
                      return {
                        ...prev,
                        light: e.target.value,
                      };
                    })
                  }
                  value={color.light}
                />
              </div>
              <div className="flex justify-between">
                <Label htmlFor="color">Warna</Label>
                <Input
                  className="w-12"
                  type="color"
                  id="color"
                  onChange={(e) =>
                    setColor((prev) => {
                      return {
                        ...prev,
                        dark: e.target.value,
                      };
                    })
                  }
                  value={color.dark}
                />
              </div>
            </div>
          </div>
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
