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
        distance: 160,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none" as const,
        outModes: { default: "bounce" as const },
      },
      number: {
        density: { enable: true },
        value: 20,
      },
      opacity: { value: { min: 0.05, max: 0.15 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.25 } },
        push: { quantity: 2 },
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
