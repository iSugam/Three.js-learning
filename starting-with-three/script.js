import * as THREE from "three";
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

// Add renderer for rendering the assets
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to the html body
document.body.appendChild(renderer.domElement);

// Getting scene and camera
const scene  = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0.01, 5) // x, y, and z

// Orbit for mouse control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update()

// Texture, geometry and materials
const texture = new THREE.TextureLoader().load( 'textures/2k_earth_nightmap.jpg' );
const sphere = new THREE.SphereGeometry(2, 100, 100);
const material = new THREE.MeshBasicMaterial({ map: texture });

// Combine geometry and materials with THREE.Mesh to get the earth
const earth = new THREE.Mesh(sphere, material)

// Add the earth to scene
scene.add(earth);

// Render the scene and camera
renderer.render(scene, camera);

// Recursive function for keep rendering the screen
const animate = () => {
    requestAnimationFrame(animate)
    
    earth.rotation.y += 0.007
    renderer.render(scene, camera);
}
animate()