"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Phone, Truck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildConnectLoginUrl, hasUserSession } from "@/lib/auth-storage";
import { CUSTOMER_AUTH_COOKIES } from "@/lib/auth-cookies";
import {
  validateStoreProfileFields,
  type StoreProfileFormErrors,
} from "@/lib/store-profile";
import {
  useStoreAccountDetails,
  useStoreAddresses,
  useStoreStates,
  useUpsertStoreAccountDetails,
  useUpsertStoreAddress,
} from "@/hooks/use-store-profile";

type AddressForm = {
  address: string;
  city: string;
  state_id: string;
  postal_code: string;
};

const EMPTY_ADDRESS: AddressForm = {
  address: "",
  city: "",
  state_id: "",
  postal_code: "",
};

function getEmailFromCookie() {
  if (typeof document === "undefined") return "";
  const cookieName = CUSTOMER_AUTH_COOKIES.user.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${cookieName}=([^;]*)`),
  );
  if (!match) return "";
  try {
    const user = JSON.parse(decodeURIComponent(match[1]));
    return typeof user?.email === "string" ? user.email : "";
  } catch {
    return "";
  }
}

export default function StoreAccountSettingsClient() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formErrors, setFormErrors] = useState<StoreProfileFormErrors>({});
  const [accountForm, setAccountForm] = useState({
    full_name: "",
    phone_number: "",
    organization_name: "",
    gst_number: "",
    pan_number: "",
  });
  const [billingForm, setBillingForm] = useState<AddressForm>(EMPTY_ADDRESS);
  const [shippingForm, setShippingForm] = useState<AddressForm>(EMPTY_ADDRESS);
  const [hasHydrated, setHasHydrated] = useState(false);

  const loggedIn = hasUserSession();
  const { data: statesResponse, isLoading: statesLoading } = useStoreStates();
  const { data: accountResponse, isLoading: accountLoading } =
    useStoreAccountDetails(loggedIn);
  const { data: addressesResponse, isLoading: addressesLoading } =
    useStoreAddresses(loggedIn);
  const upsertAccount = useUpsertStoreAccountDetails();
  const upsertAddress = useUpsertStoreAddress();

  useEffect(() => {
    if (!hasUserSession()) {
      window.location.href = buildConnectLoginUrl(
        `${window.location.origin}/account`,
      );
      return;
    }
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (hasHydrated || accountLoading || addressesLoading) return;

    const account = accountResponse?.data;
    const addresses = addressesResponse?.data ?? [];
    const billing = addresses.find((item) => item.type === "billing");
    const shipping = addresses.find((item) => item.type === "shipping");

    if (account) {
      setAccountForm({
        full_name: account.full_name ?? "",
        phone_number: account.phone_number ?? "",
        organization_name: account.organization_name ?? "",
        gst_number: account.gst_number ?? "",
        pan_number: account.pan_number ?? "",
      });
    }

    if (billing) {
      setBillingForm({
        address: billing.address ?? "",
        city: billing.city ?? "",
        state_id: billing.state_id ?? "",
        postal_code: billing.postal_code ?? "",
      });
    }

    if (shipping) {
      setShippingForm({
        address: shipping.address ?? "",
        city: shipping.city ?? "",
        state_id: shipping.state_id ?? "",
        postal_code: shipping.postal_code ?? "",
      });
    }

    setHasHydrated(true);
  }, [
    accountResponse,
    addressesResponse,
    accountLoading,
    addressesLoading,
    hasHydrated,
  ]);

  const states = statesResponse?.data ?? [];
  const email = useMemo(
    () => accountResponse?.data?.email || getEmailFromCookie(),
    [accountResponse?.data?.email],
  );

  const handleSaveAccount = () => {
    const errors = validateStoreProfileFields(accountForm);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    upsertAccount.mutate({
      full_name: accountForm.full_name.trim(),
      phone_number: accountForm.phone_number.trim(),
      organization_name: accountForm.organization_name.trim(),
      gst_number: accountForm.gst_number.trim().toUpperCase(),
      pan_number: accountForm.pan_number.trim().toUpperCase(),
    });
  };

  const handleSaveBilling = () => {
    upsertAddress.mutate({
      type: "billing",
      payload: {
        address: billingForm.address.trim(),
        city: billingForm.city.trim(),
        state_id: billingForm.state_id,
        postal_code: billingForm.postal_code.trim(),
      },
    });
  };

  const handleSaveShipping = () => {
    upsertAddress.mutate({
      type: "shipping",
      payload: {
        address: shippingForm.address.trim(),
        city: shippingForm.city.trim(),
        state_id: shippingForm.state_id,
        postal_code: shippingForm.postal_code.trim(),
      },
    });
  };

  if (isCheckingAuth || !hasHydrated) {
    return (
      <div className="container mx-auto px-4 py-16 h-64 animate-pulse bg-gray-50 rounded-2xl" />
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-red-600">
          Store account
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Account settings
        </h1>
        <p className="text-sm text-gray-600">
          Manage your checkout account details and saved addresses.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="h-5 w-5 text-red-600" />
              Account Details
            </CardTitle>
            <CardDescription>
              These details are auto-filled at checkout after you save them
              once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile_full_name">Full Name</Label>
                <Input
                  id="profile_full_name"
                  value={accountForm.full_name}
                  disabled={accountLoading}
                  onChange={(e) => {
                    setAccountForm((prev) => ({
                      ...prev,
                      full_name: e.target.value,
                    }));
                    setFormErrors((prev) => ({
                      ...prev,
                      full_name: undefined,
                    }));
                  }}
                  className={formErrors.full_name ? "border-red-500" : ""}
                />
                {formErrors.full_name ? (
                  <p className="mt-1 text-xs text-red-600">
                    {formErrors.full_name}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="profile_phone"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  id="profile_phone"
                  value={accountForm.phone_number}
                  disabled={accountLoading}
                  onChange={(e) => {
                    setAccountForm((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }));
                    setFormErrors((prev) => ({
                      ...prev,
                      phone_number: undefined,
                    }));
                  }}
                  className={formErrors.phone_number ? "border-red-500" : ""}
                />
                {formErrors.phone_number ? (
                  <p className="mt-1 text-xs text-red-600">
                    {formErrors.phone_number}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_email">Email</Label>
              <Input id="profile_email" value={email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_org" className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-gray-500" />
                Organization Name
              </Label>
              <Input
                id="profile_org"
                value={accountForm.organization_name}
                disabled={accountLoading}
                onChange={(e) =>
                  setAccountForm((prev) => ({
                    ...prev,
                    organization_name: e.target.value,
                  }))
                }
                placeholder="Enter your organization name"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile_gst">GST Number</Label>
                <Input
                  id="profile_gst"
                  value={accountForm.gst_number}
                  disabled={accountLoading}
                  maxLength={15}
                  onChange={(e) => {
                    setAccountForm((prev) => ({
                      ...prev,
                      gst_number: e.target.value.toUpperCase(),
                    }));
                    setFormErrors((prev) => ({
                      ...prev,
                      gst_number: undefined,
                    }));
                  }}
                  className={formErrors.gst_number ? "border-red-500" : ""}
                />
                {formErrors.gst_number ? (
                  <p className="mt-1 text-xs text-red-600">
                    {formErrors.gst_number}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile_pan">PAN Number</Label>
                <Input
                  id="profile_pan"
                  value={accountForm.pan_number}
                  disabled={accountLoading}
                  maxLength={10}
                  onChange={(e) => {
                    setAccountForm((prev) => ({
                      ...prev,
                      pan_number: e.target.value.toUpperCase(),
                    }));
                    setFormErrors((prev) => ({
                      ...prev,
                      pan_number: undefined,
                    }));
                  }}
                  className={formErrors.pan_number ? "border-red-500" : ""}
                />
                {formErrors.pan_number ? (
                  <p className="mt-1 text-xs text-red-600">
                    {formErrors.pan_number}
                  </p>
                ) : null}
              </div>
            </div>

            <Button
              className="bg-red-600 hover:bg-red-700"
              disabled={upsertAccount.isPending}
              onClick={handleSaveAccount}
            >
              {upsertAccount.isPending ? "Saving..." : "Save account details"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-red-600" />
              Billing Address
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              value={billingForm.address}
              onChange={(e) =>
                setBillingForm((prev) => ({ ...prev, address: e.target.value }))
              }
              placeholder="Address"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                value={billingForm.city}
                onChange={(e) =>
                  setBillingForm((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="City"
              />
              <Select
                value={billingForm.state_id}
                disabled={statesLoading}
                onChange={(e) =>
                  setBillingForm((prev) => ({
                    ...prev,
                    state_id: e.target.value,
                  }))
                }
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </div>
            <Input
              value={billingForm.postal_code}
              onChange={(e) =>
                setBillingForm((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              placeholder="Postal code"
              className="max-w-xs"
            />
            <div className="pt-1">
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={upsertAddress.isPending}
                onClick={handleSaveBilling}
              >
                Save billing address
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5 text-red-600" />
              Shipping Address
            </CardTitle>
            <CardDescription>
              Leave empty if you use billing address at checkout.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              value={shippingForm.address}
              onChange={(e) =>
                setShippingForm((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              placeholder="Address"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                value={shippingForm.city}
                onChange={(e) =>
                  setShippingForm((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="City"
              />
              <Select
                value={shippingForm.state_id}
                disabled={statesLoading}
                onChange={(e) =>
                  setShippingForm((prev) => ({
                    ...prev,
                    state_id: e.target.value,
                  }))
                }
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </div>
            <Input
              value={shippingForm.postal_code}
              onChange={(e) =>
                setShippingForm((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              placeholder="Postal code"
              className="max-w-xs"
            />
            <div className="pt-1">
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={upsertAddress.isPending}
                onClick={handleSaveShipping}
              >
                Save shipping address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
