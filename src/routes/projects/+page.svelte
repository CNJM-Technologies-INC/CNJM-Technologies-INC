<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import projectsData from '$lib/data/projects.json';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import ProjectModal from '$lib/components/ProjectModal.svelte';

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    const projects = projectsData.projects || []; // Ensure projects is an array

    // State for the modal
    let selectedProject = null; // Holds the project object for the modal

    function openModal(project) {
        selectedProject = project;
    }

    function closeModal() {
        selectedProject = null;
    }

</script>

<svelte:head>
  <title>Our Projects - CNJM Technologies Inc.</title>
  <meta name="description" content="Explore a selection of projects developed by CNJM Technologies Inc., showcasing our expertise in software development, web applications, and more.">
</svelte:head>

<div class="projects-page">
    <!-- Page Header -->
    <section class="page-header" in:fade={{ duration: 600 }}>
        <div class="header-content">
            <h1 in:fly={{ y: -30, duration: 500, delay: 200 }}>Our <span class="highlight">Work</span></h1>
            <p in:fly={{ y: 30, duration: 500, delay: 300 }}>
                A glimpse into the solutions we've crafted, showcasing our commitment to innovation and quality.
            </p>
        </div>
         <div class="header-bg-shape"></div> <!-- Optional subtle shape -->
    </section>

    <!-- Projects Grid -->
    {#if mounted}
    <section class="projects-grid-container" in:fade={{ duration: 600, delay: 400 }}>
       {#if projects.length > 0}
        <div class="projects-grid">
            {#each projects as project (project.id)}
                <div in:fly={{ y: 50, duration: 500, delay: 500 + i * 100 }}>
                     <!-- Listen for the viewdetails event from the card -->
                    <ProjectCard {project} on:viewdetails={() => openModal(project)} />
                </div>
            {/each}
        </div>
       {:else}
           <p class="no-projects">No projects to display at the moment. Check back soon!</p>
       {/if}
    </section>
    {/if}

</div>

<!-- Render the modal conditionally -->
{#if selectedProject}
    <ProjectModal project={selectedProject} on:close={closeModal} />
{/if}

<style>
    .projects-page {
        padding-top: 60px; /* Adjust based on final fixed header height */
    }

    /* Page Header Styling (similar to Services page) */
    .page-header {
        padding: 6rem 2rem 8rem;
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
    .page-header .highlight { color: var(--primary); }
     .page-header p {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        color: var(--text-muted);
        line-height: 1.7;
        max-width: 650px;
        margin: 0 auto;
    }
    .header-bg-shape {
        position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%);
        width: 120%; max-width: 1500px; height: 150px;
        background-color: rgba(255, 107, 0, 0.03); border-radius: 50% / 100%;
        border-bottom-left-radius: 0; border-bottom-right-radius: 0; z-index: 1; filter: blur(10px);
    }

    /* Projects Grid Section Styling */
    .projects-grid-container {
        padding: 5rem 0 6rem; /* Add bottom padding */
        background-color: var(--dark);
        min-height: 50vh; /* Ensure it takes some space */
    }

     .projects-grid {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        /* More columns on larger screens if desired */
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2.5rem;
    }

    .no-projects {
        text-align: center;
        font-size: 1.1rem;
        color: var(--text-muted);
        padding: 4rem 1rem;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .page-header { padding: 5rem 1rem 6rem; }
        .projects-grid-container { padding: 4rem 0 5rem; }
        .projects-grid {
            padding: 0 1rem;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Adjust min size */
            gap: 1.5rem;
        }
    }
</style>