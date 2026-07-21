"use client";

import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CHECKOUT_TERMS_SECTIONS: { title: string; body: string }[] = [
  {
    title: "Order Confirmation",
    body: "By placing this order, you confirm that all information provided is accurate and complete. Your order will be processed only after successful payment verification.",
  },
  {
    title: "Payment",
    body: "All payments are securely processed through our authorized payment gateway. Prices are displayed in Indian Rupees (INR) unless otherwise specified and include applicable taxes where mentioned.",
  },
  {
    title: "Shipping & Delivery",
    body: "Products will be shipped to the delivery address provided during checkout. Please ensure your shipping information is accurate. Estimated delivery timelines may vary based on location and product availability.",
  },
  {
    title: "Installation & Activation",
    body: "Where applicable, installation, configuration, or activation services are provided according to the selected plan or service agreement. Additional charges may apply for on-site installation or locations outside our standard service areas.",
  },
  {
    title: "Warranty",
    body: "Products are covered by the applicable warranty period specified on the product page or accompanying documentation. The warranty does not cover damage caused by improper installation, misuse, unauthorized modification, accidents, or natural disasters.",
  },
  {
    title: "Returns & Refunds",
    body: "Returns, replacements, and refunds are governed by our Return & Refund Policy. Please review the policy before placing your order.",
  },
  {
    title: "Limitation of Liability",
    body: "Specific Fire Protection Limited shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the product, except as required under applicable law. Our liability is limited to the value of the purchased product or service.",
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
            <h2 className="text-lg font-bold text-gray-900">
              Terms &amp; Conditions
            </h2>
            <p className="mt-1 text-sm italic text-gray-500">
              Please review and accept the following terms before completing
              your purchase.
            </p>
          </div>

          <div className="max-h-[min(50vh,420px)] space-y-5 overflow-y-auto px-6 py-4 text-sm">
            {CHECKOUT_TERMS_SECTIONS.map((section) => (
              <section key={section.title}>
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <p className="mt-1.5 leading-relaxed text-gray-600">
                  {section.body}
                </p>
              </section>
            ))}

            <section>
              <h3 className="font-semibold text-gray-900">Acceptance</h3>
              <p className="mt-1.5 leading-relaxed text-gray-600">
                By clicking &ldquo;Place Order&rdquo; or &ldquo;Proceed to
                Payment&rdquo;, you acknowledge that you have read, understood,
                and agree to our{" "}
                <Link
                  href="/terms-conditions"
                  target="_blank"
                  className="font-medium text-red-600 underline-offset-2 hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
                ,{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="font-medium text-red-600 underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                , and{" "}
                <Link
                  href="/returns-refunds"
                  target="_blank"
                  className="font-medium text-red-600 underline-offset-2 hover:underline"
                >
                  Return &amp; Refund Policy
                </Link>
                .
              </p>
            </section>
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
