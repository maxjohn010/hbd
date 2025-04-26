// GSAP animations
gsap.from(".love-heading", { duration: 1.2, y: -60, opacity: 0, ease: "bounce.out" });
gsap.from(".love-message", { duration: 1, delay: 0.4, x: -100, opacity: 0, ease: "power2.out" });
gsap.from(".love-button", { duration: 1, delay: 1, scale: 0, opacity: 0, ease: "back.out(1.7)" });
gsap.from(".card", { duration: 1, opacity: 0, y: 50, stagger: 0.3, delay: 1.5, ease: "power2.out" });

function playMusic() {
  const audio = document.getElementById("bg-music");
  audio.muted = false;
  audio.play();
}

// Buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => {
  const congrats = document.getElementById("congrats");
  congrats.classList.add("congrats-show");

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    heart.style.zIndex = 999;
    heart.style.animation = "floatUp 2s ease-out forwards";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 2000);
  }
});

noBtn.addEventListener("mouseenter", () => {
  const container = document.querySelector(".proposal-buttons");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const randomX = Math.floor(Math.random() * (containerWidth - btnWidth));
  const randomY = Math.floor(Math.random() * (containerHeight - btnHeight));
  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
});

// 3D Hearts
const container = document.getElementById("three-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const heartShape = new THREE.Shape();
heartShape.moveTo(5, 5);
heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
heartShape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
heartShape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
heartShape.bezierCurveTo(16, 7, 16, 0, 10, 0);
heartShape.bezierCurveTo(7, 0, 5, 5, 5, 5);

const geometry = new THREE.ExtrudeGeometry(heartShape, { depth: 2, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 5 });
const material1 = new THREE.MeshBasicMaterial({ color: 0xff5e8e });
const material2 = new THREE.MeshBasicMaterial({ color: 0xff3c6f });

const heart1 = new THREE.Mesh(geometry, material1);
heart1.position.set(-10, -5, 0);
heart1.scale.set(0.05, 0.05, 0.05);
scene.add(heart1);

const heart2 = new THREE.Mesh(geometry, material2);
heart2.position.set(10, -5, 0);
heart2.scale.set(0.05, 0.05, 0.05);
scene.add(heart2);

const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textGeo1 = new THREE.TextGeometry("Godi", { font: font, size: 2, height: 1 });
  const textMesh1 = new THREE.Mesh(textGeo1, textMaterial);
  textMesh1.position.set(-2.5, -0.5, 1.5);
  heart1.add(textMesh1);

  const textGeo2 = new THREE.TextGeometry("Chuza", { font: font, size: 2, height: 1 });
  const textMesh2 = new THREE.Mesh(textGeo2, textMaterial);
  textMesh2.position.set(-3.2, -0.5, 1.5);
  heart2.add(textMesh2);
});

camera.position.z = 30;
function animate() {
  requestAnimationFrame(animate);
  heart1.rotation.y += 0.01;
  heart2.rotation.y -= 0.01;
  renderer.render(scene, camera);
}
animate();