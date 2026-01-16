import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              At Pandey Computer, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or make a
              purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                Name and contact information (phone number, email address)
              </li>
              <li>Delivery address and location details</li>
              <li>Order details and purchase history</li>
              <li>Payment information (for cash on delivery orders)</li>
              <li>Communication preferences</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed mt-3">
              We also automatically collect certain information about your
              device, including your IP address, browser type, and browsing
              behavior on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and deliveries</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>
                Send you promotional materials and updates (with your consent)
              </li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud or unauthorized activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Delivery partners to fulfill your orders</li>
              <li>
                Service providers who assist in operating our website and
                conducting our business
              </li>
              <li>
                Law enforcement or regulatory authorities when required by law
              </li>
              <li>Professional advisors such as lawyers and accountants</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. Order
              information is typically retained for accounting and legal
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              7. Your Rights
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                Access: Request a copy of the personal information we hold about
                you
              </li>
              <li>
                Correction: Request correction of inaccurate or incomplete
                information
              </li>
              <li>
                Deletion: Request deletion of your personal information (subject
                to legal requirements)
              </li>
              <li>
                Opt-out: Unsubscribe from marketing communications at any time
              </li>
              <li>Object: Object to processing of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze website traffic, and understand user
              preferences. You can control cookie settings through your browser,
              but disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Our website is not intended for children under the age of 16. We
              do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting the new policy on
              our website and updating the &quot;Last Updated&quot; date. Your
              continued use of our website after changes are posted constitutes
              your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 text-zinc-600">
              <p>Email: pandeycomputer7@gmail.com</p>
              <p>Phone:  061-585498 / 9856035498</p>
              <p>Address: Newroad, Pokhara</p>
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
