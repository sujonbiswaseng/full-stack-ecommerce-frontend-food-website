"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PublicStats } from "@/types/stats.type";

// Define the contactInfo array to resolve the error
type ContactInfo = {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
};

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "dev.sujonbiswas@gmail.com",
    sub: "We'll reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01345191043",
    sub: "9am - 5pm, Mon - Fri",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "bangladesh,sylhet",
    sub: "Visit us by appointment",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Fri: 9am - 5pm",
    sub: "Closed on weekends",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const toastid = toast.loading("sending......");
    const formDataEvt = new FormData(event.target as HTMLFormElement);
    const name = formDataEvt.get("name")?.toString().trim();
    const email = formDataEvt.get("email")?.toString().trim();

    if (!email) {
      toast.dismiss(toastid);
      toast.error("Please fill in all fields before submitting.");
      setIsLoading(false);
      return;
    }
    formDataEvt.append("access_key", "a6e254d6-1e3c-4309-9ef9-58f65f27d1d4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataEvt,
    });

    if (!response.ok) {
      toast.dismiss(toastid);
      toast.error("Failed to send message");
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    if (data.success) {
      toast.dismiss(toastid);
      toast.success("Message sent successfully!");
    }
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Get in touch
            with our team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Subject
                    </label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us more..."
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Get in touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{label}</h3>
                      <p className="text-muted-foreground text-sm">{value}</p>
                      {sub && <p className="text-muted-foreground text-xs">{sub}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Stay connected and get the latest updates on new features and
                  offers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="flex-1 flex items-center justify-center gap-2 bg-input border border-border text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]"
                    aria-label="Facebook"
                  >
                    <a
                      href="https://facebook.com/sujonbiswasdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                      tabIndex={0}
                    >
                      <Facebook className="w-5 h-5" aria-hidden />
                      <span className="sr-only">Facebook</span>
                      <span className="hidden md:inline text-card-foreground font-medium">Facebook</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="flex-1 flex items-center justify-center gap-2 bg-input border border-border text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]"
                    aria-label="Instagram"
                  >
                    <a
                      href="https://instagram.com/sujonbiswasdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      tabIndex={0}
                    >
                      <Instagram className="w-5 h-5" aria-hidden />
                      <span className="sr-only">Instagram</span>
                      <span className="hidden md:inline text-card-foreground font-medium">Instagram</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="flex-1 flex items-center justify-center gap-2 bg-input border border-border text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]"
                    aria-label="Twitter"
                  >
                    <a
                      href="https://twitter.com/sujonbiswasdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter"
                      tabIndex={0}
                    >
                      <Twitter className="w-5 h-5" aria-hidden />
                      <span className="sr-only">Twitter</span>
                      <span className="hidden md:inline text-card-foreground font-medium">Twitter</span>
                    </a>
                  </Button>
                </div>
           
           
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}