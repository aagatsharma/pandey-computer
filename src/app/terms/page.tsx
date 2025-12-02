import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-zinc-900 mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Welcome to Pandey Computer. By accessing and using our website,
              you agree to comply with and be bound by the following terms and
              conditions. Please review these terms carefully before using our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              2. Use of Website
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              You agree to use our website for lawful purposes only. You must
              not use our website:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                In any way that breaches any applicable local, national or
                international law
              </li>
              <li>
                To transmit any unsolicited or unauthorized advertising or
                promotional material
              </li>
              <li>
                To knowingly transmit any data or material that contains viruses
                or malicious code
              </li>
              <li>
                To impersonate or misrepresent your affiliation with any person
                or entity
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              3. Product Information
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We strive to provide accurate product descriptions and pricing.
              However, we do not warrant that product descriptions, pricing, or
              other content on our website is accurate, complete, reliable,
              current, or error-free. We reserve the right to correct any errors
              or omissions and to change or update information at any time
              without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              4. Pricing and Payment
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              All prices are listed in Nepali Rupees (NPR) and are subject to
              change without notice. We accept Cash on Delivery (COD) as our
              primary payment method. By placing an order, you agree to:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Provide accurate and complete payment information</li>
              <li>Pay the full amount upon delivery of products</li>
              <li>Be available to receive the order at the provided address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              5. Order Processing
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Once you place an order, you will receive a confirmation via phone
              or email. We reserve the right to refuse or cancel any order for
              any reason, including but not limited to product availability,
              errors in pricing or product information, or suspected fraudulent
              activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              6. Delivery
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We deliver within Kathmandu Valley and selected areas of Nepal.
              Delivery times are estimates and may vary based on location and
              product availability. We are not liable for any delays in delivery
              beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of Pandey
              Computer and is protected by copyright and intellectual property
              laws. You may not reproduce, distribute, or create derivative
              works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              To the fullest extent permitted by law, Pandey Computer shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or relating to your use of our
              website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We reserve the right to modify these terms and conditions at any
              time. Changes will be effective immediately upon posting to the
              website. Your continued use of the website after changes are
              posted constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              10. Contact Information
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <div className="mt-4 text-zinc-600">
              <p>Email: info@pandeycomputer.com</p>
              <p>Phone: 01-5350040 / 01-5911594</p>
              <p>Address: Putalisadak, Kathmandu</p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-zinc-500">Last Updated: December 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
