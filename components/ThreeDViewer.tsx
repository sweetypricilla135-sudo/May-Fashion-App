
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  MeshDistortMaterial, 
  OrbitControls, 
  Sphere, 
  Float, 
  Box, 
  Torus, 
  Cylinder, 
  ContactShadows, 
  Environment,
  PresentationControls,
  Text,
  MeshWobbleMaterial
} from '@react-three/drei';

interface Props {
  modelType?: string;
  color?: string;
}

const TechArtifact = ({ modelType, color = "#6366f1" }: Props) => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Render different abstract "artifacts" based on product category
  const renderGeometry = () => {
    switch (modelType) {
      case 'footwear':
        return (
          <group rotation={[0, Math.PI / 4, 0]}>
            <Box args={[2, 0.5, 0.8]} position={[0, -0.4, 0]}>
              <MeshDistortMaterial color={color} distort={0.2} speed={2} metalness={0.8} roughness={0.2} />
            </Box>
            <Cylinder args={[0.4, 0.5, 1]} position={[-0.4, 0.2, 0]} rotation={[0, 0, -0.2]}>
              <MeshWobbleMaterial color={color} factor={0.1} speed={1} />
            </Cylinder>
          </group>
        );
      case 'apparel':
      case 'outerwear':
        return (
          <group>
            <Torus args={[0.8, 0.3, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
              <MeshDistortMaterial color={color} distort={0.3} speed={3} metalness={0.9} />
            </Torus>
            <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="white" emissive={color} emissiveIntensity={2} />
            </Sphere>
          </group>
        );
      case 'accessories':
        return (
          <group>
            <Torus args={[0.7, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
              <MeshWobbleMaterial color={color} factor={0.5} speed={2} />
            </Torus>
            <Box args={[0.6, 0.1, 0.6]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={1} roughness={0} />
            </Box>
          </group>
        );
      default:
        return (
          <Sphere args={[1, 100, 200]} scale={1.2}>
            <MeshDistortMaterial color={color} distort={0.4} speed={4} roughness={0} metalness={1} />
          </Sphere>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {renderGeometry()}
      </group>
    </Float>
  );
};

const ThreeDViewer: React.FC<Props> = ({ modelType, color }) => {
  return (
    <div className="w-full h-full relative bg-black/40 overflow-hidden">
      <div className="absolute top-6 left-6 z-10 flex flex-col">
        <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] text-indigo-400 w-fit">
          Quantum Visualization
        </span>
        <span className="mt-2 text-[10px] text-white/40 font-syne uppercase tracking-tighter">
          Type: {modelType || 'Generic'} Artifact
        </span>
      </div>

      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color={color} intensity={0.5} />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <TechArtifact modelType={modelType} color={color} />
          </PresentationControls>
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={false} minDistance={2} maxDistance={6} />
      </Canvas>

      <div className="absolute bottom-6 w-full flex justify-center space-x-4">
        <div className="flex items-center space-x-2 px-3 py-1.5 glass-morphism rounded-full border border-white/5">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
           <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Interact to Scan</span>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewer;
