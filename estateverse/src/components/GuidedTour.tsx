"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const steps = [
  { target: "tour-search", label: "SEARCH", title: "Describe the home you want", copy: "Try a supported query such as “2 BHK under 80 lakh”. Search matches the local sample records and shows which criteria it understood." },
  { target: "tour-filters", label: "FILTERS", title: "Narrow the shortlist", copy: "Set a budget and area range, then refine by bedroom count, facing, or availability. The match count updates as you change filters." },
  { target: "tour-inventory", label: "PROPERTY DETAILS", title: "Compare matching homes", copy: "This panel lists the matching homes and the selected home's price, floor, size, and availability. Selecting a different result updates the 3D view too." },
  { target: "tour-viewer", label: "DEVELOPMENT VIEW", title: "Explore the development", copy: "Orbit and zoom around the generated towers. Matching apartments are highlighted; choose one in the model or inventory to inspect it. Continue to step inside the selected home." },
  { target: "tour-viewer", label: "SELECTED FLAT", title: "Step inside a home", copy: "The next step switches to the selected flat. Room controls highlight areas in the cutaway; the floor plan links to the same room." },
  { target: "tour-insights", label: "SESSION INSIGHTS", title: "See what this visit explored", copy: "After the tour, open Session insights to see counts for selections, searches, filter changes, and floor-plan opens in this browser visit. These are demo counts, not CRM analytics." },
];

type Props = { step: number; onStepChange: (step: number) => void; onClose: () => void };

export default function GuidedTour({ step, onStepChange, onClose }: Props) {
  const [position, setPosition] = useState({ left: 14, top: 14 });
  const nextRef = useRef<HTMLButtonElement>(null);
  const current = steps[step];

  useEffect(() => {
    const target = document.getElementById(current.target);
    if (!target) return;

    target.classList.add("tour-highlight-target");
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    const updatePosition = () => {
      const bounds = target.getBoundingClientRect();
      const cardWidth = Math.min(360, window.innerWidth - 28);
      const cardHeight = 230;
      const canPlaceRight = bounds.right + cardWidth + 22 <= window.innerWidth;
      const canPlaceLeft = bounds.left - cardWidth - 22 >= 0;
      const left = canPlaceRight
        ? bounds.right + 14
        : canPlaceLeft
          ? bounds.left - cardWidth - 14
          : Math.max(14, (window.innerWidth - cardWidth) / 2);
      let top = bounds.top;
      if (top + cardHeight > window.innerHeight - 14) top = bounds.bottom - cardHeight;
      top = Math.max(14, Math.min(top, window.innerHeight - cardHeight - 14));
      setPosition({ left, top });
    };

    let frame = requestAnimationFrame(updatePosition);
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    };
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);
    nextRef.current?.focus({ preventScroll: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
      target.classList.remove("tour-highlight-target");
    };
  }, [current]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return <>
    <div className="guided-tour-dimmer" aria-hidden="true"/>
    <section className="guided-tour-card" style={{ left: position.left, top: position.top }} role="dialog" aria-modal="true" aria-labelledby="guided-tour-title" aria-describedby="guided-tour-copy">
      <div className="guided-tour-head"><span>{current.label}</span><span>{step + 1} / {steps.length}</span><button className="guided-tour-close" onClick={onClose} aria-label="Close tour"><X size={15}/></button></div>
      <div className="guided-tour-progress" aria-hidden="true">{steps.map((item, index)=><i key={item.target + item.label} className={index <= step ? "complete" : ""}/>)}</div>
      <h2 id="guided-tour-title">{current.title}</h2>
      <p id="guided-tour-copy">{current.copy}</p>
      <div className="guided-tour-actions">
        <button className="guided-tour-skip" onClick={onClose}>Skip tour</button>
        {step > 0 && <button className="guided-tour-back" onClick={() => onStepChange(step - 1)} aria-label="Previous tour step"><ArrowLeft size={14}/></button>}
        <button ref={nextRef} className="guided-tour-next" onClick={() => step === steps.length - 1 ? onClose() : onStepChange(step + 1)}>{step === 3 ? "See selected flat" : step === steps.length - 1 ? "Finish" : "Next"}<ArrowRight size={14}/></button>
      </div>
    </section>
  </>;
}
