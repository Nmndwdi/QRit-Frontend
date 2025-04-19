import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import qrImage from '../../../assets/qr.png'

export default function QrTile() {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, qrImage)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[3, 3, 0.15]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
