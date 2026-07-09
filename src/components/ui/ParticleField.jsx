"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleSystem() {
  const count = 2000;
  const meshRef = useRef(null);
  

  const { positions, gridPositions } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const gridArray = new Float32Array(count * 3);
    const size = 5;
    const gridSize = 20; 

    for (let i = 0; i < count; i++) {
   
      
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;

    
      
      const x = (i % gridSize) / gridSize * size - size / 2;
      const y = Math.floor(i / gridSize) / gridSize * size - size / 2;
      const z = Math.sin(i * 0.5) * 1.5; 
      
      gridArray[i * 3] = x;
      gridArray[i * 3 + 1] = y;
      gridArray[i * 3 + 2] = z;
    }
    return { positions: posArray, gridPositions: gridArray };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
   
    
    const scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
   
    
    const progress = Math.min(scrollY * 2.5, 1); 
    
    const geometry = meshRef.current.geometry;
    const attr = geometry.attributes.position;
    const array = attr.array;
    
    for (let i = 0; i < array.length; i++) {
      array[i] = positions[i] + (gridPositions[i] - positions[i]) * progress;
    }
    attr.needsUpdate = true;
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
        <pointsMaterial 
          size={0.08} 
          color="#818cf8" 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </bufferGeometry>
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="w-full h-[600px] absolute top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}