/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Space/Asteroid.glb src/components/ 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Asteroid(props) {
  const { nodes, materials } = useGLTF('./models/Space/Asteroid.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Asteroids_Mesh.geometry} material={materials.Asteroids_Mat} />
    </group>
  )
}

useGLTF.preload('./models/Space/Asteroid.glb')
