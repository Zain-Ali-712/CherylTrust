import { FiGlobe, FiMapPin, FiUsers, FiVideo } from "react-icons/fi";

const formats = [
    {
        Icon: FiGlobe,
        title: "Online — Global",
        subtitle: "Via Skype / FaceTime / Teams",
        color: "#2A7C6F",
        bgGradient: "linear-gradient(135deg, #2A7C6F 0%, #4AADA0 100%)",
        lightBg: "rgba(42,124,111,0.08)",
        borderColor: "rgba(42,124,111,0.15)",
        available: ["Trust Technique®", "Emotion Code Releasing", "Laminitis Consultation"],
        note: "Available worldwide — anywhere with internet",
    },
    {
        Icon: FiMapPin,
        title: "In Person — Wellington",
        subtitle: "Wainuiomata, Wellington NZ",
        color: "#E8A838",
        bgGradient: "linear-gradient(135deg, #C0841A 0%, #E8A838 100%)",
        lightBg: "rgba(232,168,56,0.08)",
        borderColor: "rgba(232,168,56,0.2)",
        available: [
            "Trust Technique®",
            "Musculoskeletal Unwinding",
            "Red Light Therapy",
            "Canine Rehabilitation",
            "Paddock Sessions (Horses)",
        ],
        note: "Happy to travel within the Wellington area",
    },
];

export default function SessionFormat() {
    return (
        <section className="section-padding" style={{ background: "#F0F7F6" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <div
                        className="section-badge"
                        style={{ background: "rgba(42,124,111,0.08)", color: "#2A7C6F", border: "1px solid rgba(42,124,111,0.15)" }}
                    >
                        Session Formats
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
                        Sessions That{" "}
                        <span style={{ color: "#2A7C6F" }}>Work for You</span>
                    </h2>
                    <p style={{ fontSize: "0.9375rem", color: "#6B8280", maxWidth: "32rem", margin: "0 auto", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.7 }}>
                        Whether you&apos;re across town or across the world, Cheryl has a session format
                        that suits your needs. All sessions are private, 1-on-1.
                    </p>
                </div>

                {/* Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        maxWidth: "56rem",
                        margin: "0 auto",
                    }}
                >
                    {formats.map((f) => {
                        const Icon = f.Icon;
                        return (
                            <div
                                key={f.title}
                                className="card-hover"
                                style={{
                                    background: "white",
                                    borderRadius: "1.5rem",
                                    padding: "2rem",
                                    border: `1.5px solid ${f.borderColor}`,
                                    boxShadow: "0 4px 20px rgba(26,46,44,0.07)",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                {/* Top gradient stripe */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: f.bgGradient,
                                    }}
                                />

                                {/* Icon + title */}
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", marginTop: "0.5rem" }}>
                                    <div
                                        style={{
                                            width: "3.25rem",
                                            height: "3.25rem",
                                            borderRadius: "1rem",
                                            background: f.bgGradient,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: `0 6px 18px ${f.color}2A`,
                                        }}
                                    >
                                        <Icon size={20} color="white" />
                                    </div>
                                    <div>
                                        <h3
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: "1.125rem",
                                                fontWeight: 700,
                                                color: "#1A2E2C",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {f.title}
                                        </h3>
                                        <p style={{ fontSize: "0.8rem", color: "#6B8280", fontFamily: "'Montserrat', sans-serif" }}>
                                            {f.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Services list */}
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B8280", fontFamily: "'Montserrat', sans-serif", marginBottom: "0.75rem" }}>
                                        Available Services
                                    </p>
                                    <ul style={{ listStyle: "none" }}>
                                        {f.available.map((item) => (
                                            <li
                                                key={item}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.625rem",
                                                    fontSize: "0.875rem",
                                                    color: "#1A2E2C",
                                                    fontFamily: "'Montserrat', sans-serif",
                                                    paddingBottom: "0.5rem",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "6px",
                                                        height: "6px",
                                                        borderRadius: "50%",
                                                        background: f.color,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Note */}
                                <div
                                    style={{
                                        padding: "0.75rem 1rem",
                                        borderRadius: "0.75rem",
                                        background: f.lightBg,
                                        border: `1px solid ${f.borderColor}`,
                                        fontSize: "0.8rem",
                                        fontWeight: 500,
                                        color: f.color,
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                >
                                    {f.note}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer note */}
                <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6B8280", fontFamily: "'Montserrat', sans-serif" }}>
                            <FiUsers size={15} color="#2A7C6F" />
                            All sessions are private & 1-on-1
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6B8280", fontFamily: "'Montserrat', sans-serif" }}>
                            <FiVideo size={15} color="#2A7C6F" />
                            Online sessions via Skype / FaceTime / Teams
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
