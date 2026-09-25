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

  const pointer = useRef(new THREE.Vector2(0.72, 0.08));
  const target = useRef(new THREE.Vector2(0.72, 0.08));
  const velocity = useRef(new THREE.Vector2());

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      target.current.x = THREE.MathUtils.clamp(
        event.clientX / window.innerWidth,
        0,
        1,
      );
      target.current.y = THREE.MathUtils.clamp(
        event.clientY / window.innerHeight,
        0,
        1,
      );
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

    clone.position.sub(center);
    clone.scale.setScalar(6.7 / maxDimension);

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

    // Dash-style magnetic cursor motion: the object follows the pointer
    // with a damped delay rather than snapping directly to it.
    const previous = pointer.current.clone();
    pointer.current.lerp(target.current, 1 - Math.pow(0.0001, delta));
    velocity.current
      .copy(pointer.current)
      .sub(previous)
      .multiplyScalar(1 / Math.max(delta, 0.001));

    const cursorX = pointer.current.x - 0.5;
    const cursorY = pointer.current.y - 0.5;

    const reveal = Math.sin(progress * Math.PI);
    const scrollRotation = progress * 0.34;

    const magneticX = cursorX * 0.95;
    const magneticY = -cursorY * 0.48;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      1.35 + magneticX + velocity.current.x * 0.018,
      1 - Math.pow(0.00001, delta),
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      magneticY + reveal * 0.12,
      1 - Math.pow(0.00001, delta),
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -Math.PI / 2 + cursorY * 0.34 - velocity.current.y * 0.008,
      1 - Math.pow(0.00001, delta),
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0.16 + scrollRotation + cursorX * 0.52 + velocity.current.x * 0.006,
      1 - Math.pow(0.00001, delta),
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -0.02 - cursorX * 0.18,
      1 - Math.pow(0.00001, delta),
    );

    const scale = 1 + reveal * 0.1;
    group.current.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      1 - Math.pow(0.00001, delta),
    );
  });

  return (
    <group ref={group}>
      <primitive object={model} />
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
