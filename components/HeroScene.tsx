"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroSceneProps = {
  motion: MotionRef;
};

function MouldingModel({ motion }: HeroSceneProps) {
  const group = useRef<THREE.Group>(null);

  const profile = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0.46, 0);
    shape.lineTo(0.46, 0.07);
    shape.lineTo(0.34, 0.1);
    shape.lineTo(0.31, 0.17);
    shape.lineTo(0.25, 0.23);
    shape.lineTo(0.16, 0.27);
    shape.lineTo(0.11, 0.34);
    shape.lineTo(0.4, 0.34);
    shape.lineTo(0.4, 0.47);
    shape.lineTo(0, 0.47);
    shape.closePath();

    return shape;
  }, []);

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(profile, {
        depth: 6.7,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      }),
    [profile],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!group.current) return;

    const progress = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const reveal = Math.sin(progress * Math.PI);

    group.current.rotation.y = -0.56 + progress * 1.18;
    group.current.rotation.z = -0.055 + progress * 0.08;
    group.current.rotation.x =
      0.16 + Math.sin(state.clock.elapsedTime * 0.45) * 0.012;

    group.current.position.x = 0.7 - progress * 1.7;
    group.current.position.y = -0.05 + reveal * 0.22;
    group.current.position.z = -0.15 + progress * 0.35;

    const scale = 1.02 + reveal * 0.1;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} position={[0.7, -0.05, -0.15]}>
      <mesh geometry={geometry} rotation={[0, Math.PI / 2, 0]} castShadow>
        <meshPhysicalMaterial
          color="#B56E43"
          roughness={0.3}
          metalness={0}
          clearcoat={0.12}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene({ motion }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 0.2, 8.2], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.25} />
        <hemisphereLight intensity={0.75} groundColor="#EEE7DF" color="#FFFDF9" />
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

        <MouldingModel motion={motion} />

        <ContactShadows
          position={[0, -0.62, 0]}
          opacity={0.2}
          scale={10}
          blur={2.6}
          far={4}
        />
      </Canvas>
    </div>
  );
}
