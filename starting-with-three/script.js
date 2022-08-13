import * as THREE from "three";
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene  = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0.01, 5)
orbit.update()

const texture = new THREE.TextureLoader().load( 'textures/2k_earth_nightmap.jpg' );
const sphere = new THREE.SphereGeometry(2, 100, 100);
const material = new THREE.MeshBasicMaterial({ map: texture })
const earth = new THREE.Mesh(sphere, material)

scene.add(earth);

renderer.render(scene, camera);

const animate = () => {
    requestAnimationFrame(animate)
    
    earth.rotation.y += 0.007
    renderer.render(scene, camera);

}
animate()