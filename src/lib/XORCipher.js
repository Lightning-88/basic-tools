import crypto from "crypto";

function generateSalt(size = 16) {
  return crypto.randomBytes(size).toString("hex");
}

function hashKey(key, salt) {
  const hashed = crypto
    .createHash("sha256")
    .update(key + salt)
    .digest();

  return [hashed, key];
}

export function xorCipher(text, key, size) {
  const resultSalt = generateSalt(size);
  const [hashedKey, salt] = hashKey(key, resultSalt);

  const textBuffer = Buffer.from(text, "utf-8");
  const outBuffer = Buffer.alloc(textBuffer.length);

  for (let i = 0; i < outBuffer.length; i++) {
    outBuffer[i] = textBuffer[i] ^ hashedKey[i % hashedKey.length];
  }

  const output = outBuffer.toString("base64");

  return { output, salt };
}
