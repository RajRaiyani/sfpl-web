const SUPPORT_PHONE = "+919033050415";
const SUPPORT_PHONE_DISPLAY = "9033050415";
const SUPPORT_EMAIL = "contact@specificfire.com";

export default function DeliveryChargesNotice() {
  return (
    <div className="mt-4 min-w-0 rounded-xl bg-amber-50 px-4 py-3 text-sm">
      <p className="font-semibold text-gray-900">
        Delivery charges are not included in your order total.
      </p>
      <p className="mt-1 text-gray-600">
        You will pay delivery charges when the product is delivered to you.
      </p>
      <p className="mt-2 text-gray-600">
        To know delivery charges for your location, contact us:
      </p>
      <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
        <a
          href={`tel:${SUPPORT_PHONE}`}
          className="shrink-0 font-medium text-primary hover:underline"
        >
          {SUPPORT_PHONE_DISPLAY}
        </a>
        <span className="text-gray-400" aria-hidden="true">
          ·
        </span>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="min-w-0 break-all font-medium text-primary hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}
