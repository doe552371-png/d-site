"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroSceneProps = {
  motion: MotionRef;
};

const MODEL_URL = "/models/C303_border.obj";

function C303Model({ motion }: HeroSceneProps) {
  const model = useLoader(OBJLoader, MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const preparedModel = useMemo(() => {
    const clone = model.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 6.2 / maxDimension;

    clone.position.sub(center);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const material = new THREE.MeshPhysicalMaterial({
        color: "#E6E6E6",
        roughness: 0.34,
        metalness: 0,
        clearcoat: 0.1,
        clearcoatRoughness: 0.35,
        side: THREE.DoubleSide,
      });

      child.material = material;
    });

    clone.scale.setScalar(scale);

    return clone;
  }, [model]);

  useEffect(() => {
    return () => {
      preparedModel.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();

        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      });
    };
  }, [preparedModel]);

  useFrame((_, delta) => {
    if (!group.current) return;

    timeRef.current += delta;
    const progress = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const reveal = Math.sin(progress * Math.PI);

    group.current.rotation.x =
      -Math.PI / 2 + Math.sin(timeRef.current * 0.4) * 0.008;
    group.current.rotation.y = 0.12 + progress * 0.52;
    group.current.rotation.z = -0.02 + progress * 0.04;

    group.current.position.x = 0.95 - progress * 0.45;
    group.current.position.y = reveal * 0.18;
    group.current.position.z = -0.2 + progress * 0.25;

    const scale = 1.08 + reveal * 0.08;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} position={[0.95, 0, -0.2]}>
      <primitive object={preparedModel} />
    </group>
  );
}

export default function HeroScene({ motion }: HeroSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        shadows="basic"
        camera={{ position: [0, 0.15, 7.2], fov: 32 }}
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
          <C303Model motion={motion} />
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
