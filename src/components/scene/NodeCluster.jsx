"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const COUNT = 200;

function fibonacciSphere(n, radius) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
    );
  }
  return pts;
}

function cubeGrid(n, spacing) {
  const pts = [];
  const side = Math.round(Math.cbrt(n));
  for (let i = 0; i < n; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side));
    pts.push(
      new THREE.Vector3(
        (x - side / 2) * spacing,
        (y - side / 2) * spacing,
        (z - side / 2) * spacing
      )
    );
  }
  return pts;
}

function torusKnot(n, radius) {
  const pts = [];
  const p = 2;
  const q = 3;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = radius * (0.6 + 0.2 * Math.cos(q * t));
    const x = r * Math.cos(p * t);
    const y = r * Math.sin(p * t);
    const z = radius * 0.35 * Math.sin(q * t);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

function doubleHelix(n, radius, height) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const strand = i % 2;
    const t = (i / n) * Math.PI * 8;
    const x = Math.cos(t + strand * Math.PI) * radius;
    const z = Math.sin(t + strand * Math.PI) * radius;
    const y = (i / n) * height - height / 2;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

const FORMATIONS_FACTORY = [
  () => fibonacciSphere(COUNT, 4.4),
  () => cubeGrid(COUNT, 1.05),
  () => torusKnot(COUNT, 4.6),
  () => doubleHelix(COUNT, 3.4, 8.5),
];

const dummy = new THREE.Object3D();

function Cluster({ formationIndexRef }) {
  const meshRef = useRef(null);
  const lineRef = useRef(null);

  const formations = useMemo(() => FORMATIONS_FACTORY.map((f) => f()), []);

  const current = useRef(formations[0].map((v) => v.clone()));
  const from = useRef(formations[0].map((v) => v.clone()));
  const to = useRef(formations[0].map((v) => v.clone()));
  const tRef = useRef({ t: 1 });

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 2 * 3 * 2); // generous buffer
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Expose a global trigger the parent UI button can call. This is a plain
  // browser-global bridge (not a React ref/state) so clicking the button
  // outside the canvas can kick off the GSAP morph tween below.
  useMemo(() => {
    window.__reorganizeCluster = () => {
      const nextIndex = (formationIndexRef.current + 1) % formations.length;
      formationIndexRef.current = nextIndex;
      from.current = current.current.map((v) => v.clone());
      to.current = formations[nextIndex].map((v) => v.clone());
      tRef.current.t = 0;
      gsap.to(tRef.current, {
        t: 1,
        duration: 1.8,
        ease: "power3.inOut",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = tRef.current.t;

    const linePositions = lineGeometry.attributes.position.array;
    let lineIdx = 0;
    const maxDistSq = 2.6 * 2.6;

    for (let i = 0; i < COUNT; i++) {
      const f = from.current[i];
      const toVec = to.current[i];
      current.current[i].lerpVectors(f, toVec, t);
      dummy.position.copy(current.current[i]);
      const s = 0.09 + 0.03 * Math.sin(state.clock.elapsedTime * 2 + i);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // connective lines: connect nearby nodes (throttled by only using a subset for perf)
    for (let i = 0; i < COUNT; i += 2) {
      for (let j = i + 2; j < Math.min(i + 10, COUNT); j++) {
        const a = current.current[i];
        const b = current.current[j];
        const dSq = a.distanceToSquared(b);
        if (dSq < maxDistSq && lineIdx < linePositions.length - 6) {
          linePositions[lineIdx++] = a.x;
          linePositions[lineIdx++] = a.y;
          linePositions[lineIdx++] = a.z;
          linePositions[lineIdx++] = b.x;
          linePositions[lineIdx++] = b.y;
          linePositions[lineIdx++] = b.z;
        }
      }
    }
    lineGeometry.setDrawRange(0, lineIdx / 3);
    lineGeometry.attributes.position.needsUpdate = true;

    if (meshRef.current?.parent) {
      meshRef.current.parent.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#14e6c4" emissive="#0a8f7a" emissiveIntensity={0.6} roughness={0.4} />
      </instancedMesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#14e6c4" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NodeCluster() {
  const formationIndexRef = useRef(0);

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 45 }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={40} color="#14e6c4" />
      <pointLight position={[-10, -6, -10]} intensity={20} color="#ff9457" />
      <Cluster formationIndexRef={formationIndexRef} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
