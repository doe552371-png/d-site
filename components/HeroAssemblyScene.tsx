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

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const lastMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const dirTarget = useRef(new THREE.Vector2());
  const dirSm = useRef(new THREE.Vector2());
  const motionTarget = useRef(0);
  const motionSm = useRef(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1);
      const y = event.clientY / Math.max(window.innerHeight, 1);
      mouse.current.set(x, y);

      const dx = x - lastMouse.current.x;
      const dy = y - lastMouse.current.y;
      const speed = Math.min(Math.hypot(dx, dy) * 220, 1);

      if (speed > 0.0001) dirTarget.current.set(dx, dy).normalize();
      motionTarget.current = Math.max(motionTarget.current, speed);
      lastMouse.current.set(x, y);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !modelRef.current) return;

    motionTarget.current *= Math.pow(0.86, delta * 60);
    const mappedMotion = Math.min(motionTarget.current * 220, 1);

    motionSm.current +=
      (mappedMotion - motionSm.current) *
      (1 - Math.pow(1 - 0.14, delta * 60));

    const dirLerp = 1 - Math.pow(1 - 0.12, delta * 60);
    dirSm.current.x += (dirTarget.current.x - dirSm.current.x) * dirLerp;
    dirSm.current.y += (dirTarget.current.y - dirSm.current.y) * dirLerp;

    const px = mouse.current.x - 0.5;
    const py = mouse.current.y - 0.5;
    const time = performance.now() * 0.001;
    const pull = motionSm.current;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      time * 0.55 + dirSm.current.y * pull * 0.42 + py * 0.08,
      1 - Math.pow(0.000001, delta),
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      dirSm.current.x * pull * 0.34 + px * 0.08,
      1 - Math.pow(0.000001, delta),
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      -dirSm.current.x * pull * 0.22 - px * 0.045,
      1 - Math.pow(0.000001, delta),
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
