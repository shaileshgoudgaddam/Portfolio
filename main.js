// ----- Three.js basic 3D background -----
const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 35);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x38bdf8, 1.2);
pointLight.position.set(15, 20, 25);
scene.add(pointLight);

// Torus knot
const torusGeometry = new THREE.TorusKnotGeometry(8, 1, 150, 16);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.7,
    roughness: 0.25
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starCount = 600;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
}

starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.9,
    sizeAttenuation: true,
    color: 0x38bdf8,
    opacity: 0.8,
    transparent: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.004;
    torus.rotation.y += 0.006;

    stars.rotation.y += 0.0008;

    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();