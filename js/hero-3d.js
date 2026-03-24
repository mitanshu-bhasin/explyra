/* 
   EXPLYRA HERO 3D DIGITAL CORE
   Three.js powered interactive background centerpiece
*/

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', () => {
        initHero3D();
    });

    function initHero3D() {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        console.log("Initializing Hero 3D Digital Core...");
        
        const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const saveData = !!connection?.saveData;
        const lowSpec = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        const mobileView = window.innerWidth < 820;

        if (motionReduced) {
            console.log("Hero 3D disabled: prefers-reduced-motion is active.");
            canvas.style.display = 'none';
            return;
        }

        if (saveData && lowSpec) {
             console.log("Hero 3D disabled: Data Saver + Low Spec device detected.");
             canvas.style.display = 'none';
             return;
        }

        const lowQuality = lowSpec || mobileView;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: !lowQuality,
            powerPreference: lowQuality ? 'low-power' : 'high-performance'
        });

        const setRendererSize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowQuality ? 1.25 : 1.8));
        };
        setRendererSize();

        const getColors = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            return {
                core: isDark ? 0x5B8AF5 : 0x1546C0,
                shell: isDark ? 0x93B4FF : 0x1546C0,
                particles: isDark ? 0x5B8AF5 : 0x1546C0
            };
        };

        let colors = getColors();
        const segmentCount = lowQuality ? 20 : 32;

        const coreGeom = new THREE.SphereGeometry(1.2, segmentCount, segmentCount);
        const coreMat = new THREE.MeshBasicMaterial({ color: colors.core, transparent: true, opacity: 0.4 });
        const core = new THREE.Mesh(coreGeom, coreMat);
        scene.add(core);

        const coreGlowGeom = new THREE.SphereGeometry(1.6, segmentCount, segmentCount);
        const coreGlowMat = new THREE.MeshBasicMaterial({ color: colors.core, transparent: true, opacity: 0.15 });
        const coreGlow = new THREE.Mesh(coreGlowGeom, coreGlowMat);
        scene.add(coreGlow);

        const shellGeom = new THREE.IcosahedronGeometry(3.5, lowQuality ? 0 : 1);
        const shellMat = new THREE.MeshBasicMaterial({ color: colors.shell, wireframe: true, transparent: true, opacity: 0.2 });
        const shell = new THREE.Mesh(shellGeom, shellMat);
        scene.add(shell);

        const particlesGeom = new THREE.BufferGeometry();
        const particlesCount = lowQuality ? 70 : 140;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }
        particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: lowQuality ? 0.03 : 0.04,
            color: colors.particles,
            transparent: true,
            opacity: lowQuality ? 0.42 : 0.5
        });
        const particles = new THREE.Points(particlesGeom, particlesMat);
        scene.add(particles);

        camera.position.z = 8;

        let mouseX = 0, mouseY = 0;
        if (window.matchMedia('(pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) - 0.5;
                mouseY = (e.clientY / window.innerHeight) - 0.5;
            }, { passive: true });
        }

        const themeObserver = new MutationObserver(() => {
            const newColors = getColors();
            coreMat.color.set(newColors.core);
            coreGlowMat.color.set(newColors.core);
            shellMat.color.set(newColors.shell);
            particlesMat.color.set(newColors.particles);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        const heroSection = canvas.closest('.hero');
        let heroVisible = true, tabVisible = !document.hidden, rafId = null;
        const startTime = performance.now();

        const renderLoop = () => {
            if (!heroVisible || !tabVisible) { rafId = null; return; }
            const elapsed = (performance.now() - startTime) / 1000;
            
            shell.rotation.y = elapsed * 0.1;
            shell.rotation.x = elapsed * 0.05;
            core.rotation.y = -elapsed * 0.2;
            
            const pulse = 1 + Math.sin(elapsed * 2) * 0.05;
            core.scale.set(pulse, pulse, pulse);
            coreGlow.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
            particles.rotation.y = elapsed * 0.05;

            scene.rotation.y += (mouseX * 0.5 - scene.rotation.y) * 0.05;
            scene.rotation.x += (mouseY * 0.5 - scene.rotation.x) * 0.05;
            
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(renderLoop);
        };

        const ensureLoop = () => {
            if (!rafId && heroVisible && tabVisible) rafId = requestAnimationFrame(renderLoop);
        };

        if (heroSection) {
            const io = new IntersectionObserver((entries) => {
                heroVisible = entries[0]?.isIntersecting ?? true;
                ensureLoop();
            }, { threshold: 0.01 });
            io.observe(heroSection);
        }

        document.addEventListener('visibilitychange', () => {
            tabVisible = !document.hidden;
            ensureLoop();
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            setRendererSize();
        });

        ensureLoop();
    }
})();
