import crypto from "crypto";

function generateSalt(size = 16) {
  return crypto.randomBytes(size).toString("hex");
}

function hashKey(key, salt) {
  return crypto
    .createHash("sha256")
    .update(key + salt)
    .digest();
}

export function xorCipher(text, key, size) {
  const salt = generateSalt(size);
  const hashedKey = hashKey(key, salt);

  const textBuffer = Buffer.from(text, "utf-8");
  const saltB64 = Buffer.from(salt);
  const outBuffer = Buffer.alloc(textBuffer.length);

  for (let i = 0; i < outBuffer.length; i++) {
    outBuffer[i] = textBuffer[i] ^ hashedKey[i % hashedKey.length];
  }

  return `${saltB64.toString("base64")}.${outBuffer.toString("base64")}`;
}

export function xorDecipher(combined, key) {
  const [saltB64, cipherB64] = combined.split(".");
  console.log(combined);

  const salt = Buffer.from(saltB64, "base64").toString("utf8");
  const hashedKey = hashKey(key, salt);

  const dataBuffer = Buffer.from(cipherB64, "base64");
  const outBuffer = Buffer.alloc(dataBuffer.length);

  for (let i = 0; i < dataBuffer.length; i++) {
    outBuffer[i] = dataBuffer[i] ^ hashedKey[i % hashedKey.length];
  }

  return outBuffer.toString("utf8");
}
