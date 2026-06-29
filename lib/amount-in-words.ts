const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n: number) {
  if (n < 20) return ones[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return `${tens[t]}${o ? ` ${ones[o]}` : ""}`.trim();
}

function threeDigits(n: number) {
  if (n < 100) return twoDigits(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return `${ones[h]} Hundred${rest ? ` ${twoDigits(rest)}` : ""}`.trim();
}

function integerToIndianWords(n: number) {
  if (n === 0) return "Zero";
  const parts: string[] = [];

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const hundredRest = n;

  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (hundredRest) parts.push(threeDigits(hundredRest));

  return parts.join(" ");
}

export function amountInIndianWords(amountInPaisa: number) {
  const rupees = Math.floor(amountInPaisa / 100);
  const paise = amountInPaisa % 100;
  const rupeeWords = integerToIndianWords(rupees);
  if (!paise) {
    return `INR ${rupeeWords} Only`;
  }
  const paiseWords = twoDigits(paise);
  return `INR ${rupeeWords} and ${paiseWords} paise Only`;
}
