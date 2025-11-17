// Source: https://github.com/razisek/Qris-Dinamis

function pad(number) {
  return number < 10 ? "0" + number : number.toString();
}

function toCRC16(input) {
  function charCodeAt(input, i) {
    return input.charCodeAt(i);
  }

  let crc = 0xffff;
  for (let i = 0; i < input.length; i++) {
    crc ^= charCodeAt(input, i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }

  let hex = (crc & 0xffff).toString(16).toUpperCase();
  return hex.length === 3 ? "0" + hex : hex;
}

function getBetween(str, start, end) {
  let startIdx = str.indexOf(start);
  if (startIdx === -1) return "";
  startIdx += start.length;
  let endIdx = str.indexOf(end, startIdx);
  return str.slice(startIdx, endIdx);
}

export const makeString = (
  qris,
  { nominal, taxtype = "p", fee = "0" } = {}
) => {
  if (!qris) throw new Error('The parameter "qris" is required.');
  if (!nominal) throw new Error('The parameter "nominal" is required.');

  let tax = "";
  let qrisModified = qris.slice(0, -4).replace("010211", "010212");
  let qrisParts = qrisModified.split("5802ID");

  let amount = "54" + pad(nominal.length) + nominal;

  if (taxtype && fee) {
    tax =
      taxtype === "p"
        ? "55020357" + pad(fee.length) + fee
        : "55020256" + pad(fee.length) + fee;
  }

  amount += tax.length === 0 ? "5802ID" : tax + "5802ID";
  let output = qrisParts[0].trim() + amount + qrisParts[1].trim();
  output += toCRC16(output);

  return output;
};
