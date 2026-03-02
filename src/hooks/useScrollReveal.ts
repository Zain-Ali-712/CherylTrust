"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
    delay?: number;
    threshold?: number;
    once?: boolean;
}

export function useScrollReveal({
    delay = 0,
    threshold = 0.12,
    once = true,
}: UseScrollRevealOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    if (once) observer.disconnect();
                } else {
                    if (!once) setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold, once]);

    const style: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    };

    return { ref, style };
}
