import * as THREE from "three";
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

// Add renderer for rendering the assets
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to the html body
document.body.appendChild(renderer.domElement);

// Resize the rendering and camera as per window's width and height
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
});

// Getting scene and camera
const scene  = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0.01, 5) // x, y, and z

// Orbit for mouse control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update()

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionaltLight = new THREE.DirectionalLight(0xffffff, 1.8);
const pointLight = new THREE.PointLight(0xffffff, 1, 30);
const spotLight = new THREE.SpotLight(0xffffff, 1, 30);

ambientLight.position.set(1, 2, 1);
directionaltLight.position.x = 2;
pointLight.position.set(5, 5, 5);
spotLight.position.set(4, 2, 4);

// scene.add(ambientLight);
scene.add(directionaltLight);
// scene.add(pointLight);
// scene.add(spotLight);

// Texture, geometry and materials
const texture = new THREE.TextureLoader().load( 'textures/2k_earth_daymap.jpg' );
const sphere = new THREE.SphereGeometry(2, 100, 100);

// MeshBasicMaterial doesn't support lighting. So use a different material if adding texture
const material = new THREE.MeshLambertMaterial({ map: texture });

// Combine geometry and materials with THREE.Mesh to get the earth
const earth = new THREE.Mesh(sphere, material)

// Add the earth to scene
scene.add(earth);

// Render the scene and camera
renderer.render(scene, camera);

// Recursive function for keep re-rendering the screen
const animate = () => {
    requestAnimationFrame(animate)

    earth.rotation.y += 0.005
    renderer.render(scene, camera);
}
animate()