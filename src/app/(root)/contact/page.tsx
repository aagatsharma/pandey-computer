import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export const metadata = {
  title: "Contact Us - Pandey Computer | Get in Touch",
  description:
    "Contact Pandey Computer in Pokhara for gaming laptops, PC accessories, and custom builds. Visit our store, call us, or send us a message.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get in touch with us for any inquiries, product information, or
            support
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions? We&apos;re here to help! Reach out to us through
              any of the following channels, and our team will get back to you
              as soon as possible.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Visit Our Store
                  </h3>
                  <p className="text-muted-foreground">
                    Newroad, Pokhara
                    <br />
                    Kaski District, Nepal
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FaPhone size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Call Us
                  </h3>
                  <a
                    href="tel:061-585498"
                    className="text-primary hover:opacity-80 transition-opacity block"
                  >
                    061-585498
                  </a>
                  <a
                    href="tel:+9779856035498"
                    className="text-primary hover:opacity-80 transition-opacity block"
                  >
                    9856035498
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Email Us
                  </h3>
                  <a
                    href="mailto:pandeycomputer7@gmail.com"
                    className="text-primary hover:opacity-80 transition-opacity"
                  >
                    pandeycomputer7@gmail.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FaClock size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Sunday - Friday: 10:00 AM - 7:00 PM
                    <br />
                    Saturday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61567056315599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/pandey.computer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=9779802803711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="98XXXXXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Product Inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
