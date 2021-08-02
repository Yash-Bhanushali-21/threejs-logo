import './style.css'
import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'


//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF); //setting background to white.

//creating a group of 3d objects.
const group  = new THREE.Group();
scene.add(group);

//torus geometry.
const tourusGeometry = new THREE.TorusGeometry( 20, 3, 40, 100);
const tourusMaterial = new THREE.MeshBasicMaterial( { color: 0x000000
} );
const tourus = new THREE.Mesh( tourusGeometry, tourusMaterial );
group.add( tourus );

//sphere geometry.
const sphereGeometry = new THREE.SphereGeometry( 4, 32, 16 );
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(25,-17,0);
group.add( sphere );


/*
//axes helper
//helpful for axis.
const axesHelper = new THREE.AxesHelper(2); //setting length of axis
scene.add(axesHelper); 
*/

//sizes

const sizes = {
    width: 800,
    height: 600
}
//canvas
const canvas = document.querySelector('.webgl');

//camera
const camera = new THREE.PerspectiveCamera(76,sizes.width / sizes.height);
camera.position.z = 50;
scene.add(camera);


//Controls 
const controls = new OrbitControls(camera,canvas);



//renderer

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2));


//scene.add(geometry)




//event listner for resizing.
window.addEventListener('resize', () => {
   
    //update sizes object we used throughtout app.
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    //update camera aspect prop 
    camera.aspect = sizes.width / sizes.height;
    
    //to update interal calc. 
    camera.updateProjectionMatrix(); 
    
    //finally, render the new calculations on canvas.
    renderer.setSize(sizes.width,sizes.height);
    


    renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2));
    
 });

 //event listener for double click full screen.

 window.addEventListener('dblclick', () => {

    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    //for opening in full screen
    if (!fullScreenElement) { //opening starts here.
      if(canvas.requestFullscreen){
          canvas.requestFullscreen();
      }
      else if(canvas.webkitRequestFullscreen){
        canvas.webkitRequestFullscreen();   
      }

    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    } 
    
  
  });
let time = Date.now()


const tick = () => {

  //time
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  

  renderer.render(scene,camera);
  //re call on each frame.
  window.requestAnimationFrame(tick);

}
    
//triger function once.
tick();
