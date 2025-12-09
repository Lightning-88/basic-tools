"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { xorCipher, xorDecipher } from "@/lib/XORCipher";
import { useState } from "react";

export default function XORChipherPage() {
  const [plainText, setPlainText] = useState("");
  const [key, setKey] = useState("");
  const [salts, setSalts] = useState(16);
  const [encryptText, setEncryptText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [resultDecrypt, setResultDecrypt] = useState("");

  const handleEncrypt = () => {
    if (!key || !plainText) return alert("kosong");
    if (salts <= 0 || salts > 20) return alert("salt 1-20");
    if (isNaN(salts)) return alert("harus angka 1-20");

    const output = xorCipher(plainText, key, parseInt(salts));
    setEncryptText(output);
  };

  const handleDecrypt = () => {
    const output = xorDecipher(encryptedText, decryptKey);
    setResultDecrypt(output);
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="p-8 space-y-16 border border-zinc-200 rounded-2xl mx-4 max-w-sm w-full dark:border-zinc-700">
        <div className="flex flex-col space-y-6">
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
              <textarea
                defaultValue={encryptText}
                className="w-full"
              ></textarea>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex flex-col space-y-6">
          <h1 className="text-center text-2xl font-bold">Decrypt</h1>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="encryptedText">Encrypted Text</Label>
            <Input
              type="text"
              id="encryptedText"
              placeholder="Encrypted Text"
              onChange={(e) => setEncryptedText(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="decryptKey">Key</Label>
            <Input
              id="decryptKey"
              type="password"
              placeholder="Enter Key"
              onChange={(e) => setDecryptKey(e.target.value)}
              required
            />
          </div>

          <Button className="cursor-pointer" onClick={handleDecrypt}>
            Decrypt
          </Button>

          {decryptKey && (
            <div>
              <textarea
                defaultValue={resultDecrypt}
                className="w-full"
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
