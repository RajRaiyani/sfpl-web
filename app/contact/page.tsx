"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
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
import z from "zod";

const contactFormSchema = z.object({
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

export default function Contact() {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
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

  // Check localStorage on component mount
  useEffect(() => {
    const lastSubmission = localStorage.getItem("contactFormLastSubmission");
    if (lastSubmission) {
      const lastTime = parseInt(lastSubmission);
      const now = Date.now();
      const timeDiff = now - lastTime;
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeDiff < oneHour) {
        setIsFormDisabled(true);
        const remainingTime = oneHour - timeDiff;
        updateTimeRemaining(remainingTime);

        const timer = setInterval(() => {
          const currentRemaining = oneHour - (Date.now() - lastTime);
          if (currentRemaining <= 0) {
            setIsFormDisabled(false);
            setTimeRemaining("");
            clearInterval(timer);
          } else {
            updateTimeRemaining(currentRemaining);
          }
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    if (isFormDisabled) return;

    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to send message");
      }

      // Store submission time in localStorage
      const submissionTime = Date.now();
      localStorage.setItem(
        "contactFormLastSubmission",
        submissionTime.toString()
      );

      // Reset form
      form.reset();

      // Disable form and start timer
      setIsFormDisabled(true);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      updateTimeRemaining(oneHour);

      const timer = setInterval(() => {
        const currentRemaining = oneHour - (Date.now() - submissionTime);
        if (currentRemaining <= 0) {
          setIsFormDisabled(false);
          setTimeRemaining("");
          localStorage.removeItem("contactFormLastSubmission");
          clearInterval(timer);
        } else {
          updateTimeRemaining(currentRemaining);
        }
      }, 1000);

      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
      toast.error(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions or need a fire safety solution? Reach out to our
            expert team. We&apos;re here to help you protect what matters most.
          </p>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        className="h-12 p-4"
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
                    <FormLabel className="text-gray-700 font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="h-12 p-4"
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
                    <FormLabel className="text-gray-700 font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-12 p-4"
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
                    <FormLabel className="text-gray-700 font-semibold">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can we help you?"
                        className="p-4 min-h-32"
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
                  <span className="font-semibold text-primary">
                    {timeRemaining}
                  </span>
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
                {isLoading
                  ? "Sending..."
                  : isFormDisabled
                  ? "Form Locked"
                  : "Send Message"}
              </Button>
            </form>
          </Form>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Get in Touch
              </h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold">Phone Number:</span>{" "}
                  <a
                    href="tel:+919512570090"
                    className="text-primary hover:underline ml-1"
                  >
                    +91 9512570090
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:contact@specificfire.com"
                    className="text-primary hover:underline ml-1"
                  >
                    {" "}
                    contact@specificfire.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  <a
                    href="https://maps.app.goo.gl/2RYxPfe4o69tCfy69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    105, IIT Gandhinagar Research park, Gandhinagar, Gujarat
                  </a>
                </div>
              </div>

              {/* Social Handles */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/in/specific-fire/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center justify-center p-4 md:p-5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <Linkedin className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                  <a
                    href="https://www.instagram.com/specificfire"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center p-4 md:p-5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <Instagram className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                  <a
                    href="https://www.facebook.com/specific.fire"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center justify-center p-4 md:p-5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <Facebook className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                  <a
                    href="https://www.youtube.com/@SPECIFIC_FIRE"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="inline-flex items-center justify-center p-4 md:p-5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <Youtube className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1418.972465831769!2d72.69185555191294!3d23.218446112199185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1762102241210!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
