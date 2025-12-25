"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { v4 } from "uuid";

export default function TiktokDownPage() {
  const [link, setLink] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const uuidv4 = v4();

  const handleSearch = async () => {
    if (!link) return alert("link kosong");
    setDownloadLink("");

    try {
      setLoading(true);
      const response = await fetch(
        `https://www.tikwm.com/api/?url=${encodeURIComponent(link)}`
      );
      const result = await response.json();

      if (!result.data) {
        throw new Error(result.msg);
      }

      fetch(result.data.play)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          console.log(url);
          setDownloadLink(url);
          setLoading(false);
        });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 flex-col gap-4 mx-4 md:flex-row">
      <div className="flex flex-col space-y-6 p-8 border border-zinc-200 rounded-2xl w-full max-w-[400px] dark:border-zinc-700">
        <h1 className="text-center text-2xl font-bold">Tiktok Donlot</h1>

        {downloadLink && (
          <div className="space-y-2">
            <video src={downloadLink} controls></video>
            <Link href={downloadLink} download={`downloaded_${uuidv4}`}>
              <Button className="cursor-pointer">Download</Button>
            </Link>
          </div>
        )}

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="text">Masukkan Link Video</Label>
          <Input
            className="text-xs"
            type="text"
            id="text"
            placeholder="https://vt.tiktok.com/abc..."
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={loading}
          className="cursor-pointer"
        >
          {loading && (
            <svg
              className="size-5 animate-spin fill-zinc-50 dark:fill-zinc-950"
              viewBox="0 0 24 24"
            >
              <LoaderCircle />
            </svg>
          )}
          Search
        </Button>
      </div>
    </div>
  );
}
