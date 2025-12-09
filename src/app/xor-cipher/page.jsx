"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { xorCipher } from "@/lib/XORCipher";
import { useState } from "react";

export default function XORChipherPage() {
  const [plainText, setPlainText] = useState("");
  const [key, setKey] = useState("");
  const [salts, setSalts] = useState(16);
  const [encryptText, setEncryptText] = useState("");

  const handleEncrypt = () => {
    if (!key || !plainText) return alert("kosong");
    if (salts <= 0 || salts > 20) return alert("salt 1-20");
    if (isNaN(salts)) return alert("harus angka 1-20");

    const { output, salt } = xorCipher(plainText, key, parseInt(salts));
    setEncryptText(output);
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex flex-col space-y-6 p-8 border border-zinc-200 rounded-2xl mx-4 max-w-sm w-full dark:border-zinc-700">
        <h1 className="text-center text-2xl font-bold">XOR Cipher</h1>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="plainText">Plain Text</Label>
          <Input
            type="text"
            id="plainText"
            placeholder="Plain Text"
            onChange={(e) => setPlainText(e.target.value)}
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="salt">Salt</Label>
          <Input
            type="text"
            inputMode="numeric"
            id="salt"
            placeholder="1-20 (Default 16)"
            onChange={(e) => setSalts(e.target.value)}
            value={salts}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="key">Key</Label>
          <Input
            id="key"
            type="password"
            placeholder="Create Strong Key"
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </div>

        <Button className="cursor-pointer" onClick={handleEncrypt}>
          Encrypt
        </Button>

        {encryptText && (
          <div>
            <h1>{encryptText}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
