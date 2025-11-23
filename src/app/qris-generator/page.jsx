"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useEffect, useRef, useState } from "react";
import qrcode from "qrcode";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroupButton } from "@/components/ui/input-group";
import { ChevronDownIcon } from "lucide-react";

export default function Home() {
  const [qrResult, setQrResult] = useState(null);
  const [nominal, setNominal] = useState(null);
  const [saveCode, setSaveCode] = useState(false);
  const [taxEnable, setTaxEnable] = useState("none");
  const [tax, setTax] = useState(0);
  const [stringQr, setStringQr] = useState({
    url: "",
    success: false,
    download: "",
    id: "",
  });
  const { get, set } = useLocalStorage();

  useEffect(() => {
    setTax(0);
  }, [taxEnable]);

  const handleQrFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const qrScanFile = new Html5Qrcode("reader");

    qrScanFile.scanFile(file, false).then((resultQr) => {
      setQrResult(resultQr);
    });
  };

  const handleSave = () => {
    setSaveCode(!saveCode);
  };

  const generateQr = async () => {
    if (!qrResult || !nominal) {
      alert("error");
    }

    let calculatedTax = 0;
    if (taxEnable == "persen") {
      calculatedTax = tax * nominal;
    } else {
      calculatedTax = tax;
    }

    const response = await fetch("/api/qris-generate", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        stringQr: qrResult,
        nominal: nominal,
        tax: calculatedTax.toString(),
      }),
    });
    const responseBody = await response.json();

    if (responseBody.status == 200) {
      const url = await qrcode.toDataURL(responseBody.stringQr, { margin: 0 });
      setStringQr((prev) => ({
        ...prev,
        url: url,
        success: true,
        id: `result_${responseBody.id}`,
      }));

      // if (saveCode) {
      //   set("stringQr", qrResult);
      // }

      //   const canvas = canvasRef.current;
      //   const img = new Image();
      //   const spacing = 32;

      //   img.onload = () => {
      //     const ctx = canvas.getContext("2d");

      //     canvas.width = img + spacing * 2;
      //     canvas.height = img + spacing * 2;

      //     ctx.fillStyle = "#fff";
      //     ctx.fillRect(0, 0, canvas.width, canvas.height);

      //     ctx.drawImage(img, spacing, spacing);
      //   };

      //   const download = canvas.toDataURL("iamge/png");

      //   setStringQr((prev) => ({ ...prev, download: download }));
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex flex-col space-y-6 p-8 border border-zinc-200 rounded-2xl mx-4 dark:border-zinc-700">
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
          <div className="flex gap-2">
            <Input id="inputFileQr" type="file" onChange={handleQrFile} />
            {/* {get("stringQr") && (
              <div>
                <Select onValueChange={(value) => setTaxEnable(value)}>
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Saved" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value={get("stringQr")}>Code 1</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )} */}
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" onClick={handleSave} />
            <Label htmlFor="terms">Simpan untuk penggunaan berikutnya</Label>
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="inputPajak">Tax/Pajak (Opsional)</Label>
          <div className="flex gap-2">
            <Input
              id="inputPajak"
              type="text"
              placeholder="Pajak"
              onChange={(e) => setTax(e.target.value)}
              disabled={taxEnable == "none" || taxEnable == "persen"}
              value={tax}
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
              onClick={() => setTax(0.025)}
            >
              2.5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
              onClick={() => setTax(0.5)}
            >
              5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
              onClick={() => setTax(0.075)}
            >
              7.5%
            </Button>
            <Button
              className="flex-1 cursor-pointer"
              variant="outline"
              disabled={taxEnable == "none" || taxEnable == "rupiah"}
              onClick={() => setTax(0.1)}
            >
              10%
            </Button>
          </div>
        </div>

        <Button className="cursor-pointer" onClick={generateQr}>
          Buat QrCode
        </Button>

        <div>
          {stringQr.success && (
            <div className="flex flex-col space-y-4">
              <div>
                <img src={stringQr.url} alt="qr-result" className="w-full" />
              </div>
              <div>
                <Link href={{ pathname: stringQr.url }} download={stringQr.id}>
                  <Button
                    className="cursor-pointer font-semibold"
                    variant="outline"
                  >
                    Unduh
                  </Button>
                </Link>
              </div>
            </div>
          )}
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
