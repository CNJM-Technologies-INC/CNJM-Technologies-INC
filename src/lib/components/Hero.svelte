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
    <div class="hero-visual">
      <ThreeDScene />
    </div>
    
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