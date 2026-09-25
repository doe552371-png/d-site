"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

const DASH_MOTION = {
  radius: 0.41,
  amplitude: 0.082,
  frequency: 13,
  speed: 0.98,
  carry: 6,
  stagger: 12,
  centerPower: 2,
  verticalDampPower: 2.2,
  motionGain: 220,
  speedDecay: 0.86,
  momentum: 0.14,
  dirSmooth: 0.12,
};

function HeroMolding({ motion: _motion }: HeroAssemblySceneProps) {
  const group = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!modelRef.current) return;

    // The object is completely independent from the cursor.
    // It only performs a continuous, stable rotation around its own center.
    const time = performance.now() * 0.001;
    modelRef.current.rotation.set(
      time * 0.55,
      0,
      0,
    );
  });

  return (
    <group ref={group} position={[1.05, 0, 0]}>
      <mesh ref={modelRef} scale={[1.25, 0.42, 0.42]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.8, 0.8]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.28}
          metalness={0}
          clearcoat={0.18}
          clearcoatRoughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function HeroAssemblyScene({ motion }: HeroAssemblySceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        shadows="basic"
        camera={{ position: [0, 0.3, 9.4], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.35} />
        <hemisphereLight
          intensity={0.8}
          groundColor="#F2F2F2"
          color="#FFFFFF"
        />
        <directionalLight
          castShadow
          intensity={3.4}
          position={[4, 5, 6]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        <directionalLight intensity={1.6} position={[-5, 2, 1]} />

        <Suspense fallback={null}>
          <HeroMolding motion={motion} />
        </Suspense>

        <ContactShadows
          position={[0, -0.3, 0]}
          opacity={0.16}
          scale={10}
          blur={2.8}
          far={4}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/molding_glb.glb");
