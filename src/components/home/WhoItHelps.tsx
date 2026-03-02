"use client";

import { FaDog, FaHorse } from "react-icons/fa";

const dogConditions = [
    "Trauma & PTSD", "Aggression", "Separation Anxiety", "Fear of Cars",
    "Biting", "Resource Guarding", "Anxiousness", "New Puppy Setup",
    "Rescue Dog Adoption", "Fear of Strangers", "Leash Reactivity", "Car Sickness",
];

const horseConditions = [
    "Catching & Leading", "Tacking Up Issues", "Riding Anxiety", "Fear of Floating",
    "Spooking on Trail", "Fear of Water", "Fidgeting", "Laminitis Recovery",
    "Aggression", "Trust Building",
];

export default function WhoItHelps() {
    return (
        <section
            className="section-padding"
            style={{
                background: "linear-gradient(135deg, #1A2E2C 0%, #1D4D41 40%, #1D5C52 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-14">
                    <div
                        className="section-badge"
                        style={{
                            background: "rgba(232,168,56,0.18)",
                            border: "1px solid rgba(232,168,56,0.3)",
                            color: "#E8A838",
                        }}
                    >
                        Conditions We Address
                    </div>
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-5"
                        style={{ fontFamily: "'Playfair Display', serif", color: "white" }}
                    >
                        Is Your Animal{" "}
                        <span style={{ color: "#4AADA0" }}>Struggling?</span>
                    </h2>
                    <p
                        className="text-base max-w-xl mx-auto"
                        style={{ color: "rgba(255,255,255,0.68)", fontFamily: "'Montserrat', sans-serif" }}
                    >
                        Whatever your animal is going through, there is a peaceful path forward.
                        Cheryl specialises in working with the most challenging cases.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Dogs */}
                    <div
                        style={{
                            borderRadius: "1.5rem",
                            padding: "2rem",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
                            <div
                                style={{
                                    width: "2.75rem",
                                    height: "2.75rem",
                                    borderRadius: "0.875rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(42,124,111,0.3)",
                                    border: "1px solid rgba(42,124,111,0.3)",
                                }}
                            >
                                <FaDog size={18} color="#4AADA0" />
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "1.25rem",
                                    fontWeight: 700,
                                    color: "white",
                                }}
                            >
                                Dogs
                            </h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {dogConditions.map((c) => (
                                <span
                                    key={c}
                                    className="tag-pill"
                                    style={{
                                        background: "rgba(74,173,160,0.15)",
                                        border: "1px solid rgba(74,173,160,0.25)",
                                        color: "#A8DDB5",
                                    }}
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Horses */}
                    <div
                        style={{
                            borderRadius: "1.5rem",
                            padding: "2rem",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
                            <div
                                style={{
                                    width: "2.75rem",
                                    height: "2.75rem",
                                    borderRadius: "0.875rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(232,168,56,0.25)",
                                    border: "1px solid rgba(232,168,56,0.3)",
                                }}
                            >
                                <FaHorse size={18} color="#E8A838" />
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "1.25rem",
                                    fontWeight: 700,
                                    color: "white",
                                }}
                            >
                                Horses & Large Animals
                            </h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {horseConditions.map((c) => (
                                <span
                                    key={c}
                                    className="tag-pill"
                                    style={{
                                        background: "rgba(232,168,56,0.12)",
                                        border: "1px solid rgba(232,168,56,0.25)",
                                        color: "#E8C870",
                                    }}
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom note */}
                <div
                    style={{
                        marginTop: "2.5rem",
                        textAlign: "center",
                        padding: "1.5rem 2rem",
                        borderRadius: "1rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <p
                        style={{
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "0.875rem",
                        }}
                    >
                        Also works with: llamas, donkeys, mini horses, pet cows, goats, sheep, and more.{" "}
                        <span style={{ color: "#4AADA0" }}>
                            If it&apos;s not listed above — ask! Cheryl works with all animals.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}
