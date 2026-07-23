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
import type { StoreInvoice } from "@/types/store";
import { amountInIndianWords } from "@/lib/amount-in-words";
import { parseOrderAddress } from "@/lib/format";
import {
  SFPL_INVOICE_SELLER,
  formatInvoiceAmount,
  formatInvoiceDate,
  getPdfAddressLines,
  rasterizeSvgPublicPathToPngDataUrl,
} from "@/lib/store-order-pdf-shared";

const RED = "#dc2626";
const DARK = "#1f2937";
const MUTED = "#6b7280";
const BODY = "#4b5563";
const LINE = "#e5e7eb";

const COL_TOTALS_WIDTH = "31%";
const COL_BEFORE_TOTALS = "69%";

/**
 * Clear hierarchy:
 * - Bold only: document title, seller/buyer names, table header, grand total
 * - Regular everywhere else (addresses, meta values, line items, totals rows, footer)
 */
const FONT = {
  title: 16,
  name: 10,
  body: 9,
  label: 8,
  header: 8,
  small: 7.5,
  grand: 10,
} as const;

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 100,
    paddingHorizontal: 32,
    fontFamily: "Helvetica",
    fontSize: FONT.body,
    color: DARK,
    backgroundColor: "#fff",
    position: "relative",
  },
  topBar: {
    flexDirection: "row",
    marginBottom: 10,
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
    fontSize: FONT.name,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.35,
    marginBottom: 4,
    color: DARK,
  },
  muted: {
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
    lineHeight: 1.5,
    marginBottom: 1.5,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  title: {
    fontSize: FONT.title,
    fontFamily: "Helvetica-Bold",
    color: RED,
    letterSpacing: 1.2,
  },
  titleLine: {
    marginTop: 6,
    height: 2,
    width: 56,
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
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  metaAccent: {
    width: 3,
    backgroundColor: RED,
  },
  metaCardTitle: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: FONT.label,
    fontFamily: "Helvetica",
    color: MUTED,
    letterSpacing: 0.3,
  },
  metaRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    minHeight: 18,
    alignItems: "center",
  },
  metaRowLast: {
    borderBottomWidth: 0,
  },
  metaLabel: {
    width: "46%",
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
    borderRightWidth: 1,
    borderRightColor: LINE,
  },
  metaValue: {
    width: "54%",
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
  },
  partyRow: {
    flexDirection: "row",
    marginBottom: 10,
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
    backgroundColor: "#f9fafb",
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
    fontSize: FONT.label,
    fontFamily: "Helvetica",
    color: MUTED,
    letterSpacing: 0.3,
  },
  panelBody: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 64,
  },
  partyName: {
    fontSize: FONT.name,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    lineHeight: 1.35,
    color: DARK,
  },
  bodyLine: {
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: DARK,
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
    fontSize: FONT.header,
  },
  trow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: LINE,
    minHeight: 24,
    alignItems: "center",
  },
  trowAlt: {
    backgroundColor: "#fafafa",
  },
  th: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.header,
    color: "#fff",
  },
  td: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
  },
  tdLast: { borderRightWidth: 0 },
  tdCol: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    justifyContent: "center",
  },
  tdColLast: {
    borderRightWidth: 0,
  },
  tdColTextRight: {
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
    textAlign: "right",
    width: "100%",
  },
  thCol: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  thColTextRight: {
    fontSize: FONT.header,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    textAlign: "right",
    width: "100%",
  },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  tdTotalLabel: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: LINE,
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
    textAlign: "right",
  },
  tdTotalValue: {
    paddingVertical: 6,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  totalsValueText: {
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
    textAlign: "right",
    width: "100%",
  },
  trowGrandTotal: {
    backgroundColor: "#fef2f2",
  },
  tdGrandLabel: {
    color: RED,
    fontSize: FONT.grand,
    fontFamily: "Helvetica-Bold",
  },
  tdGrandValue: {
    fontFamily: "Helvetica-Bold",
    color: RED,
    fontSize: FONT.grand,
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
    minHeight: 24,
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
    padding: 8,
    width: "100%",
  },
  wordsLabel: {
    fontSize: FONT.label,
    fontFamily: "Helvetica",
    color: MUTED,
    marginBottom: 4,
  },
  wordsText: {
    fontSize: FONT.body,
    fontFamily: "Helvetica",
    color: DARK,
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
    fontSize: FONT.small,
    fontFamily: "Helvetica",
    color: MUTED,
    lineHeight: 1.45,
    maxWidth: "58%",
  },
  footerSignLine: {
    fontSize: FONT.label,
    fontFamily: "Helvetica",
    color: DARK,
    textAlign: "right",
  },
  jurisdiction: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: FONT.small,
    fontFamily: "Helvetica",
    color: MUTED,
    letterSpacing: 1,
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 8,
  },
});

const COL = {
  sl: "5%",
  desc: "45%",
  hsn: "9%",
  qty: "10%",
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
            <View style={[styles.tdTotalValue, styles.totalsValueCol]}>
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

function getBillingName(invoice: StoreInvoice) {
  const d = invoice.billing_details;
  if (!d || typeof d !== "object") return "—";
  if (typeof d.full_name === "string" && d.full_name.trim())
    return d.full_name.trim();
  const first = typeof d.first_name === "string" ? d.first_name : "";
  const last = typeof d.last_name === "string" ? d.last_name : "";
  return `${first} ${last}`.trim() || "—";
}

function billingField(invoice: StoreInvoice, key: string) {
  const d = invoice.billing_details;
  if (!d || typeof d !== "object") return "";
  const v = d[key];
  return typeof v === "string" ? v.trim() : "";
}

function party(invoice: StoreInvoice, kind: "billing" | "shipping") {
  const addr =
    kind === "billing" ? invoice.billing_address : invoice.shipping_address;
  const parsed = parseOrderAddress(addr);
  const org = billingField(invoice, "organization_name");
  return {
    name: org || getBillingName(invoice),
    lines: getPdfAddressLines(addr),
    gst: billingField(invoice, "gst_number"),
    pan: billingField(invoice, "pan_number"),
    phone: billingField(invoice, "phone_number"),
    state: parsed?.state_name || "—",
    code: parsed?.state_gst_code || "—",
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

type Props = { invoice: StoreInvoice; logoSrc?: string };

function InvoiceDoc({ invoice, logoSrc }: Props) {
  const items = invoice.items ?? [];
  const invNo = invoice.serial || "—";
  const invDate = formatInvoiceDate(invoice.issued_at);
  const bill = party(invoice, "billing");
  const ship = party(invoice, "shipping");

  const roundPaisa = (value: number) => Math.round(Number(value) || 0);

  const rows = items.map((item, i) => {
    const amt = roundPaisa(item.taxable_amount_in_paisa);
    const qty = Math.max(0, Math.round(Number(item.quantity) || 0));
    const rate = qty > 0 ? roundPaisa(amt / qty) : amt;
    return {
      id: `${item.plan_id}-${i}`,
      sl: i + 1,
      name: item.plan_name,
      hsn: item.hsn_sac || "—",
      qty,
      rate,
      amt,
    };
  });

  const taxable = roundPaisa(invoice.taxable_amount_in_paisa);
  const grandTotal = roundPaisa(invoice.total_amount_in_paisa);

  const chargeLines = (invoice.charges ?? []).map((charge) => ({
    label: `${charge.type} @ ${charge.rate}%`,
    value: formatInvoiceAmount(roundPaisa(charge.amount_in_paisa)),
  }));

  const totalLines: { label: string; value: string; grand?: boolean }[] = [
    {
      label: "Taxable value",
      value: formatInvoiceAmount(taxable),
    },
    ...chargeLines,
    {
      label: "Grand Total",
      value: `INR ${formatInvoiceAmount(grandTotal)}`,
      grand: true,
    },
  ];

  return (
    <Document title={`Tax Invoice ${invNo}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>TAX INVOICE</Text>
          <View style={styles.titleLine} />
        </View>

        <View style={styles.topBar}>
          <View style={styles.brandCol}>
            {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
            <Text style={styles.companyName}>
              {SFPL_INVOICE_SELLER.legalName}
            </Text>
            {SFPL_INVOICE_SELLER.addressLines.map((l) => (
              <Text key={l} style={styles.muted}>
                {l}
              </Text>
            ))}
            <Text style={styles.muted}>
              GSTIN/UIN : {SFPL_INVOICE_SELLER.gstin}
            </Text>
            <Text style={styles.muted}>
              {SFPL_INVOICE_SELLER.stateName} (Code{" "}
              {SFPL_INVOICE_SELLER.stateCode}) · {SFPL_INVOICE_SELLER.phone}
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
                ["Order No.", invoice.order_number || "—"],
              ] as const
            ).map(([label, value], idx, arr) => (
              <View
                key={label}
                style={[
                  styles.metaRow,
                  idx === arr.length - 1 ? styles.metaRowLast : {},
                ]}
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
              <Text style={[styles.th, { width: COL.sl }, styles.center]}>
                #
              </Text>
              <Text style={[styles.th, { width: COL.desc }]}>Description</Text>
              <Text style={[styles.th, { width: COL.hsn }, styles.center]}>
                HSN/SAC
              </Text>
              <Text style={[styles.th, { width: COL.qty }, styles.center]}>
                Quantity
              </Text>
              <Text style={[styles.th, { width: COL.unit }, styles.center]}>
                Unit
              </Text>
              <View style={[styles.thCol, { width: COL.rate }]}>
                <Text style={styles.thColTextRight}>Rate</Text>
              </View>
              <View style={[styles.thCol, { width: COL.amt }]}>
                <Text style={styles.thColTextRight}>Amount</Text>
              </View>
            </View>

            {rows.map((r, idx) => (
              <View
                key={r.id}
                style={[styles.trow, idx % 2 === 1 ? styles.trowAlt : {}]}
              >
                <Text style={[styles.td, { width: COL.sl }, styles.center]}>
                  {r.sl}
                </Text>
                <Text style={[styles.td, { width: COL.desc }]}>{r.name}</Text>
                <Text style={[styles.td, { width: COL.hsn }, styles.center]}>
                  {r.hsn}
                </Text>
                <Text style={[styles.td, { width: COL.qty }, styles.center]}>
                  {r.qty}
                </Text>
                <Text style={[styles.td, { width: COL.unit }, styles.center]}>
                  Nos
                </Text>
                <View style={[styles.tdCol, { width: COL.rate }]}>
                  <Text style={styles.tdColTextRight}>
                    {formatInvoiceAmount(r.rate)}
                  </Text>
                </View>
                <View
                  style={[styles.tdCol, styles.tdColLast, { width: COL.amt }]}
                >
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
            <Text style={styles.wordsText}>
              {amountInIndianWords(grandTotal)}
            </Text>
          </View>
        </View>

        <View style={styles.footerNoteRow}>
          <Text style={styles.footerDisclaimer}>
            {SFPL_INVOICE_SELLER.electronicInvoiceNote}
          </Text>
          <Text style={styles.footerSignLine}>
            Signature & stamp .................
          </Text>
        </View>

        <Text style={styles.jurisdiction}>
          {SFPL_INVOICE_SELLER.jurisdiction}
        </Text>
      </Page>
    </Document>
  );
}

export async function generateOrderInvoicePdf(invoice: StoreInvoice) {
  const logoSrc = await rasterizeSvgPublicPathToPngDataUrl(
    "/logo-full-black.svg",
  );
  return pdf(<InvoiceDoc invoice={invoice} logoSrc={logoSrc} />).toBlob();
}

export function getOrderInvoiceFileName(invoiceSerial: string) {
  return `${invoiceSerial.replace(/[^\w-]+/g, "-")}-invoice.pdf`;
}
