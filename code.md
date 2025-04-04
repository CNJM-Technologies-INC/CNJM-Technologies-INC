I'll help you create a beautiful Svelte application with all the features you've requested. Let's break this down step by step to make sure we create something that truly embodies beautiful technology with your dark theme and orange accents.

Based on the images you shared, I can see you have a Svelte project structure set up and you're hosting multiple projects on Vercel through CNJM Technologies Inc.

Let's start by creating the core structure for your application:

```plaintext
.svelte-kit/
node_modules/
src/
  ├── lib/
  │   ├── components/
  │   │   ├── Navigation.svelte
  │   │   ├── Footer.svelte
  │   │   ├── BlogCard.svelte
  │   │   ├── ContactForm.svelte
  │   │   ├── ThreeDScene.svelte
  │   │   └── Hero.svelte
  │   ├── data/
  │   │   ├── blogs.json
  │   │   └── services.json
  │   ├── utils/
  │   │   └── api.js
  │   └── store/
  │       └── blogStore.js
  ├── routes/
  │   ├── +layout.svelte
  │   ├── +page.svelte
  │   ├── blog/
  │   │   ├── +page.svelte
  │   │   └── [slug]/+page.svelte
  │   └── hire-us/
  │       └── +page.svelte
  ├── app.css
  └── app.html
static/
  ├── images/
  │   └── logo.svg
  └── fonts/
.gitignore
.npmrc
jsconfig.json
package-lock.json
package.json
svelte.config.js
vite.config.js

```

Now, let's build the core components of your application, starting with the global layout:

```svelte
<script>
  import { onMount, afterUpdate } from 'svelte';
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { fly, fade } from 'svelte/transition';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="app-container">
  <Navigation />
  
  <main>
    {#if mounted}
      <div in:fade={{ duration: 300, delay: 300 }}>
        <slot />
      </div>
    {/if}
  </main>
  
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    overflow-x: hidden;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  :global(:root) {
    --primary: #FF6B00;
    --primary-light: #FF8A33;
    --dark: #121212;
    --dark-light: #1E1E1E;
    --text: #e0e0e0;
    --text-muted: #a0a0a0;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  @media (min-width: 768px) {
    main {
      padding: 0 2rem;
    }
  }
  
  @media (min-width: 1024px) {
    main {
      padding: 0 4rem;
    }
  }
</style>

```

Next, let's create the navigation component:

```svelte
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let isMenuOpen = false;
  let scrollY;
  let navbarTransparent = true;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  $: if (typeof window !== 'undefined') {
    navbarTransparent = scrollY < 50;
  }
</script>

<svelte:window bind:scrollY />

<header class:scrolled={!navbarTransparent}>
  <div class="container">
    <a href="/" class="logo">
      <img src="/images/logo.svg" alt="CNJM Technologies Inc." />
      <span>CNJM<span class="highlight">Tech</span></span>
    </a>
    
    <nav class:active={isMenuOpen}>
      <ul>
        <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
        <li><a href="/services" class:active={$page.url.pathname === '/services'}>Services</a></li>
        <li><a href="/blog" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a></li>
        <li><a href="/hire-us" class:active={$page.url.pathname === '/hire-us'}>Hire Us</a></li>
      </ul>
    </nav>
    
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      <span class:open={isMenuOpen}></span>
    </button>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    background-color: transparent;
  }
  
  header.scrolled {
    background-color: rgba(18, 18, 18, 0.95);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    max-width: 1440px;
    margin: 0 auto;
  }
  
  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--text);
    font-weight: 700;
    font-size: 1.5rem;
    gap: 0.5rem;
  }
  
  .logo img {
    height: 40px;
  }
  
  .highlight {
    color: var(--primary);
  }
  
  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav a {
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    position: relative;
  }
  
  nav a:hover, nav a.active {
    color: var(--primary);
  }
  
  nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }
  
  nav a:hover::after, nav a.active::after {
    width: 100%;
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 20px;
    position: relative;
  }
  
  .menu-toggle span, .menu-toggle span::before, .menu-toggle span::after {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: var(--text);
    transition: all 0.3s ease;
  }
  
  .menu-toggle span {
    top: 50%;
    transform: translateY(-50%);
  }
  
  .menu-toggle span::before {
    content: '';
    top: -8px;
  }
  
  .menu-toggle span::after {
    content: '';
    bottom: -8px;
  }
  
  .menu-toggle span.open {
    background-color: transparent;
  }
  
  .menu-toggle span.open::before {
    transform: rotate(45deg) translate(5px, 5px);
    background-color: var(--primary);
  }
  
  .menu-toggle span.open::after {
    transform: rotate(-45deg) translate(5px, -5px);
    background-color: var(--primary);
  }
  
  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
      z-index: 1001;
    }
    
    nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 300px;
      height: 100vh;
      background-color: var(--dark-light);
      transition: right 0.3s ease;
      padding: 6rem 2rem 2rem;
    }
    
    nav.active {
      right: 0;
    }
    
    nav ul {
      flex-direction: column;
      gap: 2rem;
    }
    
    nav a {
      font-size: 1.25rem;
    }
  }
</style>

```

Now, let's create an immersive hero section with a 3D element for the main page:

```svelte
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ThreeDScene from './ThreeDScene.svelte';
  
  let loaded = false;
  
  onMount(() => {
    loaded = true;
  });
</script>

<section class="hero">
  <div class="hero-content">
    {#if loaded}
      <h1 in:fly={{ y: 50, duration: 800, delay: 200 }}>
        Innovative Software Solutions for a <span class="highlight">Digital World</span>
      </h1>
      <p in:fly={{ y: 50, duration: 800, delay: 400 }}>
        We create elegant code solutions that drive innovation, enhance productivity, and solve real-world problems.
      </p>
      <div class="cta-buttons" in:fly={{ y: 50, duration: 800, delay: 600 }}>
        <a href="/hire-us" class="btn primary">Hire Us</a>
        <a href="/blog" class="btn outline">Read Our Blog</a>
      </div>
    {/if}
  </div>
  
  <div class="hero-visual">
    <ThreeDScene />
  </div>
  
  <div class="hero-scroll" in:fade={{ delay: 1200, duration: 800 }}>
    <span>Scroll Down</span>
    <div class="scroll-icon">
      <span class="mouse">
        <span class="wheel"></span>
      </span>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 0 3rem;
    overflow: hidden;
  }
  
  .hero-content {
    width: 100%;
    max-width: 600px;
    z-index: 10;
    padding: 0 1rem;
  }
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  
  .highlight {
    color: var(--primary);
    position: relative;
  }
  
  .highlight::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 107, 0, 0.3);
    z-index: -1;
  }
  
  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--text-muted);
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  
  .btn.primary {
    background-color: var(--primary);
    color: white;
  }
  
  .btn.primary:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
  }
  
  .btn.outline {
    border: 2px solid var(--primary);
    color: var(--primary);
    background-color: transparent;
  }
  
  .btn.outline:hover {
    background-color: rgba(255, 107, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .hero-visual {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    height: 100%;
    z-index: 1;
  }
  
  .hero-scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.875rem;
  }
  
  .scroll-icon {
    display: flex;
    justify-content: center;
  }
  
  .mouse {
    width: 26px;
    height: 42px;
    border: 2px solid var(--text-muted);
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  
  .wheel {
    width: 4px;
    height: 8px;
    background-color: var(--primary);
    border-radius: 2px;
    animation: scroll 1.5s infinite;
  }
  
  @keyframes scroll {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(12px);
      opacity: 0;
    }
  }
  
  @media (max-width: 1024px) {
    .hero-visual {
      width: 50%;
      opacity: 0.7;
    }
  }
  
  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      text-align: center;
      padding-top: 8rem;
    }
    
    .hero-content {
      padding: 0 1.5rem;
    }
    
    .hero-visual {
      position: relative;
      width: 100%;
      height: 40vh;
      right: auto;
      top: auto;
      transform: none;
      margin-top: 2rem;
    }
    
    .cta-buttons {
      justify-content: center;
    }
  }
</style>

```

Now, let's create the 3D scene component using Three.js for the visual impact:

```svelte
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

```

Let's create the blog functionality. First, we'll create a JSON structure for blog data:

```json
{
  "blogs": [
    {
      "id": "digital-revolution",
      "title": "Welcome to Our Digital Revolution",
      "date": "2025-04-01",
      "author": "CNJM Team",
      "excerpt": "At CNJM Technologies Inc., we're not just another software company. We're problem solvers, innovators, and efficiency enthusiasts.",
      "image": "/images/blog/revolution.jpg",
      "content": [
        {
          "type": "paragraph",
          "content": "At CNJM Technologies Inc., we're not just another software company. We're problem solvers, innovators, and efficiency enthusiasts. Our mission? To streamline your redundant activities and tackle complex challenges with elegant code solutions."
        },
        {
          "type": "heading",
          "content": "What Sets Us Apart?"
        },
        {
          "type": "paragraph",
          "content": "In a world drowning in digital noise, we stand out by focusing on what truly matters: your unique challenges. We don't believe in one-size-fits-all solutions. Instead, we dive deep into understanding your specific needs and craft bespoke software that not only meets but exceeds your expectations."
        },
        {
          "type": "quote",
          "content": "Code is like humor. When you have to explain it, it's bad.",
          "author": "Cory House"
        },
        {
          "type": "heading",
          "content": "Our Approach: Code with Purpose"
        },
        {
          "type": "paragraph",
          "content": "Every line of code we write serves a purpose. We're not just building software; we're creating digital ecosystems that:"
        },
        {
          "type": "list",
          "items": [
            "Automate repetitive tasks",
            "Enhance productivity",
            "Drive innovation",
            "Solve real-world problems"
          ]
        },
        {
          "type": "heading",
          "content": "Our Services"
        },
        {
          "type": "paragraph",
          "content": "We leverage cutting-edge technologies to bring your ideas to life. From Python and Java to JavaScript and beyond, our tech stack is diverse and powerful."
        },
        {
          "type": "image",
          "url": "/images/blog/code.jpg",
          "alt": "Clean code on a computer screen",
          "caption": "Clean, efficient code is at the heart of everything we do."
        },
        {
          "type": "paragraph",
          "content": "Join us on this journey as we continue to push the boundaries of what's possible with software. The digital revolution is here, and we're leading the charge."
        }
      ],
      "tags": ["company", "mission", "innovation"]
    },
    {
      "id": "ai-future",
      "title": "The Future of AI in Business Applications",
      "date": "2025-03-25",
      "author": "James Mwangi",
      "excerpt": "Artificial Intelligence is revolutionizing how businesses operate. Here's our take on where it's headed and how to prepare.",
      "image": "/images/blog/ai-future.jpg",
      "content": [
        {
          "type": "paragraph",
          "content": "Artificial Intelligence has moved beyond the realm of science fiction and into the core of business operations. As technology continues to evolve at an unprecedented pace, businesses that adapt quickly will thrive while those that hesitate risk being left behind."
        },
        {
          "type": "heading",
          "content": "AI's Growing Impact"
        },
        {
          "type": "paragraph",
          "content": "From customer service chatbots to predictive analytics, AI is transforming how businesses interact with customers and make decisions. The ability to process vast amounts of data quickly and accurately is giving businesses insights that were previously impossible to obtain."
        },
        {
          "type": "quote",
          "content": "Artificial Intelligence is the new electricity. Just as electricity transformed almost everything 100 years ago, today I actually have a hard time thinking of an industry that I don't think AI will transform in the next several years.",
          "author": "Andrew Ng"
        },
        {
          "type": "image",
          "url": "/images/blog/ai-chart.jpg",
          "alt": "Chart showing AI adoption rates across industries",
          "caption": "AI adoption is accelerating across all industries."
        },
        {
          "type": "heading",
          "content": "Getting Started with AI"
        },
        {
          "type": "paragraph",
          "content": "For businesses looking to implement AI solutions, the journey often begins with identifying specific problems that AI can help solve. Rather than adopting AI for its own sake, successful implementations focus on addressing real business challenges."
        },
        {
          "type": "list",
          "items": [
            "Start small and focus on specific use cases",
            "Ensure you have the right data infrastructure in place",
            "Invest in talent that understands both AI and your business",
            "Be prepared to iterate and learn from early implementations"
          ]
        },
        {
          "type": "paragraph",
          "content": "At CNJM Technologies, we're helping businesses navigate the AI landscape and implement solutions that drive real value. Contact us to learn how we can assist your organization in leveraging the power of AI."
        }
      ],
      "tags": ["AI", "business", "technology", "innovation"]
    }
  ]
}

```

Now, let's create the blog listing and detail pages:
Let me continue with the blog card component:

```svelte
<script>
  export let blog;
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric' 
    });
  }
</script>

<a href={`/blog/${blog.id}`} class="blog-card">
  <div class="image-container">
    <img src={blog.image} alt={blog.title} />
    <div class="date">{formatDate(blog.date)}</div>
  </div>
  <div class="content">
    <h3>{blog.title}</h3>
    <p>{blog.excerpt}</p>
    <div class="meta">
      <span class="author">By {blog.author}</span>
      <div class="tags">
        {#each blog.tags.slice(0, 2) as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</a>

<style>
  .blog-card {
    display: flex;
    flex-direction: column;
    background-color: var(--dark-light);
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    text-decoration: none;
    color: var(--text);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .blog-card:hover img {
    transform: scale(1.05);
  }
  
  .date {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-top-left-radius: 8px;
  }
  
  .content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }
  
  p {
    margin: 0 0 1.5rem;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-muted);
    flex: 1;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  
  .author {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .tags {
    display: flex;
    gap: 0.5rem;
  }
  
  .tag {
    font-size: 0.75rem;
    background-color: rgba(255, 107, 0, 0.15);
    color: var(--primary);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
</style>

```

Now, let's create the blog page that will list all blogs:

```svelte
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import BlogCard from '$lib/components/BlogCard.svelte';
  
  let blogs = [];
  let loaded = false;
  let searchQuery = '';
  let activeTag = '';
  let allTags = [];
  
  // Load blog data
  onMount(async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      blogs = data.blogs;
      
      // Extract all unique tags
      const tagSet = new Set();
      blogs.forEach(blog => {
        blog.tags.forEach(tag => tagSet.add(tag));
      });
      allTags = Array.from(tagSet);
      
      loaded = true;
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  });
  
  // Filter blogs based on search and tag
  $: filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = activeTag === '' || blog.tags.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });
  
  function setActiveTag(tag) {
    activeTag = activeTag === tag ? '' : tag;
  }
</script>

<svelte:head>
  <title>Blog - CNJM Technologies Inc.</title>
</svelte:head>

<section class="blog-header">
  <div class="container">
    <h1>Our Blog</h1>
    <p>Insights, tutorials, and updates from our team</p>
  </div>
</section>

<section class="blog-filters">
  <div class="search-container">
    <input 
      type="text" 
      placeholder="Search articles..." 
      bind:value={searchQuery}
      aria-label="Search blogs"
    />
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
  
  <div class="tags-filter">
    {#each allTags as tag}
      <button 
        class="tag-button" 
        class:active={activeTag === tag}
        on:click={() => setActiveTag(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
</section>

<section class="blog-grid">
  {#if loaded}
    {#if filteredBlogs.length > 0}
      {#each filteredBlogs as blog, i}
        <div
          in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          out:fade={{ duration: 200 }}
        >
          <BlogCard {blog} />
        </div>
      {/each}
    {:else}
      <div class="no-results" in:fade>
        <p>No blogs found matching your criteria.</p>
        <button on:click={() => { searchQuery = ''; activeTag = ''; }}>
          Clear filters
        </button>
      </div>
    {/if}
  {:else}
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading blogs...</p>
    </div>
  {/if}
</section>

<style>
  .blog-header {
    padding: 8rem 0 4rem;
    background: linear-gradient(to right, var(--dark), var(--dark-light));
    text-align: center;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .blog-header p {
    font-size: 1.25rem;
    color: var(--text-muted);
  }
  
  .blog-filters {
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .search-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  
  .search-container input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border-radius: 8px;
    border: none;
    background-color: var(--dark-light);
    color: var(--text);
    font-size: 1rem;
  }
  
  .search-container svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }
  
  .tags-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .tag-button {
    background-color: var(--dark-light);
    color: var(--text-muted);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }
  
  .tag-button:hover {
    background-color: rgba(255, 107, 0, 0.1);
    color: var(--primary);
  }
  
  .tag-button.active {
    background-color: var(--primary);
    color: white;
  }
  
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem 1.5rem 6rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 0;
  }
  
  .no-results p {
    margin-bottom: 1.5rem;
    color: var(--text-muted);
  }
  
  .no-results button {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }
  
  .no-results button:hover {
    background-color: var(--primary-light);
  }
  
  .loading {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 0;
    gap: 1.5rem;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 107, 0, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    .blog-header {
      padding: 6rem 0 3rem;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    .blog-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem 1rem 4rem;
    }
  }
</style>

```

Now, let's create the individual blog post page:

```svelte
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  
  let blog = null;
  let loaded = false;
  let relatedBlogs = [];
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric' 
    });
  }
  
  // Load blog data
  onMount(async () => {
    try {
      const slug = $page.params.slug;
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();
      blog = data;
      
      // Get related blogs
      const allBlogsRes = await fetch('/api/blogs');
      const allBlogs = await allBlogsRes.json();
      
      relatedBlogs = allBlogs.blogs
        .filter(b => b.id !== blog.id)
        .filter(b => b.tags.some(tag => blog.tags.includes(tag)))
        .slice(0, 3);
      
      loaded = true;
    } catch (error) {
      console.error('Error loading blog:', error);
    }
  });
</script>

<svelte:head>
  {#if blog}
    <title>{blog.title} - CNJM Technologies Inc.</title>
    <meta name="description" content={blog.excerpt} />
  {:else}
    <title>Blog - CNJM Technologies Inc.</title>
  {/if}
</svelte:head>

{#if loaded && blog}
  <article class="blog-post">
    <header in:fade={{ duration: 500 }}>
      <div class="container">
        <div class="meta">
          <span class="date">{formatDate(blog.date)}</span>
          <span class="divider">•</span>
          <span class="author">By {blog.author}</span>
        </div>
        <h1>{blog.title}</h1>
        <div class="tags">
          {#each blog.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    </header>
    
    <div class="featured-image" in:fade={{ duration: 800, delay: 300 }}>
      <img src={blog.image} alt={blog.title} />
    </div>
    
    <div class="content" in:fade={{ duration: 800, delay: 600 }}>
      <div class="container">
        {#each blog.content as section, i}
          {#if section.type === 'paragraph'}
            <p in:fly={{ y: 20, duration: 500, delay: i * 100 }}>{section.content}</p>
          {:else if section.type === 'heading'}
            <h2 in:fly={{ y: 20, duration: 500, delay: i * 100 }}>{section.content}</h2>
          {:else if section.type === 'quote'}
            <blockquote in:fly={{ y: 20, duration: 500, delay: i * 100 }}>
              <p>"{section.content}"</p>
              <cite>— {section.author}</cite>
            </blockquote>
          {:else if section.type === 'list'}
            <ul in:fly={{ y: 20, duration: 500, delay: i * 100 }}>
              {#each section.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          {:else if section.type === 'image'}
            <figure in:fade={{ duration: 800, delay: i * 100 }}>
              <img src={section.url} alt={section.alt} />
              {#if section.caption}
                <figcaption>{section.caption}</figcaption>
              {/if}
            </figure>
          {/if}
        {/each}
      </div>
    </div>
    
    {#if relatedBlogs.length > 0}
      <div class="related" in:fade={{ duration: 800, delay: 800 }}>
        <div class="container">
          <h3>Related Articles</h3>
          <div class="related-grid">
            {#each relatedBlogs as relatedBlog}
              <a href={`/blog/${relatedBlog.id}`} class="related-card">
                <div class="thumb">
                  <img src={relatedBlog.image} alt={relatedBlog.title} />
                </div>
                <div class="info">
                  <h4>{relatedBlog.title}</h4>
                  <span class="date">{formatDate(relatedBlog.date)}</span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </article>
{:else}
  <div class="loading">
    <div class="spinner"></div>
    <p>Loading article...</p>
  </div>
{/if}

<style>
  .blog-post {
    padding-bottom: 6rem;
  }
  
  header {
    padding: 8rem 0 4rem;
    background: linear-gradient(to right, var(--dark), var(--dark-light));
    text-align: center;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .meta {
    color: var(--text-muted);
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  .divider {
    margin: 0 0.5rem;
  }
  
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .tags {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .tag {
    background-color: rgba(255, 107, 0, 0.15);
    color: var(--primary);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .featured-image {
    width: 100%;
    height: 50vh;
    margin-bottom: 3rem;
    overflow: hidden;
  }
  
  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .content {
    padding: 0 1.5rem;
  }
  
  .content p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: var(--text);
  }
  
  .content h2 {
    font-size: 1.875rem;
    margin: 3rem 0 1.5rem;
    color: var(--primary);
  }
  
  blockquote {
    border-left: 4px solid var(--primary);
    padding-left: 1.5rem;
    margin: 2.5rem 0;
    font-style: italic;
  }
  
  blockquote p {
    font-size: 1.25rem;
    color: var(--text);
  }
  
  blockquote cite {
    font-size: 1rem;
    color: var(--text-muted);
    display: block;
    margin-top: 1rem;
  }
  
  ul {
    margin: 1.5rem 0 2.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    line-height: 1.6;
  }
  
  figure {
    margin: 2.5rem 0;
  }
  
  figure img {
    width: 100%;
    border-radius: 8px;
  }
  
  figcaption {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    text-align: center;
  }
  
  .related {
    margin-top: 5rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .related h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .related-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--text);
    transition: transform 0.3s ease;
  }
  
  .related-card:hover {
    transform: translateY(-5px);
  }
  
  .thumb {
    width: 100%;
    height: 0;
    padding-bottom: 60%;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .thumb img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .related-card:hover .thumb img {
    transform: scale(1.05);
  }
  
  .info h4 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .info .date {
    font-size: 0.875rem;
    color: var(--text-muted);
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    padding: 6rem 0;
    gap: 1.5rem;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 107, 0, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    header {
      padding: 6rem 0 3rem;
    }
    
    .featured-image {
      height: 30vh;
    }
    
    .related-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>

```

Let's create the contact form for the "Hire Us" section:

```svelte
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let name = '';
  let email = '';
  let company = '';
  let projectType = '';
  let budget = '';
  let description = '';
  let submitting = false;
  let submitted = false;
  let error = '';
  
  const projectTypes = [
    'Custom Software Development',
    'Web Application',
    'Mobile Application',
    'Data Analytics',
    'AI/Machine Learning',
    'Process Automation',
    'Other'
  ];
  
  const budgetRanges = [
    'Less than $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];
  
  async function handleSubmit() {
    if (!name || !email || !description) {
      error = 'Please fill in all required fields.';
      return;
    }
    
    error = '';
    submitting = true;
    
    try {
      // In a real app, this would be an API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, company, projectType, budget, description })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      submitting = false;
      submitted = true;
      resetForm();
    } catch (err) {
      submitting = false;
      error = 'Failed to submit your request. Please try again.';
      console.error('Error submitting form:', err);
    }
  }
  
  function resetForm() {
    name = '';
    email = '';
    company = '';
    projectType = '';
    budget = '';
    description = '';
  }
</script>

<div class="contact-form-container">
  {#if !submitted}
    <form on:submit|preventDefault={handleSubmit} class="contact-form">
      <div class="form-header">
        <h2>Tell us about your project</h2>
        <p>Fill out the form below and we'll get back to you within 24 hours.</p>
      </div>
      
      {#if error}
        <div class="error" in:fade={{ duration: 300 }}>
          {error}
        </div>
      {/if}
      
      <div class="form-grid">
        <div class="form-group">
          <label for="name">Name <span class="required">*</span></label>
          <input 
            type="text" 
            id="name" 
            bind:value={name} 
            required 
            disabled={submitting}
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email <span class="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            required 
            disabled={submitting}
          />
        </div>
        
        <div class="form-group">
          <label for="company">Company</label>
          <input 
            type="text" 
            id="company" 
            bind:value={company} 
            disabled={submitting}
          />
        </div>
        
        <div class="form-group">
          <label for="projectType">Project Type</label>
          <select id="projectType" bind:value={projectType} disabled={submitting}>
            <option value="">Select a project type</option>
            {#each projectTypes as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        
        <div class="form-group">
          <label for="budget">Budget</label>
          <select id="budget" bind:value={budget} disabled={submitting}>
            <option value="">Select a budget range</option>
            {#each budgetRanges as range}
              <option value={range}>{range}</option>
            {/each}
          </select>
        </div>
        
        <div class="form-group full-width">
          <label for="description">Project Description <span class="required">*</span></label>
          <textarea 
            id="description" 
            bind:value={description} 
            rows="6" 
            placeholder="Tell us about your project, goals, and challenges..." 
            required 
            disabled={submitting}
          ></textarea>
        </div>
        
        <div class="form-group full-width">
          <button 
            type="submit" 
            class="submit-btn" 
            disabled={submitting}
          >
            {#if submitting}
              <span class="spinner"></span>
              Submitting...
            {:else}
              Send Message
            {/if}
          </button>
        </div>
      </div>
    </form>
  {:else}
    <div class="success-message" in:fade={{ duration: 500 }}>
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2>Message Sent!</h2>
      <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
      <button 
        class="reset-btn"
        on:click={() => submitted = false}
      >
        Send Another Message
      </button>
    </div>
  {/if}
</div>

<style>
  .contact-form-container {
    background-color: var(--dark-light);
    border-radius: 10px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .form-header h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .form-header p {
    color: var(--text-muted);
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5
```