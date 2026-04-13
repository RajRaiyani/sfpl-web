"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = { id: string; question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
  /** Merged with default accordion shell styles */
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "w-full rounded-lg border border-gray-200 bg-white px-1 sm:px-3",
        className
      )}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          id={item.id}
          className="scroll-mt-24 border-gray-200 px-2 sm:px-3"
        >
          <AccordionTrigger className="py-4 text-left text-base font-semibold text-gray-900 hover:no-underline [&[data-state=open]]:text-red-700">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
