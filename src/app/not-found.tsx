import Link from "next/link";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="bg-[#f0edea] bg-noise min-h-[80vh] flex items-center justify-center pt-32 pb-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-dark/5 rounded-3xl flex items-center justify-center text-dark/40 mx-auto mb-8">
          <FiAlertCircle size={40} />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-dark mb-4">Page Not Found</h1>
        <p className="text-lg text-dark/60 font-sans mb-10 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-white rounded-xl font-bold font-sans uppercase tracking-widest text-sm hover:bg-brand transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <FiArrowLeft /> Return to Home
        </Link>
      </div>
    </main>
  );
}
