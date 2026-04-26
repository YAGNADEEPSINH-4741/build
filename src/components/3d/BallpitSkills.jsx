import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// --- Physics Engine ---
class PhysicsWorld {
  constructor(config) {
    this.config = config;
    this.count = config.count || 200;
    this.positionData = new Float32Array(3 * this.count).fill(0);
    this.velocityData = new Float32Array(3 * this.count).fill(0);
    this.sizeData = new Float32Array(this.count).fill(1);
    this.center = new THREE.Vector3();
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
      this.positionData[idx] = THREE.MathUtils.randFloatSpread(2 * maxX);
      // Start higher up so they drop down
      this.positionData[idx + 1] = THREE.MathUtils.randFloatSpread(maxY) + maxY;
      this.positionData[idx + 2] = THREE.MathUtils.randFloatSpread(maxZ);
      
      this.sizeData[i] = THREE.MathUtils.randFloat(minSize, maxSize);
    }
  }

  update(delta) {
    const gravity = this.config.gravity ?? 0.5;
    const friction = this.config.friction ?? 0.9975;
    const wallBounce = this.config.wallBounce ?? 0.95;
    const maxVelocity = this.config.maxVelocity ?? 0.15;
    const maxX = this.config.maxX || 5;
    const maxY = this.config.maxY || 5;
    const maxZ = this.config.maxZ || 2;
    const followCursor = this.config.followCursor ?? true;

    let startIdx = 0;
    if (followCursor) {
      startIdx = 1;
      const firstPos = new THREE.Vector3().fromArray(this.positionData, 0);
      firstPos.lerp(this.center, 0.2).toArray(this.positionData, 0); 
      new THREE.Vector3(0, 0, 0).toArray(this.velocityData, 0);
    }

    for (let i = startIdx; i < this.count; i++) {
      const base = 3 * i;
      const pos = new THREE.Vector3().fromArray(this.positionData, base);
      const vel = new THREE.Vector3().fromArray(this.velocityData, base);
      const radius = this.sizeData[i];

      // Gravity & Velocity (scaled properly)
      vel.y -= delta * gravity * 5.0; 
      vel.multiplyScalar(friction);
      vel.clampLength(0, maxVelocity);
      pos.add(vel);

      // Collisions
      for (let j = i + 1; j < this.count; j++) {
        const otherBase = 3 * j;
        const otherPos = new THREE.Vector3().fromArray(this.positionData, otherBase);
        const diff = new THREE.Vector3().copy(otherPos).sub(pos);
        let dist = diff.length();
        const sumRadius = radius + this.sizeData[j] + 0.05; // tiny padding

        if (dist < sumRadius) {
          if (dist === 0) {
              diff.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
              dist = diff.length();
          }
          const overlap = sumRadius - dist;
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);
          pos.sub(correction);
          otherPos.add(correction);
          
          const relVel = new THREE.Vector3().fromArray(this.velocityData, otherBase).sub(vel);
          const impulse = correction.clone().multiplyScalar(relVel.dot(correction.normalize()) * 0.9);
          vel.add(impulse);
          
          otherPos.toArray(this.positionData, otherBase);
        }
      }

      // Cursor Follow Interaction Repulsion
      if (followCursor) {
        const followerPos = new THREE.Vector3().fromArray(this.positionData, 0);
        const diff = new THREE.Vector3().copy(followerPos).sub(pos);
        let d = diff.length();
        const sumRadius = radius + this.sizeData[0] + 0.5; 
        if (d < sumRadius) {
          if (d === 0) {
              diff.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
              d = diff.length();
          }
          const correction = diff.normalize().multiplyScalar(sumRadius - d);
          pos.sub(correction);
          vel.sub(correction.multiplyScalar(0.3)); // Repulsion force
        }
      }

      // Boundaries (Safely guarded against negative bounds)
      const boundX = Math.max(0.1, maxX - radius);
      if (Math.abs(pos.x) > boundX) {
        pos.x = Math.sign(pos.x || 1) * boundX;
        vel.x *= -wallBounce;
      }
      const boundY = Math.max(0.1, maxY - radius);
      if (pos.y < -boundY) {
        pos.y = -boundY;
        vel.y *= -wallBounce;
      }
      const boundZ = Math.max(0.1, maxZ - radius);
      if (Math.abs(pos.z) > boundZ) {
        pos.z = Math.sign(pos.z || 1) * boundZ;
        vel.z *= -wallBounce;
      }

      pos.toArray(this.positionData, base);
      vel.toArray(this.velocityData, base);
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
  lightIntensity = 500, 
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
  
  // Total spheres = follower + labels.length + decorative
  const count = labels.length + 1 + 5; 
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;
    
    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Environment
    const scene = new THREE.Scene();
    const roomEnv = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;

    // Camera
    const camera = new THREE.PerspectiveCamera(35, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    // Using standard MeshPhysicalMaterial out of the box guarantees compilation, zero lag, and perfect high-gloss reflection
    const geometry = new THREE.SphereGeometry(1, 48, 48); // Optimized geometry scale
    const material = new THREE.MeshPhysicalMaterial({
      envMap: envTexture,
      metalness: 0.1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2, // Subtle glass effect
      ior: 1.5,
    });

    const imesh = new THREE.InstancedMesh(geometry, material, count);
    imesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(imesh);

    // Lights
    const ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(lightColor, lightIntensity);
    scene.add(pointLight);

    // Physics setup
    const maxX = 10;
    const maxY = 10;
    const maxZ = 1.0; 
    
    const config = {
      count, minSize, maxSize, gravity, friction, wallBounce, 
      maxVelocity, followCursor, maxX, maxY, maxZ
    };
    const physics = new PhysicsWorld(config);

    // Set Colors AND Calculate Sizes
    const threeColors = colors.map(c => new THREE.Color(c));
    const darkShade = new THREE.Color('#0A0F24');

    for (let i = 0; i < count; i++) {
       let color = darkShade;
       if (i === 0) {
           color = new THREE.Color(colors[0]); // Follower
           physics.sizeData[i] = 1.2;
       } else if (i <= labels.length) {
           const colorIndex = (i - 1) % threeColors.length;
           color = threeColors[colorIndex];
           
           // Slightly reduced sizes to prevent massive overlapping
           const word = labels[i - 1];
           const calculatedSize = 0.7 + (word.length * 0.1);
           physics.sizeData[i] = calculatedSize;
       } else {
           // Decorative spheres
           color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
           physics.sizeData[i] = THREE.MathUtils.randFloat(0.4, 0.8);
       }
       
      imesh.setColorAt(i, color);
    }
    imesh.instanceColor.needsUpdate = true;

    // Interaction Raycasting
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

    window.addEventListener('mousemove', updatePointer);
    window.addEventListener('touchstart', updatePointer);
    window.addEventListener('touchmove', updatePointer);

    // Debounced resize logic
    let resizeTimeout;
    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      
      const currentW = renderer.domElement.width / window.devicePixelRatio;
      const currentH = renderer.domElement.height / window.devicePixelRatio;
      
      if (Math.abs(currentW - w) < 2 && Math.abs(currentH - h) < 2) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const newFovRad = (camera.fov * Math.PI) / 180;
      const wHeight = 2 * Math.tan(newFovRad / 2) * camera.position.z;
      const wWidth = wHeight * camera.aspect;
      physics.config.maxX = wWidth / 2 - 0.2;
      // Provide a firm floor bound relative to the canvas
      physics.config.maxY = wHeight / 2 - 0.2;
    };
    
    // Initial call
    resize();

    const resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 100);
    });
    resizeObserver.observe(parent);

    // Animation Loop
    let animationFrameId;
    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(parent);

    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const vector = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isVisible) {
         // Prevent the clock from accumulating massive deltas while tabbed out or scrolled away
         clock.getDelta(); 
         return;
      }

      const delta = clock.getDelta();
      // Safe physics stepping
      physics.update(Math.min(delta, 0.05));

      for (let i = 0; i < count; i++) {
        dummy.position.fromArray(physics.positionData, i * 3);
        const s = physics.sizeData[i];
        
        if (i === 0 && !followCursor) {
          dummy.scale.setScalar(0);
        } else {
          dummy.scale.setScalar(s);
        }
        
        dummy.updateMatrix();
        imesh.setMatrixAt(i, dummy.matrix);
        
        if (i === 0) {
           pointLight.position.copy(dummy.position);
           pointLight.intensity = lightIntensity * (1 + 0.1 * Math.sin(clock.elapsedTime * 4));
        }

        // DOM Alignment
        if (i > 0 && i <= labels.length) {
            const domLabel = labelRefs.current[i - 1];
            if (domLabel) {
                // Ensure exact clone bounds
                vector.copy(dummy.position);
                vector.project(camera);

                const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
                const y = (vector.y * -0.5 + 0.5) * canvas.clientHeight;
                
                // Depth scale correction
                const zScale = Math.max(0.3, 1 - (vector.z * 0.05));
                const finalScale = 1.0 * zScale; 
                
                domLabel.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) scale(${finalScale})`;
            }
        }
      }
      imesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

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
      {/* Glossy 3D canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: 'none' }} />
      
      {/* HTML Labels strictly following physics coordinates */}
      <div className="absolute inset-0 pointer-events-none">
        {labels.map((label, index) => (
          <div
            key={label}
            ref={(el) => (labelRefs.current[index] = el)}
            className="absolute top-0 left-0 will-change-transform flex items-center justify-center"
            style={{
              transform: 'translate(-50%, -50%) translate3d(-1000px, -1000px, 0)', // start hidden
              width: 'max-content'
            }}
          >
            <span 
              className="text-white font-mono font-bold tracking-widest pointer-events-none" 
              style={{ 
                fontSize: '0.9rem', 
                textShadow: '0px 2px 5px rgba(0,0,0,0.9), 0px 0px 2px rgba(0,0,0,1)',
                padding: '0.5rem',
              }}
            >
                [{label}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallpitSkills;
