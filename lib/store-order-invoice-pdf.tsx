import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { StoreOrder } from "@/types/store";
import { amountInIndianWords } from "@/lib/amount-in-words";
import { parseOrderAddress } from "@/lib/format";
import {
  SFPL_INVOICE_SELLER,
  formatInvoiceAmount,
  formatInvoiceDate,
  getOrderInvoiceNumber,
  getPdfAddressLines,
  rasterizeSvgPublicPathToPngDataUrl,
} from "@/lib/store-order-pdf-shared";

const RED = "#dc2626";
const DARK = "#111827";
const MUTED = "#6b7280";
const LINE = "#e5e7eb";

const COL_TOTALS_WIDTH = "31%";
const COL_BEFORE_TOTALS = "69%";

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 100,
    paddingHorizontal: 32,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: DARK,
    backgroundColor: "#fff",
    position: "relative",
  },
  topBar: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  brandCol: {
    flex: 1.15,
    paddingRight: 14,
  },
  logo: {
    width: 108,
    height: 32,
    objectFit: "contain",
    objectPosition: "left",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    lineHeight: 1.35,
    marginBottom: 5,
  },
  muted: {
    fontSize: 8,
    color: MUTED,
    lineHeight: 1.5,
    marginBottom: 1,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  title: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: RED,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  titleLine: {
    marginTop: 5,
    height: 2,
    width: 64,
    backgroundColor: RED,
  },
  metaCard: {
    width: 210,
    flexGrow: 0,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  metaCardHead: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  metaAccent: {
    width: 3,
    backgroundColor: RED,
  },
  metaCardTitle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
  },
  metaRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    minHeight: 16,
  },
  metaRowLast: {
    borderBottomWidth: 0,
  },
  metaLabel: {
    width: "46%",
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 7.5,
    color: MUTED,
    borderRightWidth: 1,
    borderRightColor: LINE,
  },
  metaValue: {
    width: "54%",
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  partyRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  panel: {
    flex: 1,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    overflow: "hidden",
  },
  panelGap: {
    marginRight: 10,
  },
  panelHead: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  panelAccent: {
    width: 3,
    backgroundColor: RED,
  },
  panelTitle: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
  },
  panelBody: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 64,
  },
  partyName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
    lineHeight: 1.35,
  },
  bodyLine: {
    fontSize: 8,
    lineHeight: 1.45,
    color: "#374151",
    marginBottom: 2,
  },
  table: {
    borderWidth: 1,
    borderColor: LINE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  tableBlock: {
    marginBottom: 8,
  },
  thead: {
    flexDirection: "row",
    backgroundColor: RED,
    color: "#fff",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
  },
  trow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: LINE,
    minHeight: 22,
    alignItems: "center",
  },
  trowAlt: {
    backgroundColor: "#fafafa",
  },
  th: {
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  td: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    fontSize: 8,
  },
  tdLast: { borderRightWidth: 0 },
  tdCol: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    justifyContent: "center",
  },
  tdColLast: {
    borderRightWidth: 0,
  },
  tdColTextRight: {
    fontSize: 8,
    textAlign: "right",
    width: "100%",
  },
  thCol: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  thColTextRight: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    textAlign: "right",
    width: "100%",
  },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  tdTotalLabel: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    textAlign: "right",
  },
  tdTotalValue: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  totalsValueText: {
    fontSize: 8,
    textAlign: "right",
    width: "100%",
  },
  trowGrandTotal: {
    backgroundColor: "#fef2f2",
  },
  tdGrandLabel: {
    color: RED,
    fontSize: 9,
  },
  tdGrandValue: {
    fontFamily: "Helvetica-Bold",
    color: RED,
    fontSize: 9,
  },
  totalsTableWrap: {
    width: "100%",
    flexDirection: "row",
  },
  totalsSpacer: {
    width: COL_BEFORE_TOTALS,
  },
  totalsTable: {
    width: COL_TOTALS_WIDTH,
    borderWidth: 1,
    borderColor: LINE,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  totalsLabelCol: {
    width: "54.84%",
  },
  totalsValueCol: {
    width: "45.16%",
  },
  totalsRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 22,
    borderTopWidth: 1,
    borderTopColor: LINE,
  },
  totalsRowFirst: {
    borderTopWidth: 0,
  },
  bottomRow: {
    marginBottom: 8,
  },
  wordsBox: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    padding: 7,
    width: "100%",
  },
  wordsLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  wordsText: {
    fontSize: 8.5,
    lineHeight: 1.45,
  },
  footerNoteRow: {
    position: "absolute",
    bottom: 44,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerDisclaimer: {
    flex: 1,
    paddingRight: 20,
    fontSize: 7.5,
    color: MUTED,
    lineHeight: 1.45,
    maxWidth: "58%",
  },
  footerSignLine: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    textAlign: "right",
  },
  jurisdiction: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 8,
  },
});

const COL = {
  sl: "5%",
  desc: "48%",
  hsn: "9%",
  qty: "7%",
  unit: "5%",
  rate: "12%",
  amt: "14%",
} as const;

function TotalsTable({
  lines,
}: {
  lines: { label: string; value: string; grand?: boolean }[];
}) {
  return (
    <View style={styles.totalsTableWrap}>
      <View style={styles.totalsSpacer} />
      <View style={styles.totalsTable}>
        {lines.map((line, idx) => (
          <View
            key={line.label}
            style={[
              styles.totalsRow,
              idx === 0 ? styles.totalsRowFirst : {},
              line.grand ? styles.trowGrandTotal : {},
            ]}
          >
            <Text
              style={[
                styles.tdTotalLabel,
                styles.totalsLabelCol,
                line.grand ? styles.tdGrandLabel : {},
              ]}
            >
              {line.label}
            </Text>
            <View
              style={[
                styles.tdTotalValue,
                styles.totalsValueCol,
              ]}
            >
              <Text
                style={[
                  styles.totalsValueText,
                  line.grand ? styles.tdGrandValue : {},
                ]}
              >
                {line.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function Panel({
  title,
  children,
  style,
}: {
  title: string;
  children: ReactNode;
  style?: typeof styles.panelGap;
}) {
  return (
    <View style={style ? [styles.panel, style] : styles.panel}>
      <View style={styles.panelHead}>
        <View style={styles.panelAccent} />
        <Text style={styles.panelTitle}>{title}</Text>
      </View>
      <View style={styles.panelBody}>{children}</View>
    </View>
  );
}

function getBillingName(order: StoreOrder) {
  const d = order.billing_details;
  if (!d || typeof d !== "object") return "—";
  if (typeof d.full_name === "string" && d.full_name.trim()) return d.full_name.trim();
  const first = typeof d.first_name === "string" ? d.first_name : "";
  const last = typeof d.last_name === "string" ? d.last_name : "";
  return `${first} ${last}`.trim() || "—";
}

function billingField(order: StoreOrder, key: string) {
  const d = order.billing_details;
  if (!d || typeof d !== "object") return "";
  const v = d[key];
  return typeof v === "string" ? v.trim() : "";
}

function party(order: StoreOrder, kind: "billing" | "shipping") {
  const addr = kind === "billing" ? order.billing_address : order.shipping_address;
  const parsed = parseOrderAddress(addr);
  const org = billingField(order, "organization_name");
  return {
    name: (org || getBillingName(order)).toUpperCase(),
    lines: getPdfAddressLines(addr),
    gst: billingField(order, "gst_number"),
    pan: billingField(order, "pan_number"),
    phone: billingField(order, "phone_number"),
    state: parsed?.state_name || "—",
    code: parsed?.state_gst_code || "—",
  };
}

const GST_INCLUSIVE_FACTOR = 1.18;

function exclusivePaisa(grossPaisa: number) {
  return Math.round(grossPaisa / GST_INCLUSIVE_FACTOR);
}

function gstBreakdown(totalPaisa: number, buyerCode: string) {
  const inter = buyerCode !== SFPL_INVOICE_SELLER.stateCode;
  const taxable = exclusivePaisa(totalPaisa);
  const tax = totalPaisa - taxable;
  if (inter) {
    return {
      inter,
      taxable,
      cgst: 0,
      sgst: 0,
      igst: tax,
      cgstR: 0,
      sgstR: 0,
      igstR: 18,
      total: totalPaisa,
      tax,
    };
  }
  const cgst = Math.round(tax / 2);
  return {
    inter,
    taxable,
    cgst,
    sgst: tax - cgst,
    igst: 0,
    cgstR: 9,
    sgstR: 9,
    igstR: 0,
    total: totalPaisa,
    tax,
  };
}

function PartyContent({ p }: { p: ReturnType<typeof party> }) {
  return (
    <>
      <Text style={styles.partyName}>{p.name}</Text>
      {p.lines.map((l) => (
        <Text key={l} style={styles.bodyLine}>
          {l}
        </Text>
      ))}
      {p.gst ? <Text style={styles.bodyLine}>GSTIN/UIN : {p.gst}</Text> : null}
      {p.pan ? <Text style={styles.bodyLine}>PAN : {p.pan}</Text> : null}
      {p.phone ? <Text style={styles.bodyLine}>Phone : {p.phone}</Text> : null}
      <Text style={styles.bodyLine}>
        State : {p.state}, Code : {p.code}
      </Text>
    </>
  );
}

type Props = { order: StoreOrder; logoSrc?: string };

function InvoiceDoc({ order, logoSrc }: Props) {
  const items = order.items ?? [];
  const invNo = order.serial ? getOrderInvoiceNumber(order.serial) : "—";
  const invDate = formatInvoiceDate(order.created_at);
  const bill = party(order, "billing");
  const ship = party(order, "shipping");
  const gst = gstBreakdown(order.total_amount_in_paisa, bill.code);

  const rows = items.map((item, i) => {
    const amt = exclusivePaisa(item.price_in_paisa * item.quantity);
    const rate = item.quantity > 0 ? Math.round(amt / item.quantity) : amt;
    return {
      id: item.id,
      sl: i + 1,
      name: item.device_name.toUpperCase(),
      hsn: item.hsn_sac || "—",
      qty: item.quantity,
      rate,
      amt,
    };
  });

  const lineTaxableTotal = rows.reduce((sum, row) => sum + row.amt, 0);
  if (rows.length > 0 && lineTaxableTotal !== gst.taxable) {
    const last = rows[rows.length - 1]!;
    last.amt += gst.taxable - lineTaxableTotal;
    last.rate = last.qty > 0 ? Math.round(last.amt / last.qty) : last.amt;
  }

  const totalLines: { label: string; value: string; grand?: boolean }[] = [
    { label: "Taxable value", value: formatInvoiceAmount(gst.taxable) },
    ...(gst.inter
      ? [{ label: `IGST @ ${gst.igstR}%`, value: formatInvoiceAmount(gst.igst) }]
      : [
          { label: `CGST @ ${gst.cgstR}%`, value: formatInvoiceAmount(gst.cgst) },
          { label: `SGST @ ${gst.sgstR}%`, value: formatInvoiceAmount(gst.sgst) },
        ]),
    {
      label: "Grand Total",
      value: `INR ${formatInvoiceAmount(gst.total)}`,
      grand: true,
    },
  ];

  return (
    <Document title={`Tax Invoice ${invNo}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Tax Invoice</Text>
          <View style={styles.titleLine} />
        </View>

        <View style={styles.topBar}>
          <View style={styles.brandCol}>
            {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
            <Text style={styles.companyName}>{SFPL_INVOICE_SELLER.legalName}</Text>
            {SFPL_INVOICE_SELLER.addressLines.map((l) => (
              <Text key={l} style={styles.muted}>
                {l}
              </Text>
            ))}
            <Text style={styles.muted}>GSTIN/UIN : {SFPL_INVOICE_SELLER.gstin}</Text>
            <Text style={styles.muted}>
              {SFPL_INVOICE_SELLER.stateName} (Code {SFPL_INVOICE_SELLER.stateCode}) ·{" "}
              {SFPL_INVOICE_SELLER.phone}
            </Text>
          </View>

          <View style={styles.metaCard}>
            <View style={styles.metaCardHead}>
              <View style={styles.metaAccent} />
              <Text style={styles.metaCardTitle}>Invoice Details</Text>
            </View>
            {(
              [
                ["Invoice No.", invNo],
                ["Date", invDate],
                ["Order No.", order.serial || "—"],
              ] as const
            ).map(([label, value], idx, arr) => (
              <View
                key={label}
                style={[styles.metaRow, idx === arr.length - 1 ? styles.metaRowLast : {}]}
              >
                <Text style={styles.metaLabel}>{label}</Text>
                <Text style={styles.metaValue}>{value || " "}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.partyRow}>
          <Panel title="Consignee (Ship to)" style={styles.panelGap}>
            <PartyContent p={ship} />
          </Panel>
          <Panel title="Buyer (Bill to)">
            <PartyContent p={bill} />
          </Panel>
        </View>

        <View style={styles.tableBlock}>
          <View style={styles.table}>
            <View style={styles.thead}>
              <Text style={[styles.th, { width: COL.sl }, styles.center]}>#</Text>
              <Text style={[styles.th, { width: COL.desc }]}>Description</Text>
              <Text style={[styles.th, { width: COL.hsn }, styles.center]}>HSN/SAC</Text>
              <Text style={[styles.th, { width: COL.qty }, styles.center]}>Quantity</Text>
              <Text style={[styles.th, { width: COL.unit }, styles.center]}>Unit</Text>
              <View style={[styles.thCol, { width: COL.rate }]}>
                <Text style={styles.thColTextRight}>Rate</Text>
              </View>
              <View style={[styles.thCol, { width: COL.amt }]}>
                <Text style={styles.thColTextRight}>Amount</Text>
              </View>
            </View>

            {rows.map((r, idx) => (
              <View key={r.id} style={[styles.trow, idx % 2 === 1 ? styles.trowAlt : {}]}>
                <Text style={[styles.td, { width: COL.sl }, styles.center]}>{r.sl}</Text>
                <Text style={[styles.td, { width: COL.desc }]}>{r.name}</Text>
                <Text style={[styles.td, { width: COL.hsn }, styles.center]}>{r.hsn}</Text>
                <Text style={[styles.td, { width: COL.qty }, styles.center]}>{r.qty}</Text>
                <Text style={[styles.td, { width: COL.unit }, styles.center]}>Nos</Text>
                <View style={[styles.tdCol, { width: COL.rate }]}>
                  <Text style={styles.tdColTextRight}>
                    {formatInvoiceAmount(r.rate)}
                  </Text>
                </View>
                <View style={[styles.tdCol, styles.tdColLast, { width: COL.amt }]}>
                  <Text style={styles.tdColTextRight}>
                    {formatInvoiceAmount(r.amt)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <TotalsTable lines={totalLines} />
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.wordsBox}>
            <Text style={styles.wordsLabel}>Amount chargeable (in words)</Text>
            <Text style={styles.wordsText}>{amountInIndianWords(gst.total)}</Text>
          </View>
        </View>

        <View style={styles.footerNoteRow}>
          <Text style={styles.footerDisclaimer}>
            {SFPL_INVOICE_SELLER.electronicInvoiceNote}
          </Text>
          <Text style={styles.footerSignLine}>Signature & stamp .................</Text>
        </View>

        <Text style={styles.jurisdiction}>{SFPL_INVOICE_SELLER.jurisdiction}</Text>
      </Page>
    </Document>
  );
}

export async function generateOrderInvoicePdf(order: StoreOrder) {
  const logoSrc = await rasterizeSvgPublicPathToPngDataUrl("/logo-full-black.svg");
  return pdf(<InvoiceDoc order={order} logoSrc={logoSrc} />).toBlob();
}

export function getOrderInvoiceFileName(orderSerial: string) {
  const n = getOrderInvoiceNumber(orderSerial);
  return `${n.replace(/[^\w-]+/g, "-")}-invoice.pdf`;
}
