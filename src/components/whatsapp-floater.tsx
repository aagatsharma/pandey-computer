import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

export default function WhatsappFloater() {
  return (
    <div className="fixed bottom-10 right-16 z-50 space-y-4">
      <Link
        href={`https://wa.me/+9779802803711?text=Hello Pandey Computer Suppliers! I would like to inquire about your products and services.`}
        className="flex h-16 w-16 justify-center rounded-full bg-[#25d366] text-3xl text-white shadow"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className="mt-4 rounded-full" />
      </Link>
    </div>
  );
}
