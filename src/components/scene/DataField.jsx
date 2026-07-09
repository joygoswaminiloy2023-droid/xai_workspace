"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2200;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Field({ progress }) {
  const pointsRef = useRef(null);
  const groupRef = useRef(null);

  const { chaos, grid, colorStart, colorEnd } = useMemo(() => {
    const chaos = new Float32Array(COUNT * 3);
    const grid = new Float32Array(COUNT * 3);
    const colorStart = new Float32Array(COUNT * 3);
    const colorEnd = new Float32Array(COUNT * 3);

    const dataColor = new THREE.Color("#ff9457");
    const signalColor = new THREE.Color("#14e6c4");

 
    const side = Math.round(Math.cbrt(COUNT));
    const spacing = 3.4;
    let gi = 0;

    for (let i = 0; i < COUNT; i++) {
      // chaotic cloud
      const r = 6 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      chaos[i * 3 + 2] = r * Math.cos(phi);

      // grid target
      const x = gi % side;
      const y = Math.floor(gi / side) % side;
      const z = Math.floor(gi / (side * side));
      grid[i * 3] = (x - side / 2) * spacing;
      grid[i * 3 + 1] = (y - side / 2) * spacing;
      grid[i * 3 + 2] = (z - side / 2) * spacing * 0.6;
      gi++;

      colorStart[i * 3] = dataColor.r;
      colorStart[i * 3 + 1] = dataColor.g;
      colorStart[i * 3 + 2] = dataColor.b;
      colorEnd[i * 3] = signalColor.r;
      colorEnd[i * 3 + 1] = signalColor.g;
      colorEnd[i * 3 + 2] = signalColor.b;
    }

    return { chaos, grid, colorStart, colorEnd };
  }, []);

  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const colors = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame((state, delta) => {
    const p = easeInOutCubic(progress.current);
    const geo = pointsRef.current?.geometry;
    if (!geo) return;

    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = lerp(chaos[i], grid[i], p);
      colors[i] = lerp(colorStart[i], colorEnd[i], p);
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.05 + p * 0.05);
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function DataField({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <Field progress={progress} />
    </Canvas>
  );
}
