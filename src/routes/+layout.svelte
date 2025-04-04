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