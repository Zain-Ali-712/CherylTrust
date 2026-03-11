import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Sarah & Buster",
        service: "Trust Technique Session",
        text: "Cheryl completely changed our lives. Buster was so anxious around other dogs, but after just a few sessions, he's much calmer. Adventure Park Cheryl is our safe haven!",
        rating: 5
    },
    {
        name: "James & Bella",
        service: "Adventure Park Cheryl",
        text: "We absolutely love Adventure Park Cheryl. Knowing it's fully secure allows Bella to run free without me worrying. The swimming hole is her favorite spot in the world.",
        rating: 5
    },
    {
        name: "Emma & Charlie",
        service: "Dog Behaviour & Rehab",
        text: "I was at my wit's end with Charlie's reactivity. Cheryl's patient approach and the Trust Technique helped us build a bond I never thought possible. Highly recommended.",
        rating: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,6vw,4rem)] relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-5 h-px bg-primary-dark" />
                        <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase font-sans text-primary-dark">Client Stories</span>
                        <div className="w-5 h-px bg-primary-dark" />
                    </div>
                    <h2 className="font-serif font-normal text-dark leading-[1.12] mb-6 tracking-[-0.01em]" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        Happy hearts and wags
                    </h2>
                    <p className="text-[1.05rem] text-dark/70 font-sans leading-[1.8] max-w-[600px] mx-auto">
                        Real stories from humans and their best friends about their journey with the Trust Technique and our Canine Adventure Park facilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-bg-light p-8 lg:p-10 rounded-[2rem] border border-dark/5 relative group hover:-translate-y-2 transition-transform duration-300">

                            {/* Decorative Quote Mark */}
                            <FaQuoteLeft className="text-primary-dark/10 absolute top-8 right-8 text-5xl" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-8">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="text-accent fill-accent" size={16} />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="font-sans text-dark/80 text-[1.05rem] leading-[1.8] mb-10 min-h-[120px]">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mt-auto border-t border-dark/10 pt-6">
                                <div className="w-12 h-12 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark font-serif font-bold text-xl">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-dark text-[0.95rem]">{testimonial.name}</h4>
                                    <p className="font-sans text-[0.8rem] text-dark/50 uppercase tracking-wider mt-1">{testimonial.service}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
