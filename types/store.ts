export type StoreDeviceImage = {
  id: string;
  key: string;
  url: string;
};

export type StoreDevice = {
  id: string;
  name: string;
  slug: string;
  hsn_sac?: string | null;
  short_description?: string | null;
  description_md?: string | null;
  price_in_paisa: number;
  price_in_rupee: number;
  in_stock: boolean;
  is_active: boolean;
  sort_order: number;
  image?: StoreDeviceImage | null;
};

export type CartItem = {
  device_id: string;
  quantity: number;
  device_name: string;
  slug: string;
  hsn_sac?: string | null;
  short_description?: string | null;
  price_in_paisa: number;
  price_in_rupee?: number;
  in_stock: boolean;
  image?: StoreDeviceImage | null;
};

export type CartResponse = {
  items: CartItem[];
  total_amount_in_paisa: number;
  total_amount_in_rupee: number;
  guest_cart_id?: string | null;
};

export type StoreAddress = {
  id: string;
  type: "billing" | "shipping";
  address: string;
  city: string;
  postal_code: string;
  state_id: string;
  state_name?: string;
  state_gst_code?: string;
};

export type StoreAccountDetails = {
  email?: string;
  full_name: string;
  phone_number: string;
  organization_name: string;
  gst_number: string;
  pan_number: string;
};

export type StoreState = {
  id: string;
  name: string;
  gst_code: string;
  is_union_territory: boolean;
};

export type StoreOrderItem = {
  id: string;
  device_id: string;
  device_name: string;
  hsn_sac?: string | null;
  quantity: number;
  price_in_paisa: number;
  image?: StoreDeviceImage | null;
};

export type StoreOrder = {
  id: string;
  serial: string | null;
  payment_status: "pending" | "paid" | "failed";
  status: string;
  total_amount_in_paisa: number;
  paid_amount_in_paisa: number;
  is_paid: boolean;
  razorpay_payment_id?: string | null;
  created_at: string;
  total_item_count?: number;
  billing_details?: Record<string, unknown>;
  billing_address?: Record<string, unknown>;
  shipping_address?: Record<string, unknown>;
  items?: StoreOrderItem[];
};

export type InvoiceChargeType = "CGST" | "SGST" | "IGST";

export type InvoiceCharge = {
  type: InvoiceChargeType;
  rate: number;
  amount_in_paisa: number;
};

export type StoreInvoiceItem = {
  plan_id: string;
  plan_name: string;
  hsn_sac?: string | null;
  quantity: number;
  price_in_paisa: number;
  taxable_amount_in_paisa: number;
  tax_amount_in_paisa: number;
  total_amount_in_paisa: number;
};

export type StoreInvoice = {
  id: string;
  order_id: string;
  order_number: string;
  serial: string;
  issued_at: string;
  status: string;
  billing_details: Record<string, unknown>;
  billing_address: Record<string, unknown>;
  shipping_address: Record<string, unknown>;
  place_of_supply_state_name: string;
  place_of_supply_gst_code: string;
  is_inter_state: boolean;
  items: StoreInvoiceItem[];
  charges: InvoiceCharge[];
  taxable_amount_in_paisa: number;
  tax_amount_in_paisa: number;
  total_amount_in_paisa: number;
  seller_gstin: string;
  seller_state_gst_code: string;
  created_at: string;
  updated_at?: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type ApiResponse<T> = {
  data: T;
};
