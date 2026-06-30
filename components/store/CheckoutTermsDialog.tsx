"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CHECKOUT_TERMS_SECTIONS: { title: string; body: string }[] = [
  {
    title: "Order processing",
    body: "By proceeding with this order, you agree to our terms of service and confirm that all information provided is accurate.",
  },
  {
    title: "Payment terms",
    body: "Payment will be processed immediately upon confirmation through our secure payment gateway. All transactions are encrypted.",
  },
  {
    title: "Shipping and delivery",
    body: "Delivery will be made to the shipping address provided. Please ensure the address is complete and accurate. Delivery charges, if applicable, may be communicated separately before dispatch.",
  },
  {
    title: "Returns and refunds",
    body: "Returns and refunds are subject to our return policy. Please review our terms and conditions before placing your order.",
  },
  {
    title: "Liability",
    body: "Specific Fire Protection Limited is not liable for any damages arising from the use of our products beyond the scope of our warranty.",
  },
];

type CheckoutTermsDialogProps = {
  open: boolean;
  accepted: boolean;
  isPaying: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptedChange: (accepted: boolean) => void;
  onAgreeAndProceed: () => void;
};

export default function CheckoutTermsDialog({
  open,
  accepted,
  isPaying,
  onOpenChange,
  onAcceptedChange,
  onAgreeAndProceed,
}: CheckoutTermsDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4">
      <button
        type="button"
        aria-label="Close terms dialog"
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="flex min-h-full items-center justify-center">
        <div className="relative flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Terms and Conditions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review and accept before proceeding to payment.
            </p>
          </div>

          <div className="max-h-[min(50vh,420px)] space-y-4 overflow-y-auto px-6 py-4 text-sm">
            <ol className="list-decimal space-y-4 pl-5 marker:font-semibold">
              {CHECKOUT_TERMS_SECTIONS.map((section) => (
                <li key={section.title} className="pl-1">
                  <p className="font-semibold text-gray-900">{section.title}</p>
                  <p className="mt-1.5 leading-relaxed text-gray-600">{section.body}</p>
                </li>
              ))}
            </ol>
            <p className="text-sm text-gray-500">
              Read the full{" "}
              <Link
                href="/terms-conditions"
                target="_blank"
                className="font-medium text-red-600 underline-offset-2 hover:underline"
              >
                terms and conditions
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <label className="flex cursor-pointer items-start gap-2.5 text-left text-sm text-gray-800">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => onAcceptedChange(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span>I agree to the terms and conditions</span>
            </label>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => onOpenChange(false)}
                disabled={isPaying}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
                disabled={!accepted || isPaying}
                onClick={onAgreeAndProceed}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isPaying ? "Processing..." : "I Agree & Proceed"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
