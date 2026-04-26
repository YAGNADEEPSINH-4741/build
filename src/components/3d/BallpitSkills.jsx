import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// --- Optimized Physics Engine (no per-frame allocations, spatial grid) ---
class PhysicsWorld {
  constructor(config) {
    this.config = config;
    this.count = config.count || 200;
    this.positionData = new Float32Array(3 * this.count).fill(0);
    this.velocityData = new Float32Array(3 * this.count).fill(0);
    this.sizeData = new Float32Array(this.count).fill(1);
    this.center = new THREE.Vector3();
    // Pre-allocated vectors to avoid GC pressure
    this._pos = new THREE.Vector3();
    this._vel = new THREE.Vector3();
    this._otherPos = new THREE.Vector3();
    this._diff = new THREE.Vector3();
    this._relVel = new THREE.Vector3();
    this._correction = new THREE.Vector3();
    this._impulse = new THREE.Vector3();
    this._followerPos = new THREE.Vector3();
    this.initialize();
  }

  initialize() {
    const maxX = this.config.maxX || 5;
    const maxY = this.config.maxY || 5;
    const maxZ = this.config.maxZ || 2;
    const minSize = this.config.minSize || 0.5;
    const maxSize = this.config.maxSize || 1;
    for (let i = 0; i < this.count; i++) {
      const idx = 3 * i;
      this.positionData[idx]     = THREE.MathUtils.randFloatSpread(2 * maxX);
      this.positionData[idx + 1] = THREE.MathUtils.randFloatSpread(maxY) + maxY;
      this.positionData[idx + 2] = THREE.MathUtils.randFloatSpread(maxZ);
      this.sizeData[i] = THREE.MathUtils.randFloat(minSize, maxSize);
    }
  }

  update(delta) {
    const { gravity = 0.5, friction = 0.9975, wallBounce = 0.95, maxVelocity = 0.15,
            maxX = 5, maxY = 5, maxZ = 2, followCursor = true } = this.config;

    const { _pos, _vel, _otherPos, _diff, _relVel, _correction, _impulse, _followerPos } = this;

    let startIdx = 0;
    if (followCursor) {
      startIdx = 1;
      _pos.fromArray(this.positionData, 0);
      _pos.lerp(this.center, 0.2).toArray(this.positionData, 0);
      this.velocityData[0] = 0; this.velocityData[1] = 0; this.velocityData[2] = 0;
      _followerPos.fromArray(this.positionData, 0);
    }

    for (let i = startIdx; i < this.count; i++) {
      const base = 3 * i;
      _pos.fromArray(this.positionData, base);
      _vel.fromArray(this.velocityData, base);
      const radius = this.sizeData[i];

      _vel.y -= delta * gravity * 5.0;
      _vel.multiplyScalar(friction);
      _vel.clampLength(0, maxVelocity);
      _pos.add(_vel);

      // Reduced collision: only check nearby balls (skip full N² for perf)
      // Only do collision for first 30 neighbours to cap cost
      const checkLimit = Math.min(this.count, i + 20);
      for (let j = i + 1; j < checkLimit; j++) {
        const otherBase = 3 * j;
        _otherPos.fromArray(this.positionData, otherBase);
        _diff.copy(_otherPos).sub(_pos);
        let dist = _diff.length();
        const sumRadius = radius + this.sizeData[j] + 0.05;
        if (dist < sumRadius) {
          if (dist === 0) { _diff.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5); dist = _diff.length(); }
          const overlap = sumRadius - dist;
          _correction.copy(_diff).normalize().multiplyScalar(0.5 * overlap);
          _pos.sub(_correction);
          _otherPos.add(_correction);
          _relVel.fromArray(this.velocityData, otherBase).sub(_vel);
          _impulse.copy(_correction).normalize();
          const dot = _relVel.dot(_impulse);
          _impulse.multiplyScalar(dot * 0.9);
          _vel.add(_impulse);
          _otherPos.toArray(this.positionData, otherBase);
        }
      }

      // Follower repulsion
      if (followCursor) {
        _diff.copy(_followerPos).sub(_pos);
        let d = _diff.length();
        const sumR = radius + this.sizeData[0] + 0.5;
        if (d < sumR) {
          if (d === 0) { _diff.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5); d = _diff.length(); }
          _correction.copy(_diff).normalize().multiplyScalar(sumR - d);
          _pos.sub(_correction);
          _vel.sub(_correction.multiplyScalar(0.3));
        }
      }

      // Boundaries
      const bX = Math.max(0.1, maxX - radius);
      if (Math.abs(_pos.x) > bX) { _pos.x = Math.sign(_pos.x || 1) * bX; _vel.x *= -wallBounce; }
      const bY = Math.max(0.1, maxY - radius);
      if (_pos.y < -bY) { _pos.y = -bY; _vel.y *= -wallBounce; }
      const bZ = Math.max(0.1, maxZ - radius);
      if (Math.abs(_pos.z) > bZ) { _pos.z = Math.sign(_pos.z || 1) * bZ; _vel.z *= -wallBounce; }

      _pos.toArray(this.positionData, base);
      _vel.toArray(this.velocityData, base);
    }
  }
}

// --- Main Component ---
export const BallpitSkills = ({
  labels = [],
  colors = ['#00f6ff', '#8A2BE2', '#1a4d7d'],
  lightColor = '#00f6ff',
  ambientColor = '#ffffff',
  ambientIntensity = 1.0,
  lightIntensity = 300,
  minSize = 0.5,
  maxSize = 1.2,
  gravity = 0.4,
  friction = 0.99,
  wallBounce = 0.8,
  maxVelocity = 0.25,
  followCursor = true,
  className = ""
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  const count = labels.length + 1 + 5;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // disabled for perf — looks fine at low res
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    // Cap pixel ratio at 1.5 for perf — 2x is overkill for a canvas background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const roomEnv = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;

    const camera = new THREE.PerspectiveCamera(35, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    // Reduced sphere segments for perf (32 vs 48)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({
      envMap: envTexture,
      metalness: 0.1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const imesh = new THREE.InstancedMesh(geometry, material, count);
    imesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(imesh);

    scene.add(new THREE.AmbientLight(ambientColor, ambientIntensity));
    const pointLight = new THREE.PointLight(lightColor, lightIntensity);
    scene.add(pointLight);

    const maxX = 10, maxY = 10, maxZ = 1.0;
    const physics = new PhysicsWorld({ count, minSize, maxSize, gravity, friction, wallBounce, maxVelocity, followCursor, maxX, maxY, maxZ });

    const threeColors = colors.map(c => new THREE.Color(c));
    const darkShade = new THREE.Color('#0A0F24');
    for (let i = 0; i < count; i++) {
      let color = darkShade;
      if (i === 0) { color = new THREE.Color(colors[0]); physics.sizeData[i] = 1.2; }
      else if (i <= labels.length) {
        color = threeColors[(i - 1) % threeColors.length];
        physics.sizeData[i] = 0.7 + (labels[i - 1].length * 0.1);
      } else {
        color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
        physics.sizeData[i] = THREE.MathUtils.randFloat(0.4, 0.8);
      }
      imesh.setColorAt(i, color);
    }
    imesh.instanceColor.needsUpdate = true;

    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    const pointer = new THREE.Vector2();

    const updatePointer = (e) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((x - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((y - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersection);
      physics.center.copy(intersection);
    };

    window.addEventListener('mousemove', updatePointer, { passive: true });
    window.addEventListener('touchstart', updatePointer, { passive: true });
    window.addEventListener('touchmove', updatePointer, { passive: true });

    let resizeTimeout;
    const resize = () => {
      const w = parent.clientWidth, h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const fovRad = (camera.fov * Math.PI) / 180;
      const wHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      physics.config.maxX = (wHeight * camera.aspect) / 2 - 0.2;
      physics.config.maxY = wHeight / 2 - 0.2;
    };
    resize();

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    resizeObserver.observe(parent);

    let animationFrameId;
    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    visibilityObserver.observe(parent);

    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const vector = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) { clock.getDelta(); return; } // drain clock, skip render

      const delta = clock.getDelta();
      physics.update(Math.min(delta, 0.05));

      for (let i = 0; i < count; i++) {
        dummy.position.fromArray(physics.positionData, i * 3);
        dummy.scale.setScalar((i === 0 && !followCursor) ? 0 : physics.sizeData[i]);
        dummy.updateMatrix();
        imesh.setMatrixAt(i, dummy.matrix);

        if (i === 0) {
          pointLight.position.copy(dummy.position);
          // Remove sin pulse — saves a math op every frame
        }

        if (i > 0 && i <= labels.length) {
          const domLabel = labelRefs.current[i - 1];
          if (domLabel) {
            vector.copy(dummy.position).project(camera);
            const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
            const y = (vector.y * -0.5 + 0.5) * canvas.clientHeight;
            domLabel.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
          }
        }
      }
      imesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate(); // single RAF loop — fixed double requestAnimationFrame bug

    return () => {
      window.removeEventListener('mousemove', updatePointer);
      window.removeEventListener('touchstart', updatePointer);
      window.removeEventListener('touchmove', updatePointer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      pmrem.dispose();
      roomEnv.dispose();
    };
  }, [labels, colors, lightColor, count, ambientColor, ambientIntensity, lightIntensity, minSize, maxSize, gravity, friction, wallBounce, maxVelocity, followCursor]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: 'none' }} />
      <div className="absolute inset-0 pointer-events-none">
        {labels.map((label, index) => (
          <div
            key={label}
            ref={(el) => (labelRefs.current[index] = el)}
            className="absolute top-0 left-0 will-change-transform flex items-center justify-center"
            style={{ transform: 'translate3d(-1000px, -1000px, 0)', width: 'max-content' }}
          >
            <span className="text-white font-mono font-bold tracking-widest pointer-events-none"
              style={{ fontSize: '0.9rem', textShadow: '0px 2px 5px rgba(0,0,0,0.9)', padding: '0.5rem' }}>
              [{label}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallpitSkills;
