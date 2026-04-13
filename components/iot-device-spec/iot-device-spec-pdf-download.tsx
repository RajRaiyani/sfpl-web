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
    marginTop: 16,
    paddingTop: 12,
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
  table: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 8,
  },
  thCell: { padding: 6, flex: 1 },
  tdCell: { padding: 6, flex: 1, color: "#374151" },
  thCellNarrow: { padding: 6, width: 56 },
  tdCellNarrow: { padding: 6, width: 56, color: "#374151" },
  physRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    fontSize: 8,
  },
  physTh: {
    padding: 8,
    width: 120,
    color: "#6b7280",
    fontFamily: "Helvetica-Bold",
  },
  physTd: { padding: 8, flex: 1, color: "#111827" },
  figureCaption: {
    fontSize: 8,
    fontFamily: "Courier",
    color: "#6b7280",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  /** Full width inside A4 page padding (~515pt). PNG from SVG rasterization scales to this width. */
  figureImg: {
    width: 515,
    marginTop: 6,
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    padding: 10,
    marginTop: 8,
    gap: 10,
  },
  cardTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 4,
  },
  cardBody: { fontSize: 8, lineHeight: 1.45, color: "#4b5563", flex: 1 },
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

type IotDeviceSpecPdfProps = {
  diagram1Src?: string;
  diagram2Src?: string;
};

function IotDeviceSpecPdfDocument({ diagram1Src, diagram2Src }: IotDeviceSpecPdfProps) {
  return (
    <Document
      title="SFPL IoT device — technical specification"
      author="Specific Fire Protection Limited"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.badge}>Technical specification</Text>
        <Text style={styles.title}>IoT monitoring device</Text>
        <Text style={styles.subtitle}>
          Field monitoring unit for electrical and process signals. This document
          summarizes mechanical, electrical I/O, and core hardware characteristics.
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Product</Text>
            <Text style={styles.metaValue}>SFPL IoT device</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Revision</Text>
            <Text style={styles.metaValue}>Web — summary</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>I/O total</Text>
            <Text style={styles.metaValue}>17 inputs</Text>
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>1.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Physical specification
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.physRow}>
              <Text style={styles.physTh}>Enclosure</Text>
              <Text style={styles.physTd}>ABS</Text>
            </View>
            <View style={[styles.physRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.physTh}>Footprint (W × D)</Text>
              <Text style={styles.physTd}>165 mm × 155 mm</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>2.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Input pin overview
            </Text>
          </View>
          <Text style={styles.p}>
            The device exposes seventeen dedicated input connections, grouped by
            signal type for supply, mains-level AC, low-level AC (for external
            sensors such as CTs), and general-purpose DC analog sensing.
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thCell, { flex: 1.2 }]}>Group</Text>
              <Text style={styles.thCellNarrow}>Count</Text>
              <Text style={[styles.thCell, { flex: 1.4 }]}>Role</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tdCell, { flex: 1.2, color: "#111827" }]}>
                Power
              </Text>
              <Text style={styles.tdCellNarrow}>1</Text>
              <Text style={[styles.tdCell, { flex: 1.4 }]}>
                Device supply (DC)
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tdCell, { flex: 1.2, color: "#111827" }]}>
                AC high
              </Text>
              <Text style={styles.tdCellNarrow}>3</Text>
              <Text style={[styles.tdCell, { flex: 1.4 }]}>
                Line / phase voltage
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tdCell, { flex: 1.2, color: "#111827" }]}>
                AC low
              </Text>
              <Text style={styles.tdCellNarrow}>3</Text>
              <Text style={[styles.tdCell, { flex: 1.4 }]}>
                CT or low-AC sensing
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tdCell, { flex: 1.2, color: "#111827" }]}>
                Analog DC
              </Text>
              <Text style={styles.tdCellNarrow}>9</Text>
              <Text style={[styles.tdCell, { flex: 1.4 }]}>0–30 V sensors</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
        >
          Specific Fire Protection Limited — technical summary for web. For
          certified drawings or full compliance pack, contact SFPL.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.figuresLabel}>Figures</Text>
        <View style={styles.h2}>
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
            Reference diagrams
          </Text>
        </View>
        <Text style={styles.p}>
          Illustrations of the enclosure and interface layout. Use together with
          the pin grouping table when planning field wiring.
        </Text>
        {diagram1Src ? (
          <View wrap={false}>
            <Image style={styles.figureImg} src={diagram1Src} />
            <Text style={styles.figureCaption}>
              Figure 1 — Device overview / interface layout
            </Text>
          </View>
        ) : (
          <Text style={[styles.p, { fontSize: 8, fontFamily: "Courier" }]}>
            Figure 1 — Diagram not embedded (open the web specification to view).
          </Text>
        )}
        {diagram2Src ? (
          <View style={{ marginTop: 14 }} wrap={false}>
            <Image style={styles.figureImg} src={diagram2Src} />
            <Text style={styles.figureCaption}>
              Figure 2 — Device overview (alternate view)
            </Text>
          </View>
        ) : (
          <Text
            style={[styles.p, { fontSize: 8, fontFamily: "Courier", marginTop: 8 }]}
          >
            Figure 2 — Diagram not embedded (open the web specification to view).
          </Text>
        )}

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>3.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Input supply (1 pin)
            </Text>
          </View>
          <Text style={styles.p}>
            Powers the internal electronics and radio from an external DC source.
          </Text>
          <View style={styles.ul}>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Rating: </Text>
              6–24 V DC nominal input range.
            </Text>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Usage: </Text>
              Single supply rail for the complete device; select a source within
              the rated range and appropriate current capability for your
              installation.
            </Text>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
        >
          Specific Fire Protection Limited — technical summary for web.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>4.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              AC high-voltage inputs (3 pins)
            </Text>
          </View>
          <Text style={styles.p}>
            Isolated high-voltage channels for measuring AC potentials on
            distribution or branch circuits.
          </Text>
          <View style={styles.ul}>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Rating: </Text>
              Up to 300 V AC per channel (as specified for this design).
            </Text>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Typical usage: </Text>
              Monitoring phase-to-neutral or line-to-line relationships on
              three-phase supplies (for example R–Y–B phase voltages) where direct
              mains measurement is required.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>5.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              AC low-voltage inputs (3 pins)
            </Text>
          </View>
          <Text style={styles.p}>
            Channels intended for low-amplitude AC signals from external
            transducers rather than direct mains connection.
          </Text>
          <View style={styles.ul}>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Rating: </Text>
              Up to 5 V AC at the input (sensor-dependent).
            </Text>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Typical usage: </Text>
              Current transformers (CTs) or similar interfaces that deliver a
              proportional low voltage representing AC current on feeders or
              phases.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>6.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Analog DC inputs (9 pins)
            </Text>
          </View>
          <Text style={styles.p}>
            General-purpose DC voltage inputs for industrial and building
            instrumentation.
          </Text>
          <View style={styles.ul}>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Range: </Text>
              0–30 V DC measurable span (per channel specification).
            </Text>
            <Text style={styles.li}>
              <Text style={styles.liStrong}>Typical usage: </Text>
              Pressure, level, temperature (transmitter output), flow, and other
              field devices that present a DC voltage proportional to the measured
              quantity.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.h2}>
            <Text style={styles.h2Num}>7.</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
              Core hardware
            </Text>
          </View>
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Cellular</Text>
              <Text style={styles.cardBody}>
                GSM module with 2G connectivity and integrated antenna for uplink in
                covered deployments.
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Battery backup</Text>
              <Text style={styles.cardBody}>
                Two 3.7 V cells with 1700 mAh pack capacity, to help maintain
                operation through short supply interruptions.
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Integration note</Text>
              <Text style={styles.cardBody}>
                Final installation, protection, and compliance with local electrical
                codes remain the responsibility of the system integrator. Contact
                SFPL for deployment guidance and supported accessories.
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
        >
          Specific Fire Protection Limited — technical summary for web.
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

/**
 * @react-pdf/renderer `Image` does not reliably render SVG (including base64).
 * Rasterize to PNG in the browser so the PDF engine receives a supported format.
 */
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

export function IotDeviceSpecPdfDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const [diagram1Src, diagram2Src] = await Promise.all([
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/diagram-1.svg"),
        rasterizeSvgPublicPathToPngDataUrl("/images/pages/docs/diagram-2.svg"),
      ]);

      const blob = await pdf(
        <IotDeviceSpecPdfDocument
          diagram1Src={diagram1Src}
          diagram2Src={diagram2Src}
        />
      ).toBlob();

      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = "sfpl-iot-device-specification.pdf";
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
