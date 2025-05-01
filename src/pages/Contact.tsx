import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: {
    store: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    support: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  // Simulate API fetch for dynamic content
  useEffect(() => {
    const fetchContactInfo = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulated API response
      const contactData = {
        phone: "+1 (555) 123-4567",
        email: "support@thiyaboutique.com",
        address: "123 Fashion Avenue, New York, NY 10001",
        hours: {
          store: {
            weekdays: "Monday - Friday: 10am - 8pm",
            saturday: "Saturday: 10am - 6pm",
            sunday: "Sunday: 12pm - 5pm",
          },
          support: {
            weekdays: "Monday - Friday: 9am - 6pm",
            saturday: "Saturday: 10am - 4pm",
            sunday: "Sunday: Closed",
          },
        },
      };

      setContactInfo(contactData);
      setIsLoading(false);
    };

    fetchContactInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message Sent",
        description:
          "We've received your message and will get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Contact Us | Thiya's Boutique"
      description="Get in touch with Thiya's Boutique customer service. We're here to help with any questions or feedback."
      canonical="/contact"
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-boutique-50">
                <Phone className="h-6 w-6 text-boutique-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Call Us</h2>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <>
                <p className="text-gray-600">{contactInfo?.phone}</p>
                <p className="text-gray-600">Mon-Fri, 9am-6pm EST</p>
              </>
            )}
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-boutique-50">
                <Mail className="h-6 w-6 text-boutique-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Us</h2>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <>
                <p className="text-gray-600">{contactInfo?.email}</p>
                <p className="text-gray-600">We respond within 24 hours</p>
              </>
            )}
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-boutique-50">
                <MapPin className="h-6 w-6 text-boutique-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <>
                <p className="text-gray-600">
                  {contactInfo?.address.split(",")[0]}
                </p>
                <p className="text-gray-600">
                  {contactInfo?.address.split(",")[1]},{" "}
                  {contactInfo?.address.split(",")[2]}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <ScrollArea className="h-auto max-h-[500px]">
            <div>
              <h2 className="text-2xl font-bold mb-6">Store Hours</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-boutique-600" />
                  <div>
                    <h3 className="font-medium">Flagship Store</h3>
                    {isLoading ? (
                      <div className="space-y-2 mt-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600">
                          {contactInfo?.hours.store.weekdays}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo?.hours.store.saturday}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo?.hours.store.sunday}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-boutique-600" />
                  <div>
                    <h3 className="font-medium">Customer Support</h3>
                    {isLoading ? (
                      <div className="space-y-2 mt-2">
                        <Skeleton className="h-4 w-44" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600">
                          {contactInfo?.hours.support.weekdays}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo?.hours.support.saturday}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo?.hours.support.sunday}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-2">Holiday Hours</h3>
                  <p className="text-gray-600">
                    Hours may vary during major holidays. Please check our
                    social media channels for the most up-to-date information.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
