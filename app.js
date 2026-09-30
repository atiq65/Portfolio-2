// Custom Glowing Cursor Script
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Mobile Responsive Menu Toggle Script
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Three.js 3D Background Animation Script
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Create 3D Wireframe Shape (Icosahedron)
const geometry = new THREE.IcosahedronGeometry(2, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.9
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x4facfe, 4);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse Parallax Trackers
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 250;
    mouseY = (event.clientY - window.innerHeight / 2) / 250;
});

// Render & Animation Loop 
function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX;
    targetY = mouseY;
    mesh.rotation.y += 0.05 * (targetX - mesh.rotation.y);
    mesh.rotation.x += 0.05 * (targetY - mesh.rotation.x);
    mesh.rotation.z += 0.003;

    renderer.render(scene, camera);
}

animate();

// Window Resize Listener for Canvas Responsive fix
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});