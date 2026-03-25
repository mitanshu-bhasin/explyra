"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Booking3DProps {
  isDark?: boolean;
}

export default function Booking3D({ isDark = false }: Booking3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const shellMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const particlesMatRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Colors
    const getColors = (dark: boolean) => ({
      core: dark ? 0x5B8AF5 : 0x1546C0,
      shell: dark ? 0x93B4FF : 0x1546C0,
      particles: dark ? 0x5B8AF5 : 0x1546C0,
    });

    let currentColors = getColors(isDark);

    // Core
    const coreGeom = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: currentColors.core,
      transparent: true,
      opacity: isDark ? 0.3 : 0.15,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);
    coreMatRef.current = coreMat;

    // Shell
    const shellGeom = new THREE.IcosahedronGeometry(3.5, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: currentColors.shell,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.15 : 0.1,
    });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    scene.add(shell);
    shellMatRef.current = shellMat;

    // Particles
    const particlesGeom = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: currentColors.particles,
      transparent: true,
      opacity: isDark ? 0.5 : 0.3,
    });
    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);
    particlesMatRef.current = particlesMat;

    camera.position.z = 8;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const animate = () => {
      const time = performance.now() * 0.0005;

      shell.rotation.y = time * 0.1;
      shell.rotation.x = time * 0.05;

      core.rotation.y = -time * 0.2;
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      core.scale.set(pulse, pulse, pulse);

      particles.rotation.y = time * 0.05;

      scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.05;
      scene.rotation.x += (mouseY * 0.3 - scene.rotation.x) * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeom.dispose();
      shellGeom.dispose();
      particlesGeom.dispose();
      coreMat.dispose();
      shellMat.dispose();
      particlesMat.dispose();
    };
  }, []);

  // Sync theme
  useEffect(() => {
    if (!coreMatRef.current || !shellMatRef.current || !particlesMatRef.current) return;
    
    const colors = {
      core: isDark ? 0x5B8AF5 : 0x1546C0,
      shell: isDark ? 0x93B4FF : 0x1546C0,
      particles: isDark ? 0x5B8AF5 : 0x1546C0,
    };

    coreMatRef.current.color.set(colors.core);
    coreMatRef.current.opacity = isDark ? 0.3 : 0.15;
    
    shellMatRef.current.color.set(colors.shell);
    shellMatRef.current.opacity = isDark ? 0.15 : 0.1;

    particlesMatRef.current.color.set(colors.particles);
    particlesMatRef.current.opacity = isDark ? 0.5 : 0.3;
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-40 transition-opacity duration-1000"
    />
  );
}
