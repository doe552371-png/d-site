"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  useMemo,
  useRef,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";

type MotionRef = MutableRefObject<{ progress: number }>;

type PointerState = {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  active: boolean;
};

type HeroAssemblySceneProps = {
  motion: MotionRef;
};

type DecorModelProps = {
  url: string;
  targetLength: number;
  targetAxis: THREE.Vector3;
  motion: MotionRef;
  pointer: MutableRefObject<PointerState>;
  interactionStrength: number;
  startPosition: [number, number, number];
  finalPosition: [number, number, number];
  startRotation: [number, number, number];
  finalRotation?: [number, number, number];
  startAt: number;
  endAt: number;
};

function updatePointerState(
  pointer: MutableRefObject<PointerState>,
  x: number,
  y: number,
) {
  const dx = x - pointer.current.targetX;
  const dy = y - pointer.current.targetY;

  pointer.current.velocityX = THREE.MathUtils.lerp(
    pointer.current.velocityX,
    dx,
    0.35,
  );
  pointer.current.velocityY = THREE.MathUtils.lerp(
    pointer.current.velocityY,
    dy,
    0.35,
  );
  pointer.current.targetX = x;
  pointer.current.targetY = y;
  pointer.current.active = true;
}

function PointerDriver({
  pointer,
}: {
  pointer: MutableRefObject<PointerState>;
}) {
  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 7);
    const velocityDamping = 1 - Math.exp(-delta * 8);

    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      pointer.current.targetX,
      damping,
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      pointer.current.targetY,
      damping,
    );

    pointer.current.velocityX = THREE.MathUtils.lerp(
      pointer.current.velocityX,
      0,
      velocityDamping,
    );
    pointer.current.velocityY = THREE.MathUtils.lerp(
      pointer.current.velocityY,
      0,
      velocityDamping,
    );

    if (!pointer.current.active) {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
    }
  });

  return null;
}

function CameraRig({
  motion,
  pointer,
}: HeroAssemblySceneProps & {
  pointer: MutableRefObject<PointerState>;
}) {
  useFrame(({ camera }) => {
    const progress = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const strength = THREE.MathUtils.smoothstep(progress, 0.2, 0.72);
    const targetX = pointer.current.x * 0.16 * strength;
    const targetY = pointer.current.y * 0.1 * strength;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.4 + targetX, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.65 + targetY, 0.045);
  });

  return null;
}

function DecorModel({
  url,
  targetLength,
  targetAxis,
  motion,
  pointer,
  interactionStrength,
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

    clone.quaternion.copy(
      new THREE.Quaternion().setFromUnitVectors(
        sourceAxis,
        targetAxis.clone().normalize(),
      ),
    );

    clone.scale.setScalar(targetLength / dimensions[longestAxisIndex]);

    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return clone;
  }, [scene, targetAxis, targetLength]);

  useFrame(() => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(motion.current.progress, 0, 1);
    const t = THREE.MathUtils.smoothstep(p, startAt, endAt);
    const interaction = THREE.MathUtils.smoothstep(p, 0.35, 0.8);
    const pointerX =
      (pointer.current.x + pointer.current.velocityX * 0.55) *
      interactionStrength *
      interaction;
    const pointerY =
      (pointer.current.y + pointer.current.velocityY * 0.55) *
      interactionStrength *
      interaction;

    group.current.position.set(
      THREE.MathUtils.lerp(startPosition[0], finalPosition[0], t) +
        pointerX,
      THREE.MathUtils.lerp(startPosition[1], finalPosition[1], t) -
        pointerY,
      THREE.MathUtils.lerp(startPosition[2], finalPosition[2], t),
    );

    group.current.rotation.set(
      THREE.MathUtils.lerp(startRotation[0], finalRotation[0], t) -
        pointerY * 0.018,
      THREE.MathUtils.lerp(startRotation[1], finalRotation[1], t) +
        pointerX * 0.018,
      THREE.MathUtils.lerp(startRotation[2], finalRotation[2], t),
    );
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

function BaseboardModel({
  motion,
  pointer,
}: HeroAssemblySceneProps & { pointer: MutableRefObject<PointerState> }) {
  return (
    <DecorModel
      url="/models/plintus_glb.glb"
      targetLength={5.2}
      targetAxis={new THREE.Vector3(1, 0, 0)}
      motion={motion}
      pointer={pointer}
      interactionStrength={0.22}
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
  pointer,
  side,
}: HeroAssemblySceneProps & {
  pointer: MutableRefObject<PointerState>;
  side: "left" | "right";
}) {
  const finalX = side === "left" ? 0.22 : 3.14;
  const startX = side === "left" ? -4.8 : 5.5;

  return (
    <DecorModel
      url="/models/molding_glb.glb"
      targetLength={3.9}
      targetAxis={new THREE.Vector3(0, 1, 0)}
      motion={motion}
      pointer={pointer}
      interactionStrength={0.16}
      startPosition={[startX, 0.8, 0.5]}
      finalPosition={[finalX, 0.1, -0.05]}
      startRotation={[-0.12, side === "left" ? -0.6 : 0.6, 0]}
      finalRotation={[0, 0, 0]}
      startAt={0.18}
      endAt={0.78}
    />
  );
}

function TopTrimModel({
  motion,
  pointer,
}: HeroAssemblySceneProps & { pointer: MutableRefObject<PointerState> }) {
  return (
    <DecorModel
      url="/models/molding_glb.glb"
      targetLength={3.35}
      targetAxis={new THREE.Vector3(1, 0, 0)}
      motion={motion}
      pointer={pointer}
      interactionStrength={0.26}
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
  const opening = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#111111",
        roughness: 0.7,
        metalness: 0,
      }),
    [],
  );

  return (
    <>
      <mesh position={[1.68, 0.7, -0.55]} castShadow receiveShadow>
        <boxGeometry args={[7.6, 6.8, 0.28]} />
        <meshPhysicalMaterial color="#F7F7F5" roughness={0.82} />
      </mesh>

      <mesh
        position={[0.04, -1.75, -0.48]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
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
  const pointer = useRef<PointerState>({
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    active: false,
  });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    updatePointerState(pointer, x, y);
  };

  const handlePointerLeave = () => {
    pointer.current.active = false;
    pointer.current.targetX = 0;
    pointer.current.targetY = 0;
  };

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
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
        <PointerDriver pointer={pointer} />
        <CameraRig motion={motion} pointer={pointer} />

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
        <BaseboardModel motion={motion} pointer={pointer} />
        <VerticalTrimModel motion={motion} pointer={pointer} side="left" />
        <VerticalTrimModel motion={motion} pointer={pointer} side="right" />
        <TopTrimModel motion={motion} pointer={pointer} />

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
