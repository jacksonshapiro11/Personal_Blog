import React from 'react';
import Particles from 'react-tsparticles';

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // This places it behind other elements with a higher z-index
      }}
    >
      <Particles
        options={{
          background: {
            color: { value: "#000" },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: false },
            collisions: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 50,
            },
            opacity: { value: 0.5 },
            shape: { type: "star" },
            size: { random: true, value: 3 },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
