import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.08, 0.12, 0.25],
  markerColor: [96 / 255, 165 / 255, 250 / 255],
  glowColor: [0.043, 0.071, 0.125],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

const GLOBE_CONFIG_LIGHT = {
  ...GLOBE_CONFIG,
  dark: 0,
  baseColor: [0.95, 0.96, 0.97],
  glowColor: [0.85, 0.87, 0.9],
  mapBrightness: 6,
  diffuse: 1.2,
};

export function Globe({ className, config, darkMode = true }) {
  const effectiveConfig = config || (darkMode ? GLOBE_CONFIG : GLOBE_CONFIG_LIGHT);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const rRef = useRef(0);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rRef.current = delta / 200;
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phiRef.current += 0.005;
      state.phi = phiRef.current + rRef.current;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    []
  );

  const onResize = () => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...effectiveConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [darkMode]);

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[600px] ${className || ""}`}>
      <canvas
        className="w-full h-full opacity-0 transition-opacity duration-500"
        style={{ contain: "layout paint size" }}
        ref={canvasRef}
      />
    </div>
  );
}
