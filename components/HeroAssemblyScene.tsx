"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

function HeroMolding({ motion }: HeroAssemblySceneProps) {
  const { scene } = useGLTF("/models/molding_glb.glb");
  const group = useRef<THREE.Group>(null);

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
        roughness: 0.3,
        metalness: 0,
        clearcoat: 0.12,
        clearcoatRoughness: 0.35,
      });
    });

    return clone;
  }, [scene]);

  useFrame(() => {
    if (!group.current) return;

    const progress = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const reveal = Math.sin(progress * Math.PI);

    group.current.rotation.x = -Math.PI / 2;
    group.current.rotation.y = 0.12 + progress * 0.52;
    group.current.rotation.z = -0.02 + progress * 0.04;
    group.current.position.x = 1.3 - progress * 0.35;
    group.current.position.y = reveal * 0.18;
    group.current.position.z = 0;
    group.current.scale.setScalar(1 + reveal * 0.12);
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
        <ambientLight intensity={1.25} />
        <hemisphereLight
          intensity={0.75}
          groundColor="#EEE7DF"
          color="#FFFDF9"
        />
        <directionalLight
          castShadow
          intensity={3.2}
          position={[4, 5, 6]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        <directionalLight intensity={1.4} position={[-5, 2, 1]} />

        <Suspense fallback={null}>
          <HeroMolding motion={motion} />
        </Suspense>

        <ContactShadows
          position={[0, -0.28, 0]}
          opacity={0.2}
          scale={10}
          blur={2.6}
          far={4}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/molding_glb.glb");
