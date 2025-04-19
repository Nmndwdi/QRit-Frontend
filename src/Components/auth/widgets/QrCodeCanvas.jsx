import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import QrTile from './QrTile'

export default function QRCodeCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <QrTile />
      <OrbitControls enablePan={false} />
      <Environment files="/textures/venice_sunset_1k.hdr" background />
      
    </Canvas>
  )
}