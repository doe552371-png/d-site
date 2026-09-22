"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

type DecorModelProps = {
  url: string;
  targetLength: number;
  targetAxis: THREE.Vector3;
  motion: MotionRef;
  startPosition: [number, number, number];
  finalPosition: [number, number, number];
  startRotation: [number, number, number];
  finalRotation?: [number, number, number];
  startAt: number;
  endAt: number;
};

function DecorModel({
  url,
  targetLength,
  targetAxis,
  motion,
  startPosition,
  finalPosition,
  startRotation,
  finalRotation = [0, 0, 0],
  startAt,
  endAt,
}: DecorModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    const sourceAxes = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
    ];
    const dimensions = [size.x, size.y, size.z];
    const longestAxisIndex = dimensions.indexOf(Math.max(...dimensions));
    const sourceAxis = sourceAxes[longestAxisIndex];

    const orientation = new THREE.Quaternion().setFromUnitVectors(
      sourceAxis,
      targetAxis.clone().normalize(),
    );

    clone.quaternion.copy(orientation);

    const scale = targetLength / dimensions[longestAxisIndex];
    clone.scale.setScalar(scale);

    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return clone;
  }, [scene, targetAxis, targetLength]);

  useEffect(() => {
    return () => {
      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
        }
      });
    };
  }, [model]);

  useFrame(() => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const t = THREE.MathUtils.smoothstep(p, startAt, endAt);

    group.current.position.set(
      THREE.MathUtils.lerp(startPosition[0], finalPosition[0], t),
      THREE.MathUtils.lerp(startPosition[1], finalPosition[1], t),
      THREE.MathUtils.lerp(startPosition[2], finalPosition[2], t),
    );

    group.current.rotation.set(
      THREE.MathUtils.lerp(startRotation[0], finalRotation[0], t),
      THREE.MathUtils.lerp(startRotation[1], finalRotation[1], t),
      THREE.MathUtils.lerp(startRotation[2], finalRotation[2], t),
    );
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

function BaseboardModel({ motion }: HeroAssemblySceneProps) {
  return (
    <DecorModel
      url="/models/plintus_glb.glb"
      targetLength={5.2}
      targetAxis={new THREE.Vector3(1, 0, 0)}
      motion={motion}
      startPosition={[-4.7, -2.1, 0.8]}
      finalPosition={[0.2, -1.72, -0.15]}
      startRotation={[0, 0.6, 0.08]}
      finalRotation={[0, 0, 0]}
      startAt={0.04}
      endAt={0.62}
    />
  );
}

function VerticalTrimModel({
  motion,
  side,
}: HeroAssemblySceneProps & { side: "left" | "right" }) {
  const finalX = side === "left" ? 0.22 : 3.14;
  const startX = side === "left" ? -4.8 : 5.5;

  return (
    <DecorModel
      url="/models/molding_glb.glb"
      targetLength={3.9}
      targetAxis={new THREE.Vector3(0, 1, 0)}
      motion={motion}
      startPosition={[startX, 0.8, 0.5]}
      finalPosition={[finalX, 0.1, -0.05]}
      startRotation={[side === "left" ? 0 : 0, side === "left" ? -0.6 : 0.6, -0.12]}
      finalRotation={[0, 0, 0]}
      startAt={0.18}
      endAt={0.78}
    />
  );
}

function TopTrimModel({ motion }: HeroAssemblySceneProps) {
  return (
    <DecorModel
      url="/models/molding_glb.glb"
      targetLength={3.35}
      targetAxis={new THREE.Vector3(1, 0, 0)}
      motion={motion}
      startPosition={[4.8, 4.4, 0.7]}
      finalPosition={[1.68, 3.98, -0.04]}
      startRotation={[0, 0.58, 0.09]}
      finalRotation={[0, 0, 0]}
      startAt={0.34}
      endAt={0.94}
    />
  );
}

function Architecture({ motion: _motion }: HeroAssemblySceneProps) {
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

useGLTF.preload("/models/molding_glb.glb");
useGLTF.preload("/models/plintus_glb.glb");
