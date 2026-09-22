"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

function TrimProfile() {
  return useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0.18, 0);
    shape.lineTo(0.18, 0.07);
    shape.lineTo(0.13, 0.09);
    shape.lineTo(0.12, 0.15);
    shape.lineTo(0.08, 0.2);
    shape.lineTo(0.25, 0.2);
    shape.lineTo(0.25, 0.29);
    shape.lineTo(0, 0.29);
    shape.closePath();

    return shape;
  }, []);
}

function BaseboardModel({ motion }: HeroAssemblySceneProps) {
  const group = useRef<THREE.Group>(null);
  const profile = TrimProfile();

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(profile, {
        depth: 5.2,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.018,
        bevelThickness: 0.018,
      }),
    [profile],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const t = THREE.MathUtils.smoothstep(p, 0.04, 0.62);

    group.current.position.x = THREE.MathUtils.lerp(-4.7, 0.2, t);
    group.current.position.y = THREE.MathUtils.lerp(-2.1, -1.72, t);
    group.current.position.z = THREE.MathUtils.lerp(0.8, -0.15, t);
    group.current.rotation.y = THREE.MathUtils.lerp(0.6, 0, t);
    group.current.rotation.z = THREE.MathUtils.lerp(0.08, 0, t);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.28}
          metalness={0}
          clearcoat={0.12}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

function VerticalTrimModel({
  motion,
  side,
}: HeroAssemblySceneProps & { side: "left" | "right" }) {
  const group = useRef<THREE.Group>(null);
  const profile = TrimProfile();

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(profile, {
        depth: 3.9,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.018,
        bevelThickness: 0.018,
      }),
    [profile],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const t = THREE.MathUtils.smoothstep(p, 0.18, 0.78);
    const finalX = side === "left" ? 0.22 : 3.14;
    const startX = side === "left" ? -4.8 : 5.5;

    group.current.position.x = THREE.MathUtils.lerp(startX, finalX, t);
    group.current.position.y = THREE.MathUtils.lerp(0.8, 0.1, t);
    group.current.position.z = THREE.MathUtils.lerp(0.5, -0.05, t);
    group.current.rotation.y = THREE.MathUtils.lerp(
      side === "left" ? -0.6 : 0.6,
      0,
      t,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(-0.12, 0, t);
  });

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.28}
          metalness={0}
          clearcoat={0.12}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

function TopTrimModel({ motion }: HeroAssemblySceneProps) {
  const group = useRef<THREE.Group>(null);
  const profile = TrimProfile();

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(profile, {
        depth: 3.35,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.018,
        bevelThickness: 0.018,
      }),
    [profile],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const t = THREE.MathUtils.smoothstep(p, 0.34, 0.94);

    group.current.position.x = THREE.MathUtils.lerp(4.8, 1.68, t);
    group.current.position.y = THREE.MathUtils.lerp(4.4, 3.98, t);
    group.current.position.z = THREE.MathUtils.lerp(0.7, -0.04, t);
    group.current.rotation.y = THREE.MathUtils.lerp(0.58, 0, t);
    group.current.rotation.z = THREE.MathUtils.lerp(0.09, 0, t);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.28}
          metalness={0}
          clearcoat={0.12}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Architecture({ motion }: HeroAssemblySceneProps) {
  const opening = useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: "#111111",
      roughness: 0.7,
      metalness: 0,
    });
    return material;
  }, []);

  useEffect(() => () => opening.dispose(), [opening]);

  return (
    <>
      <mesh position={[1.68, 0.7, -0.55]} castShadow receiveShadow>
        <boxGeometry args={[7.6, 6.8, 0.28]} />
        <meshPhysicalMaterial color="#F7F7F5" roughness={0.82} />
      </mesh>

      <mesh position={[0.04, -1.75, -0.48]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshPhysicalMaterial color="#FBFBF9" roughness={0.9} />
      </mesh>

      <mesh position={[1.68, 0.85, -0.38]} material={opening}>
        <boxGeometry args={[2.65, 4.65, 0.06]} />
      </mesh>

      <mesh position={[1.68, 3.18, -0.35]} castShadow>
        <boxGeometry args={[2.9, 0.22, 0.42]} />
        <meshPhysicalMaterial color="#EFEFED" roughness={0.82} />
      </mesh>
    </>
  );
}

export default function HeroAssemblyScene({
  motion,
}: HeroAssemblySceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0.4, 0.65, 9.4], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.35} />
        <hemisphereLight
          intensity={0.7}
          groundColor="#EDE8E1"
          color="#FFFDF9"
        />
        <directionalLight
          castShadow
          intensity={3.2}
          position={[4.5, 5.5, 6.5]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={5}
          shadow-camera-bottom={-4}
        />
        <directionalLight intensity={1.1} position={[-5, 2, 2]} />

        <Architecture motion={motion} />
        <BaseboardModel motion={motion} />
        <VerticalTrimModel motion={motion} side="left" />
        <VerticalTrimModel motion={motion} side="right" />
        <TopTrimModel motion={motion} />

        <ContactShadows
          position={[0, -1.72, -0.05]}
          opacity={0.2}
          scale={11}
          blur={2.6}
          far={5}
        />
      </Canvas>
    </div>
  );
}
