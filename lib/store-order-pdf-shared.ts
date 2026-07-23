import { formatOrderAddress } from "@/lib/format";

const MAX_SVG_RASTER_WIDTH_PX = 480;

function parseSvgPixelSize(svgMarkup: string) {
  const viewBox = svgMarkup.match(/viewBox="([^"]+)"/);
  if (viewBox) {
    const parts = viewBox[1].trim().split(/[\s,]+/).map(parseFloat);
    if (parts.length >= 4 && parts[2] > 0 && parts[3] > 0) {
      return { w: parts[2], h: parts[3] };
    }
  }
  const wMatch = svgMarkup.match(/\bwidth="([\d.]+)/);
  const hMatch = svgMarkup.match(/\bheight="([\d.]+)/);
  return {
    w: wMatch ? parseFloat(wMatch[1]) : 800,
    h: hMatch ? parseFloat(hMatch[1]) : 200,
  };
}

export async function rasterizeSvgPublicPathToPngDataUrl(publicPath: string) {
  if (typeof window === "undefined") return undefined;
  try {
    const res = await fetch(`${window.location.origin}${publicPath}`);
    if (!res.ok) return undefined;
    const svgText = await res.text();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const { w: srcW, h: srcH } = parseSvgPixelSize(svgText);
    const outW = Math.min(MAX_SVG_RASTER_WIDTH_PX, Math.max(1, Math.round(srcW)));
    const outH = Math.max(1, Math.round(srcH * (outW / srcW)));

    const png = await new Promise<string | undefined>((resolve) => {
      const img = new window.Image();
      const done = (value: string | undefined) => {
        URL.revokeObjectURL(blobUrl);
        resolve(value);
      };
      const timeoutId = window.setTimeout(() => done(undefined), 15000);
      img.onload = () => {
        window.clearTimeout(timeoutId);
        try {
          const canvas = document.createElement("canvas");
          canvas.width = outW;
          canvas.height = outH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            done(undefined);
            return;
          }
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outW, outH);
          ctx.drawImage(img, 0, 0, outW, outH);
          done(canvas.toDataURL("image/png"));
        } catch {
          done(undefined);
        }
      };
      img.onerror = () => {
        window.clearTimeout(timeoutId);
        done(undefined);
      };
      img.src = blobUrl;
    });
    return png;
  } catch {
    return undefined;
  }
}

export const ORDER_SERIAL_PREFIX = "SFPL-ORD-";
export const RECEIPT_SERIAL_PREFIX = "SFPL-RCPT-";
export const INVOICE_SERIAL_PREFIX = "SFPL-INV-";

export function getOrderDocumentNumber(
  orderSerial: string,
  documentPrefix: string,
  sourcePrefix = ORDER_SERIAL_PREFIX,
) {
  const normalized = orderSerial.trim();
  if (normalized.toUpperCase().startsWith(sourcePrefix)) {
    return `${documentPrefix}${normalized.slice(sourcePrefix.length)}`;
  }
  return `${documentPrefix}${normalized}`;
}

export function getOrderReceiptNumber(orderSerial: string) {
  return getOrderDocumentNumber(orderSerial, RECEIPT_SERIAL_PREFIX);
}

export function getOrderInvoiceNumber(orderSerial: string) {
  return getOrderDocumentNumber(orderSerial, INVOICE_SERIAL_PREFIX);
}


export function getPdfAddressLines(
  address?: Record<string, unknown> | string | null,
) {
  const formatted = formatOrderAddress(address);
  if (formatted === "—") return ["Not provided"];
  return formatted
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export const SFPL_INVOICE_SELLER = {
  legalName: "SPECIFIC FIRE PROTECTION LIMITED",
  addressLines: [
    "442, WEST GATE 2, NR. AYODHYA CIRCLE,",
    "150 FEET RING ROAD, RAJKOT",
  ],
  gstin: "24ABMCS2003B1ZZ",
  stateName: "Gujarat",
  stateCode: "24",
  phone: "90330 50415",
  website: "www.specificfire.com",
  email: "contact@specificfire.com",
  jurisdiction: "SUBJECT TO RAJKOT JURISDICTION",
  electronicInvoiceNote:
    "This is an electronically generated invoice and does not require any signature.",
};

export function formatInvoiceAmount(amountInPaisa: number) {
  // Always whole paisa → exactly 2 decimal rupees (no 122.333… float dust)
  const paisa = Math.round(Number(amountInPaisa) || 0);
  const amount = paisa / 100;
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatInvoiceDate(value: string) {
  const date = new Date(value);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export function formatPdfCurrency(paisa: number) {
  const amount = Math.round(Number(paisa) || 0) / 100;
  return `INR ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
