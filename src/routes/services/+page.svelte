<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import servicesData from '$lib/data/services.json'; // Import the service data

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    const services = servicesData.services;

    // Reusing the simple SVG icons from the homepage for consistency
    // Consider moving this to a $lib/utils/icons.js if used in more places
    const icons = {
        code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        gears: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, // Updated gears icon
        chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>`, // Updated chart icon
        brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.24a.5.5 0 0 0 .28.45l1.9 1.05a2.5 2.5 0 0 1 1.64 2.26V12a2.5 2.5 0 0 1-2.5 2.5h-1.86a.5.5 0 0 0-.45.28l-1.05 1.9A2.5 2.5 0 0 1 7.26 18H6a2.5 2.5 0 0 1-2.5-2.5v-1.86a.5.5 0 0 0-.28-.45l-1.9-1.05A2.5 2.5 0 0 1 2 9.74V7.5A2.5 2.5 0 0 1 4.5 5h1.24a.5.5 0 0 0 .45-.28l1.05-1.9A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v1.24a.5.5 0 0 1-.28.45l-1.9 1.05A2.5 2.5 0 0 0 8.18 9.5V12a2.5 2.5 0 0 0 2.5 2.5h1.86a.5.5 0 0 1 .45.28l1.05 1.9A2.5 2.5 0 0 0 16.74 18H18a2.5 2.5 0 0 0 2.5-2.5v-1.86a.5.5 0 0 1 .28-.45l1.9-1.05A2.5 2.5 0 0 0 22 9.74V7.5A2.5 2.5 0 0 0 19.5 5h-1.24a.5.5 0 0 1-.45-.28l-1.05-1.9A2.5 2.5 0 0 0 14.5 2Z"></path></svg>`
    };
</script>

<svelte:head>
  <title>Our Services - CNJM Technologies Inc.</title>
  <meta name="description" content="Explore the range of software development, automation, analytics, and AI services offered by CNJM Technologies Inc.">
</svelte:head>

<div class="services-page">
    <!-- Page Header -->
    <section class="page-header" in:fade={{ duration: 600 }}>
        <div class="header-content">
            <h1 in:fly={{ y: -30, duration: 500, delay: 200 }}>Our <span class="highlight">Services</span></h1>
            <p in:fly={{ y: 30, duration: 500, delay: 300 }}>
                We provide end-to-end technology solutions designed to accelerate your business growth, enhance efficiency, and drive innovation.
            </p>
        </div>
         <div class="header-bg-shape"></div>
    </section>

    <!-- Services Grid Section -->
    {#if mounted}
    <section class="services-grid-section" in:fade={{ duration: 600, delay: 400 }}>
        <div class="section-container">
            <div class="services-grid">
                {#each services as service, i}
                    <div class="service-card" in:fly={{ y: 50, duration: 500, delay: 500 + i * 100 }}>
                        <div class="card-header">
                            <div class="service-icon">
                                {@html icons[service.icon]}
                            </div>
                            <h2 class="service-title">{service.title}</h2>
                        </div>
                        <p class="service-description">{service.description}</p>
                        <div class="card-footer">
                            <a href="/hire-us?service={encodeURIComponent(service.title)}" class="btn-details">
                                Request Service <span class="arrow">→</span>
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" in:fade={{ duration: 600, delay: 800 }}>
         <div class="section-container cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how our expertise can align with your vision.</p>
            <a href="/hire-us" class="btn primary large">Get a Free Consultation</a>
         </div>
    </section>
    {/if}
</div>

<style>
    .services-page {
        padding-top: 60px; /* Adjust based on final fixed header height */
    }

    /* Page Header Styling */
    .page-header {
        padding: 6rem 2rem 8rem; /* Generous padding */
        background: linear-gradient(135deg, var(--dark) 0%, #1a1a1a 100%);
        text-align: center;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid #2a2a2a;
    }

    .header-content {
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }

     .page-header h1 {
        font-size: clamp(2.5rem, 6vw, 3.8rem);
        font-weight: 700;
        color: var(--text);
        margin-bottom: 1.5rem;
        line-height: 1.2;
    }

    .page-header .highlight {
        color: var(--primary);
    }

     .page-header p {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        color: var(--text-muted);
        line-height: 1.7;
        max-width: 650px;
        margin: 0 auto;
    }

    /* Subtle background shape for visual interest */
    .header-bg-shape {
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        width: 120%;
        max-width: 1500px;
        height: 150px;
        background-color: rgba(255, 107, 0, 0.03); /* Very subtle orange */
        border-radius: 50% / 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        z-index: 1;
        filter: blur(10px);
    }


    /* Services Grid Section Styling */
    .services-grid-section {
        padding: 5rem 0;
        background-color: var(--dark);
    }

    .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .services-grid {
        display: grid;
        /* Adjust minmax for desired card size and number per row */
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2.5rem; /* Increased gap */
    }

    .service-card {
        background-color: var(--dark-light);
        border-radius: 12px;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        border: 1px solid #2a2a2a;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        position: relative;
        overflow: hidden; /* For pseudo-elements if added later */
    }

    .service-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 107, 0, 0.3);
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .service-icon {
        flex-shrink: 0;
        color: var(--primary);
        background-color: rgba(255, 107, 0, 0.1);
        width: 60px; /* Larger icon background */
        height: 60px;
        border-radius: 12px; /* Match card radius */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
    }

     .service-card:hover .service-icon {
         background-color: rgba(255, 107, 0, 0.15);
     }

    .service-icon :global(svg) {
        width: 28px; /* Slightly larger icon */
        height: 28px;
    }

    .service-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
    }

    .service-description {
        font-size: 1rem;
        color: var(--text-muted);
        line-height: 1.7;
        flex-grow: 1; /* Ensure description takes available space */
        margin-bottom: 2rem;
    }

    .card-footer {
        margin-top: auto; /* Push footer to the bottom */
    }

    .btn-details {
        display: inline-flex; /* Use flex for icon alignment */
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        border-radius: 6px;
        background-color: rgba(255, 107, 0, 0.1);
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        border: 1px solid rgba(255, 107, 0, 0.2);
        transition: all 0.3s ease;
    }

    .btn-details:hover {
        background-color: var(--primary);
        color: white;
        border-color: var(--primary);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(255, 107, 0, 0.2);
    }

     .btn-details .arrow {
        transition: transform 0.2s ease;
     }

     .btn-details:hover .arrow {
        transform: translateX(4px);
     }

    /* CTA Section Styling */
    .cta-section {
         padding: 5rem 0;
         background-color: var(--dark-light);
         border-top: 1px solid #2a2a2a;
         text-align: center;
    }

    .cta-content h2 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        color: var(--text);
        margin-bottom: 1rem;
    }

    .cta-content p {
        color: var(--text-muted);
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    /* Re-using button styles from Hero/Homepage */
     .btn {
        display: inline-block;
        padding: 0.8rem 2rem;
        border-radius: 4px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1rem;
        cursor: pointer;
    }

    .btn.primary {
        background-color: var(--primary);
        color: white;
        border: none;
    }

    .btn.primary:hover {
        background-color: var(--primary-light);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
    }

    /* Add a size modifier for potentially larger buttons */
    .btn.large {
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .page-header {
            padding: 5rem 1rem 6rem;
        }
        .services-grid-section {
            padding: 4rem 0;
        }
        .section-container {
            padding: 0 1rem;
        }
        .services-grid {
            grid-template-columns: 1fr; /* Stack cards on smaller screens */
            gap: 2rem;
        }
        .service-card {
             padding: 2rem;
        }
        .card-header {
            flex-direction: column; /* Stack icon and title */
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
        }
         .service-title {
             font-size: 1.3rem;
         }
        .cta-section {
            padding: 4rem 1rem;
        }
    }

</style>