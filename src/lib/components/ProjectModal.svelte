<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    export let project; // The project object passed in

    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }

    // Handle Escape key press
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            close();
        }
        // Basic focus trapping (optional but recommended for accessibility)
        // Add more robust focus trapping if needed
        if (event.key === 'Tab') {
            // Simplified: just prevents tabbing out for now
            // A real implementation needs to track first/last focusable elements
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeydown);
        // Restore background scrolling
        document.body.style.overflow = '';
    });

    const hasValidLink = project.link && project.link !== '#';

    // Simple image navigation (optional)
    let currentScreenshotIndex = 0;
    $: currentScreenshot = project.screenshots?.[currentScreenshotIndex];

    function nextScreenshot() {
        if (project.screenshots && project.screenshots.length > 1) {
            currentScreenshotIndex = (currentScreenshotIndex + 1) % project.screenshots.length;
        }
    }
     function prevScreenshot() {
        if (project.screenshots && project.screenshots.length > 1) {
            currentScreenshotIndex = (currentScreenshotIndex - 1 + project.screenshots.length) % project.screenshots.length;
        }
    }

</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    class="modal-overlay"
    on:click|self={close}
    transition:fade={{ duration: 250, easing: sineInOut }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
>
    <div class="modal-container" transition:scale={{ duration: 300, delay: 100, opacity: 0.5, start: 0.9, easing: sineInOut }}>
        <button class="close-button" on:click={close} aria-label="Close project details">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="modal-content">
            <h2 id="modal-title" class="project-title">{project.title}</h2>

            {#if project.role || project.duration}
            <p class="meta-info">
                {#if project.role}<span>Role: <strong>{project.role}</strong></span>{/if}
                {#if project.role && project.duration}<span class="divider">|</span>{/if}
                {#if project.duration}<span>Duration: <strong>{project.duration}</strong></span>{/if}
            </p>
            {/if}

            <p class="detailed-description">{project.detailedDescription}</p>

            {#if project.features && project.features.length > 0}
            <div class="detail-section">
                <h4>Key Features</h4>
                <ul class="features-list">
                    {#each project.features as feature}
                        <li>{feature}</li>
                    {/each}
                </ul>
            </div>
            {/if}

             {#if project.technologies && project.technologies.length > 0}
             <div class="detail-section">
                <h4>Technologies Used</h4>
                <div class="tech-list">
                    {#each project.technologies as tech}
                        <span class="tech-tag">{tech}</span>
                    {/each}
                </div>
            </div>
            {/if}

            {#if project.screenshots && project.screenshots.length > 0}
                <div class="detail-section screenshots-section">
                    <h4>Screenshots</h4>
                    <div class="screenshot-viewer">
                       {#if project.screenshots.length > 1}
                        <button class="nav-button prev" on:click={prevScreenshot} aria-label="Previous screenshot">‹</button>
                       {/if}
                       {#key currentScreenshot} <!-- Re-render img on change -->
                            <img
                                src={currentScreenshot}
                                alt="{project.title} screenshot {currentScreenshotIndex + 1}"
                                class="screenshot-image"
                                in:fade={{ duration: 200 }}
                            />
                       {/key}
                       {#if project.screenshots.length > 1}
                        <button class="nav-button next" on:click={nextScreenshot} aria-label="Next screenshot">›</button>
                        {/if}
                    </div>
                     {#if project.screenshots.length > 1}
                     <div class="screenshot-dots">
                         {#each project.screenshots as _, i}
                             <button
                                 class="dot"
                                 class:active={i === currentScreenshotIndex}
                                 on:click={() => currentScreenshotIndex = i}
                                 aria-label="View screenshot {i + 1}"
                             ></button>
                         {/each}
                     </div>
                     {/if}
                </div>
            {/if}


             {#if hasValidLink}
                 <div class="detail-section link-section">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" class="btn primary">
                        Visit Live Project
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                 </div>
             {/if}

        </div>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8); /* Darker overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 1rem; /* Padding for small screens */
    }

    .modal-container {
        background-color: var(--dark-light);
        border-radius: 12px;
        padding: 2.5rem 3rem; /* Generous padding */
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 1001;
        max-width: 800px; /* Max width */
        width: 95%;
        max-height: 90vh; /* Max height */
        overflow-y: auto; /* Enable scrolling for content */
        border: 1px solid #333;
    }
    /* Custom scrollbar for modal */
    .modal-container::-webkit-scrollbar {
      width: 8px;
    }
    .modal-container::-webkit-scrollbar-track {
      background: #2a2a2a;
      border-radius: 4px;
    }
    .modal-container::-webkit-scrollbar-thumb {
      background-color: var(--primary);
      border-radius: 4px;
       border: 2px solid #2a2a2a;
    }

    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0.5rem;
        line-height: 0; /* Prevents button height issues */
        border-radius: 50%;
        transition: color 0.2s ease, background-color 0.2s ease;
    }
    .close-button:hover {
        color: var(--text);
        background-color: rgba(255, 255, 255, 0.1);
    }

    .project-title {
        font-size: clamp(1.8rem, 4vw, 2.4rem);
        color: var(--primary);
        margin: 0 0 0.75rem 0;
        line-height: 1.2;
    }

    .meta-info {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0 0.75rem; /* Only column gap */
    }
    .meta-info strong {
        color: var(--text);
        font-weight: 500;
    }
    .meta-info .divider {
        opacity: 0.5;
    }


    .detailed-description {
        font-size: 1.05rem;
        line-height: 1.7;
        color: var(--text);
        margin-bottom: 2.5rem;
    }

    .detail-section {
        margin-bottom: 2.5rem;
    }
    .detail-section:last-child {
        margin-bottom: 0;
    }

    .detail-section h4 {
        font-size: 1.2rem;
        color: var(--text);
        margin-bottom: 1rem;
        font-weight: 600;
        border-bottom: 1px solid #333;
        padding-bottom: 0.5rem;
    }

    .features-list {
        list-style: none; /* Remove default bullets */
        padding: 0;
        margin: 0;
    }
    .features-list li {
        font-size: 1rem;
        color: var(--text-muted);
        margin-bottom: 0.6rem;
        padding-left: 1.5rem; /* Space for custom bullet */
        position: relative;
        line-height: 1.6;
    }
     /* Custom bullet */
    .features-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary);
        font-weight: bold;
    }


    .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }
    .tech-tag {
        font-size: 0.9rem;
        background-color: #333;
        color: var(--text-muted);
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
    }

    .screenshot-viewer {
        position: relative;
        width: 100%;
        max-width: 600px; /* Limit image width */
        margin: 0 auto 1rem;
        background-color: var(--dark);
        border-radius: 8px;
        overflow: hidden;
         border: 1px solid #333;
    }
     .screenshot-image {
         display: block;
         width: 100%;
         aspect-ratio: 16 / 9; /* Maintain aspect ratio */
         object-fit: contain; /* Show whole image */
         background-color: var(--dark); /* BG for contain */
     }
     .nav-button {
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         background-color: rgba(18, 18, 18, 0.7);
         color: white;
         border: none;
         border-radius: 50%;
         width: 35px;
         height: 35px;
         font-size: 1.5rem;
         line-height: 1;
         cursor: pointer;
         transition: background-color 0.2s ease;
         display: flex;
         align-items: center;
         justify-content: center;
     }
     .nav-button:hover {
         background-color: rgba(18, 18, 18, 0.9);
     }
     .nav-button.prev { left: 0.5rem; }
     .nav-button.next { right: 0.5rem; }

     .screenshot-dots {
         display: flex;
         justify-content: center;
         gap: 0.5rem;
         margin-top: 0.5rem;
     }
     .dot {
         width: 10px;
         height: 10px;
         border-radius: 50%;
         background-color: #444;
         border: none;
         padding: 0;
         cursor: pointer;
         transition: background-color 0.2s ease;
     }
     .dot:hover { background-color: #666; }
     .dot.active { background-color: var(--primary); }


    /* Link Section */
    .link-section {
        text-align: center;
        margin-top: 2.5rem;
    }
     .btn { /* Basic button styles if needed */
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 2rem;
        border-radius: 6px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        text-align: center;
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

    @media (max-width: 768px) {
        .modal-container {
            padding: 2rem 1.5rem;
            max-height: 85vh;
        }
         .project-title {
             font-size: 1.8rem;
         }
         .close-button {
             top: 0.5rem;
             right: 0.5rem;
         }
    }
</style>