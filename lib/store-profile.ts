export const PHONE_NUMBER_REGEX = /^\d{10}$/;
export const PAN_NUMBER_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const GST_NUMBER_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export const POSTAL_CODE_REGEX = /^\d{6}$/;

export type StoreProfileFormErrors = {
  full_name?: string;
  phone_number?: string;
  gst_number?: string;
  pan_number?: string;
};

export type CheckoutFormState = {
  full_name: string;
  phone_number: string;
  organization_name: string;
  gst_number: string;
  pan_number: string;
  billing_address: string;
  billing_city: string;
  billing_state_id: string;
  billing_postal_code: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state_id: string;
  shipping_postal_code: string;
};

export type CheckoutFormField = keyof CheckoutFormState;
export type CheckoutFormErrors = Partial<Record<CheckoutFormField, string>>;

type ValidateFieldOptions = {
  sameAsBilling?: boolean;
  mode?: "blur" | "change";
};

export function validateStoreProfileFields(input: {
  full_name: string;
  phone_number: string;
  gst_number?: string;
  pan_number?: string;
}) {
  const errors: StoreProfileFormErrors = {};
  const fullNameError = validateCheckoutField("full_name", input as CheckoutFormState, {
    mode: "blur",
  });
  const phoneError = validateCheckoutField("phone_number", input as CheckoutFormState, {
    mode: "blur",
  });
  const gstError = validateCheckoutField("gst_number", input as CheckoutFormState, {
    mode: "blur",
  });
  const panError = validateCheckoutField("pan_number", input as CheckoutFormState, {
    mode: "blur",
  });

  if (fullNameError) errors.full_name = fullNameError;
  if (phoneError) errors.phone_number = phoneError;
  if (gstError) errors.gst_number = gstError;
  if (panError) errors.pan_number = panError;

  return errors;
}

export function validateCheckoutField(
  field: CheckoutFormField,
  form: CheckoutFormState,
  options?: ValidateFieldOptions,
): string | undefined {
  const mode = options?.mode ?? "blur";
  const sameAsBilling = options?.sameAsBilling ?? true;

  if (
    sameAsBilling &&
    (field === "shipping_address" ||
      field === "shipping_city" ||
      field === "shipping_state_id" ||
      field === "shipping_postal_code")
  ) {
    return undefined;
  }

  switch (field) {
    case "full_name": {
      const value = form.full_name.trim();
      if (!value) return mode === "blur" ? "Full name is required" : undefined;
      if (value.length < 2) return "Full name must be at least 2 characters";
      if (value.length > 255) return "Full name must be less than 255 characters";
      return undefined;
    }
    case "phone_number": {
      const value = form.phone_number.trim();
      if (!value) return mode === "blur" ? "Phone number is required" : undefined;
      if (!/^\d+$/.test(value)) return "Phone number must contain only digits";
      if (value.length > 10) return "Phone number must be 10 digits";
      if (mode === "blur" || value.length === 10) {
        if (!PHONE_NUMBER_REGEX.test(value)) {
          return "Phone number must be exactly 10 digits";
        }
      }
      return undefined;
    }
    case "organization_name": {
      const value = form.organization_name.trim();
      if (value.length > 255) return "Organization name must be less than 255 characters";
      return undefined;
    }
    case "gst_number": {
      const value = form.gst_number.trim().toUpperCase();
      if (!value) return undefined;
      if (value.length < 15 && mode === "change") return undefined;
      if (!GST_NUMBER_REGEX.test(value)) return "Enter a valid 15-character GST number";
      return undefined;
    }
    case "pan_number": {
      const value = form.pan_number.trim().toUpperCase();
      if (!value) return undefined;
      if (value.length < 10 && mode === "change") return undefined;
      if (!PAN_NUMBER_REGEX.test(value)) return "Enter a valid PAN number (e.g. ABCDE1234F)";
      return undefined;
    }
    case "billing_address":
    case "shipping_address": {
      const value = form[field].trim();
      if (!value) return mode === "blur" ? "Address is required" : undefined;
      if (value.length < 3) return "Address must be at least 3 characters";
      return undefined;
    }
    case "billing_city":
    case "shipping_city": {
      const value = form[field].trim();
      if (!value) return mode === "blur" ? "City is required" : undefined;
      if (value.length < 2) return "City must be at least 2 characters";
      if (value.length > 255) return "City must be less than 255 characters";
      return undefined;
    }
    case "billing_state_id":
    case "shipping_state_id": {
      const value = form[field].trim();
      if (!value) return mode === "blur" ? "State is required" : undefined;
      return undefined;
    }
    case "billing_postal_code":
    case "shipping_postal_code": {
      const value = form[field].trim();
      if (!value) return mode === "blur" ? "Postal code is required" : undefined;
      if (!/^\d+$/.test(value)) return "Postal code must contain only digits";
      if (value.length < 6 && mode === "change") return undefined;
      if (value.length !== 6) return "Postal code must be exactly 6 digits";
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateCheckoutForm(
  form: CheckoutFormState,
  sameAsBilling: boolean,
): CheckoutFormErrors {
  const fields: CheckoutFormField[] = [
    "full_name",
    "phone_number",
    "organization_name",
    "gst_number",
    "pan_number",
    "billing_address",
    "billing_city",
    "billing_state_id",
    "billing_postal_code",
  ];

  if (!sameAsBilling) {
    fields.push(
      "shipping_address",
      "shipping_city",
      "shipping_state_id",
      "shipping_postal_code",
    );
  }

  const errors: CheckoutFormErrors = {};
  for (const field of fields) {
    const error = validateCheckoutField(field, form, { sameAsBilling, mode: "blur" });
    if (error) errors[field] = error;
  }
  return errors;
}

export function sanitizeCheckoutField(field: CheckoutFormField, value: string) {
  switch (field) {
    case "phone_number":
      return value.replace(/\D/g, "").slice(0, 10);
    case "billing_postal_code":
    case "shipping_postal_code":
      return value.replace(/\D/g, "").slice(0, 6);
    case "gst_number":
      return value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 15);
    case "pan_number":
      return value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 10);
    default:
      return value;
  }
}
