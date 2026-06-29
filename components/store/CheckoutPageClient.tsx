"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Phone, UserRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import env from "@/config/env";
import { formatPaisa } from "@/lib/format";
import { buildConnectLoginUrl, hasUserSession } from "@/lib/auth-storage";
import {
  validateCheckoutForm,
  validateCheckoutField,
  sanitizeCheckoutField,
  type CheckoutFormErrors,
  type CheckoutFormField,
  type CheckoutFormState,
} from "@/lib/store-profile";
import { useCart, useMergeGuestCartOnce } from "@/hooks/use-cart";
import { useCreateOrder, useVerifyOrder } from "@/hooks/use-orders";
import {
  useStoreAccountDetails,
  useStoreAddresses,
  useStoreStates,
} from "@/hooks/use-store-profile";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function fieldClassName(hasError: boolean) {
  return hasError ? "border-red-500 focus-visible:ring-red-500" : "";
}

type RazorpayHandlerResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpayScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

export default function CheckoutPageClient() {
  const router = useRouter();
  const { data: cart, isLoading: cartLoading } = useCart();
  const createOrderMutation = useCreateOrder();
  const verifyOrderMutation = useVerifyOrder();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formErrors, setFormErrors] = useState<CheckoutFormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<CheckoutFormField, boolean>>
  >({});
  const hasPrefilledRef = useRef(false);

  useMergeGuestCartOnce();

  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    organization_name: "",
    gst_number: "",
    pan_number: "",
    billing_address: "",
    billing_city: "",
    billing_state_id: "",
    billing_postal_code: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state_id: "",
    shipping_postal_code: "",
  });

  useEffect(() => {
    if (!hasUserSession()) {
      window.location.href = buildConnectLoginUrl("/checkout");
      return;
    }
    setIsCheckingAuth(false);
  }, []);

  const loggedIn = hasUserSession();
  const { data: statesResponse } = useStoreStates();
  const { data: addressesResponse, isLoading: addressesLoading } =
    useStoreAddresses(loggedIn);
  const { data: accountDetailsResponse, isLoading: accountLoading } =
    useStoreAccountDetails(loggedIn);

  useEffect(() => {
    if (hasPrefilledRef.current || accountLoading || addressesLoading) return;

    const account = accountDetailsResponse?.data;
    const addresses = addressesResponse?.data ?? [];
    const billing = addresses.find((item) => item.type === "billing");
    const shipping = addresses.find((item) => item.type === "shipping");

    if (!account && !billing && !shipping) return;

    setForm((prev) => ({
      ...prev,
      full_name: account?.full_name ?? prev.full_name,
      phone_number: account?.phone_number ?? prev.phone_number,
      organization_name: account?.organization_name ?? prev.organization_name,
      gst_number: account?.gst_number ?? prev.gst_number,
      pan_number: account?.pan_number ?? prev.pan_number,
      billing_address: billing?.address ?? prev.billing_address,
      billing_city: billing?.city ?? prev.billing_city,
      billing_state_id: billing?.state_id ?? prev.billing_state_id,
      billing_postal_code: billing?.postal_code ?? prev.billing_postal_code,
      shipping_address:
        shipping?.address ?? billing?.address ?? prev.shipping_address,
      shipping_city: shipping?.city ?? billing?.city ?? prev.shipping_city,
      shipping_state_id:
        shipping?.state_id ?? billing?.state_id ?? prev.shipping_state_id,
      shipping_postal_code:
        shipping?.postal_code ??
        billing?.postal_code ??
        prev.shipping_postal_code,
    }));

    hasPrefilledRef.current = true;
  }, [
    accountDetailsResponse,
    addressesResponse,
    accountLoading,
    addressesLoading,
  ]);

  const states = statesResponse?.data ?? [];
  const items = cart?.items ?? [];
  const total = cart?.total_amount_in_paisa ?? 0;

  const shippingValues = useMemo(() => {
    if (sameAsBilling) {
      return {
        shipping_address: form.billing_address,
        shipping_city: form.billing_city,
        shipping_state_id: form.billing_state_id,
        shipping_postal_code: form.billing_postal_code,
      };
    }
    return {
      shipping_address: form.shipping_address,
      shipping_city: form.shipping_city,
      shipping_state_id: form.shipping_state_id,
      shipping_postal_code: form.shipping_postal_code,
    };
  }, [form, sameAsBilling]);

  useEffect(() => {
    if (!sameAsBilling) return;
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.shipping_address;
      delete next.shipping_city;
      delete next.shipping_state_id;
      delete next.shipping_postal_code;
      return next;
    });
  }, [sameAsBilling]);

  const validateForm = () => {
    const errors = validateCheckoutForm(form, sameAsBilling);
    setFormErrors(errors);
    setTouched({
      full_name: true,
      phone_number: true,
      organization_name: true,
      gst_number: true,
      pan_number: true,
      billing_address: true,
      billing_city: true,
      billing_state_id: true,
      billing_postal_code: true,
      shipping_address: true,
      shipping_city: true,
      shipping_state_id: true,
      shipping_postal_code: true,
    });
    return Object.keys(errors).length === 0;
  };

  const setFieldError = (field: CheckoutFormField, error?: string) => {
    setFormErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const handleFieldChange = (field: CheckoutFormField, rawValue: string) => {
    const value = sanitizeCheckoutField(field, rawValue);
    setForm((prev) => {
      const next = { ...prev, [field]: value } as CheckoutFormState;
      if (touched[field]) {
        const error = validateCheckoutField(field, next, {
          sameAsBilling,
          mode: "change",
        });
        setFieldError(field, error);
      }
      return next;
    });
  };

  const handleFieldBlur = (field: CheckoutFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateCheckoutField(field, form, {
      sameAsBilling,
      mode: "blur",
    });
    setFieldError(field, error);
  };

  const handlePay = async () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the highlighted fields before paying");
      return;
    }

    setIsPaying(true);
    try {
      const response = await createOrderMutation.mutateAsync({
        full_name: form.full_name.trim(),
        phone_number: form.phone_number.trim(),
        organization_name: form.organization_name.trim() || undefined,
        gst_number: form.gst_number.trim().toUpperCase() || undefined,
        pan_number: form.pan_number.trim().toUpperCase() || undefined,
        billing_address: form.billing_address,
        billing_city: form.billing_city,
        billing_state_id: form.billing_state_id,
        billing_postal_code: form.billing_postal_code,
        ...shippingValues,
      });

      const { order, payment, razorpay_key_id } = response.data;
      const key = razorpay_key_id || env.razorpayKeyId;

      if (!payment?.id || !key) {
        toast.error("Payment gateway is not configured");
        return;
      }

      await loadRazorpayScript();

      const razorpay = new window.Razorpay!({
        key,
        amount: payment.amount,
        currency: payment.currency || "INR",
        name: "SFPL Connect",
        description: order.serial ?? "SFPL Store order",
        order_id: payment.id,
        prefill: {
          name: form.full_name,
          contact: form.phone_number,
        },
        theme: { color: "#dc2626" },
        handler: async (paymentResponse: RazorpayHandlerResponse) => {
          try {
            const verified = await verifyOrderMutation.mutateAsync({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });
            toast.success("Payment successful");
            router.push(`/orders/${verified.data.id}`);
          } catch {
            toast.error("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      });

      razorpay.open();
    } catch {
      // handled by mutation
    } finally {
      setIsPaying(false);
    }
  };

  if (isCheckingAuth || cartLoading || accountLoading || addressesLoading) {
    return (
      <div className="container mx-auto px-4 py-16 h-64 animate-pulse bg-gray-50 rounded-2xl" />
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <UserRound className="h-5 w-5 text-red-600" />
              Account Details
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(e) =>
                    handleFieldChange("full_name", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("full_name")}
                  placeholder="Enter your full name"
                  className={fieldClassName(Boolean(formErrors.full_name))}
                />
                <FieldError message={formErrors.full_name} />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone_number"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone_number"
                  value={form.phone_number}
                  onChange={(e) =>
                    handleFieldChange("phone_number", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("phone_number")}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  className={fieldClassName(Boolean(formErrors.phone_number))}
                />
                <FieldError message={formErrors.phone_number} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label
                htmlFor="organization_name"
                className="flex items-center gap-2"
              >
                <Building2 className="h-3.5 w-3.5 text-gray-500" />
                Organization Name
              </Label>
              <Input
                id="organization_name"
                value={form.organization_name}
                onChange={(e) =>
                  handleFieldChange("organization_name", e.target.value)
                }
                onBlur={() => handleFieldBlur("organization_name")}
                placeholder="Enter your organization name"
                className={fieldClassName(
                  Boolean(formErrors.organization_name),
                )}
              />
              <FieldError message={formErrors.organization_name} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gst_number">GST Number</Label>
                <Input
                  id="gst_number"
                  value={form.gst_number}
                  onChange={(e) =>
                    handleFieldChange("gst_number", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("gst_number")}
                  placeholder="15-character GST number"
                  maxLength={15}
                  className={fieldClassName(Boolean(formErrors.gst_number))}
                />
                <FieldError message={formErrors.gst_number} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan_number">PAN Number</Label>
                <Input
                  id="pan_number"
                  value={form.pan_number}
                  onChange={(e) =>
                    handleFieldChange("pan_number", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("pan_number")}
                  placeholder="e.g. ABCDE1234F"
                  maxLength={10}
                  className={fieldClassName(Boolean(formErrors.pan_number))}
                />
                <FieldError message={formErrors.pan_number} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Billing address</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billing_address">Address</Label>
                <Textarea
                  id="billing_address"
                  value={form.billing_address}
                  onChange={(e) =>
                    handleFieldChange("billing_address", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("billing_address")}
                  placeholder="Street address"
                  className={fieldClassName(
                    Boolean(formErrors.billing_address),
                  )}
                />
                <FieldError message={formErrors.billing_address} />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="billing_city">City</Label>
                  <Input
                    id="billing_city"
                    value={form.billing_city}
                    onChange={(e) =>
                      handleFieldChange("billing_city", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("billing_city")}
                    placeholder="City"
                    className={fieldClassName(Boolean(formErrors.billing_city))}
                  />
                  <FieldError message={formErrors.billing_city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_state_id">State</Label>
                  <select
                    id="billing_state_id"
                    className={`h-10 w-full rounded-md border border-input bg-background px-3 text-sm ${fieldClassName(Boolean(formErrors.billing_state_id))}`}
                    value={form.billing_state_id}
                    onChange={(e) =>
                      handleFieldChange("billing_state_id", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("billing_state_id")}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <FieldError message={formErrors.billing_state_id} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_postal_code">Postal code</Label>
                  <Input
                    id="billing_postal_code"
                    value={form.billing_postal_code}
                    onChange={(e) =>
                      handleFieldChange("billing_postal_code", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("billing_postal_code")}
                    placeholder="6-digit PIN code"
                    inputMode="numeric"
                    maxLength={6}
                    className={fieldClassName(
                      Boolean(formErrors.billing_postal_code),
                    )}
                  />
                  <FieldError message={formErrors.billing_postal_code} />
                </div>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)}
            />
            Shipping address same as billing
          </label>

          {!sameAsBilling ? (
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Shipping address
              </h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipping_address">Address</Label>
                  <Textarea
                    id="shipping_address"
                    value={form.shipping_address}
                    onChange={(e) =>
                      handleFieldChange("shipping_address", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("shipping_address")}
                    placeholder="Street address"
                    className={fieldClassName(
                      Boolean(formErrors.shipping_address),
                    )}
                  />
                  <FieldError message={formErrors.shipping_address} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="shipping_city">City</Label>
                    <Input
                      id="shipping_city"
                      value={form.shipping_city}
                      onChange={(e) =>
                        handleFieldChange("shipping_city", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("shipping_city")}
                      placeholder="City"
                      className={fieldClassName(
                        Boolean(formErrors.shipping_city),
                      )}
                    />
                    <FieldError message={formErrors.shipping_city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_state_id">State</Label>
                    <select
                      id="shipping_state_id"
                      className={`h-10 w-full rounded-md border border-input bg-background px-3 text-sm ${fieldClassName(Boolean(formErrors.shipping_state_id))}`}
                      value={form.shipping_state_id}
                      onChange={(e) =>
                        handleFieldChange("shipping_state_id", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("shipping_state_id")}
                    >
                      <option value="">Select state</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <FieldError message={formErrors.shipping_state_id} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_postal_code">Postal code</Label>
                    <Input
                      id="shipping_postal_code"
                      value={form.shipping_postal_code}
                      onChange={(e) =>
                        handleFieldChange(
                          "shipping_postal_code",
                          e.target.value,
                        )
                      }
                      onBlur={() => handleFieldBlur("shipping_postal_code")}
                      placeholder="6-digit PIN code"
                      inputMode="numeric"
                      maxLength={6}
                      className={fieldClassName(
                        Boolean(formErrors.shipping_postal_code),
                      )}
                    />
                    <FieldError message={formErrors.shipping_postal_code} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.device_id} className="flex justify-between gap-3">
                <span className="text-gray-600">
                  {item.device_name} × {item.quantity}
                </span>
                <span>{formatPaisa(item.price_in_paisa * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 font-semibold">
            <span>Total</span>
            <span className="text-red-600">{formatPaisa(total)}</span>
          </div>
          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700"
            size="lg"
            disabled={isPaying || createOrderMutation.isPending}
            onClick={() => void handlePay()}
          >
            {isPaying ? "Processing..." : "Pay with Razorpay"}
          </Button>
          <Button asChild variant="outline" className="mt-3 w-full">
            <Link href="/cart">Back to cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
