import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type { StoreOrder } from "@/types/store";
import {
  formatOrderAddress,
  formatOrderDate,
  formatPaymentStatus,
} from "@/lib/format";
import {
  formatPdfCurrency,
  getOrderReceiptNumber,
  rasterizeSvgPublicPathToPngDataUrl,
  SFPL_INVOICE_SELLER,
} from "@/lib/store-order-pdf-shared";

const SFPL_RED = "#dc2626";
const SFPL_DARK = "#111827";

export { getOrderReceiptNumber } from "@/lib/store-order-pdf-shared";

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 56,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#374151",
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  logo: {
    width: 120,
    height: 36,
    objectFit: "contain",
    objectPosition: "left",
  },
  brandText: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "right",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: SFPL_RED,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  metaLine: {
    marginBottom: 3,
    fontSize: 9,
    color: "#111827",
  },
  metaLabel: {
    color: "#6b7280",
  },
  panel: {
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  panelHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  panelAccent: {
    width: 3,
    backgroundColor: SFPL_RED,
  },
  panelTitleWrap: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  panelTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: SFPL_DARK,
  },
  panelBody: {
    padding: 10,
    gap: 4,
  },
  summaryRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  summaryLabel: {
    width: 130,
    color: "#6b7280",
    fontSize: 8,
  },
  summaryValue: {
    flex: 1,
    fontSize: 9,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },
  summaryValueMono: {
    fontFamily: "Courier",
    fontSize: 8,
  },
  addressRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  addressCol: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 8,
    minHeight: 56,
  },
  addressTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: SFPL_RED,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  addressText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: "#374151",
  },
  table: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: SFPL_RED,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 8,
  },
  tableRowAlt: {
    backgroundColor: "#fafafa",
  },
  thCell: { padding: 6 },
  tdCell: { padding: 6, color: "#374151" },
  colIndex: { width: 28 },
  colItem: { flex: 1 },
  colQty: { width: 48, textAlign: "right" },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    fontSize: 8,
    color: "#6b7280",
    lineHeight: 1.45,
    textAlign: "left",
  },
});

function formatReceiptCurrency(paisa: number) {
  return formatPdfCurrency(paisa);
}

function getBillingName(order: StoreOrder) {
  const details = order.billing_details;
  if (!details || typeof details !== "object") return "—";
  const fullName = details.full_name;
  if (typeof fullName === "string" && fullName.trim()) return fullName.trim();
  const first =
    typeof details.first_name === "string" ? details.first_name : "";
  const last = typeof details.last_name === "string" ? details.last_name : "";
  const combined = `${first} ${last}`.trim();
  return combined || "—";
}

function formatAddressBlock(address?: Record<string, unknown> | string | null) {
  const formatted = formatOrderAddress(address);
  return formatted === "—" ? "Not provided" : formatted;
}

type OrderReceiptPdfDocumentProps = {
  order: StoreOrder;
  logoSrc?: string;
};

function OrderReceiptPdfDocument({
  order,
  logoSrc,
}: OrderReceiptPdfDocumentProps) {
  const items = order.items ?? [];
  const paidAmount = order.paid_amount_in_paisa ?? 0;
  const balanceDue = Math.max(0, order.total_amount_in_paisa - paidAmount);
  const receiptNumber = order.serial
    ? getOrderReceiptNumber(order.serial)
    : "—";

  return (
    <Document title={`SFPL Receipt ${receiptNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          {logoSrc ? (
            <Image src={logoSrc} style={styles.logo} />
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Helvetica-Bold",
                color: SFPL_RED,
              }}
            >
              SFPL CONNECT
            </Text>
          )}
          <View>
            <Text style={styles.brandText}>
              {SFPL_INVOICE_SELLER.legalName}
            </Text>
            <Text style={styles.brandText}>{SFPL_INVOICE_SELLER.website}</Text>
          </View>
        </View>

        <Text style={styles.title}>ORDER RECEIPT</Text>
        <Text style={styles.metaLine}>
          <Text style={styles.metaLabel}>Receipt No: </Text>
          {receiptNumber}
        </Text>
        <Text style={styles.metaLine}>
          <Text style={styles.metaLabel}>Issued: </Text>
          {formatOrderDate(order.created_at)}
        </Text>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View style={styles.panelAccent} />
            <View style={styles.panelTitleWrap}>
              <Text style={styles.panelTitle}>Order summary</Text>
            </View>
          </View>
          <View style={styles.panelBody}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Billing name</Text>
              <Text style={styles.summaryValue}>{getBillingName(order)}</Text>
            </View>
            {order.serial ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Order no</Text>
                <Text style={styles.summaryValue}>{order.serial}</Text>
              </View>
            ) : null}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment status</Text>
              <Text style={styles.summaryValue}>
                {formatPaymentStatus(order.payment_status)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Order total</Text>
              <Text style={styles.summaryValue}>
                {formatReceiptCurrency(order.total_amount_in_paisa)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount paid</Text>
              <Text style={styles.summaryValue}>
                {formatReceiptCurrency(paidAmount)}
              </Text>
            </View>
            {order.razorpay_payment_id ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Razorpay reference</Text>
                <Text style={[styles.summaryValue, styles.summaryValueMono]}>
                  {order.razorpay_payment_id}
                </Text>
              </View>
            ) : null}
            {balanceDue > 0 ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Balance due</Text>
                <Text style={styles.summaryValue}>
                  {formatReceiptCurrency(balanceDue)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.addressRow}>
          <View style={styles.addressCol}>
            <Text style={styles.addressTitle}>Billing address</Text>
            <Text style={styles.addressText}>
              {formatAddressBlock(order.billing_address)}
            </Text>
          </View>
          <View style={styles.addressCol}>
            <Text style={styles.addressTitle}>Shipping address</Text>
            <Text style={styles.addressText}>
              {formatAddressBlock(order.shipping_address)}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.thCell, styles.colIndex]}>#</Text>
            <Text style={[styles.thCell, styles.colItem]}>Item</Text>
            <Text style={[styles.thCell, styles.colQty]}>Qty</Text>
          </View>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowAlt : {},
              ]}
            >
              <Text style={[styles.tdCell, styles.colIndex]}>{index + 1}</Text>
              <Text style={[styles.tdCell, styles.colItem]}>
                {item.device_name}
              </Text>
              <Text style={[styles.tdCell, styles.colQty]}>
                {item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>
            This is a computer-generated payment receipt from{" "}
            {SFPL_INVOICE_SELLER.legalName} (SFPL CONNECT).
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateOrderReceiptPdf(order: StoreOrder) {
  const logoSrc = await rasterizeSvgPublicPathToPngDataUrl(
    "/logo-full-black.svg",
  );
  return pdf(
    <OrderReceiptPdfDocument order={order} logoSrc={logoSrc} />,
  ).toBlob();
}

export function getOrderReceiptFileName(orderSerial: string) {
  const receiptNumber = getOrderReceiptNumber(orderSerial);
  const safe = receiptNumber.replace(/[^\w-]+/g, "-");
  return `${safe}-receipt.pdf`;
}
