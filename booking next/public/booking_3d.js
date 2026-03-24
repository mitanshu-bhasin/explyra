/**
 * Booking 3D Background - Explyra Suite
 * Adapted from the main Explyra digital core
 */

(function () {
    const canvas = document.getElementById('booking-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!connection?.saveData;
    const lowSpec = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const mobileView = window.innerWidth < 820;
    const disableScene = motionReduced || saveData;
    
    if (disableScene) {
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
        // Safe check for data-theme, default to dark if not found (matching Explyra's premium look)
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        return {
            core: isDark ? 0x5B8AF5 : 0x1546C0,
            shell: isDark ? 0x93B4FF : 0x1546C0,
            particles: isDark ? 0x5B8AF5 : 0x1546C0
        };
    };

    let colors = getColors();
    const segmentCount = lowQuality ? 20 : 32;

    // Core
    const coreGeom = new THREE.SphereGeometry(1.2, segmentCount, segmentCount);
    const coreMat = new THREE.MeshBasicMaterial({ color: colors.core, transparent: true, opacity: 0.4 });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    // Glow
    const coreGlowGeom = new THREE.SphereGeometry(1.6, segmentCount, segmentCount);
    const coreGlowMat = new THREE.MeshBasicMaterial({ color: colors.core, transparent: true, opacity: 0.15 });
    const coreGlow = new THREE.Mesh(coreGlowGeom, coreGlowMat);
    scene.add(coreGlow);

    // Shell
    const shellGeom = new THREE.IcosahedronGeometry(3.5, lowQuality ? 0 : 1);
    const shellMat = new THREE.MeshBasicMaterial({ color: colors.shell, wireframe: true, transparent: true, opacity: 0.2 });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    scene.add(shell);

    // Particles
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

    let mouseX = 0;
    let mouseY = 0;
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        }, { passive: true });
    }

    const themeObserver = new MutationObserver(() => {
        colors = getColors();
        coreMat.color.set(colors.core);
        coreGlowMat.color.set(colors.core);
        shellMat.color.set(colors.shell);
        particlesMat.color.set(colors.particles);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let rafId = null;
    const startTime = performance.now();

    const renderLoop = () => {
        const elapsedTime = (performance.now() - startTime) / 1000;
        
        shell.rotation.y = elapsedTime * 0.1;
        shell.rotation.x = elapsedTime * 0.05;

        core.rotation.y = -elapsedTime * 0.2;
        const pulse = 1 + Math.sin(elapsedTime * 2) * 0.05;
        core.scale.set(pulse, pulse, pulse);
        coreGlow.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);

        particles.rotation.y = elapsedTime * 0.05;

        scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.05;
        scene.rotation.x += (mouseY * 0.3 - scene.rotation.x) * 0.05;
        
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        setRendererSize();
    });

    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
        themeObserver.disconnect();
        renderer.dispose();
        coreGeom.dispose();
        coreGlowGeom.dispose();
        shellGeom.dispose();
        particlesGeom.dispose();
        coreMat.dispose();
        coreGlowMat.dispose();
        shellMat.dispose();
        particlesMat.dispose();
    });
})();
