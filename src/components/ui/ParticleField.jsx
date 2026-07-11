"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleSystem({ progressRef }) {
  const count = 3000;
  const meshRef = useRef(null);

  const { positions, structurePositions, colors } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const structArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    
    const size = 6;
    const layers = 12;
    const pointsPerLayer = Math.floor(count / layers);
    
    // Color palette - cyan to purple gradient
    const color1 = new THREE.Color("#14e6c4");
    const color2 = new THREE.Color("#818cf8");
    const color3 = new THREE.Color("#a78bfa");

    let idx = 0;
    for (let layer = 0; layer < layers; layer++) {
      const radius = (1 - layer / layers) * 2.8;
      const yOffset = (layer / (layers - 1) - 0.5) * 4.5;
      const pointsInLayer = layer === layers - 1 ? count - idx : pointsPerLayer;
      
      for (let i = 0; i < pointsInLayer && idx < count; i++) {
        const angle = (i / pointsInLayer) * Math.PI * 2 + layer * 0.5;
        const twist = layer * 0.3;
        
        const r = radius * (0.6 + 0.4 * Math.sin(angle * 2 + layer));
        const x = Math.cos(angle + twist) * r;
        const z = Math.sin(angle + twist) * r * 0.8;
        const y = yOffset + Math.sin(angle * 3) * 0.3;
        
        structArray[idx * 3] = x;
        structArray[idx * 3 + 1] = y;
        structArray[idx * 3 + 2] = z;
        
        posArray[idx * 3] = (Math.random() - 0.5) * 20;
        posArray[idx * 3 + 1] = (Math.random() - 0.5) * 20;
        posArray[idx * 3 + 2] = (Math.random() - 0.5) * 20;
        
        const mixFactor = (layer / layers);
        let color;
        if (mixFactor < 0.5) {
          color = color1.clone().lerp(color2, mixFactor * 2);
        } else {
          color = color2.clone().lerp(color3, (mixFactor - 0.5) * 2);
        }
        
        colorArray[idx * 3] = color.r;
        colorArray[idx * 3 + 1] = color.g;
        colorArray[idx * 3 + 2] = color.b;
        
        idx++;
      }
    }

    return { 
      positions: posArray, 
      structurePositions: structArray,
      colors: colorArray 
    };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const progress = progressRef?.current || 0;
    const time = state.clock.elapsedTime;
    
    const geometry = meshRef.current.geometry;
    const attr = geometry.attributes.position;
    const array = attr.array;
    const colorAttr = geometry.attributes.color;
    const colorArray = colorAttr ? colorAttr.array : null;
    
    const ease = progress * progress * (3 - 2 * progress);
    
    const mouseX = (state.mouse.x || 0) * 0.5;
    const mouseY = (state.mouse.y || 0) * 0.5;
    
    for (let i = 0; i < array.length / 3; i++) {
      const i3 = i * 3;
      
      const targetX = structurePositions[i3];
      const targetY = structurePositions[i3 + 1];
      const targetZ = structurePositions[i3 + 2];
      
      const floatOffset = Math.sin(time * 0.5 + i * 0.01) * 0.05 * (1 - ease);
      const floatOffsetY = Math.cos(time * 0.3 + i * 0.015) * 0.05 * (1 - ease);
      const floatOffsetZ = Math.sin(time * 0.4 + i * 0.012) * 0.05 * (1 - ease);
      
      const mouseInfluence = 0.1 * (1 - ease);
      const mouseOffsetX = mouseX * 0.5 * (1 + targetX / 3);
      const mouseOffsetY = mouseY * 0.5 * (1 + targetY / 3);
      
      array[i3] = positions[i3] + (targetX - positions[i3]) * ease + floatOffset + mouseOffsetX * mouseInfluence;
      array[i3 + 1] = positions[i3 + 1] + (targetY - positions[i3 + 1]) * ease + floatOffsetY + mouseOffsetY * mouseInfluence;
      array[i3 + 2] = positions[i3 + 2] + (targetZ - positions[i3 + 2]) * ease + floatOffsetZ;
      
      if (colorArray) {
        const pulse = 1 + Math.sin(time * 2 + i * 0.02) * 0.1 * (1 - ease);
        colorArray[i3] *= pulse;
        colorArray[i3 + 1] *= pulse;
        colorArray[i3 + 2] *= pulse;
      }
    }
    
    attr.needsUpdate = true;
    if (colorAttr) colorAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={count} 
          array={colors} 
          itemSize={3} 
        />
        <pointsMaterial 
          size={0.12}
          vertexColors
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </bufferGeometry>
    </points>
  );
}

function ConnectionLines({ progressRef }) {
  const linesRef = useRef(null);
  const count = 800;
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return posArray;
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const progress = progressRef?.current || 0;
    const time = state.clock.elapsedTime;
    
    const positionsAttr = linesRef.current.geometry.attributes.position;
    const array = positionsAttr.array;
    
    const ease = progress * progress * (3 - 2 * progress);
    
    for (let i = 0; i < array.length / 3; i++) {
      const i3 = i * 3;
      array[i3] += Math.sin(time * 0.2 + i) * 0.001;
      array[i3 + 1] += Math.cos(time * 0.3 + i * 0.5) * 0.001;
      array[i3 + 2] += Math.sin(time * 0.25 + i * 0.7) * 0.001;
    }
    positionsAttr.needsUpdate = true;
    
    const material = linesRef.current.material;
    material.opacity = ease * 0.3;
  });

  return (
    <points ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
        <pointsMaterial 
          size={0.03}
          color="#14e6c4"
          transparent 
          opacity={0}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </bufferGeometry>
    </points>
  );
}

export default function ParticleField({ progressRef }) {
  return (
    <div className="w-full h-screen absolute top-0 left-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem progressRef={progressRef} />
        <ConnectionLines progressRef={progressRef} />
      </Canvas>
    </div>
  );
}