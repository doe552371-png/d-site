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
  const pivot = useRef<THREE.Group>(null);

  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const pointerVelocity = useRef(new THREE.Vector2());
  const targetVelocity = useRef(new THREE.Vector2());
  const pulse = useRef(0);

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

      const speed = Math.min(Math.hypot(dx, dy) / 120, 1);
      pulse.current = Math.max(pulse.current, speed);

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    // Center the mesh inside an explicit pivot so rotation never changes its orbit.
    clone.position.sub(center);
    clone.rotation.x = -Math.PI / 2;

    const baseScale = 6.7 / maxDimension;
    clone.scale.setScalar(baseScale * 5);

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
    if (!group.current) return;

    const progress = THREE.MathUtils.clamp(motion.current.progress, 0, 1);

    pointerVelocity.current.lerp(
      targetVelocity.current,
      1 - Math.pow(0.0005, delta),
    );
    targetVelocity.current.multiplyScalar(Math.pow(0.035, delta));
    pulse.current *= Math.pow(0.045, delta);

    const px = pointer.current.x - 0.5;
    const py = pointer.current.y - 0.5;
    const vx = pointerVelocity.current.x;
    const vy = pointerVelocity.current.y;

    // Keep the object anchored in one place. Cursor only adds a subtle
    // rotational impulse; it must never translate the molding out of frame.
    const t = performance.now() * 0.001;
    const idleRotation = t * 0.22;

    const targetRotationX =
      Math.sin(t * 0.48) * 0.035 + py * 0.08 - vy * 0.018;
    const targetRotationY = px * 0.08 + vx * 0.018;
    const targetRotationZ =
      Math.sin(t * 0.34) * 0.02 - px * 0.06 - vx * 0.012;

    const smoothing = 1 - Math.pow(0.00001, delta);

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

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      smoothing,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      smoothing,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotationZ,
      smoothing,
    );

    if (pivot.current) {
      // The molding is elongated along its local X axis in the source asset.
      // Rotate the pivot itself around that axis; the centered mesh never translates.
      pivot.current.rotation.set(idleRotation, 0, 0);
    }

    // Keep scale stable; cursor creates only a tiny visual pulse.
    const targetScale = 1 + pulse.current * 0.012;
    const scale = THREE.MathUtils.lerp(
      group.current.scale.x,
      targetScale,
      smoothing,
    );
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <group ref={pivot}>
        <primitive object={model} />
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
