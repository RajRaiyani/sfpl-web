"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const enquiryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone_number: z
    .string()
    .max(10, "Phone number must be at most 10 digits")
    .regex(/^[0-9]*$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export default function EnquiryForm() {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [error, setError] = useState("");

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const updateTimeRemaining = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  };

  // Lock for 1 hour per browser to prevent repeated submissions.
  useEffect(() => {
    const lastSubmission = localStorage.getItem("enquiryFormLastSubmission");
    if (!lastSubmission) return;

    const lastTime = parseInt(lastSubmission, 10);
    const now = Date.now();
    const timeDiff = now - lastTime;
    const oneHour = 60 * 60 * 1000;

    if (timeDiff < oneHour) {
      setIsFormDisabled(true);
      const remainingTime = oneHour - timeDiff;
      updateTimeRemaining(remainingTime);

      const timer = setInterval(() => {
        const currentRemaining = oneHour - (Date.now() - lastTime);
        if (currentRemaining <= 0) {
          setIsFormDisabled(false);
          setTimeRemaining("");
          localStorage.removeItem("enquiryFormLastSubmission");
          clearInterval(timer);
        } else {
          updateTimeRemaining(currentRemaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const onSubmit = async (data: EnquiryFormValues) => {
    if (isFormDisabled) return;

    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          form_type: "enquiry",
        }),
      });

      // API should return JSON, but if the server errors, Next may return HTML.
      // Avoid crashing the UI by safely parsing the response.
      let responseData: { error?: string } = {};
      try {
        responseData = await response.json();
      } catch {
        const fallbackText = await response.text();
        responseData = {
          error: fallbackText || response.statusText || "Request failed",
        };
      }

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to send message");
      }

      const submissionTime = Date.now();
      localStorage.setItem(
        "enquiryFormLastSubmission",
        submissionTime.toString()
      );

      form.reset();
      setIsFormDisabled(true);

      const oneHour = 60 * 60 * 1000;
      updateTimeRemaining(oneHour);

      const timer = setInterval(() => {
        const currentRemaining = oneHour - (Date.now() - submissionTime);
        if (currentRemaining <= 0) {
          setIsFormDisabled(false);
          setTimeRemaining("");
          localStorage.removeItem("enquiryFormLastSubmission");
          clearInterval(timer);
        } else {
          updateTimeRemaining(currentRemaining);
        }
      }, 1000);

      toast.success(
        "Enquiry sent successfully! We'll get back to you soon."
      );
    } catch (err: unknown) {
      const e = err as { message?: string };
      const message = e?.message || "Failed to send message. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6 w-full max-w-none mx-0 text-gray-900"
      >
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-gray-900">Enquiry</h3>
          <p className="text-sm text-gray-600 mt-1">
            Share your details and message.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  className="h-12 p-4 bg-white text-gray-900 placeholder:text-gray-400"
                  disabled={isFormDisabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-12 p-4 bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="you@email.com"
                  disabled={isFormDisabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="h-12 p-4 bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Phone Number"
                  maxLength={10}
                  disabled={isFormDisabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">Msg</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What do you want to monitor?"
                  className="p-4 min-h-32 bg-white text-gray-900 placeholder:text-gray-400"
                  rows={4}
                  disabled={isFormDisabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isFormDisabled && timeRemaining && (
          <div className="text-center text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
            You can submit another message in:{" "}
            <span className="font-semibold text-primary">{timeRemaining}</span>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isFormDisabled || isLoading}
          className="w-full font-bold py-3 text-lg h-auto"
          size="lg"
        >
          {isLoading ? "Sending..." : isFormDisabled ? "Form Locked" : "Send Enquiry"}
        </Button>
      </form>
    </Form>
  );
}

