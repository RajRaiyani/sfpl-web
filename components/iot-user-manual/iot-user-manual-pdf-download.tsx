"use client";

import { useCallback, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 42,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#374151",
  },
  badge: {
    fontSize: 8,
    color: "#b91c1c",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 14,
    lineHeight: 1.45,
  },
  metaRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginTop: 4,
    gap: 24,
  },
  metaBlock: { flex: 1 },
  metaLabel: { fontSize: 8, color: "#9ca3af", marginBottom: 2 },
  metaValue: { fontSize: 9, color: "#111827" },
  section: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  h2: {
    fontSize: 12,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 8,
    flexDirection: "row",
  },
  h2Num: {
    fontSize: 10,
    fontWeight: 700,
    color: "#dc2626",
    marginRight: 6,
    fontFamily: "Helvetica",
  },
  p: {
    marginBottom: 6,
    lineHeight: 1.45,
  },
  ul: { marginLeft: 10, marginBottom: 6 },
  li: { marginBottom: 4, lineHeight: 1.45 },
  liStrong: { fontFamily: "Helvetica-Bold", color: "#1f2937" },
  figureCaption: {
    fontSize: 8,
    fontFamily: "Courier",
    color: "#6b7280",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  figureImg: {
    width: 515,
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    fontSize: 7,
    fontFamily: "Courier",
    color: "#9ca3af",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 8,
  },
  figuresLabel: {
    fontSize: 8,
    color: "#dc2626",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Helvetica-Bold",
  },
});

type StepImage = {
  src?: string;
  caption: string;
};

type IotUserManualPdfProps = {
  stepImages: StepImage[];
  diagram1Src?: string;
  diagram2Src?: string;
};

const STEP_COPY = [
  {
    title: "Connect 12 V power",
    summary:
      "Give the device power first. Wire the adapter to the far-right + and − terminals.",
    items: [
      "Find + and − on the far right of the green terminal strip.",
      "Red wire → +. Black wire → −. Tighten both screws.",
      "This only powers the device — it is not a measurement input.",
    ],
  },
  {
    title: "Connect AC voltage (optional)",
    summary:
      "To monitor supply health, wire Neutral and three phases to N, B, Y, R.",
    items: [
      "Keep the 12 V supply from Step 1 connected.",
      "Neutral → N; Blue / Yellow / Red phases → B, Y, R.",
      "WARNING: Mains voltage — isolate first. Qualified electrician only. Max 300 V AC.",
    ],
  },
  {
    title: "Connect CTs for motor / pump current (optional)",
    summary:
      "Clamp one CT on each motor phase cable, then wire the CT leads to the current terminals.",
    items: [
      "Put one CT around each of the three phase wires to the motor / pump.",
      "Connect each CT’s two thin wires to the middle-left current terminals (six wires total).",
      "WARNING: Never put mains into CT terminals — only the thin CT secondary wires (max 5 V AC).",
    ],
  },
  {
    title: "Connect a liquid level sensor (optional)",
    summary:
      "Wire a liquid level probe to the leftmost analog terminals (A1 / A2).",
    items: [
      "Install the probe in the tank / sump as the sensor maker recommends.",
      "Connect the two sensor wires (usually red and black) to A1 and A2.",
      "In the SFPL portal, calibrate volts → level and set alerts if needed.",
    ],
  },
] as const;

function IotUserManualPdfDocument({
  stepImages,
  diagram1Src,
  diagram2Src,
}: IotUserManualPdfProps) {
  return (
    <Document
      title="SFPL Connect — wiring guide"
      author="Specific Fire Protection Limited"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.badge}>How to wire Connect</Text>
        <Text style={styles.title}>Connect wiring guide</Text>
        <Text style={styles.subtitle}>
          Four simple steps. Follow the pictures — each step adds one
          connection. Steps 2–4 are optional (only wire what you monitor).
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>1. Power</Text>
            <Text style={styles.metaValue}>12 V → + / −</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>2. Voltage</Text>
            <Text style={styles.metaValue}>AC → N B Y R</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>3. Current</Text>
            <Text style={styles.metaValue}>CTs on motor</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>4. Sensor</Text>
            <Text style={styles.metaValue}>Level → A1 / A2</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              What you need
            </Text>
          </View>
          <View style={styles.ul}>
            <Text style={styles.li}>• 12 V DC power supply (adapter)</Text>
            <Text style={styles.li}>
              • Access to AC Neutral + 3 phases (if monitoring voltage)
            </Text>
            <Text style={styles.li}>
              • 3× CT clamps (if monitoring motor / pump current)
            </Text>
            <Text style={styles.li}>
              • Liquid level sensor (or other 0–30 V DC analog sensor)
            </Text>
            <Text style={styles.li}>
              • Screwdriver for the green terminal screws
            </Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          Specific Fire Protection Limited — Connect wiring guide.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.figuresLabel}>Know your device</Text>
        <Text style={styles.p}>
          Look at these first so you can find the green terminal strip and pin
          groups before you start wiring.
        </Text>
        {diagram1Src ? (
          <View wrap={false}>
            <Image style={styles.figureImg} src={diagram1Src} />
            <Text style={styles.figureCaption}>
              Diagram A — Front view: green terminal strip and pin groups
            </Text>
          </View>
        ) : null}
        {diagram2Src ? (
          <View style={{ marginTop: 14 }} wrap={false}>
            <Image style={styles.figureImg} src={diagram2Src} />
            <Text style={styles.figureCaption}>
              Diagram B — How power, sensors, and cellular connect
            </Text>
          </View>
        ) : null}

        <Text style={styles.footer} fixed>
          Specific Fire Protection Limited — Connect wiring guide.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        {STEP_COPY.slice(0, 2).map((step, i) => (
          <View key={step.title} style={styles.section} wrap={false}>
            <View style={styles.h2}>
              <Text style={styles.h2Num}>{i + 1}.</Text>
              <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                {step.title}
              </Text>
            </View>
            <Text style={styles.p}>{step.summary}</Text>
            {stepImages[i]?.src ? (
              <View>
                <Image style={styles.figureImg} src={stepImages[i].src} />
                <Text style={styles.figureCaption}>{stepImages[i].caption}</Text>
              </View>
            ) : null}
            <View style={styles.ul}>
              {step.items.map((item) => (
                <Text key={item} style={styles.li}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footer} fixed>
          Specific Fire Protection Limited — Connect wiring guide.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        {STEP_COPY.slice(2).map((step, i) => {
          const idx = i + 2;
          return (
            <View key={step.title} style={styles.section} wrap={false}>
              <View style={styles.h2}>
                <Text style={styles.h2Num}>{idx + 1}.</Text>
                <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                  {step.title}
                </Text>
              </View>
              <Text style={styles.p}>{step.summary}</Text>
              {stepImages[idx]?.src ? (
                <View>
                  <Image style={styles.figureImg} src={stepImages[idx].src} />
                  <Text style={styles.figureCaption}>
                    {stepImages[idx].caption}
                  </Text>
                </View>
              ) : null}
              <View style={styles.ul}>
                {step.items.map((item) => (
                  <Text key={item} style={styles.li}>
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Safety
            </Text>
          </View>
          <View style={styles.ul}>
            <Text style={styles.li}>
              • AC voltage (N / B / Y / R) is live mains — isolate and use a
              qualified electrician.
            </Text>
            <Text style={styles.li}>
              • CT terminals take only thin CT clamp wires — never phase /
              mains cables.
            </Text>
            <Text style={styles.li}>
              • Contact SFPL for help or the full technical specification.
            </Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          Specific Fire Protection Limited — Connect wiring guide.
        </Text>
      </Page>
    </Document>
  );
}

const MAX_SVG_RASTER_WIDTH_PX = 1200;

function parseSvgPixelSize(svgMarkup: string): { w: number; h: number } {
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
    h: hMatch ? parseFloat(hMatch[1]) : 600,
  };
}

async function rasterizeSvgPublicPathToPngDataUrl(
  publicPath: string
): Promise<string | undefined> {
  try {
    const res = await fetch(`${window.location.origin}${publicPath}`);
    if (!res.ok) return undefined;
    const svgText = await res.text();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);

    const { w: srcW, h: srcH } = parseSvgPixelSize(svgText);
    const outW = Math.min(
      MAX_SVG_RASTER_WIDTH_PX,
      Math.max(1, Math.round(srcW))
    );
    const outH = Math.max(1, Math.round(srcH * (outW / srcW)));

    const png = await new Promise<string | undefined>((resolve) => {
      const img = new window.Image();
      const done = (value: string | undefined) => {
        URL.revokeObjectURL(blobUrl);
        resolve(value);
      };

      const timeoutId = window.setTimeout(() => done(undefined), 20000);

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

export function IotUserManualPdfDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const [d1, d2, d3, d4, diagram1Src, diagram2Src] = await Promise.all([
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/d1.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/d2.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/d3.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/d4.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/diagram-1.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/diagram-2.svg"),
      ]);

      const stepImages: StepImage[] = [
        { src: d1, caption: "Figure 1 — Connect 12 V power (+ / −)" },
        { src: d2, caption: "Figure 2 — Connect AC voltage (N B Y R)" },
        { src: d3, caption: "Figure 3 — Connect CTs for motor / pump current" },
        { src: d4, caption: "Figure 4 — Connect liquid level sensor (A1 / A2)" },
      ];

      const blob = await pdf(
        <IotUserManualPdfDocument
          stepImages={stepImages}
          diagram1Src={diagram1Src}
          diagram2Src={diagram2Src}
        />
      ).toBlob();

      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = "sfpl-iot-device-user-manual.pdf";
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Could not generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-800 disabled:pointer-events-none disabled:opacity-60 sm:text-sm"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4 shrink-0" aria-hidden />
      )}
      {loading ? "Generating…" : "Download PDF"}
    </button>
  );
}
