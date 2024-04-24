// import './style.css'
// import * as THREE from '../node_modules/three/build/three.module';
// import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader';

let socket = io();

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000)
const scene = new THREE.Scene()
const mtlLoader = new MTLLoader();


// const meshBust = 0
const materialBust = new THREE.MeshBasicMaterial({color: 0xff0000})




const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Set position of the light
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);


init()

function init() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({color: 0xff0000})
  const mesh = new THREE.Mesh(geometry, material)
  camera.position.set(0, -0.5, 10)
  // scene.add(mesh)

  // scene.add(meshBust)

  animate()
}

mtlLoader.load(
  'models/bust_5.mtl',

  function(materials){
    materials.preload();
    const loader = new OBJLoader();
    loader.setMaterials(materials);
    // load a resource
    loader.load(
      // resource URL
      'models/bust_5_6.obj',
      // called when resource is loaded
      function ( object ) {

        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, 0, 0)
        // object.lookAt(0,45,0);
        // object.rotation.x = - Math.PI / 2; 
        
        // scene.add( object );
        // const meshBust = new THREE.Mesh(object, materialBust)
        // object.traverse(function (child) {
        //   if (child instanceof THREE.Mesh) {
        //       child.material = materialBust; // Apply material to each mesh
        //   }
        // });
        scene.add(object)

        // animate()

      },
      // called when loading is in progresses
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened: ' + error );

      }
    );
  }
);



function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

socket.on('connect', () => {
  console.log('Client connected!');

  socket.on('sensorInfo', (data) => {
    console.log(data);
  })
})