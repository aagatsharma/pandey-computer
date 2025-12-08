import { FaShieldAlt, FaTag, FaUserTie, FaHeadset } from "react-icons/fa";

export const metadata = {
  title: "About Us - Pandey Computer | Best Computer Store in Pokhara",
  description:
    "Learn about Pandey Computer, Pokhara's trusted destination for gaming laptops, PC accessories, and custom builds. Our story, mission, and commitment to excellence.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your trusted partner for gaming and computer solutions in Pokhara
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Who We Are
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Pandey Computer is Pokhara&apos;s premier destination for gaming
            laptops, PC accessories, and custom builds. Located in Newroad,
            Pokhara, we&apos;ve been serving the local community with passion
            and dedication.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We specialize in providing authentic products from top brands,
            expert guidance for custom PC builds, and unmatched customer
            service. Whether you&apos;re a professional gamer, content creator,
            or tech enthusiast, we have the perfect solution for you.
          </p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Choose Us
          </h2>
          <div className="space-y-6">
            {/* Authentic Products */}
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  100% Authentic Products
                </h3>
                <p className="text-muted-foreground">
                  All our products are sourced from authorized distributors with
                  full warranty coverage.
                </p>
              </div>
            </div>

            {/* Competitive Pricing */}
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaTag size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Competitive Pricing
                </h3>
                <p className="text-muted-foreground">
                  We offer the best prices in Pokhara with regular deals and
                  special offers.
                </p>
              </div>
            </div>

            {/* Expert Consultation */}
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaUserTie size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Expert Consultation
                </h3>
                <p className="text-muted-foreground">
                  Our knowledgeable team provides personalized recommendations
                  for your specific needs.
                </p>
              </div>
            </div>

            {/* After-Sales Support */}
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaHeadset size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  After-Sales Support
                </h3>
                <p className="text-muted-foreground">
                  Dedicated support team available to assist with any questions
                  or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
