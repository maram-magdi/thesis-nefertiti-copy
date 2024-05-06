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
// const materialBust = new THREE.MeshBasicMaterial({color: 0xff0000})
let posY = 0;
let mesh = {};
let isSomeoneClose = false;
let notice = document.getElementById('notice');
let audio1;
let audio2 = new Audio ('audio/Nefertiti_v2_p2.mp3');

// let missingEye = document.getElementById('missing-eye');
// let capCrown = document.getElementById('cap-crown');
let t1 = document.getElementById('t1');
let t2 = document.getElementById('t2');
let t3 = document.getElementById('t3');
let t4 = document.getElementById('t4');
let t5 = document.getElementById('t5');
let t6 = document.getElementById('t6');
let t7 = document.getElementById('t7');

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
  // const mesh = {}
  camera.position.set(0, -0.5, 10)
  // scene.add(mesh)

  // scene.add(meshBust)

  // animate()
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

        mesh = object;
        console.log(mesh);
        mesh.scale.set(0.01, 0.01, 0.01);
        mesh.position.set(0, 0, 0);

        // object.lookAt(0,45,0);
        
        // scene.add( object );
        // const meshBust = new THREE.Mesh(object, materialBust)
        // object.traverse(function (child) {
        //   if (child instanceof THREE.Mesh) {
        //       child.material = materialBust; // Apply material to each mesh
        //   }
        // });



        scene.add(mesh)

        animate()

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

  document.body.addEventListener('click', () => {
    notice.innerHTML = "";
  })

  if(isSomeoneClose){
    mesh.visible = true;
  } else {
    mesh.visible = false;
  }

  if (mesh && mesh.visible) {
    // Update rotation based on posY
    mesh.rotation.y = degrees_to_radians(posY);
  }
  // mesh.standard.rotateX = degrees_to_radians(posY)

  
  renderer.render(scene, camera)


}

socket.on('connect', () => {
  console.log('Client connected!');

  socket.on('sensorInfo', (data) => {
    console.log(data);

    // if(data === "<"){
    //   posY -= 45;
    //   // console.log(posY);
    // } else if (data === ">"){
    //   posY += 45;
    // };

    if(data === "Someone is here!" || data === "<" || data === ">" || data === "^" || data === "v"){
      isSomeoneClose = true;
      // missingEye.style.visibility = "hidden";
      // capCrown.style.visibility = "hidden";
      t1.style.visibility = "hidden";
      t2.style.visibility = "hidden";
      t3.style.visibility = "hidden";
      t4.style.visibility = "hidden";
      t5.style.visibility = "hidden";
      t6.style.visibility = "hidden";
      t7.style.visibility = "hidden";

      if (data === "Someone is here!"){
        audio1 = new Audio ('audio/Nefertiti_v2_p1.mp3');
        // audio.loop = true;
        audio1.play();
        posY = 0;
      } else if (data === "<"){
        posY -= 45;
        if(posY === -360){
          audio1.pause();
          audio2.play();
        } else if (posY === -45){
          // missingEye.style.visibility = "visible";
          t1.style.visibility = "visible";
        } else if (posY === -90){
          t2.style.visibility = "visible";
        } else if (posY === -135){
          t3.style.visibility = "visible";
        } else if (posY === -180){
          t4.style.visibility = "visible";
        } else if (posY === -225){
          t5.style.visibility = "visible";
        } else if (posY === -270){
          // capCrown.style.visibility = "visible";
          t6.style.visibility = "visible";
        } else if (posY === -315){
          t7.style.visibility = "visible";
        }
      }; 
      // else if (data === ">"){
      //   posY += 45;
      //   if(posY === 360){
      //     audio1.pause();
      //     audio2.play();
      //   } else if (posY === 315){
      //     missingEye.style.visibility = "visible";
      //   } else if (posY === 90){
      //     capCrown.style.visibility = "visible";
      //   }
      // };
      console.log(posY);
    } else if (data === "No one is here anymore!"){
      isSomeoneClose = false;
      // missingEye.style.visibility = "hidden";
      // capCrown.style.visibility = "hidden";

      t1.style.visibility = "hidden";
      t2.style.visibility = "hidden";
      t3.style.visibility = "hidden";
      t4.style.visibility = "hidden";
      t5.style.visibility = "hidden";
      t6.style.visibility = "hidden";
      t7.style.visibility = "hidden";
      
      audio1.pause();
      audio2.pause();
    } else if (data === "4 touched"){
      let nfr = new Audio ('audio/Nfr.mp3');
      nfr.play();
    } else if (data === "5 touched"){
      let t = new Audio ('audio/t.mp3');
      t.play();
    } else if (data === "6 touched"){
      let ii = new Audio('audio/ii.mp3');
      ii.play();
    } else if (data === "7 touched"){
      let ti = new Audio ('audio/ti.mp3');
      ti.play();
    };

  })
})


function degrees_to_radians(degrees)
{
  // Store the value of pi.
  var pi = Math.PI;
  // Multiply radians by 180 divided by pi to convert to degrees.
  // return radians * (180/pi);
  return degrees / (180/pi);
};