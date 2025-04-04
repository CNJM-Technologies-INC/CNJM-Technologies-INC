<script>
    import ContactForm from '$lib/components/ContactForm.svelte';
    import { fly } from 'svelte/transition';
  </script>
  
  <svelte:head>
    <title>Hire Us - CNJM Technologies Inc.</title>
    <meta name="description" content="Contact CNJM Technologies Inc. to discuss your software development project needs.">
  </svelte:head>
  
  <div class="hire-us-page" in:fly={{ y: 30, duration: 500, delay: 300 }}>
    <section class="page-header">
      <h1>Let's Build Something Great Together</h1>
      <p>Ready to turn your ideas into reality? We're here to help.</p>
    </section>
  
    <ContactForm />
  </div>
  
  <style>
    .hire-us-page {
      padding-top: 8rem; /* Account for fixed nav */
    }
  
    .page-header {
      text-align: center;
      margin-bottom: 4rem;
    }
  
    .page-header h1 {
      font-size: clamp(2.2rem, 5vw, 3rem);
      margin-bottom: 1rem;
      color: var(--text);
    }
  
    .page-header p {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }
  </style>