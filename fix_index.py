
with open(r'd:\Expense Tracker\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the point where corruption starts
# It starts right after IPEC Consulting</a>
corrupt_marker = 'IPEC Consulting</a>'
if corrupt_marker in content:
    parts = content.split(corrupt_marker)
    # We want to keep everything before the last occurrence of the marker (or whichever one is the real footer)
    # Actually, the corruption is usually the LAST part of the file.
    head = content.split(corrupt_marker)[0] + corrupt_marker
    
    # New footer tail and scripts
    new_tail = """
            </div>
        </div>
    </footer>

    <!-- HERO 3D DIGITAL CORE -->
    <script>
        (function () {
            const canvas = document.getElementById('hero-3d-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const getColors = () => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                return {
                    core: isDark ? 0x5B8AF5 : 0x1546C0,
                    shell: isDark ? 0x93B4FF : 0x1546C0,
                    particles: isDark ? 0x5B8AF5 : 0x1546C0
                };
            };
            let col = getColors();

            const core = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshBasicMaterial({ color: col.core, transparent: true, opacity: 0.4 }));
            scene.add(core);

            const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(3.5, 1), new THREE.MeshBasicMaterial({ color: col.shell, wireframe: true, transparent: true, opacity: 0.2 }));
            scene.add(shell);

            const pCount = 150;
            const pGeom = new THREE.BufferGeometry();
            const pPos = new Float32Array(pCount * 3);
            for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random()-0.5)*15;
            pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
            const pMat = new THREE.PointsMaterial({ size: 0.04, color: col.particles, transparent: true, opacity: 0.5 });
            scene.add(new THREE.Points(pGeom, pMat));

            camera.position.z = 8;
            let mx=0, my=0;
            document.addEventListener('mousemove', e => { mx=(e.clientX/window.innerWidth)-0.5; my=(e.clientY/window.innerHeight)-0.5; });

            function anim() {
                requestAnimationFrame(anim);
                const t = performance.now()*0.001;
                shell.rotation.y = t*0.1;
                core.rotation.y = -t*0.2;
                scene.rotation.y += (mx*0.5 - scene.rotation.y)*0.05;
                scene.rotation.x += (my*0.5 - scene.rotation.x)*0.05;
                renderer.render(scene, camera);
            }
            anim();
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        })();
    </script>

    <script>
        (function() {
            const slider = document.querySelector('.hero-slider');
            const slides = document.querySelectorAll('.slider-item');
            if (!slider || !slides.length) return;
            let curr = 0, iv;
            const show = (i) => {
                slides.forEach(s => s.classList.remove('active'));
                curr = (i + slides.length) % slides.length;
                slides[curr].classList.add('active');
            };
            const start = () => { stop(); iv = setInterval(() => show(curr + 1), 5000); };
            const stop = () => clearInterval(iv);
            
            slider.style.pointerEvents = 'auto';
            let sx = 0;
            slider.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); }, {passive:true});
            slider.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - sx;
                if(Math.abs(dx) > 50) show(curr + (dx > 0 ? -1 : 1));
                start();
            }, {passive:true});
            
            slider.addEventListener('mouseenter', stop);
            slider.addEventListener('mouseleave', start);
            start();
        })();
    </script>
</body>
</html>
"""
    with open(r'd:\Expense Tracker\index.html', 'w', encoding='utf-8') as f:
        f.write(head + new_tail)
    print("Fixed.")
else:
    print("Marker not found.")
