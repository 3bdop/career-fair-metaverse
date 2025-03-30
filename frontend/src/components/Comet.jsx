/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Space/Comet.glb 
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export function Comet({ sceneOpacity, ...props }) {
  const { nodes, materials } = useGLTF('./models/Space/Comet.glb')

  const materialRef = useRef();

  useFrame(() => {
    if (materialRef.current) {

      materialRef.current.opacity = sceneOpacity.current;
    }
  });
  return (
    <group {...props} dispose={null}>
      {/* <mesh geometry={nodes.Node.geometry} material={materials.Comet_mat} /> */}
      <mesh geometry={nodes.Node.geometry} >
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/Space/Comet.glb')
