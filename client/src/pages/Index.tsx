"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Calendar, 
  Users, 
  BarChart, 
  Bot, 
  CheckCircle,
  Upload,
  Briefcase,
  Sparkle
} from "lucide-react";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
// import { useUserData } from "@/hooks/useUserData";

// 3D Scene Components
function AnimatedBox({
  initialPosition,
}: {
  initialPosition: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(...initialPosition)
  );
  const currentPosition = useRef(new THREE.Vector3(...initialPosition));

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current);
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
      setTargetPosition(newPosition);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1);
      meshRef.current.position.copy(currentPosition.current);
    }
  });

  // Using more vibrant colors for better visibility on light background
  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4338ca" opacity={0.7} transparent />
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(1, 1, 1)]}
        />
        <lineBasicMaterial attach="material" color="#312e81" linewidth={3} />
      </lineSegments>
    </mesh>
  );
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ];

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.6}
        sectionSize={3}
        sectionThickness={1.2}
        sectionColor={[0.2, 0.2, 0.7] as any}
        cellColor={[0.4, 0.4, 0.8] as any}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  );
}

export default function Index() {
  const navigate = useNavigate();
  // const { user } = useUserData();
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);

  // Animation variants
  const heroTextVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgb(99 102 241 / 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const logoPillVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <Layout>
      {/* Hero Section with 3D background */}
      <section className="relative h-[calc(100vh-150px)] overflow-hidden">
        {/* 3D background canvas */}
        <div className="absolute inset-0 opacity-30">
          <Canvas
            shadows
            camera={{ position: [30, 20, 30], fov: 20 }}
            className="absolute inset-0"
          >
            <Scene />
          </Canvas>
        </div>

        {/* Gradient overlay */}
        {/* Gradient overlay */}
{/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-90 z-0"></div> */}
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300/20 backdrop-blur-sm z-10"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 30,
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-4xl px-6">
          {/* Logo Pill */}
          <motion.div
            className="inline-block bg-indigo-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-indigo-500/30 mb-12 shadow-lg"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={logoPillVariants}
          >
            <div className="flex justify-center items-center gap-2">
              <Sparkle className="text-indigo-600" />
              <motion.span
                className="text-2xl font-bold text-indigo-600"
                whileHover={{
                  textShadow: "0px 0px 8px rgba(99, 102, 241, 0.7)",
                }}
              >
                नियुक्ति
              </motion.span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
            initial="initial"
            animate="animate"
            variants={heroTextVariants}
          >
            AI-Powered Recruitment Automation
          </motion.h1>
          
          <motion.p
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={heroTextVariants}
            transition={{ delay: 0.3 }}
          >
            Summarize JDs, match CVs, schedule interviews — all in one flow.
          </motion.p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onHoverStart={() => setIsHoveredPrimary(true)}
              onHoverEnd={() => setIsHoveredPrimary(false)}
            >
              <Link to="/upload">
                <Button size="lg" className="text-md px-8 py-6 rounded-lg relative overflow-hidden">
                  <motion.span className="relative z-10 flex items-center">
                    <Upload className="mr-2 h-5 w-5" /> Upload Resume
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-indigo-600/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isHoveredPrimary
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              transition={{ delay: 0.7 }}
              onHoverStart={() => setIsHoveredSecondary(true)}
              onHoverEnd={() => setIsHoveredSecondary(false)}
            >
              <Button size="lg" variant="outline" className="text-md px-8 py-6 rounded-lg relative overflow-hidden">
                <motion.span className="relative z-10">Try Demo</motion.span>
                <motion.div
                  className="absolute inset-0 bg-indigo-500/10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isHoveredSecondary
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Streamline Your Hiring Process
            </motion.h2>
            <motion.p 
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our AI-powered platform automates every step of the recruitment process
            </motion.p>
          </div>
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="JD Summarization"
              description="Instantly generate concise summaries of job descriptions to identify key requirements and qualifications."
            />
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="CV Parsing"
              description="Extract structured data from resumes to quickly analyze candidate qualifications and experience."
            />
            <FeatureCard
              icon={<Bot className="h-6 w-6" />}
              title="AI Matching"
              description="Use advanced algorithms to match candidates to job requirements with precision and accuracy."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Auto-Scheduling"
              description="Automatically schedule interviews based on candidate and interviewer availability."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Virtual Group Discussions"
              description="Conduct and analyze virtual group discussions to assess team dynamics and collaboration skills."
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6" />}
              title="Comprehensive Analysis"
              description="Get detailed analytics on candidate performance across multiple criteria to make informed decisions."
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-200/20"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 500,
                opacity: 0.1,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our platform simplifies every step of the recruitment process
            </motion.p>
          </div>
          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">1. Upload</h3>
              <p className="mt-2 text-base text-gray-500">Upload resume and job description for analysis</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">2. Edit & Match</h3>
              <p className="mt-2 text-base text-gray-500">View and edit parsed data before matching</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">3. Schedule</h3>
              <p className="mt-2 text-base text-gray-500">Automatically schedule interviews with candidates</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">4. Analyze</h3>
              <p className="mt-2 text-base text-gray-500">Get comprehensive analysis and make informed decisions</p>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/upload">
              <Button size="lg" className="text-md px-8 py-6 rounded-lg">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to transform your hiring process?
            </motion.h2>
            <motion.p 
              className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of companies using HireFlow to streamline their recruitment
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/upload">
                <Button size="lg" variant="secondary" className="text-md px-8 py-6 rounded-lg">
                  <Briefcase className="mr-2 h-5 w-5" /> Start Hiring Smarter
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}