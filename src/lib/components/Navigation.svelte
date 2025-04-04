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
        <img src="/images/logo.png" alt="CNJM Technologies Inc." />
        <span>CNJM<span class="highlight">Technologies</span></span>
      </a>
      
      <nav class:active={isMenuOpen}>
        <ul>
          <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
          <li><a href="/about" class:active={$page.url.pathname === '/about'}>Know Us</a></li>
          <li><a href="/services" class:active={$page.url.pathname === '/services'}>Services</a></li>
          <li><a href="/projects" class:active={$page.url.pathname === '/projects'}>Projects</a></li>
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