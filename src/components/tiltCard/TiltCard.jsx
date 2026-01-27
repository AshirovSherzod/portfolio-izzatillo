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

    const px = (x / r.width) * 2 - 1;
    const py = (y / r.height) * 2 - 1;

    const rotY = px * maxTilt;
    const rotX = -py * maxTilt;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-${lift}px)`;

    el.style.setProperty("--mx", `${(x / r.width) * 100}%`);
    el.style.setProperty("--my", `${(y / r.height) * 100}%`);
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
