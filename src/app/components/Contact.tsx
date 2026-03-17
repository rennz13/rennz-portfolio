import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { MessageCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        setStatusMessage(null);

        const missing: string[] = [];
        if (!emailJsConfig.serviceId) missing.push("VITE_EMAILJS_SERVICE_ID");
        if (!emailJsConfig.templateId) missing.push("VITE_EMAILJS_TEMPLATE_ID");
        if (!emailJsConfig.publicKey) missing.push("VITE_EMAILJS_PUBLIC_KEY");
        if (missing.length) {
          throw new Error(`Missing EmailJS env: ${missing.join(", ")}`);
        }

        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.templateId!,
          {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
          },
          emailJsConfig.publicKey!,
        );

        setStatusMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Email send error:", error);
        setStatusMessage(message.startsWith("Missing EmailJS env:") ? message : "Something went wrong while sending your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "eallourenceb13@gmail.com",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-[#10B981] dark:text-green-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "09929533615",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      iconColor: "text-[#2563EB] dark:text-blue-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Carmen, Davao del Norte, Philippines",
      iconBg: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          badgeIcon={MessageCircle}
          title="Contact Me"
          gradientWord="Me"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 lg:p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                  errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                } focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                  errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                } focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                  errors.subject ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                } focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none`}
                placeholder="Subject"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                  errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                } focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none resize-none`}
                placeholder="Your message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={18} />
            </motion.button>
            {statusMessage && (
              <p className="text-sm text-center text-slate-600 dark:text-slate-300">{statusMessage}</p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${info.iconBg} ${info.iconColor}`}
                >
                  <info.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{info.label}</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
