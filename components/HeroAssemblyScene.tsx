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

function HeroMolding({ motion }: HeroAssemblySceneProps) {
  const { scene } = useGLTF("/models/molding_glb.glb");
  const group = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

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
      const speed = Math.min(Math.hypot(dx, dy) * DASH_MOTION.motionGain, 1);

      if (speed > 0.0001) {
        dirTarget.current.set(dx, dy).normalize();
      }

      motionTarget.current = Math.max(motionTarget.current, speed);
      lastMouse.current.set(x, y);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const preparedModel = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    clone.rotation.set(-Math.PI / 2, 0, 0);
    clone.scale.setScalar((6.7 / maxDimension) * 1.25);

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;
      object.material = new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF",
        roughness: 0.28,
        metalness: 0,
        clearcoat: 0.18,
        clearcoatRoughness: 0.3,
      });
    });

    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current || !modelRef.current) return;

    // Same interaction pattern documented by Dash:
    // target motion decays, smoothed motion follows it, and the direction
    // persists instead of snapping back as soon as the pointer stops.
    motionTarget.current *= Math.pow(DASH_MOTION.speedDecay, delta * 60);

    const mappedMotion = Math.min(
      motionTarget.current * DASH_MOTION.motionGain,
      1,
    );

    motionSm.current +=
      (mappedMotion - motionSm.current) *
      (1 - Math.pow(1 - DASH_MOTION.momentum, delta * 60));

    const dirLerp =
      1 - Math.pow(1 - DASH_MOTION.dirSmooth, delta * 60);

    dirSm.current.x +=
      (dirTarget.current.x - dirSm.current.x) * dirLerp;
    dirSm.current.y +=
      (dirTarget.current.y - dirSm.current.y) * dirLerp;

    const px = mouse.current.x - 0.5;
    const py = mouse.current.y - 0.5;
    const time = performance.now() * 0.001;

    // Continuous rotation, with pointer movement carrying momentum.
    // No positional attraction: the molding stays anchored in the Hero.
    const idle = time * 0.55;
    const pull = motionSm.current;

    const targetX =
      idle +
      dirSm.current.y * pull * 0.42 +
      py * 0.08;

    const targetY =
      dirSm.current.x * pull * 0.34 +
      px * 0.08;

    const targetZ =
      -dirSm.current.x * pull * 0.22 -
      px * 0.045;

    const smoothing = 1 - Math.pow(0.000001, delta);

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetX,
      smoothing,
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetY,
      smoothing,
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetZ,
      smoothing,
    );

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      1.05,
      smoothing,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      0,
      smoothing,
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      0,
      smoothing,
    );

    void motion.current.progress;
  });

  return (
    <group ref={group}>
      <group ref={modelRef}>
        <primitive object={preparedModel} />
      </group>
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
