<script>
    // Base Svelte imports
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing'; // Example easing

    // Component Imports
    import Hero from '$lib/components/Hero.svelte';
    import ProjectModal from '$lib/components/ProjectModal.svelte';
    // ProjectCard import is not used in this specific showcase implementation,
    // but kept if needed elsewhere or for future refactoring.
    // import ProjectCard from '$lib/components/ProjectCard.svelte';

    // Data Imports
    import servicesData from '$lib/data/services.json';
    import projectsData from '$lib/data/projects.json';

    // --- State for Modal ---
    let selectedProject = null; // Holds the project object for the modal

    function openModal(project) {
        // console.log("Opening modal for:", project); // Debugging log
        selectedProject = project;
    }

    function closeModal() {
        // console.log("Closing modal"); // Debugging log
        selectedProject = null;
    }
    // --- End Modal State ---

    // Page State
    let mounted = false;
    let activeProject = null; // Holds the currently featured project object
    let projectsContainer; // Reference to the showcase container for Intersection Observer
    let isIntersecting = false; // Flag for triggering animations on view

    // Data Processing
    const services = servicesData.services || [];
    const allProjects = projectsData.projects || [];
    // Select projects to feature. Prioritize those with a 'featured' flag,
    // otherwise take the first 6. Adjust slice as needed.
    const featuredProjects = allProjects.filter(project => project.featured === true).length > 0
                           ? allProjects.filter(project => project.featured === true)
                           : allProjects.slice(0, 6);

    // Create icons map for services & values
    // Ensure these keys (code, gears, chart, brain) match the 'icon' field in your JSON data
    const icons = {
        code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        gears: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>`,
        brain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.24a.5.5 0 0 0 .28.45l1.9 1.05a2.5 2.5 0 0 1 1.64 2.26V12a2.5 2.5 0 0 1-2.5 2.5h-1.86a.5.5 0 0 0-.45.28l-1.05 1.9A2.5 2.5 0 0 1 7.26 18H6a2.5 2.5 0 0 1-2.5-2.5v-1.86a.5.5 0 0 0-.28-.45l-1.9-1.05A2.5 2.5 0 0 1 2 9.74V7.5A2.5 2.5 0 0 1 4.5 5h1.24a.5.5 0 0 0 .45-.28l1.05-1.9A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v1.24a.5.5 0 0 1-.28.45l-1.9 1.05A2.5 2.5 0 0 0 8.18 9.5V12a2.5 2.5 0 0 0 2.5 2.5h1.86a.5.5 0 0 1 .45.28l1.05 1.9A2.5 2.5 0 0 0 16.74 18H18a2.5 2.5 0 0 0 2.5-2.5v-1.86a.5.5 0 0 1 .28-.45l1.9-1.05A2.5 2.5 0 0 0 22 9.74V7.5A2.5 2.5 0 0 0 19.5 5h-1.24a.5.5 0 0 1-.45-.28l-1.05-1.9A2.5 2.5 0 0 0 14.5 2Z"></path></svg>`
    };

    // Company values (previously "whyUsPoints")
    const companyValues = [
        {
            title: 'Problem Solvers',
            description: 'We focus on your unique challenges, diving deep to understand your specific needs.',
            highlight: 'unique challenges',
            icon: 'brain' // Ensure 'brain' key exists in `icons` map
        },
        {
            title: 'Bespoke Solutions',
            description: 'We don\'t do one-size-fits-all. We craft software that exceeds expectations.',
            highlight: 'exceeds expectations',
            icon: 'gears' // Ensure 'gears' key exists in `icons` map
        },
        {
            title: 'Code with Purpose',
            description: 'Every line serves a purpose: automate, enhance productivity, drive innovation, solve real problems.',
            highlight: 'solve real problems',
            icon: 'code' // Ensure 'code' key exists in `icons` map
        }
        // Add more values if needed, ensuring 'icon' matches a key in `icons`
    ];

    // Intersection Observer for animation triggers
    function setupIntersectionObserver() {
        // Check if IntersectionObserver is supported and projectsContainer exists
        if (typeof IntersectionObserver === 'undefined' || !projectsContainer) {
            console.warn("IntersectionObserver not supported or target element not found. Animating immediately.");
            isIntersecting = true; // Assume visible if not supported or element missing
            return () => {}; // Return empty cleanup function
        }

        const observer = new IntersectionObserver(
            (entries) => {
                 // Trigger only once when it becomes intersecting
                if (entries[0].isIntersecting && !isIntersecting) {
                    // console.log("Projects showcase intersecting!"); // Debugging log
                    isIntersecting = true;
                    // Optional: Disconnect observer after triggering if needed for performance
                    // observer.unobserve(projectsContainer);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the element is visible
        );

        // Ensure projectsContainer is valid before observing
        if (projectsContainer) {
             observer.observe(projectsContainer);
        } else {
            console.error("Failed to find projectsContainer for IntersectionObserver.");
            isIntersecting = true; // Fallback if element somehow doesn't bind
        }


        // Return cleanup function
        return () => {
            // Ensure projectsContainer still exists on cleanup
            if (projectsContainer && observer) {
                observer.unobserve(projectsContainer);
            }
        };
    }

    // Project showcase controls
    function setActiveProject(project) {
        activeProject = project;
    }

    // Lifecycle
    let observerCleanup = () => {};
    onMount(() => {
        mounted = true;

        // Set initial active project if featured projects exist
        if (!activeProject && featuredProjects.length > 0) {
            activeProject = featuredProjects[0];
        }

        // Delay observer setup slightly to ensure DOM element is ready
        // Must happen *after* initial activeProject is set, so the element exists
        const timer = setTimeout(() => {
            // Need to ensure projectsContainer is bound by this time
            if (projectsContainer) {
                observerCleanup = setupIntersectionObserver();
            } else {
                console.warn("projectsContainer not bound in onMount timeout, animating immediately.");
                isIntersecting = true; // Fallback if bind:this fails initially
            }
        }, 100); // Adjust delay if needed

        return () => {
            clearTimeout(timer);
            observerCleanup(); // Cleanup observer on component destroy
        };
    });

    // Reactive statement to derive image URL safely
    $: displayImageUrl = (project) => {
        // Ensure project and screenshots exist, fallback otherwise
        return project?.screenshots?.[0] || '/images/projects/placeholder.jpg'; // Fallback image
    };
    $: displayThumbnailUrl = (project) => {
         // Ensure project and screenshots exist, fallback otherwise
         return project?.screenshots?.[0] || '/images/projects/placeholder-thumb.jpg'; // Fallback thumb
    }

</script>

<svelte:head>
  <title>CNJM Technologies Inc. - Innovative Software Solutions</title>
  <meta name="description" content="CNJM Technologies Inc. creates elegant code solutions that drive innovation, enhance productivity, and solve real-world problems. Explore our services and projects.">
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Featured Projects Showcase Section -->
{#if mounted && featuredProjects.length > 0}
<section class="projects-showcase content-section" bind:this={projectsContainer}>
    <!-- Use `isIntersecting` to delay entrance animations until section is visible -->
    {#if isIntersecting}
    <div in:fade={{ duration: 600, delay: 100 }}>
        <div class="section-container">
            <h2 class="section-title" in:fly={{ y: 30, duration: 500, delay: 200 }}>
                Featured <span class="highlight">Projects</span>
            </h2>
            <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 300 }}>
                Explore our innovative solutions delivering real business impact.
            </p>
        </div>

        <!-- Interactive Project Showcase -->
        <div class="project-showcase-container">
            <!-- Main Project Display -->
            <div class="project-feature">
                {#if activeProject}
                <!-- Key the block on activeProject to force re-transition -->
                {#key activeProject.id}
                    <div class="project-feature-content" in:scale={{ duration: 350, delay: 50, start: 0.95, opacity: 0, easing: cubicOut }}>
                        <div class="project-feature-image" style="background-image: url('{displayImageUrl(activeProject)}')">
                            <div class="project-overlay">
                                <!-- Use project.title -->
                                <h3 class="project-name">{activeProject.title || 'Project Title'}</h3>
                                {#if activeProject.technologies && activeProject.technologies.length > 0}
                                <p class="project-tech">{activeProject.technologies.join(' • ')}</p>
                                {:else}
                                <p class="project-tech">Technologies not listed</p>
                                {/if}
                            </div>
                        </div>
                        <div class="project-feature-details">
                             <!-- Use project.description -->
                            <p class="project-description">{activeProject.description || 'No description available.'}</p>
                            <div class="project-cta">
                                <!-- **** MODAL FIX: Call openModal directly **** -->
                                <button on:click={() => openModal(activeProject)} class="btn outline">View Details</button>

                                <!-- Use project.link for demo/live URL, check validity -->
                                {#if activeProject.link && activeProject.link !== '#' && activeProject.link.trim() !== ''}
                                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer" class="btn primary">
                                        {#if activeProject.link.includes('vercel.app') || activeProject.link.includes('netlify.app') || activeProject.link.includes('github.io')}
                                            Live Demo
                                        {:else if activeProject.link.includes('github.com')}
                                            View Code
                                        {:else}
                                            Visit Link
                                        {/if}
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/key}
                {:else}
                 <!-- Placeholder if no active project (shouldn't happen with onMount logic but safe) -->
                 <p>Select a project thumbnail below.</p>
                {/if}
            </div>

            <!-- Project Thumbnails -->
            <div class="project-thumbnails">
                {#each featuredProjects as project, i (project.id)}
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-no-noninteractive-tabindex a11y-click-events-have-key-events -->
                    <div
                        class="project-thumb"
                        class:active={activeProject?.id === project.id}
                        on:mouseenter={() => setActiveProject(project)}
                        on:focus={() => setActiveProject(project)}
                        on:click={() => setActiveProject(project)}
                        in:fly={{ y: 20, duration: 300, delay: 500 + i * 80 }}
                        tabindex="0"
                        role="button"
                        aria-label="View details for {project.title || 'Unnamed Project'}"
                        aria-pressed={activeProject?.id === project.id}
                    >
                        <div class="thumb-image" style="background-image: url('{displayThumbnailUrl(project)}')"></div>
                         <!-- Use project.title -->
                        <span class="thumb-name">{project.title || 'Unnamed Project'}</span>
                    </div>
                {/each}
            </div>
        </div>

        <div class="cta-center" in:fade={{ duration: 500, delay: 800 }}>
            <a href="/projects" class="btn outline large">View All Projects</a>
        </div>
    </div>
    {/if} <!-- End isIntersecting block -->
</section>
{/if} <!-- End mounted & featuredProjects check -->

<!-- Services Overview Section -->
{#if mounted}
<section class="services-overview content-section" in:fade={{ duration: 600, delay: 300 }}>
    <div class="section-container">
        <h2 class="section-title" in:fly={{ y: 30, duration: 500, delay: 400 }}>
            Our Core <span class="highlight">Services</span>
        </h2>
        <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 500 }}>
            Crafting digital ecosystems that automate, enhance, innovate, and solve.
        </p>

        {#if services.length > 0}
        <div class="services-grid">
            {#each services as service, i (service.title)}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="service-card" in:fly={{ y: 50, duration: 500, delay: 600 + i * 100 }}>
                    {#if icons[service.icon]}
                    <div class="service-icon"> {@html icons[service.icon]} </div>
                    {:else}
                    <div class="service-icon">?</div> <!-- Fallback if icon key is missing -->
                    {/if}
                    <h3 class="service-title">{service.title || 'Service Title'}</h3>
                    <p class="service-description">{service.description || 'No description available.'}</p>
                    <a href="/hire-us?service={encodeURIComponent(service.title || '')}" class="service-link">
                        Learn More <span class="arrow">→</span>
                    </a>
                </div>
            {/each}
        </div>
        {:else}
         <p class="text-center text-muted">Services information is currently unavailable.</p>
        {/if}
    </div>
</section>

<!-- Why Choose Us / Company Values Section -->
<section class="company-values content-section" in:fade={{ duration: 600, delay: 500 }}>
    <div class="section-container">
        <h2 class="section-title" in:fly={{ y: 30, duration: 500, delay: 600 }}>
            Why Partner with <span class="highlight">CNJM Tech</span>?
        </h2>
        <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 700 }}>
            We're more than just developers; we're your dedicated technology partners.
        </p>

        {#if companyValues.length > 0}
        <div class="values-grid">
            {#each companyValues as value, i (value.title)}
                <div class="value-card" in:fly={{ y: 50, duration: 500, delay: 800 + i * 100 }}>
                    {#if icons[value.icon]}
                    <div class="value-icon">
                        {@html icons[value.icon]}
                    </div>
                    {:else}
                    <div class="value-icon">?</div> <!-- Fallback if icon key is missing -->
                    {/if}
                    <div class="value-content">
                        <h3 class="value-title">{value.title || 'Company Value'}</h3>
                        <p class="value-description">
                            {@html value.description ? value.description.replace(value.highlight, `<span class="value-highlight">${value.highlight}</span>`) : 'Description unavailable.'}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
        {/if}

        <!-- Enhanced CTA within this section -->
        <div class="cta-wrapper" in:fade={{ duration: 500, delay: companyValues.length > 0 ? (800 + companyValues.length * 100) : 800 }}>
            <div class="cta-content">
                <h3 class="cta-title">Ready to transform your ideas into reality?</h3>
                <p class="cta-description">Let's discuss how our expertise can help your business reach its full potential.</p>
            </div>
            <div class="cta-buttons">
                <a href="/hire-us" class="btn primary large">Discuss Your Project</a>
                <!-- Changed this button to link to Services -->
                <a href="/services" class="btn text">Explore Our Services</a>
            </div>
        </div>
    </div>
</section>
{/if} <!-- End mounted check for Services/Values -->

<!-- Project Modal -->
{#if selectedProject}
  <ProjectModal
    project={selectedProject}
    on:close={closeModal}
  />
{/if}


<style>
    /* Base styles (Reusing from previous correct versions) */
    :root { /* Ensure CSS variables are defined */
        --primary: #FF6B00;
        --primary-light: #FF8A33;
        --primary-transparent: rgba(255, 107, 0, 0.1);
        --dark: #121212;
        --dark-light: #1E1E1E;
        --dark-lighter: #2a2a2a; /* Added for card backgrounds */
        --text: #e0e0e0;
        --text-muted: #a0a0a0;
        --border-color: #333; /* Added for consistency */
        --shadow-color-light: rgba(0, 0, 0, 0.2);
        --shadow-color-medium: rgba(0, 0, 0, 0.3);
        --shadow-color-strong: rgba(0, 0, 0, 0.4);
    }

    .content-section {
        padding: clamp(4rem, 8vw, 6rem) 0; /* Responsive padding */
        position: relative;
        overflow-x: hidden; /* Prevent horizontal scroll from animations */
    }
    .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 clamp(1rem, 4vw, 2rem); /* Responsive padding */
    }
    .section-title {
        font-size: clamp(2.2rem, 5vw, 3rem);
        font-weight: 700;
        color: var(--text);
        text-align: center;
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
    }
    .section-title .highlight {
        color: var(--primary);
    }
    .section-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        color: var(--text-muted);
        text-align: center;
        max-width: 700px;
        margin: 0 auto 4rem auto;
        line-height: 1.6;
    }
    .cta-center {
        text-align: center;
        margin-top: 3rem;
    }
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.8rem 2rem;
        border-radius: 6px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        font-size: 1rem;
        cursor: pointer;
        border: 2px solid transparent; /* Base border */
        line-height: 1.2;
        white-space: nowrap; /* Prevent text wrapping */
    }
    .btn.primary { background-color: var(--primary); color: white; border-color: var(--primary); }
    .btn.primary:hover { background-color: var(--primary-light); border-color: var(--primary-light); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3); }
    .btn.outline { border-color: var(--primary); color: var(--primary); background-color: transparent; }
    .btn.outline:hover { background-color: var(--primary-transparent); transform: translateY(-2px); }
    .btn.text { background: transparent; color: var(--text-muted); text-decoration: none; padding: 0.8rem 1rem; font-weight: 500; border: none; }
    .btn.text:hover { color: var(--primary); }
    .btn.large { padding: 1rem 2.5rem; font-size: 1.1rem; }

    /* Section Backgrounds & Borders */
    .projects-showcase { background-color: var(--dark); overflow: visible; position: relative; } /* Allow overflow for hover effects */
    .projects-showcase::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg, transparent, var(--primary-transparent), transparent);
    }
    .services-overview { background-color: var(--dark-light); position: relative; }
    .company-values { background-color: var(--dark); position: relative; }
    .company-values::after {
         content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
         background: linear-gradient(90deg, transparent, var(--primary-transparent), transparent);
    }


    /* ---- Project Showcase Styles ---- */
    .project-showcase-container {
        display: flex;
        flex-direction: column;
        max-width: 1100px;
        margin: 0 auto 3rem auto;
        padding: 0;
    }

    .project-feature {
        margin-bottom: 2.5rem;
        border-radius: 12px;
        overflow: hidden;
        background: var(--dark-lighter);
        box-shadow: 0 15px 35px var(--shadow-color-medium);
        border: 1px solid var(--border-color);
        display: flex; /* Use flex here for direct children */
        min-height: 350px; /* Ensure minimum height */
    }

    .project-feature-content {
        /* This inner div might not be strictly needed if .project-feature is flex */
        /* Kept for transition keying */
        display: flex;
        flex-direction: row; /* Default side-by-side */
        width: 100%; /* Take full width of parent */
    }

    .project-feature-image {
        flex: 1 1 55%;
        background-size: cover;
        background-position: center;
        position: relative;
        min-height: 300px;
        transition: background-position 0.5s ease-out, transform 0.4s ease; /* Added transform transition */
    }
    .project-feature:hover .project-feature-image {
        /* Optional: Slight zoom on container hover */
        transform: scale(1.02);
    }

    .project-overlay {
        position: absolute; bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.7) 50%, transparent 100%);
        padding: clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2rem); /* Responsive padding */
        color: white;
    }

    .project-name {
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 700; margin: 0 0 0.5rem 0;
        line-height: 1.2;
        color: white; /* Explicitly set color */
    }

    .project-tech {
        font-size: clamp(0.8rem, 2vw, 0.9rem); opacity: 0.8; margin: 0;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 90%;
        color: var(--text-muted); /* Use muted text color */
    }

    .project-feature-details {
        flex: 1 1 45%;
        padding: clamp(1.5rem, 4vw, 2.5rem); /* Responsive padding */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .project-description {
        font-size: clamp(0.95rem, 2.2vw, 1.05rem); line-height: 1.7; color: var(--text-muted);
        margin: 0 0 clamp(1.5rem, 4vw, 2rem) 0; /* Responsive margin */
        /* Limit lines for consistency if needed */
         /* display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden; */
    }

    .project-cta { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* Thumbnails */
    .project-thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); /* Adjusted minmax */
        gap: 1rem;
        margin-bottom: 3rem;
    }

    .project-thumb {
        position: relative; cursor: pointer; border-radius: 8px;
        overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;
        background-color: var(--dark-lighter);
        border: 1px solid var(--border-color);
        outline: none; /* Remove default focus outline if using custom */
    }
     /* Custom focus state */
    .project-thumb:focus-visible {
        box-shadow: 0 0 0 3px var(--primary-transparent); /* Outline using shadow */
    }

    .project-thumb:hover {
        transform: scale(1.05) translateY(-3px);
        box-shadow: 0 6px 15px var(--shadow-color-medium);
    }

    .project-thumb::before {
         content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
         border: 2px solid transparent; border-radius: 8px; /* Match parent border-radius */
         transition: border-color 0.3s ease;
         pointer-events: none;
         box-sizing: border-box; /* Include border in element size */
     }
     .project-thumb.active::before { border-color: var(--primary); }
     .project-thumb.active {
         box-shadow: 0 4px 12px var(--shadow-color-light); /* Subtle shadow for active */
     }


    .thumb-image {
        height: 110px;
        background-size: cover; background-position: center;
        transition: transform 0.3s ease;
    }
     .project-thumb:hover .thumb-image { transform: scale(1.08); }

    .thumb-name {
        display: block; padding: 0.75rem; font-size: 0.85rem; font-weight: 500;
        color: var(--text-muted); text-align: center;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        transition: color 0.3s ease, font-weight 0.3s ease;
    }
     .project-thumb.active .thumb-name { color: var(--primary); font-weight: 600; }
    /* ---- End Project Showcase Styles ---- */


    /* ---- Services Grid Styles ---- */
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    .service-card {
        background-color: var(--dark);
        padding: 2.5rem 2rem;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex; flex-direction: column;
        position: relative; overflow: hidden;
    }

    .service-card::before {
        content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 0;
        background-color: var(--primary); transition: height 0.4s ease;
    }
    .service-card:hover::before { height: 100%; }
    .service-card:hover{ transform: translateY(-10px); box-shadow: 0 15px 30px var(--shadow-color-medium); border-color: #444; } /* Darker border on hover */

    .service-icon {
        color: var(--primary); margin-bottom: 1.5rem; background-color: var(--primary-transparent);
        width: 55px; height: 55px; border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.3s ease;
        flex-shrink: 0; /* Prevent icon shrinking */
    }
    .service-card:hover .service-icon { transform: scale(1.1) rotate(-5deg); }
    .service-icon :global(svg) { width: 28px; height: 28px; }
    /* Fallback style for missing icon */
    .service-icon:not(:has(svg)) {
        font-size: 1.5rem; font-weight: bold;
    }

    .service-title { font-size: 1.4rem; font-weight: 600; color: var(--text); margin-bottom: 1rem; }
    .service-description { font-size: 1rem; color: var(--text-muted); line-height: 1.7; flex-grow: 1; margin-bottom: 1.5rem; }
    .service-link { color: var(--primary); text-decoration: none; font-weight: 500; font-size: 1rem; margin-top: auto; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; }
    .service-link .arrow { transition: transform 0.3s ease; }
    .service-link:hover { color: var(--primary-light); }
    .service-link:hover .arrow { transform: translateX(6px); }
    /* ---- End Services Grid Styles ---- */


    /* ---- Company Values / Why Us Styles ---- */
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }

    .value-card {
        display: flex; align-items: flex-start; gap: 1.5rem;
        padding: 2rem; border-radius: 12px;
        background-color: var(--dark-lighter);
        border: 1px solid var(--border-color);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .value-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px var(--shadow-color-light); }

    .value-icon {
        flex-shrink: 0; width: 50px; height: 50px; border-radius: 8px;
        background-color: var(--primary-transparent);
        display: flex; align-items: center; justify-content: center;
        color: var(--primary);
    }
    .value-icon :global(svg) { width: 26px; height: 26px; }
     /* Fallback style for missing icon */
    .value-icon:not(:has(svg)) {
        font-size: 1.5rem; font-weight: bold;
    }

    .value-content { flex-grow: 1; }
    .value-title { font-size: 1.3rem; font-weight: 600; color: var(--text); margin: 0 0 0.75rem 0; }
    .value-description { font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin: 0; }
    .value-description :global(.value-highlight) { color: var(--primary); font-weight: 500; }

    /* Enhanced CTA Wrapper */
    .cta-wrapper {
        background-color: var(--dark-lighter); border-radius: 12px; padding: clamp(2rem, 5vw, 3rem); /* Responsive padding */
        display: flex; justify-content: space-between; align-items: center;
        flex-wrap: wrap; /* Allow wrapping on smaller screens */
        gap: 2rem; /* Gap between content and buttons */
        position: relative; overflow: hidden; border: 1px solid var(--border-color);
        margin-top: 2rem;
    }
    .cta-wrapper::before {
         content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
         background: linear-gradient(90deg, transparent, var(--primary), transparent);
    }

    .cta-content { flex: 1 1 50%; min-width: 280px; } /* Allow shrinking but set a min-width */
    .cta-title { font-size: clamp(1.3rem, 4vw, 1.6rem); font-weight: 600; color: var(--text); margin: 0 0 0.75rem 0; line-height: 1.3; }
    .cta-description { font-size: clamp(0.9rem, 2.5vw, 1rem); color: var(--text-muted); margin: 0; line-height: 1.6; }
    .cta-buttons { display: flex; flex-direction: row; gap: 1rem; align-items: center; flex-shrink: 0; flex-wrap: wrap; justify-content: center; } /* Allow button wrapping */
    /* ---- End Company Values / Why Us Styles ---- */


    /* ---- Responsive Styles ---- */
    @media (max-width: 992px) { /* Tablet */
        .project-feature { flex-direction: column; } /* Stack feature image and details */
        .project-feature-content { flex-direction: column; }
        .project-feature-image { flex: auto; height: 300px; } /* Reset flex basis */
        .project-feature-details { flex: auto; } /* Reset flex basis */

        .cta-wrapper { text-align: center; }
        .cta-content { flex-basis: 100%; } /* Take full width */
        .cta-buttons { justify-content: center; width: 100%; } /* Center buttons */
        .values-grid { grid-template-columns: 1fr; } /* Stack values */
    }

    @media (max-width: 768px) { /* Mobile */
        .section-title { font-size: 2rem; }
        .section-subtitle { font-size: 1rem; margin-bottom: 3rem; }
        .project-feature-image { height: 250px; }
        .project-thumbnails { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;}
        .thumb-image { height: 90px; }
        .services-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        .service-card { padding: 2rem 1.5rem; }
        .values-grid { gap: 1.5rem; }
        .value-card { flex-direction: column; text-align: center; align-items: center; padding: 1.5rem; } /* Stack icon and text */
        .value-icon { margin-bottom: 1rem; }
        .cta-buttons { flex-direction: column; width: 100%; } /* Stack buttons */
        .cta-buttons .btn { width: auto; min-width: 200px; }
    }

    @media (max-width: 576px) { /* Small Mobile */
        .btn { padding: 0.7rem 1.5rem; font-size: 0.9rem; }
        .btn.large { padding: 0.9rem 2rem; font-size: 1rem; }
        .project-feature-details { padding: 1.5rem 1rem; }
        .project-overlay { padding: 1rem 1.5rem; }
        .project-cta { flex-direction: column; align-items: stretch; gap: 0.75rem; } /* Stack CTA buttons tightly */
        .project-cta .btn { text-align: center; }
        .project-thumbnails { grid-template-columns: repeat(2, 1fr); }
        .thumb-image { height: 100px; } /* Slightly taller thumb */
         .cta-buttons .btn { width: 100%; min-width: unset;} /* Full width buttons */
    }

    /* Utility class for simple text centering */
    .text-center { text-align: center; }
    .text-muted { color: var(--text-muted); }

</style>