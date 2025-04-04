<script>
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    
    let container;
    let scene, camera, renderer, geometry, material, mesh;
    let particles = [];
    let clock = new THREE.Clock();
    let animationId;
    
    onMount(() => {
      init();
      animate();
      
      // Handle window resize
      const handleResize = () => {
        if (container && camera && renderer) {
          const width = container.clientWidth;
          const height = container.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        disposeScene();
      };
    });
    
    function init() {
      // Create scene
      scene = new THREE.Scene();
      
      // Create camera
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 20;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xff6b00, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);
      
      // Create geometry and particles
      createGeometry();
    }
    
    function createGeometry() {
      // Create main geometry
      geometry = new THREE.IcosahedronGeometry(8, 1);
      material = new THREE.MeshPhongMaterial({
        color: 0xff6b00,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      // Create particles
      const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const particleMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b00,
        emissive: 0xff6b00,
        emissiveIntensity: 0.5
      });
      
      for (let i = 0; i < 100; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const radius = 8 + Math.random() * 6;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        particle.userData = {
          originalPosition: particle.position.clone(),
          speed: Math.random() * 0.02 + 0.01,
          amplitude: Math.random() * 0.5 + 0.5,
          phase: Math.random() * Math.PI * 2
        };
        
        scene.add(particle);
        particles.push(particle);
      }
    }
    
    function animate() {
      animationId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate main mesh
      if (mesh) {
        mesh.rotation.x += 0.05 * delta;
        mesh.rotation.y += 0.08 * delta;
      }
      
      // Animate particles
      particles.forEach(particle => {
        const data = particle.userData;
        const amplitude = data.amplitude;
        const speed = data.speed;
        const phase = data.phase;
        
        // Apply oscilating movement based on sine wave
        particle.position.x = data.originalPosition.x + Math.sin(elapsedTime * speed + phase) * amplitude;
        particle.position.y = data.originalPosition.y + Math.cos(elapsedTime * speed + phase) * amplitude;
        particle.position.z = data.originalPosition.z + Math.sin(elapsedTime * speed + phase + Math.PI/2) * amplitude;
        
        // Pulse size
        const scale = 0.75 + Math.sin(elapsedTime * 2 + phase) * 0.25;
        particle.scale.set(scale, scale, scale);
      });
      
      renderer.render(scene, camera);
    }
    
    function disposeScene() {
      if (renderer) {
        renderer.dispose();
        
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        
        particles.forEach(particle => {
          if (particle.geometry) particle.geometry.dispose();
          if (particle.material) particle.material.dispose();
          scene.remove(particle);
        });
        
        if (mesh) scene.remove(mesh);
        particles = [];
      }
    }
    
    onDestroy(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      disposeScene();
    });
  </script>
  
  <div class="three-scene" bind:this={container}></div>
  
  <style>
    .three-scene {
      width: 100%;
      height: 100%;
    }
  </style>