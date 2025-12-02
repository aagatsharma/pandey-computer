import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReturnExchange() {
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
          Return & Exchange Policy
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              1. Overview
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              At Pandey Computer, customer satisfaction is our priority. We want
              you to be completely satisfied with your purchase. This Return &
              Exchange Policy outlines the conditions and procedures for
              returning or exchanging products purchased from our store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              2. Return Period
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              You may return eligible products within <strong>7 days</strong> of
              delivery. To be eligible for a return, the product must meet all
              the conditions outlined in this policy.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> The 7-day period starts from the date you
                receive the product.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              3. Eligibility for Returns
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              Products are eligible for return if they meet the following
              conditions:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Product is in original, unused condition</li>
              <li>
                Original packaging, accessories, and documentation are intact
              </li>
              <li>
                Product has not been damaged due to misuse or improper handling
              </li>
              <li>
                Serial numbers and warranty seals are intact and unaltered
              </li>
              <li>Product invoice or receipt is provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              4. Non-Returnable Items
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              The following items cannot be returned or exchanged:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Software products and digital downloads</li>
              <li>
                Opened or used consumable items (e.g., ink cartridges, toner)
              </li>
              <li>Customized or personalized products</li>
              <li>Products damaged due to customer misuse or negligence</li>
              <li>
                Products with missing serial numbers or altered warranty seals
              </li>
              <li>Clearance or sale items (unless defective)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              5. Defective or Damaged Products
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              If you receive a defective or damaged product:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Contact us immediately within 24 hours of delivery</li>
              <li>Provide photos or videos showing the defect or damage</li>
              <li>Do not use or attempt to repair the product</li>
              <li>
                We will arrange for a replacement or full refund at no
                additional cost
              </li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> Inspect your product immediately
                upon delivery. Claims for shipping damage must be reported
                within 24 hours.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              6. Exchange Policy
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              We offer exchanges for:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                Same product with different specifications (subject to
                availability)
              </li>
              <li>Different product of equal or greater value</li>
              <li>Defective products within the warranty period</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed mt-3">
              If the exchanged product has a higher value, you must pay the
              difference. If it has a lower value, the difference will be
              refunded or provided as store credit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              7. Return Process
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              To initiate a return or exchange:
            </p>
            <ol className="list-decimal list-inside text-zinc-600 space-y-2 ml-4">
              <li>Contact our customer service via phone or email</li>
              <li>Provide your order number and reason for return</li>
              <li>Our team will verify eligibility and provide instructions</li>
              <li>Pack the product securely in its original packaging</li>
              <li>Bring the product to our store or ship it to our address</li>
              <li>
                Include all accessories, manuals, and the original invoice
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              8. Refund Method
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              Refunds will be processed based on the original payment method:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                <strong>Cash on Delivery:</strong> Cash refund or bank transfer
              </li>
              <li>
                <strong>Bank Transfer:</strong> Refund to the same account
              </li>
              <li>
                <strong>Digital Payment:</strong> Refund to the original payment
                source
              </li>
            </ul>
            <p className="text-zinc-600 leading-relaxed mt-3">
              Refunds are typically processed within 7-10 business days after we
              receive and inspect the returned product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              9. Shipping Costs
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              <strong>Defective Products:</strong> We will cover all return
              shipping costs for defective or damaged products.
            </p>
            <p className="text-zinc-600 leading-relaxed mt-2">
              <strong>Change of Mind:</strong> Customer is responsible for
              return shipping costs if returning due to change of mind or
              ordering the wrong product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              10. Warranty Claims
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Products covered by manufacturer warranty should be directed to
              the manufacturer or authorized service center. We will assist you
              with the warranty claim process and provide necessary
              documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              11. Restocking Fee
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              A restocking fee of up to 15% may be applied for non-defective
              returns, particularly for opened products or special orders. This
              fee covers inspection, repackaging, and restocking costs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              12. Contact Information
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              For questions about returns, exchanges, or to initiate a return,
              please contact us:
            </p>
            <div className="mt-4 text-zinc-600">
              <p>Email: info@pandeycomputer.com</p>
              <p>Phone: 01-5350040 / 01-5911594</p>
              <p>Address: Putalisadak, Kathmandu</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              13. Policy Changes
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We reserve the right to modify this Return & Exchange Policy at
              any time. Changes will be effective immediately upon posting to
              our website. Please review this policy periodically for updates.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-zinc-500">Last Updated: December 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
