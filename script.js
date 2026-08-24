document.addEventListener("DOMContentLoaded", () => {
    /* =====================
       STARRY BACKGROUND (Vanilla JS)
    ===================== */
    function initVanillaStars() {
        const canvas = document.createElement("canvas");
        canvas.id = "vanillaStars";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-2";
        canvas.style.pointerEvents = "none";
        canvas.style.background = "#000511"; // Cocokkan dengan warna overlay transisi
        document.body.prepend(canvas);

        const ctx = canvas.getContext("2d");
        let width, height;
        let stars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function initStars() {
            stars = [];
            const numStars = Math.floor((width * height) / 1000); 
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.2,
                    speed: Math.random() * 0.05
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#ffffff";
            
            for (let i = 0; i < stars.length; i++) {
                let star = stars[i];
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() * star.speed * 0.02));
                ctx.fill();

                star.y -= star.speed * 4; 
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            }
            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        }

        window.addEventListener("resize", resize);
        resize();
        draw();
    }
    
    // Inisialisasi background luar angkasa
    initVanillaStars();

    /* =====================
       ANIMASI NAVBAR & SCROLL
    ===================== */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
        
        // WhatsApp Floating Button (selalu tampil)
    });

    // Inisialisasi AOS (masih bisa dipertahankan sebagai fallback/pelengkap)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Dipercepat
            offset: 50,    // Muncul lebih cepat saat di-scroll
            once: true,    // Hanya animasi sekali (lebih ringan)
            easing: 'ease-in-out'
        });
    }

    /* =====================
       ANIMASI ANIME.JS
    ===================== */
    // Animasi Navbar Item
    if (typeof anime !== 'undefined') {
        // Animasi Navbar Item
        anime({
            targets: '.navbar-nav .nav-item',
            translateY: [-20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, {start: 300}),
            easing: 'easeOutExpo',
            duration: 800
        });

        // Animasi Teks Hero atau Judul Utama
        anime({
            targets: 'main h2:not(.mb-4), main h3:not(.mb-4)',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(200, {start: 500}),
            easing: 'easeOutSine',
            duration: 800
        });

        // Animasi Kartu (Piramida / Divisi)
        const cards = document.querySelectorAll('.piramida-card, .divisi-card, .visi-box, .misi-box');
        if (cards.length > 0) {
            anime({
                targets: cards,
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(150, {start: 600}),
                easing: 'easeOutElastic(1, .8)',
                duration: 1200
            });
            
            // Hover animation with AnimeJS
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    anime({
                        targets: card,
                        translateY: -8,
                        scale: 1.02,
                        boxShadow: '0 15px 30px rgba(41, 141, 255, 0.4)',
                        duration: 400,
                        easing: 'easeOutExpo'
                    });
                });
                card.addEventListener('mouseleave', () => {
                    anime({
                        targets: card,
                        translateY: 0,
                        scale: 1,
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.4)',
                        duration: 400,
                        easing: 'easeOutExpo'
                    });
                });
            });
        }

        // Floating & Entrance animation untuk Logo HIMASI (Selain navbar)
        const logoElements = document.querySelectorAll('main img[alt="Logo HIMASI"]');
        if (logoElements.length > 0) {
            anime.timeline()
            .add({
                targets: logoElements,
                rotateY: [-360, 0], // Coin flip 1x
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 2200, // Diperlambat
                delay: 600, // Tunggu efek fade-in layar selesai
                easing: 'easeOutQuart' // Lebih smooth tidak terlalu kencang di awal
            })
            .add({
                targets: logoElements,
                translateY: [-10, 10],
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine',
                duration: 2500
            }, '-=500'); // Mulai float sebelum flip benar-benar selesai
        }

        // Floating animation untuk Foto Ketua
        const fotoKetua = document.querySelectorAll('.foto-ketua');
        if (fotoKetua.length > 0) {
            anime({
                targets: fotoKetua,
                translateY: [-10, 10],
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine',
                duration: 2500
            });
        }

        // Animasi untuk QR Code PMB di footer
        const qrContainer = document.querySelector('.qr-pmb-container');
        if (qrContainer) {
            // Animasi masuk (entrance)
            anime.timeline()
            .add({
                targets: '.qr-pmb-container',
                translateY: [50, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: 800
            })
            .add({
                targets: '.qr-pmb-img',
                scale: [0.8, 1],
                opacity: [0, 1],
                rotateZ: [-5, 5, 0],
                easing: 'easeOutElastic(1, .8)',
                duration: 1500
            }, '-=800')
            .add({
                targets: ['.qr-text-top', '.qr-text-bottom'],
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(200),
                easing: 'easeOutQuad',
                duration: 800
            }, '-=1200');

            // Floating animation looping untuk gambar QR
            anime({
                targets: '.qr-pmb-img',
                translateY: [-8, 8],
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine',
                duration: 2000
            });

            // Efek hover untuk QR Code
            const qrImg = document.querySelector('.qr-pmb-img');
            qrImg.addEventListener('mouseenter', () => {
                anime({
                    targets: qrImg,
                    scale: 1.1,
                    rotateZ: 5,
                    boxShadow: '0 12px 25px rgba(41, 141, 255, 0.6)',
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            });
            qrImg.addEventListener('mouseleave', () => {
                anime({
                    targets: qrImg,
                    scale: 1,
                    rotateZ: 0,
                    boxShadow: '0 8px 20px rgba(41, 141, 255, 0.4)',
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            });
        }
    }

    /* =====================
       TRANSISI HALAMAN SMOOTH (Overlay)
    ===================== */
    // Jalankan saat halaman selesai dimuat atau di-restore dari cache
    window.addEventListener("pageshow", function () {
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-loaded');
    });

    document.querySelectorAll('a.nav-link, .navbar-brand').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Jangan intercept link yang membuka tab baru atau hash link
            if (!href || href === '#' || href.startsWith('http') || this.getAttribute('target') === '_blank') return;
            
            e.preventDefault();
            document.body.classList.remove('page-loaded');
            document.body.classList.add('page-leaving');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Waktu yang sama dengan transition CSS
        });
    });

    /* =====================
       GLOBE 3D (Beranda Only)
    ===================== */
    const canvas = document.getElementById("globeCanvas");
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4.2;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        scene.add(new THREE.AmbientLight(0xffffff, 0.8));

        const pointLight = new THREE.PointLight(0x298dff, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // 1. Core Sphere (Inner solid to hide back lines slightly for 3D depth)
        const coreGeometry = new THREE.SphereGeometry(1.23, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x000511, 
            emissive: 0x000511, 
            transparent: true,
            opacity: 0.9,
            depthWrite: false
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        globeGroup.add(core);

        // 2. Globe Grid (Jaringan Logo HIMASI)
        const gridGroup = new THREE.Group();
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x298dff, 
            transparent: true, 
            opacity: 1.0 
        });

        const radius = 1.25;

        // Longitudes (Garis Vertikal Pembelah)
        for (let i = 0; i < 12; i++) {
            const points = [];
            for (let j = 0; j <= 64; j++) {
                const theta = (j / 64) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(theta)*radius, Math.sin(theta)*radius, 0));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const circle = new THREE.Line(geometry, lineMaterial);
            circle.rotation.y = (i / 12) * Math.PI;
            gridGroup.add(circle);
        }

        // Latitudes (Garis Horizontal Pembelah)
        for (let i = -5; i <= 5; i++) {
            const phi = (i / 6) * (Math.PI / 2); 
            const r = radius * Math.cos(phi);
            const y = radius * Math.sin(phi);
            
            const points = [];
            for (let j = 0; j <= 64; j++) {
                const theta = (j / 64) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(theta)*r, 0, Math.sin(theta)*r));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const circle = new THREE.Line(geometry, lineMaterial);
            circle.position.y = y;
            gridGroup.add(circle);
        }

        globeGroup.add(gridGroup);

        // 3. Glowing Orbital Rings
        const ringGeometry = new THREE.TorusGeometry(1.6, 0.005, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x298dff,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        globeGroup.add(ring1);

        const ring2 = ring1.clone();
        ring2.rotation.y = Math.PI / 2;
        globeGroup.add(ring2);

        globeGroup.rotation.x = Math.PI / 6; 
        globeGroup.rotation.z = Math.PI / 8; 

        function animateGlobe() {
            requestAnimationFrame(animateGlobe);
            globeGroup.rotation.y += 0.002;
            ring1.rotation.z += 0.003;
            ring2.rotation.x += 0.002;
            renderer.render(scene, camera);
        }

        animateGlobe();

        window.addEventListener("resize", () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }

    /* =====================
       ITYPED & VANTA (Beranda Only)
    ===================== */
    const itypedElement = document.getElementById('ityped');
    if (itypedElement && typeof ityped !== 'undefined') {
        ityped.init('#ityped', {
            strings: [
                'Selamat Datang',
                'Horas',
                'Salamaik Datang',
                'Sugeng Rawuh',
                'Wilujeng Sumping'
            ],
            loop: true,
            typeSpeed: 120,
            backSpeed: 60,
            backDelay: 1500,
            showCursor: true,
            cursorChar: '_'
        });
    }


});

// Scroll To Top Global Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
