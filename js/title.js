    /*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/        
import * as THREE from 'https://unpkg.com/three@0.139.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/FBXLoader'
import Stats from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/GLTFLoader.js';
import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui';

let controls;

let clock, speed, skeleton;
let actions = [];
let action_1, action_2, action_3, action_4;
let currentAction, newAction;

const objsToTest = [];
const mixers = [];
let mixer;


const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();
mouse.x = mouse.y = null;

let selectState = false;

window.addEventListener( 'pointermove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
} );

window.addEventListener( 'pointerdown', () => {
    selectState = true;
} );

window.addEventListener( 'pointerup', () => {
    selectState = false;
} );

window.addEventListener( 'touchstart', ( event ) => {
    selectState = true;
    mouse.x = ( event.touches[ 0 ].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.touches[ 0 ].clientY / window.innerHeight ) * 2 + 1;
} );

window.addEventListener( 'touchend', () => {
    selectState = false;
    mouse.x = null;
    mouse.y = null;
} );

var buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
buttons[i].addEventListener("click", onButtonClick, false);
};

function onButtonClick(event) {
alert(event.target.id);
}


let container, containerAvatar;
let camera,camera2, scene, sceneAvatar, renderer, rendererAvatar;
let uniforms;

let loader=new THREE.TextureLoader();
let texture;
loader.setCrossOrigin("anonymous");
loader.load(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
  function do_something_with_texture(tex) {
    texture = tex;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    init();
    animate();
  }
);

function init() {
    
  clock = new THREE.Clock();

  container = document.getElementById( 'container2' );
  containerAvatar = document.getElementById( 'containerAvatar' );

  camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera2.position.y = 0.5;
  camera2.position.z = 1;

  camera = new THREE.Camera();
  camera.position.z = 0;

  scene = new THREE.Scene();
  sceneAvatar = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );
  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  
  rendererAvatar = new THREE.WebGLRenderer({ });
  rendererAvatar.setPixelRatio(window.devicePixelRatio);
  rendererAvatar.setClearColor(0x000000, 0);
  rendererAvatar.setSize(window.innerWidth, window.innerHeight);
  rendererAvatar.shadowMap.enabled = true;
  rendererAvatar.shadowMap.type = THREE.PCFSoftShadowMap;
  rendererAvatar.outputEncoding = THREE.sRGBEncoding;
  rendererAvatar.setAnimationLoop( animation );

  container.appendChild( renderer.domElement );
  containerAvatar.appendChild( rendererAvatar.domElement );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener('pointermove', (e)=> {
    let ratio = window.innerHeight / window.innerWidth;
    uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
    uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    e.preventDefault();
  });


  // Directional Light

  const directional_light = new THREE.DirectionalLight( 0xffffff, 0.7 );
  directional_light.position.set( 2, 6, -2 );
  directional_light.castShadow = true;
  directional_light.shadow.camera.near = 0.1;
  directional_light.shadow.camera.far = 10;
  directional_light.shadow.mapSize.width = 2048;
  directional_light.shadow.mapSize.height = 2048;
  sceneAvatar.add( directional_light );


  // Hemisphere Light

  const hemisphere_light = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 );
  hemisphere_light.position.set( -4, 6, 8 );
  sceneAvatar.add( hemisphere_light );


  // Hemisphere Light

  const hemisphere_light_2 = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 );
  hemisphere_light_2.position.set( -6, 2, -8 );
  sceneAvatar.add( hemisphere_light_2 );


  // Materials

  const shadow_material = new THREE.ShadowMaterial( {
      opacity: 0.15
  });


   // Load GLTF

   const gltf_loader = new GLTFLoader();


   gltf_loader.load( 

       '../assets/Test4.glb', function ( gltf ) {

           console.log( "Model with idle animation loaded" );

           const model = gltf.scene;
           model.position.y = -0.5;
           model.position.z = -0.7;
           mixer = new THREE.AnimationMixer( model );
           mixers.push( mixer );

           gltf.scene.traverse((node) => {  
               if (node.isMesh) node.frustumCulled = false;
               if (node.isMesh) node.castShadow = true;
           });

           action_1 = mixer.clipAction( gltf.animations[0]);
           actions.push(action_1);
           action_1.play();
           currentAction = mixer.clipAction(gltf.animations[0]);

           skeleton = new THREE.SkeletonHelper( model );
           skeleton.visible = false;

           sceneAvatar.add( skeleton );
           sceneAvatar.add(model);

           load_animations();

       }, 
       function ( xhr ) {
           console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
       },
       function ( error ) {
           console.log( 'Error loading file' );
       }   

   ); 
   
   function load_animations() {

    ui_timer();
    document.body.removeAttribute("loading");
    document.body.setAttribute("loaded","");

}

activateAllActions();

}



function activateAllActions() {

  actions.forEach( function ( action ) {
      action.play();
  } );

}


        // Window Resize

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          camera2.aspect = window.innerWidth / window.innerHeight;
          camera2.updateProjectionMatrix();
          rendererAvatar.setSize(window.innerWidth, window.innerHeight);
      });




      // UI Timer

      const ui_timer = function () {

          let time;
          document.onmousemove = resetTimer;
          document.ontouchmove = resetTimer;
          document.onkeydown = resetTimer;

          function timeout() {
              document.body.removeAttribute("ui");
          };

          function resetTimer() {
              clearTimeout(time);
              document.body.setAttribute("ui","");
              time = setTimeout(timeout, 3000);
          };
      };



      // Fullscreen button

      if (document.fullscreenEnabled || document.webkitFullscreenEnabled || 
          document.msFullscreenEnabled ) {
          create_fullscreen_button();
      };


      function create_fullscreen_button() {

          let fullscreen_button = document.createElement("button");
          fullscreen_button.setAttribute('id','fullscreen-button');
          fullscreen_button.addEventListener("click", toggle_fullscreen);

          fullscreen_button.innerHTML  = `
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          `;

          document.body.appendChild(fullscreen_button);

      };


      function toggle_fullscreen() {

           if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  
              if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen()
              } else if (document.documentElement.mozRequestFullScreen) {
                  document.documentElement.mozRequestFullScreen()
              } else if (document.documentElement.webkitRequestFullscreen) {
                  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
              }

              document.body.setAttribute("fullscreen","");

          } else {
              if (document.cancelFullScreen) {
                  document.cancelFullScreen()
              } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen()
              } else if (document.webkitCancelFullScreen) {
                  document.webkitCancelFullScreen()
              }

              document.body.removeAttribute("fullscreen") ;

          }
                      
      };


      function check_fullscreen() {

          // (Because users can exit / enter fullscreen via device / browser)

          if (document.fullscreenElement !== null) { 
              document.body.setAttribute("fullscreen","") ;
          }

          else  { 
              document.body.removeAttribute("fullscreen") ;
          }
      };

      setInterval(function(){ check_fullscreen();}, 1000); 

function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.setSize(container.clientWidth, container.clientHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(delta) {
  requestAnimationFrame( animate );
  render(delta);
}

function animation(time) {

  const delta = clock.getDelta();
  ThreeMeshUI.update();
  for ( const mixer of mixers ) mixer.update( delta );
  rendererAvatar.render(sceneAvatar, camera2);
  
}

let then = 0;
function render(delta) {

  animation()
  renderer.render(scene, camera);
  rendererAvatar.render(sceneAvatar, camera2);
  
  uniforms.u_time.value = -10000 + delta * 0.0005;
  renderer.render( scene, camera );
  rendererAvatar.render( sceneAvatar, camera2 );
  
}