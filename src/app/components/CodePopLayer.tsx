import { useCallback, useEffect, useRef, useState } from "react";

const popItems = [
  { text: "</head>", left: "8%", top: "18%", delay: "0s", duration: "6.4s" },
  { text: "ERROR: 502", left: "76%", top: "22%", delay: "1.1s", duration: "6.8s" },
  { text: "01010101", left: "18%", top: "34%", delay: "2.3s", duration: "6.2s" },
  { text: "if (bug) fix();", left: "62%", top: "38%", delay: "0.7s", duration: "7.2s" },
  { text: "stack.push('node')", left: "10%", top: "58%", delay: "1.9s", duration: "6.9s" },
  { text: "<div class='app'>", left: "66%", top: "62%", delay: "3.1s", duration: "6.5s" },
  { text: "git commit -m 'ship'", left: "24%", top: "76%", delay: "2.7s", duration: "7.4s" },
  { text: "const api = await fetch()", left: "74%", top: "80%", delay: "1.5s", duration: "6.7s" },
  { text: "001011001", left: "43%", top: "16%", delay: "2.1s", duration: "7.1s" },
  { text: "null !== undefined", left: "40%", top: "52%", delay: "0.3s", duration: "6.6s" },
];

const textSelector =
  "h1, h2, h3, h4, h5, h6, p, a, button, label, li, dt, dd, input, textarea, [data-pop-block]";

const intersects = (a: DOMRect, b: DOMRect) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

export function CodePopLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isVisibleInViewport, setIsVisibleInViewport] = useState(false);
  const [chipVisible, setChipVisible] = useState<boolean[]>(() => popItems.map(() => true));

  const updateChipVisibility = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const zone = layer.closest(".code-pop-zone");
    if (!zone) return;

    const textRects = Array.from(zone.querySelectorAll<HTMLElement>(textSelector))
      .filter((el) => !layer.contains(el))
      .filter((el) => (el.textContent?.trim().length ?? 0) > 0)
      .filter((el) => el.offsetParent !== null)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        // small padding so popup chips don't sit too close to readable text
        const padX = 6;
        const padY = 4;
        return new DOMRect(rect.left - padX, rect.top - padY, rect.width + padX * 2, rect.height + padY * 2);
      });

    const next = popItems.map((_, index) => {
      const chip = chipRefs.current[index];
      if (!chip) return true;
      const chipRect = chip.getBoundingClientRect();
      return !textRects.some((textRect) => intersects(chipRect, textRect));
    });

    setChipVisible((prev) => {
      if (prev.length !== next.length) return next;
      for (let i = 0; i < next.length; i += 1) {
        if (prev[i] !== next[i]) return next;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisibleInViewport(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.05 },
    );
    observer.observe(layer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisibleInViewport) return;

    updateChipVisibility();

    const onViewportChange = () => {
      window.requestAnimationFrame(updateChipVisibility);
    };

    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });

    const layer = layerRef.current;
    const zone = layer?.closest(".code-pop-zone");
    const resizeObserver = zone ? new ResizeObserver(() => updateChipVisibility()) : null;
    if (zone && resizeObserver) resizeObserver.observe(zone);

    // keep overlap checks fresh for moving carousels/text inside the section
    const intervalId = window.setInterval(updateChipVisibility, 900);

    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
      if (resizeObserver) resizeObserver.disconnect();
      window.clearInterval(intervalId);
    };
  }, [isVisibleInViewport, updateChipVisibility]);

  return (
    <div ref={layerRef} className="code-pop-layer" aria-hidden="true">
      {popItems.map((item, index) => (
        <span
          key={`${item.text}-${item.left}-${item.top}`}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          className="code-pop-chip"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
            opacity: chipVisible[index] ? undefined : 0,
            visibility: chipVisible[index] ? "visible" : "hidden",
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
