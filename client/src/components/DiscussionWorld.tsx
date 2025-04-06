//@ts-nocheck
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text,
  useAnimations,
  useGLTF,
  Sky,
  Html,
  Loader,
  RoundedBox,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Users,
  MessageSquare,
  BarChart,
  Clock,
  Hand,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";

// Character model that uses a simple avatar with animated gestures
function Character({
  position,
  name,
  color,
  isActive = true,
  isHandRaised = false,
}) {
  const group = useRef();

  // Adding slight animation
  useFrame((state) => {
    if (group?.current) {
      // Breathing animation
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      // Subtle swaying
      if (isActive) {
        group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
      }
    }
  });
  return (
    <group ref={group} position={position}>
      {/* Character body */}
      <group>
        {/* Head */}
        <mesh castShadow>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>

        {/* Arms */}
        <group>
          {/* Left Arm */}
          <mesh
            position={[-0.3, -0.4, 0]}
            rotation={[0, 0, isHandRaised ? -Math.PI / 1.2 : -Math.PI / 8]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>

          {/* Right Arm */}
          <mesh
            position={[0.3, -0.4, 0]}
            rotation={[0, 0, isHandRaised ? Math.PI / 1.2 : Math.PI / 8]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
        </group>

        {/* Legs */}
        <group position={[0, -0.9, 0]}>
          {/* Left Leg */}
          <mesh
            position={[-0.15, -0.3, 0]}
            rotation={[0, 0, Math.PI / 20]}
            castShadow
          >
            <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>

          {/* Right Leg */}
          <mesh
            position={[0.15, -0.3, 0]}
            rotation={[0, 0, -Math.PI / 20]}
            castShadow
          >
            <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Status indicators */}
      {isActive && (
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Name tag with better visibility */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
        font="/fonts/Inter-Bold.woff"
        maxWidth={2}
      >
        {name}
      </Text>

      {/* Hand raise indicator */}
      {isHandRaised && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}

// Create a modern meeting table
function MeetingTable() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Glass table top */}
      <mesh
        receiveShadow
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[3, 3, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#e2e8f0"
          roughness={0.1}
          metalness={0.2}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>

      {/* Table edge */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.9, 3, 32]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Central logo/design */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Table base - center column */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 1.2, 16]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Table foot */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.0, 0.2, 32]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Modern room environment with floor and subtle decor
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Decorative elements - light pillars */}
      {[-10, 10].map((x, i) => (
        <group key={i} position={[x, -2, -10]}>
          <mesh position={[0, 3, 0]}>
            <boxGeometry args={[0.5, 6, 0.5]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Ambient room boxes */}
      {[
        [-8, -5],
        [8, -5],
        [-8, 5],
        [8, 5],
      ].map((pos, i) => (
        <RoundedBox
          key={i}
          position={[pos[0], -1, pos[1]]}
          args={[1, 1, 1]}
          radius={0.1}
        >
          <meshStandardMaterial color={i % 2 === 0 ? "#c4b5fd" : "#a78bfa"} />
        </RoundedBox>
      ))}
    </group>
  );
}

// Scene with lighting and environment setup
function Scene({ participants, isRaiseHand }) {
  const { camera } = useThree();

  // Set initial camera position
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[0, 8, 0]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />

      {/* Sky and environment */}
      <Sky sunPosition={[100, 10, 100]} />
      <Environment preset="city" />

      {/* Room elements */}
      <Room />
      <MeetingTable />

      {/* Participants */}
      {participants.map((participant) => (
        <Character
          key={participant.id}
          position={participant.position}
          name={participant.name}
          color={participant.color}
          isActive={participant.isActive}
          isHandRaised={participant.id === 1 && isRaiseHand}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 6}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={6}
        maxDistance={12}
      />
    </>
  );
}

// Main Discussion World component
export default function DiscussionWorld() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState(false);

  const participants = [
    {
      id: 1,
      name: "John Doe",
      role: "Candidate",
      position: [0, 0, -2.5],
      color: "#4F46E5",
      isActive: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Lead",
      position: [2.2, 0, -1.3],
      color: "#7C3AED",
      isActive: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "CTO",
      position: [2.2, 0, 1.3],
      color: "#9333EA",
      isActive: true,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "HR Manager",
      position: [0, 0, 2.5],
      color: "#6366F1",
      isActive: true,
    },
    {
      id: 5,
      name: "David Kim",
      role: "Candidate",
      position: [-2.2, 0, 1.3],
      color: "#8B5CF6",
      isActive: true,
    },
    {
      id: 6,
      name: "You",
      position: [-2.2, 0, -1.3],
      color: "#EC4899",
      isActive: true,
    },
  ];

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Group Discussion
            </h1>
            <p className="text-gray-600">Technical Problem Solving Session</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">45:23</span>
            </div>
            <Link to="/analysis">
              <Button>
                <BarChart className="mr-2 h-5 w-5" /> Analyze Discussion
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Discussion Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            {/* 3D Discussion World with loading state */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
              <Canvas
                shadows
                camera={{
                  position: [0, 5, 10],
                  fov: 45,
                  near: 0.1,
                  far: 1000,
                }}
              >
                <Suspense fallback={null}>
                  <Scene
                    participants={participants}
                    isRaiseHand={isRaiseHand}
                  />
                </Suspense>
              </Canvas>
              <Loader />
            </div>

            {/* Control Bar */}
            <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 flex flex-wrap justify-center md:justify-between items-center">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant={isRaiseHand ? "default" : "secondary"}
                  size="icon"
                  onClick={() => setIsRaiseHand(!isRaiseHand)}
                >
                  <Hand
                    className={`h-5 w-5 ${isRaiseHand ? "text-white" : ""}`}
                  />
                </Button>
                <Button variant="secondary" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="destructive" size="sm">
                Leave Room
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-indigo-600" />
                  Participants (5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.slice(0, 5).map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                            style={{
                              backgroundColor: participant.color + "33",
                            }}
                          >
                            <Users
                              className="h-4 w-4"
                              style={{ color: participant.color }}
                            />
                          </div>
                          {participant.isActive && (
                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {participant.role}
                          </p>
                        </div>
                      </div>
                      {participant.id === 1 && isRaiseHand && (
                        <div className="h-5 w-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <Hand className="h-3 w-3 text-amber-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-indigo-600" />
                  Discussion Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    System Design Challenge
                  </h3>
                  <p className="text-sm text-gray-600">
                    Design a scalable microservice architecture for an
                    e-commerce platform that can handle high traffic during
                    sales events.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Key Points to Address:
                    </h4>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Database selection and data modeling</li>
                      <li>API design and service boundaries</li>
                      <li>Scaling strategies and load balancing</li>
                      <li>Fault tolerance and redundancy</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/analysis">
                    <Button variant="outline" className="w-full">
                      <BarChart className="mr-2 h-5 w-5" /> View Analysis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
