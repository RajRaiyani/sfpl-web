import { Ban, Check } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { formatFulfillmentStatus } from "@/lib/format";

const FULFILLMENT_STEPS = [
  { status: "pending", label: "Placed" },
  { status: "processing", label: "Processing" },
  { status: "out_for_delivery", label: "Shipping" },
  { status: "delivered", label: "Delivered" },
  { status: "complete", label: "Complete" },
] as const;

type OrderStatusTimelineProps = {
  status: string;
  compact?: boolean;
};

export default function OrderStatusTimeline({
  status,
  compact = false,
}: OrderStatusTimelineProps) {
  const isCancelled = status === "cancel";
  const isAllComplete = status === "complete";
  const currentIndex = FULFILLMENT_STEPS.findIndex((step) => step.status === status);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <Ban className="h-3.5 w-3.5" />
        </span>
        <p className="text-sm font-medium text-red-800">Order cancelled</p>
      </div>
    );
  }

  return (
    <div>
      {!compact ? (
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Order progress
          </p>
          <span
            className={cn(
              "text-xs font-semibold",
              isAllComplete ? "text-emerald-700" : "text-red-600",
            )}
          >
            {formatFulfillmentStatus(status)}
          </span>
        </div>
      ) : null}

      <div>
        <div className="flex items-center">
          {FULFILLMENT_STEPS.map((step, index) => {
            const isComplete = isAllComplete || index < currentIndex;
            const isCurrent = !isAllComplete && index === currentIndex;
            const isUpcoming = !isAllComplete && index > currentIndex;
            const isLast = index === FULFILLMENT_STEPS.length - 1;
            const segmentComplete = isAllComplete || currentIndex > index;

            return (
              <Fragment key={step.status}>
                <div className={cn("flex shrink-0 justify-center", compact ? "w-10" : "w-11")}>
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center rounded-full border-2 bg-white transition-all",
                      compact ? "h-4 w-4" : "h-5 w-5",
                      isComplete && "border-emerald-500 bg-emerald-500 text-white",
                      isCurrent &&
                        "border-red-600 bg-red-600 text-white shadow-sm ring-2 ring-red-100",
                      isUpcoming && "border-gray-300 bg-white",
                    )}
                  >
                    {isComplete ? (
                      <Check className={cn(compact ? "h-2 w-2" : "h-2.5 w-2.5", "stroke-[3]")} />
                    ) : null}
                    {isCurrent ? (
                      <span
                        className={cn(
                          "rounded-full bg-white",
                          compact ? "h-1 w-1" : "h-1.5 w-1.5",
                        )}
                      />
                    ) : null}
                  </div>
                </div>

                {!isLast ? (
                  <div className="relative h-px min-w-0 flex-1">
                    <div className="absolute inset-0 bg-gray-200" />
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-500",
                        segmentComplete ? "w-full" : "w-0",
                      )}
                    />
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>

        <div className="mt-2 flex justify-between">
          {FULFILLMENT_STEPS.map((step, index) => {
            const isComplete = isAllComplete || index < currentIndex;
            const isCurrent = !isAllComplete && index === currentIndex;
            const isUpcoming = !isAllComplete && index > currentIndex;

            return (
              <p
                key={step.status}
                className={cn(
                  "shrink-0 text-center leading-tight",
                  compact ? "w-10 text-[8px]" : "w-11 text-[9px]",
                  isComplete && "font-medium text-emerald-700",
                  isCurrent && "font-semibold text-red-600",
                  isUpcoming && "text-gray-400",
                )}
              >
                {step.label}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
