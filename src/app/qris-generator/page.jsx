"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";
import qrcode from "qrcode";

export default function Home() {
  const [qrResult, setQrResult] = useState(null);
  const [nominal, setNominal] = useState(null);
  const [taxEnable, setTaxEnable] = useState("none");
  const [tax, setTax] = useState(0);

  const handleQrFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const qrScanFile = new Html5Qrcode("reader");

    qrScanFile.scanFile(file, false).then((resultQr) => {
      setQrResult(resultQr);
    });
  };

  const generateQr = async () => {
    if (!qrResult || !nominal) {
      alert("error");
    }

    const response = await fetch("/api/qris-generate", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        stringQr: qrResult,
        nominal: nominal,
        tax: tax,
      }),
    });
    const body = await response.json();
    console.log(body);
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col gap-4 p-8 bg-gray-100 rounded-2xl mx-4">
        <h1 className="text-center text-2xl font-bold">Qris Generator</h1>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="inputNominal">Masukkan Nominal</Label>
          <Input
            type="text"
            id="inputNominal"
            placeholder="Nominal"
            onChange={(e) => setNominal(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="inputFileQr">Masukkan Kode Qr</Label>
          <Input id="inputFileQr" type="file" onChange={handleQrFile} />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="inputPajak">Tax/Pajak (Opsional)</Label>
          <div className="flex gap-2">
            <Input
              id="inputPajak"
              type="text"
              placeholder="Pajak"
              onChange={(e) => setTax(e.target.value)}
              disabled={taxEnable == "none"}
            />
            <Select onValueChange={(value) => setTaxEnable(value)}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="persen">Persen</SelectItem>
                  <SelectItem value="rupiah">Rupiah</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
            >
              2.5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
            >
              5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
            >
              7.5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
            >
              10%
            </Button>
          </div>
        </div>

        <Button className="cursor-pointer" onClick={generateQr}>
          Buat QrCode
        </Button>

        <div>
          {/* <div className="flex flex-col space-y-3">
            <Skeleton className="h-[280px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Button className="cursor-pointer">Unduh</Button>
            </div>
          </div> */}
        </div>
      </div>
      <div id="reader" className="hidden"></div>
    </div>
  );
}
