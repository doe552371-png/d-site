"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

function HeroMolding({ motion }: HeroAssemblySceneProps) {
  const { scene } = useGLTF("/models/molding_glb.glb");
  const group = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const pointerVelocity = useRef(new THREE.Vector2());
  const targetVelocity = useRef(new THREE.Vector2());

  useEffect(() => {
    let lastX = window.innerWidth * 0.5;
    let lastY = window.innerHeight * 0.5;
    let lastTime = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.008);
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      pointer.current.set(
        event.clientX / window.innerWidth,
        event.clientY / window.innerHeight,
      );

      targetVelocity.current.set(
        THREE.MathUtils.clamp(dx / window.innerWidth / dt, -2.5, 2.5),
        THREE.MathUtils.clamp(dy / window.innerHeight / dt, -2.5, 2.5),
      );

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const preparedModel = useMemo(() => {
    const clone = scene.clone(true);

    // Normalize the model around its own geometric center. This is the key
    // difference from the previous implementation: the object rotates in
    // place, while the outer group is responsible only for hero positioning.
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);

    // Keep the source geometry intact. We only orient it for presentation.
    clone.rotation.set(-Math.PI / 2, 0, 0);
    clone.scale.setScalar(6.7 / maxDimension * 5);

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

    pointerVelocity.current.lerp(
      targetVelocity.current,
      1 - Math.pow(0.0005, delta),
    );
    targetVelocity.current.multiplyScalar(Math.pow(0.035, delta));

    const px = pointer.current.x - 0.5;
    const py = pointer.current.y - 0.5;
    const vx = pointerVelocity.current.x;
    const vy = pointerVelocity.current.y;

    // Dash-inspired interaction model:
    // a constant inertial rotation is always running, while pointer motion
    // adds a damped rotational offset. There is deliberately NO translation.
    const time = performance.now() * 0.001;
    const baseSpin = time * 0.7;

    const targetX = baseSpin + py * 0.16 - vy * 0.035;
    const targetY = px * 0.12 + vx * 0.028;
    const targetZ = -px * 0.10 - vx * 0.018;

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

    // Fixed hero anchor. Scroll can affect the existing Hero timeline,
    // but never causes the 3D object to fly out of the section.
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

    // Keep the existing scene responsive to the Hero scroll state without
    // introducing positional movement.
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
