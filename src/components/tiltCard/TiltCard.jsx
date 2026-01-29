import { useRef, useState } from "react";
import "./tiltcard.css";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const maxTilt = 12;
  const lift = 6;
  const perspective = 900;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = x / r.width; // 0..1
    const py = y / r.height; // 0..1

    const nx = px * 2 - 1; // -1..1
    const ny = py * 2 - 1; // -1..1

    const rotY = nx * maxTilt;
    const rotX = -ny * maxTilt;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-${lift}px)`;

    // OLD (qolaversin)
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);

    // NEW (text parallax uchun)
    el.style.setProperty("--px", px); // 0..1 (son)
    el.style.setProperty("--py", py); // 0..1 (son)
    el.style.setProperty("--rx", rotX); // deg uchun son
    el.style.setProperty("--ry", rotY); // deg uchun son
  };

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    setIsHover(true);
    el.style.transition = "transform 40ms linear, box-shadow 160ms ease";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    setIsHover(false);
    el.style.transition = "transform 240ms ease, box-shadow 240ms ease";
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${isHover ? "is-hover" : ""} ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
