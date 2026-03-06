import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: "#6366f1" },
      links: {
        color: "#6366f1",
        distance: 150,
        enable: true,
        opacity: 0.05,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none" as const,
        outModes: { default: "bounce" as const },
      },
      number: {
        density: { enable: true },
        value: 40,
      },
      opacity: { value: 0.08 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.15 } },
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
};

export default ParticlesBackground;
