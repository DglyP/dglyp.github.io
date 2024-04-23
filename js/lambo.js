/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/
import * as THREE from "https://unpkg.com/three@0.163.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.163.0/examples/jsm/loaders/GLTFLoader.js";
import { ARButton } from "https://unpkg.com/three@0.163.0/examples/jsm/Addons.js";

let camera, scene, renderer;
let hiroMarkerMesh, earthNFTMesh, model;

init();

async function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setAnimationLoop(render);
  renderer.xr.enabled = true;
  const container = document.querySelector("#scene-container");
  container.appendChild(renderer.domElement);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 20); // Increase intensity to 2
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increase intensity to 1
  scene.add(ambientLight);

  const imgMarkerHiro = document.getElementById("imgMarkerHiro");
  const imgMarkerHiroBitmap = await createImageBitmap(imgMarkerHiro);
  //console.log(imgMarkerHiroBitmap);

  const imgNFTEarth = document.getElementById("imgNFTEarth");
  const imgNFTEarthBitmap = await createImageBitmap(imgNFTEarth);
  //console.log(imgNFTEarthBitmap);

  const button = ARButton.createButton(renderer, {
    requiredFeatures: ["image-tracking"],
    trackedImages: [
      {
        image: imgMarkerHiroBitmap,
        widthInMeters: 0.2,
      },
      {
        image: imgNFTEarthBitmap,
        widthInMeters: 0.2,
      },
    ],

    optionalFeatures: ["dom-overlay"],
    domOverlay: {
      root: document.body,
    },
  });
  document.body.appendChild(button);

  //Add geometry for the markers, this is where the Lamborghini model should go

  const hiroMarkerGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  hiroMarkerGeometry.translate(0, 0.1, 0);
  const hiroMarkerMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
  });
  hiroMarkerMesh = new THREE.Mesh(hiroMarkerGeometry, hiroMarkerMaterial);
  hiroMarkerMesh.name = "HiroMarkerCube";
  hiroMarkerMesh.matrixAutoUpdate = false;
  hiroMarkerMesh.visible = false;
  scene.add(hiroMarkerMesh);

  const earthNFTGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  earthNFTGeometry.translate(0, 0.1, 0);
  earthNFTMesh = new THREE.Mesh(earthNFTGeometry, hiroMarkerMaterial);
  earthNFTMesh.name = "EarthMarkerCube";
  earthNFTMesh.matrixAutoUpdate = false;
  earthNFTMesh.visible = false;
  scene.add(earthNFTMesh);

  // Instantiate a loader
  const loader = new GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    "assets/lambo2/lambo.gltf",
    // called when the resource is loaded
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      model.name = "HiroMarkerCube";
      model.matrixAutoUpdate = false;
      model.visible = false;
      model.rotateX(Math.PI / 2);
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

function render(timestamp, frame) {
  if (frame) {
    const results = frame.getImageTrackingResults(); //check if there are any images to track
    console.log(results);

    // if we have more than one image the results are in an array
    for (const result of results) {
      // the result index is the image's position
      const imageIndex = result.index;
      const referenceSpace = renderer.xr.getReferenceSpace();
      const pose = frame.getPose(result.imageSpace, referenceSpace);
      const state = result.trackingState;
      console.log(state);

      if (state == "tracked") {
        console.log("ImageIndex: ", imageIndex);

        if (imageIndex == 0) {
          model.visible = true;
          model.matrix.fromArray(pose.transform.matrix);
          //model.scale.set(0.1, 0.1, 0.1);
          // Rotate the model by 90 degrees around the y-axis
          //model.rotateX(Math.PI / 2);
          console.log("Hiro image target has been found", model.position);
        }
        if (imageIndex == 1) {
        }
      } else if (state == "emulated") {
        console.log("no target");
      }
    }
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
