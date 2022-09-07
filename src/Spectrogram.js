import * as THREE from "three";
import React from "react";
import song from "./test_song/howtotrain.mp3";
import * as colors from "./theme/colors";
import {MdPause, MdStop} from 'react-icons/md'
import {IoMdPlay} from 'react-icons/io'
import * as colormap from 'colormap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


class Spectrogram extends React.Component {
  fitCameraToObject(camera, object) {
    const boundingBox = new THREE.Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);

    const center = boundingBox.getCenter();

    const size = boundingBox.getSize();

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

    cameraZ *= 1; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();
    camera.lookAt(center);
  }

  componentDidMount() {
    // Basic THREE.js scene and render setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 400);
    this.camera.position.set(160, 120, 110);
    this.camera.lookAt(70, 0, 0);
    this.nfft = 128;
    this.counter = 0;

    this.dimension = Math.min(window.innerHeight, window.innerWidth);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.dimension, this.dimension);
    this.mount.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff, 0);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // THREE.js audio and sound setup
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(song, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(1);
    });
    this.sound = sound;
    this.analyser = new THREE.AudioAnalyser(sound, this.nfft);

    // Line setup
    this.lines = new THREE.Group();
    this.scene.add(this.lines);

    this.last = 0;
    this.count = 0;
    this.play = false
    this.pause = true
    this.stop = false

    this.mount.addEventListener("click", this.onClick.bind(this), false);

    this.animate();
  }

  animate(now) {
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);

    if (!this.last || now - this.last >= 1) {
      this.last = now;
      const data = this.analyser.getFrequencyData();
      if(this.stop === false)
      {this.moveLines()};
      if (this.count % 2 === 1 & this.stop === false) {
        this.addLine(data);
      }
    }
    this.count++;
  }

  addLine(fftValues) {
    const planeGeometry = new THREE.PlaneGeometry(
      this.nfft / 2,
      1,
      this.nfft / 2 - 1,
      1
    );

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xfffffff,
        wireframe: false,
        transparent: true,
      })
    );

 

    this.lines.add(plane);

    const lineGeometry = new THREE.BufferGeometry();
    let lineVertices = [];
    for (let i = 0; i < this.nfft / 2; i++) {
      lineVertices.push(planeGeometry.attributes.position.array[3 * i]); // share the upper points of the plane
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 1]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 2]);
    }
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVertices), 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: "black",
      transparent: false,
      opacity: 0.5,
      linewidth: 1.4,
    });
    const line = new THREE.Line(lineGeometry, lineMat);

    plane.add(line);

    // console.log(line.geometry.attributes.position.array)
    for (let i = 0; i < this.nfft / 2; i++) {
      let y = 0.75 * (fftValues[i] / 6) + 2 * (Math.random() / 2 - 1);
      if (isNaN(y)) {
        y = Math.random.random();
      }

      plane.geometry.attributes.position.array[i * 3 + 1] = y;
      line.geometry.attributes.position.array[i * 3 + 1] = y;
    }
  }

  set_pause() {
    this.pause = true
    this.play = false
    console.log(this.pause)
    this.sound.pause()
  }

  set_play() {
    this.pause = false
    this.play = true
    this.stop = false
    this.sound.play()
  }


  set_stop() {
    this.pause = true
    this.stop = true
    this.play = false
    this.sound.stop()
  }

  moveLines() {
    let planesThatHaveGoneFarEnough = [];
    this.lines.children.forEach((plane) => {
      for (let i = 0; i < this.nfft; i++) {
        plane.geometry.attributes.position.array[i * 3 + 2] -= 1;
        if (i < this.nfft) {
          plane.children[0].geometry.attributes.position.array[i * 3 + 2] -= 1;
        }
      }

      if (plane.geometry.attributes.position.array[2] <= -120) {
        planesThatHaveGoneFarEnough.push(plane);
      } else {
        plane.geometry.attributes.position.needsUpdate = true;
        plane.children[0].geometry.attributes.position.needsUpdate = true;
      }
    });
    planesThatHaveGoneFarEnough.forEach((plane) => this.lines.remove(plane));
  }

  onWindowResize() {
    if (this.mount) {
      this.dimension = Math.min(
        window.innerHeight / 1.5,
        window.innerWidth / 1.5
      );
      this.renderer.setSize(this.dimension, this.dimension);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  onClick() {;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }

    window.removeEventListener("resize", this.onWindowResize.bind(this));
    this.mount.removeEventListener("click", this.onClick.bind(this));
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <div className="w-screen h-screen border-2 border-transparent-500">
        {/* The actaual canvas for three.js */}
        <div className=" flex flex-row border-2 border-transparent h-1/2 w-1/2 mt-10 ml-24">
          <div ref={(ref) => (this.mount = ref)} className = 'w-[100%] h-full border-transparent border-solid border-2'/>

          <div
            id="play button" 
            className="static h-10 w-10 mt-[29%] ml-[-40%]"
          >
            <button className="playpausebutton" onClick={() => this.set_play()}>
                <IoMdPlay/>
            </button>

          </div>
          <div
            id="pause button"
            className="static h-10 w-10 mt-[25%] ml-3"
          >
            <button className="playpausebutton" onClick={() => this.set_pause()}><MdPause/></button>
          </div>

          <div
            id="stop button"
            className="static h-10 w-10 mt-[21%] ml-3"
          >
            <button className="playpausebutton" onClick={() => this.set_stop()}><MdStop/></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Spectrogram;
