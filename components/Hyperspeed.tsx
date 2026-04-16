"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EffectOptions {
  distortion?: string;
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: Partial<{
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number[];
    rightCars: number[];
    sticks: number;
  }>;
}

// ─── Defaults (dark blue/purple palette, reduced speed) ───────────────────────

const DEFAULTS: Required<EffectOptions> = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 1.4,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [40, 55],
  movingCloserSpeed: [-80, -110],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x1a1a2e,
    brokenLines: 0x1a1a2e,
    leftCars: [0x1a1a6e, 0x2d2b8f, 0x1e1b4b],
    rightCars: [0x0f172a, 0x1e3a5f, 0x172554],
    sticks: 0x1e3a5f,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const random = (base: number | [number, number]): number => {
  if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
  return Math.random() * base;
};

const pickRandom = <T,>(arr: T | T[]): T => {
  if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
  return arr;
};

const lerp = (current: number, target: number, speed = 0.1, limit = 0.001): number => {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) change = target - current;
  return change;
};

const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  setSize: (w: number, h: number, s: boolean) => void
): boolean {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (width <= 0 || height <= 0) return false;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) setSize(width, height, false);
  return needResize;
}

// ─── Distortions ──────────────────────────────────────────────────────────────

const turbulentUniforms = {
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
  uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
};

const distortions: Record<string, { uniforms: object; getDistortion: string; getJS?: (p: number, t: number) => THREE.Vector3 }> = {
  turbulentDistortion: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){ return sin(val) * 0.5 + 0.5; }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2.) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.0125),
          getDistortionY(progress) - getDistortionY(0.0125),
          0.
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const uFreq = turbulentUniforms.uFreq.value;
      const uAmp = turbulentUniforms.uAmp.value;
      const getX = (p: number) =>
        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
        Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;
      const getY = (p: number) =>
        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;
      const distortion = new THREE.Vector3(
        getX(progress) - getX(progress + 0.007),
        getY(progress) - getY(progress + 0.007),
        0
      );
      return distortion.multiply(new THREE.Vector3(-2, -5, 0)).add(new THREE.Vector3(0, 0, -10));
    },
  },
};

// ─── Shaders ──────────────────────────────────────────────────────────────────

const carLightsFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk["fog_pars_fragment"]}
  varying vec3 vColor;
  varying vec2 vUv;
  uniform vec2 uFade;
  void main() {
    vec3 color = vec3(vColor);
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk["fog_fragment"]}
  }
`;

const carLightsVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk["fog_pars_vertex"]}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vColor;
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;
    transformed.xy *= radius;
    transformed.z *= myLength;
    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${THREE.ShaderChunk["fog_vertex"]}
  }
`;

const sideSticksVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk["fog_pars_vertex"]}
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY(in float angle){
    return mat4(cos(angle),0,sin(angle),0, 0,1,0,0, -sin(angle),0,cos(angle),0, 0,0,0,1);
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;
    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);
    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
    transformed.z += -uTravelLength + time;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    transformed.y += height / 2.;
    transformed.x += -width / 2.;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${THREE.ShaderChunk["fog_vertex"]}
  }
`;

const sideSticksFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk["fog_pars_fragment"]}
  varying vec3 vColor;
  void main(){
    gl_FragColor = vec4(vColor, 1.);
    ${THREE.ShaderChunk["fog_fragment"]}
  }
`;

const roadVertex = `
  #define USE_FOG;
  uniform float uTime;
  ${THREE.ShaderChunk["fog_pars_vertex"]}
  uniform float uTravelLength;
  varying vec2 vUv;
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1. * distortion.z;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    ${THREE.ShaderChunk["fog_vertex"]}
  }
`;

const roadMarkings_vars = `
  uniform float uLanes;
  uniform vec3 uBrokenLinesColor;
  uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage;
  uniform float uBrokenLinesWidthPercentage;
  uniform float uBrokenLinesLengthPercentage;
`;

const roadMarkings_fragment = `
  uv.y = mod(uv.y + uTime * 0.05, 1.);
  float laneWidth = 1.0 / uLanes;
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
  brokenLines = mix(brokenLines, sideLines, uv.x);
`;

const roadBaseFragment = `
  #define USE_FOG;
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  #include <roadMarkings_vars>
  ${THREE.ShaderChunk["fog_pars_fragment"]}
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(uColor);
    #include <roadMarkings_fragment>
    gl_FragColor = vec4(color, 1.);
    ${THREE.ShaderChunk["fog_fragment"]}
  }
`;

const islandFragment = roadBaseFragment
  .replace("#include <roadMarkings_fragment>", "")
  .replace("#include <roadMarkings_vars>", "");

const roadFragment = roadBaseFragment
  .replace("#include <roadMarkings_fragment>", roadMarkings_fragment)
  .replace("#include <roadMarkings_vars>", roadMarkings_vars);

type ResolvedDistortion = typeof distortions[string];

type ResolvedOptions = Omit<Required<EffectOptions>, "distortion"> & {
  distortion: ResolvedDistortion;
};

class CarLights {
  webgl: App;
  options: ResolvedOptions;
  colors: number | number[];
  speed: [number, number];
  fade: THREE.Vector2;
  mesh!: THREE.Mesh;

  constructor(
    webgl: App,
    options: ResolvedOptions,
    colors: number | number[],
    speed: [number, number],
    fade: THREE.Vector2
  ) {
    this.webgl = webgl;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
  }

  init() {
    const options = this.options;
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as unknown as THREE.InstancedBufferGeometry);
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;

    const laneWidth = options.roadWidth / options.lanesPerRoad;
    const aOffset: number[] = [];
    const aMetrics: number[] = [];
    const aColor: number[] = [];

    let colors: THREE.Color | THREE.Color[] = Array.isArray(this.colors)
      ? this.colors.map((c) => new THREE.Color(c))
      : new THREE.Color(this.colors);

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      const radius = random(options.carLightsRadius);
      const length = random(options.carLightsLength);
      const speed = random(this.speed);
      const carLane = i % options.lanesPerRoad;
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;
      const carWidth = random(options.carWidthPercentage) * laneWidth;
      laneX += random(options.carShiftX) * laneWidth;
      const offsetY = random(options.carFloorSeparation) + radius * 1.3;
      const offsetZ = -random(options.length);

      aOffset.push(laneX - carWidth / 2, offsetY, offsetZ);
      aOffset.push(laneX + carWidth / 2, offsetY, offsetZ);
      aMetrics.push(radius, length, speed, radius, length, speed);

      const color = pickRandom(colors);
      aColor.push(color.r, color.g, color.b, color.r, color.g, color.b);
    }

    instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
    instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
    instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));

    const material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragment,
      vertexShader: carLightsVertex,
      transparent: true,
      uniforms: Object.assign(
        { uTime: { value: 0 }, uTravelLength: { value: options.length }, uFade: { value: this.fade } },
        this.webgl.fogUniforms,
        options.distortion.uniforms
      ),
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    const mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }

  update(time: number) {
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
  }
}

class LightsSticks {
  webgl: App;
  options: ResolvedOptions;
  mesh!: THREE.Mesh;

  constructor(webgl: App, options: ResolvedOptions) {
    this.webgl = webgl;
    this.options = options;
  }

  init() {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as unknown as THREE.InstancedBufferGeometry);
    const totalSticks = options.totalSideLightSticks;
    instanced.instanceCount = totalSticks;

    const stickoffset = options.length / (totalSticks - 1);
    const aOffset: number[] = [];
    const aColor: number[] = [];
    const aMetrics: number[] = [];

    let colors: THREE.Color | THREE.Color[] = Array.isArray(options.colors.sticks)
      ? (options.colors.sticks as unknown as number[]).map((c) => new THREE.Color(c))
      : new THREE.Color(options.colors.sticks);

    for (let i = 0; i < totalSticks; i++) {
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
      const color = pickRandom(colors);
      aColor.push(color.r, color.g, color.b);
      aMetrics.push(random(options.lightStickWidth), random(options.lightStickHeight));
    }

    instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
    instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
    instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));

    const material = new THREE.ShaderMaterial({
      fragmentShader: sideSticksFragment,
      vertexShader: sideSticksVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        { uTravelLength: { value: options.length }, uTime: { value: 0 } },
        this.webgl.fogUniforms,
        options.distortion.uniforms
      ),
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    const mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }

  update(time: number) {
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
  }
}

class Road {
  webgl: App;
  options: ResolvedOptions;
  uTime: { value: number };
  leftRoadWay!: THREE.Mesh;
  rightRoadWay!: THREE.Mesh;
  island!: THREE.Mesh;

  constructor(webgl: App, options: ResolvedOptions) {
    this.webgl = webgl;
    this.options = options;
    this.uTime = { value: 0 };
  }

  createPlane(side: number, _width: number, isRoad: boolean) {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(
      isRoad ? options.roadWidth : options.islandWidth,
      options.length,
      20,
      100
    );

    let uniforms: Record<string, { value: unknown }> = {
      uTravelLength: { value: options.length },
      uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) },
      uTime: this.uTime,
    };

    if (isRoad) {
      uniforms = Object.assign(uniforms, {
        uLanes: { value: options.lanesPerRoad },
        uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },
        uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },
        uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },
        uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },
        uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage },
      });
    }

    const material = new THREE.ShaderMaterial({
      fragmentShader: isRoad ? roadFragment : islandFragment,
      vertexShader: roadVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms),
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -options.length / 2;
    mesh.position.x += (options.islandWidth / 2 + options.roadWidth / 2) * side;
    this.webgl.scene.add(mesh);
    return mesh;
  }

  init() {
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
    this.island = this.createPlane(0, this.options.islandWidth, false);
  }

  update(time: number) {
    this.uTime.value = time;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

class App {
  options: ResolvedOptions;
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  fogUniforms: Record<string, { value: unknown }>;
  clock: THREE.Clock;
  road: Road;
  leftCarLights: CarLights;
  rightCarLights: CarLights;
  leftSticks: LightsSticks;
  fovTarget: number;
  speedUpTarget: number;
  speedUp: number;
  timeOffset: number;
  disposed: boolean;
  hasValidSize: boolean;
  renderPass!: RenderPass;
  bloomPass!: EffectPass;

  constructor(
    container: HTMLElement,
    options: ResolvedOptions
  ) {
    this.options = options;
    this.container = container;
    this.disposed = false;

    const w = Math.max(1, container.offsetWidth);
    const h = Math.max(1, container.offsetHeight);
    this.hasValidSize = w > 0 && h > 0;

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.composer = new EffectComposer(this.renderer);
    container.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(options.fov, w / h, 0.1, 10000);
    this.camera.position.set(0, 8, -5);
    this.scene = new THREE.Scene();
    this.scene.background = null;

    const fog = new THREE.Fog(options.colors.background!, options.length * 0.2, options.length * 500);
    this.scene.fog = fog;
    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far },
    };

    this.clock = new THREE.Clock();
    this.fovTarget = options.fov;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;

    this.road = new Road(this, options);
    this.leftCarLights = new CarLights(
      this, options, options.colors.leftCars!, options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade)
    );
    this.rightCarLights = new CarLights(
      this, options, options.colors.rightCars!, options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade)
    );
    this.leftSticks = new LightsSticks(this, options);

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize() {
    const w = this.container.offsetWidth;
    const h = this.container.offsetHeight;
    if (w <= 0 || h <= 0) { this.hasValidSize = false; return; }
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(w, h);
    this.hasValidSize = true;
  }

  initPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: 1 })
    );
    const smaaPass = new EffectPass(
      this.camera,
      new SMAAEffect({ preset: SMAAPreset.MEDIUM })
    );
    this.renderPass.renderToScreen = false;
    this.bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(smaaPass);
  }

  loadAssets(): Promise<void> {
    return new Promise((resolve) => {
      const manager = new THREE.LoadingManager(resolve);
      const si = new Image();
      const ai = new Image();
      si.addEventListener("load", () => manager.itemEnd("s"));
      ai.addEventListener("load", () => manager.itemEnd("a"));
      manager.itemStart("s");
      manager.itemStart("a");
      si.src = SMAAEffect.searchImageDataURL;
      ai.src = SMAAEffect.areaImageDataURL;
    });
  }

  init() {
    this.initPasses();
    const o = this.options;
    this.road.init();
    this.leftCarLights.init();
    this.leftCarLights.mesh.position.setX(-o.roadWidth / 2 - o.islandWidth / 2);
    this.rightCarLights.init();
    this.rightCarLights.mesh.position.setX(o.roadWidth / 2 + o.islandWidth / 2);
    this.leftSticks.init();
    this.leftSticks.mesh.position.setX(-(o.roadWidth + o.islandWidth / 2));
    this.container.addEventListener("mousedown", this.onMouseDown);
    this.container.addEventListener("mouseup", this.onMouseUp);
    this.container.addEventListener("mouseout", this.onMouseUp);
    this.tick();
  }

  onMouseDown() {
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  onMouseUp() {
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  update(delta: number) {
    const lp = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lp, 0.00001);
    this.timeOffset += this.speedUp * delta;
    const time = this.clock.elapsedTime + this.timeOffset;

    this.rightCarLights.update(time);
    this.leftCarLights.update(time);
    this.leftSticks.update(time);
    this.road.update(time);

    let updateCamera = false;
    const fovChange = lerp(this.camera.fov, this.fovTarget, lp);
    if (fovChange !== 0) { this.camera.fov += fovChange * delta * 6; updateCamera = true; }

    if (this.options.distortion.getJS) {
      const d = this.options.distortion.getJS(0.025, time);
      this.camera.lookAt(
        this.camera.position.x + d.x,
        this.camera.position.y + d.y,
        this.camera.position.z + d.z
      );
      updateCamera = true;
    }
    if (updateCamera) this.camera.updateProjectionMatrix();
  }

  render(delta: number) { this.composer.render(delta); }

  dispose() {
    this.disposed = true;
    this.scene.traverse((obj) => {
      const o = obj as THREE.Mesh;
      if (!o.isMesh) return;
      o.geometry?.dispose();
      if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
      else (o.material as THREE.Material)?.dispose();
    });
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.parentNode?.removeChild(this.renderer.domElement);
    this.composer.dispose();
    window.removeEventListener("resize", this.onWindowResize);
    this.container.removeEventListener("mousedown", this.onMouseDown);
    this.container.removeEventListener("mouseup", this.onMouseUp);
    this.container.removeEventListener("mouseout", this.onMouseUp);
  }

  setSize(w: number, h: number, s: boolean) {
    if (w <= 0 || h <= 0) { this.hasValidSize = false; return; }
    this.composer.setSize(w, h, s);
    this.hasValidSize = true;
  }

  tick() {
    if (this.disposed) return;
    if (!this.hasValidSize) {
      const w = this.container.offsetWidth;
      const h = this.container.offsetHeight;
      if (w > 0 && h > 0) {
        this.renderer.setSize(w, h, false);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(w, h);
        this.hasValidSize = true;
      } else { requestAnimationFrame(this.tick); return; }
    }
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement;
      if (this.hasValidSize) {
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }
    }
    if (this.hasValidSize) {
      const delta = this.clock.getDelta();
      this.render(delta);
      this.update(delta);
    }
    requestAnimationFrame(this.tick);
  }
}

// ─── React Component ──────────────────────────────────────────────────────────

export default function Hyperspeed({ effectOptions = {} }: { effectOptions?: EffectOptions }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
    }

    const container = containerRef.current;
    if (!container) return;

    // Merge options with defaults
    const merged: ResolvedOptions = {
      ...DEFAULTS,
      ...effectOptions,
      colors: { ...DEFAULTS.colors, ...effectOptions.colors },
      distortion: distortions[
        (effectOptions.distortion ?? DEFAULTS.distortion) as string
      ] ?? distortions.turbulentDistortion,
    };

    const app = new App(container, merged);
    appRef.current = app;
    app.loadAssets().then(app.init);

    return () => {
      appRef.current?.dispose();
      appRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
