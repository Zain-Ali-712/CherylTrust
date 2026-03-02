"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
    {
        q: "What is the Trust Technique®?",
        a: "The Trust Technique® is a mindfulness-based method of communication between people and animals. It works by reducing the thinking level in you and your animal simultaneously, creating a shared state of peace — allowing true learning, connection, and trust to develop naturally, without force or pressure.",
    },
    {
        q: "Can I have sessions online if I'm not in Wellington?",
        a: "Absolutely. Trust Technique® and Emotion Code Releasing sessions are available worldwide via video call. Many clients see remarkable results fully online. In-person services — body therapy, Red Light treatments, and canine rehabilitation — are available to clients in the Wellington region.",
    },
    {
        q: "How many sessions does my dog or horse typically need?",
        a: "Every animal is different. Most clients begin to see meaningful changes within 1–3 sessions. More entrenched issues — severe PTSD, long-term aggression — may benefit from an ongoing programme. Cheryl will discuss a realistic plan with you from the start.",
    },
    {
        q: "What types of animals do you work with?",
        a: "Cheryl works with dogs, horses, and all large animals including donkeys, llamas, miniature horses, goats, and cows. The Trust Technique® and Emotion Code are also effective for cats and other companion animals.",
    },
    {
        q: "Is the Trust Technique® suitable for aggressive animals?",
        a: "Yes — it's often the most effective approach for exactly these cases. The Trust Technique® uses no confrontation, punishment, or restraint. By working with the animal's emotional state rather than against it, even highly reactive animals can achieve fundamental, lasting change.",
    },
    {
        q: "How is this different from regular dog training?",
        a: "Traditional training conditions behaviour through commands and rewards. The Trust Technique® works at a deeper level — addressing the emotional and energetic state that drives the behaviour. The result is not just an obedient animal, but a genuinely calm, trusting, and connected one.",
    },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    const { ref, style } = useScrollReveal({ delay: index * 60 });

    return (
        <div ref={ref} style={style}>
            <div style={{ borderTop: "1px solid rgba(28,43,54,0.08)" }}>
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1.5rem",
                        padding: "1.75rem 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                    }}
                >
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 600, color: "#1C2B36", lineHeight: 1.3, flex: 1 }}>
                        {q}
                    </span>
                    <div
                        style={{
                            width: "28px",
                            height: "28px",
                            border: `1px solid ${open ? "#507E98" : "rgba(28,43,54,0.15)"}`,
                            background: open ? "#507E98" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.3s ease",
                        }}
                    >
                        {open
                            ? <FiMinus size={12} color="white" />
                            : <FiPlus size={12} color="rgba(28,43,54,0.4)" />
                        }
                    </div>
                </button>

                {open && (
                    <div style={{ paddingBottom: "1.75rem" }}>
                        <div style={{ borderLeft: "1px solid #F2CBA9", paddingLeft: "1.5rem" }}>
                            <p style={{ fontSize: "0.9rem", color: "rgba(28,43,54,0.55)", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.85 }}>
                                {a}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function FAQSection() {
    const { ref: headRef, style: headStyle } = useScrollReveal({ delay: 0 });

    return (
        <section style={{ background: "#F0F4F6", padding: "6rem 0" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 6vw, 4rem)" }}>

                {/* Asymmetric header — spec pattern */}
                <div ref={headRef} style={{ ...headStyle, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end", marginBottom: "4rem" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <div style={{ width: "24px", height: "1px", background: "#6C8FA3" }} />
                            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#6C8FA3", fontFamily: "'Montserrat', sans-serif" }}>
                                Common Questions
                            </span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 400, color: "#1C2B36", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                            Frequently<br />Asked Questions
                        </h2>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "rgba(28,43,54,0.5)", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.85, alignSelf: "flex-end", paddingBottom: "0.25rem" }}>
                        Everything you need to know before booking your first session with Cheryl.
                    </p>
                </div>

                {/* Accordion — two columns on desktop */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }}>
                    {[faqs.slice(0, 3), faqs.slice(3)].map((group, gi) => (
                        <div key={gi}>
                            {group.map((faq, i) => (
                                <FAQItem key={faq.q} q={faq.q} a={faq.a} index={gi * 3 + i} />
                            ))}
                            <div style={{ borderTop: "1px solid rgba(28,43,54,0.08)" }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
