import * as THREE from "three";
import React from "react";
import { MdPause, MdStop } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TiCamera } from "react-icons/ti";
class Spectrogram extends React.Component {
  componentDidMount() {
    // Basic THREE.js scene and render setup

    this.nfft = 128;
    this.counter = 0;

    let map = document.getElementById("canvas");
    let mapDimensions = map.getBoundingClientRect();
    this.width = mapDimensions.width;
    this.height = mapDimensions.height;

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(this.width, this.height);

    this.mount.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.width / this.height,
      1,
      400
    );
    this.renderer.setClearColor(0xffffff, 0);

    this.init_controls();
    this.resetcamera();

    // THREE.js audio and sound setup
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    this.sound = new THREE.Audio(listener);
    this.audioLoader = new THREE.AudioLoader();
    this.audioLoader.load(this.song, function (buffer) {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(false);
      this.sound.setVolume(1);
    });
    this.analyser = new THREE.AudioAnalyser(this.sound, this.nfft);

    // Line setup
    this.lines = new THREE.Group();
    this.scene.add(this.lines);

    this.last = 0;
    this.count = 0;
    this.play = false;
    this.pause = false;
    this.stop = true;

    this.mount.addEventListener("click", this.onClick.bind(this), false);
    // this.mount.addEventListener("resize", this.onWindowResize.bind(this), true);
    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.addrepere();

    this.animate();


    document
      .getElementById("dropzone-file")
      .addEventListener("change", this.changeHandler);
    this.filehandler = document.getElementById("dropzone-file");
    this.fileloaded = false;
  }

  changeHandler = ({ target }) => {
    // Make sure we have files to use

    if (!target.files.length) return;

    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(target.files[0]);
    this.audio = document.getElementById("audioplayer");
    
    // Create an audio element

    this.audio.addEventListener("load", () => {
      URL.revokeObjectURL(urlObj);
    });
    this.song = urlObj;
    console.log(this.sound)
    this.audioLoader.load(this.song, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(false);
      this.sound.setVolume(1);
    });  

    this.forceUpdate();
  }

  resetcamera() {
    this.camera.position.set(120, 110, -150);
    this.camera.lookAt(0, 0, 0);
  }

  addrepere() {
    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    });

    const points = [];
    points.push(new THREE.Vector3(this.nfft / 4, 0, 60));
    points.push(new THREE.Vector3(-this.nfft / 4, 0, 60));
    points.push(new THREE.Vector3(-this.nfft / 4, 40, 60));
    points.push(new THREE.Vector3(-this.nfft / 4, 0, 60));
    points.push(new THREE.Vector3(-this.nfft / 4, 0, -60));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  init_controls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxAzimuthAngle = -0.1;

    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 3;

    this.controls.enableZoom = false;
    this.resetcamera();
  }

  animate(now) {
    this.frameId = requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);

    if (!this.last || now - this.last >= 1) {
      this.last = now;
      const data = this.analyser.getFrequencyData();
      if (this.stop === false) {
        this.moveLines();
      }
      if ((this.count % 2 === 1) & (this.stop === false)) {
        this.addLine(data);
      }
    }
    this.count++;
  }

  addLine(fftValues) {
    var planeGeometry = new THREE.PlaneGeometry(
      this.nfft / 2,
      1,
      this.nfft / 2 - 1,
      1
    );
    planeGeometry.translate(0, 0, 60);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xfffffff,
        wireframe: false,
        transparent: true,
      })
    );

    plane.frustumCulled = false;

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
      transparent: true,
      opacity: 1,
      linewidth: 1.4,
    });
    const line = new THREE.Line(lineGeometry, lineMat);

    plane.add(line);

    // console.log(line.geometry.attributes.position.array)
    for (let i = 0; i < this.nfft / 2; i++) {
      let y = 0.75 * (fftValues[i] / 6) + 2 * (Math.random() / 2);
      if (isNaN(y)) {
        y = Math.random.random();
      }

      plane.geometry.attributes.position.array[i * 3 + 1] = y;
      line.geometry.attributes.position.array[i * 3 + 1] = y;
    }
  }

  set_pause() {
    this.pause = true;
    this.play = false;
    console.log(this.pause);
    this.sound.pause();
  }

  set_play() {
    this.pause = false;
    this.play = true;
    this.stop = false;
    this.sound.play();
  }

  set_stop() {
    console.log(this.camera.position);
    this.pause = true;
    this.stop = true;
    this.play = false;
    this.sound.pause();
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

      if (plane.geometry.attributes.position.array[2] <= -60) {
        planesThatHaveGoneFarEnough.push(plane);
      } else {
        plane.geometry.attributes.position.needsUpdate = true;
        plane.children[0].geometry.attributes.position.needsUpdate = true;
      }
    });
    planesThatHaveGoneFarEnough.forEach((plane) => this.lines.remove(plane));
  }

  onClick() {}

  onWindowResize() {
    let map = document.getElementById("canvas");
    let mapDimensions = map.getBoundingClientRect();
    this.width = mapDimensions.width;
    this.height = mapDimensions.height;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
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
      <div className="w-full h-full pt-10">
        {/* The actaual canvas for three.js */}
        <div
          className=" flex flex-col h-full items-center align-middle"
          id="canvas"
        >
          <div
            ref={(ref) => (this.mount = ref)}
            className="h-[calc(100%-50px)]"
          />
          <div className="flex flex-col items-center align-middle w-full mb-[10px]">
            <div className="flex flex-row">
              <div id="play button" className="relative h-10 w-10">
                <button
                  className="playpausebutton"
                  onClick={() => this.set_play()}
                >
                  <IoMdPlay />
                </button>
              </div>
              <div id="pause button" className="relative h-10 w-10 ml-3">
                <button
                  className="playpausebutton"
                  onClick={() => this.set_pause()}
                >
                  <MdPause />
                </button>
              </div>

              <div id="stop button" className="relative h-10 w-10 ml-3">
                <button
                  className="playpausebutton"
                  onClick={() => this.set_stop()}
                >
                  <MdStop />
                </button>
              </div>

              <div id="reset button" className="relative h-10 w-10 ml-3">
                <button
                  className="playpausebutton"
                  onClick={() => this.resetcamera()}
                >
                  <TiCamera />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spectrogram;
