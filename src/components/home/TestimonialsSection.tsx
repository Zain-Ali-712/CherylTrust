import { AiFillStar } from "react-icons/ai";
import { FaDog, FaHorse, FaPaw } from "react-icons/fa";

const testimonials = [
    {
        name: "Sarah K.",
        pet: "Dog — Border Collie",
        stars: 5,
        text: "After just one session with Cheryl, I could see a difference in my anxious rescue dog. She was calmer, more trusting. The Trust Technique genuinely changed how we communicate. I can't recommend Cheryl enough.",
        location: "Wellington, NZ",
        Icon: FaDog,
        iconColor: "#2A7C6F",
        iconBg: "rgba(42,124,111,0.1)",
    },
    {
        name: "Mike T.",
        pet: "Horse — Thoroughbred",
        stars: 5,
        text: "My horse was terrified of anything new. Cheryl came to our paddock and worked her magic — within the session he was so much calmer. The online follow-up sessions have been brilliant. Incredible practitioner.",
        location: "Lower Hutt, NZ",
        Icon: FaHorse,
        iconColor: "#E8A838",
        iconBg: "rgba(232,168,56,0.12)",
    },
    {
        name: "Jenna M.",
        pet: "Dog — German Shepherd",
        stars: 5,
        text: "We did our sessions via Skype from Auckland. My GSD had serious aggression issues toward other dogs. After following the program consistently, the change has been remarkable. Cheryl is a wonderful teacher.",
        location: "Auckland, NZ",
        Icon: FaPaw,
        iconColor: "#4AADA0",
        iconBg: "rgba(74,173,160,0.12)",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="section-padding" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <div
                        className="section-badge"
                        style={{ background: "rgba(232,168,56,0.1)", color: "#C0841A", border: "1px solid rgba(232,168,56,0.2)" }}
                    >
                        Client Stories
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#1A2E2C",
                            marginBottom: "1rem",
                            lineHeight: 1.2,
                        }}
                    >
                        Real Transformations,{" "}
                        <span style={{ color: "#2A7C6F" }}>Real Trust</span>
                    </h2>
                    <p style={{ fontSize: "0.9375rem", color: "#6B8280", maxWidth: "32rem", margin: "0 auto", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.7 }}>
                        Hear from the people and animals whose lives have been changed by the Trust Technique®.
                    </p>
                </div>

                {/* Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {testimonials.map((t) => {
                        const TIcon = t.Icon;
                        return (
                            <div
                                key={t.name}
                                className="card-hover"
                                style={{
                                    background: "#F8FBFA",
                                    borderRadius: "1.25rem",
                                    padding: "2rem",
                                    border: "1.5px solid rgba(42,124,111,0.1)",
                                    boxShadow: "0 4px 20px rgba(26,46,44,0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Giant quote mark */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-0.5rem",
                                        right: "1.25rem",
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "6rem",
                                        color: "rgba(42,124,111,0.07)",
                                        lineHeight: 1,
                                        userSelect: "none",
                                    }}
                                >
                                    &ldquo;
                                </div>

                                {/* Stars */}
                                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                                    {Array(t.stars).fill(0).map((_, i) => (
                                        <AiFillStar key={i} size={14} color="#E8A838" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        lineHeight: 1.7,
                                        color: "#3D5250",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontStyle: "italic",
                                        flex: 1,
                                        marginBottom: "1.5rem",
                                        position: "relative",
                                        zIndex: 1,
                                    }}
                                >
                                    {t.text}
                                </p>

                                {/* Author */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.875rem",
                                        paddingTop: "1.25rem",
                                        borderTop: "1px solid rgba(42,124,111,0.1)",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "2.75rem",
                                            height: "2.75rem",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: t.iconBg,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <TIcon size={18} color={t.iconColor} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1A2E2C", fontFamily: "'Montserrat', sans-serif" }}>
                                            {t.name}
                                        </div>
                                        <div style={{ fontSize: "0.75rem", color: "#6B8280", fontFamily: "'Montserrat', sans-serif" }}>
                                            {t.pet} · {t.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
