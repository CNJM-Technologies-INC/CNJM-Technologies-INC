<script>
    import { createEventDispatcher } from 'svelte';
    export let project;

    const dispatch = createEventDispatcher();

    function viewDetails() {
        dispatch('viewdetails', project); // Dispatch the event with the project data
    }

    // Placeholder for first screenshot or default image
    const displayImage = project.screenshots && project.screenshots.length > 0
        ? project.screenshots[0]
        : '/images/placeholder-project.png'; // Add a default placeholder image path

    const hasValidLink = project.link && project.link !== '#';
</script>

<article class="project-card">
    <div class="card-image-container">
        <img src={displayImage} alt="{project.title} screenshot" loading="lazy" class="card-image"/>
        {#if project.role}
            <span class="role-badge">{project.role}</span>
        {/if}
    </div>
    <div class="card-content">
        <h3 class="card-title">{project.title}</h3>
        <p class="card-description">{project.description}</p>
        {#if project.technologies && project.technologies.length > 0}
            <div class="tech-tags">
                {#each project.technologies.slice(0, 3) as tech} <!-- Show only first few techs -->
                    <span class="tech-tag">{tech}</span>
                {/each}
                {#if project.technologies.length > 3}
                    <span class="tech-tag more">...</span>
                {/if}
            </div>
        {/if}
    </div>
    <div class="card-footer">
        <button class="btn-details" on:click={viewDetails}>
            View Details
        </button>
        {#if hasValidLink}
            <a href={project.link} target="_blank" rel="noopener noreferrer" class="btn-live" aria-label="View live project {project.title}">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                 Live
            </a>
        {/if}
    </div>
</article>

<style>
    .project-card {
        background-color: var(--dark-light);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border: 1px solid #2a2a2a;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        height: 100%; /* Ensure cards in a row take same height */
    }

    .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 107, 0, 0.2);
    }

    .card-image-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 60%; /* Aspect ratio for image */
        background-color: #222; /* Placeholder bg */
    }

    .card-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Cover the area */
        transition: transform 0.4s ease;
    }
    .project-card:hover .card-image {
        transform: scale(1.05);
    }

    .role-badge {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        background-color: rgba(18, 18, 18, 0.8);
        color: var(--text-muted);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
        backdrop-filter: blur(2px);
    }

    .card-content {
        padding: 1.5rem;
        flex-grow: 1; /* Allows content to push footer down */
        display: flex;
        flex-direction: column;
    }

    .card-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text);
        margin: 0 0 0.75rem 0;
        line-height: 1.3;
    }

    .card-description {
        font-size: 0.95rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 1rem;
        flex-grow: 1; /* Take available space before tags */
    }

    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: auto; /* Push tags towards bottom of content area */
        padding-top: 0.5rem;
    }

    .tech-tag {
        font-size: 0.75rem;
        background-color: rgba(255, 107, 0, 0.1);
        color: var(--primary);
        padding: 0.25rem 0.6rem;
        border-radius: 4px;
    }
     .tech-tag.more {
         font-weight: bold;
     }

    .card-footer {
        padding: 0 1.5rem 1.5rem; /* Padding only at bottom */
        display: flex;
        justify-content: space-between; /* Pushes buttons apart */
        align-items: center;
        gap: 1rem;
        border-top: 1px solid #2a2a2a;
        margin-top: 1.5rem; /* Space above footer line */
        padding-top: 1.5rem; /* Space below footer line */
    }

    .btn-details, .btn-live {
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
    }

    .btn-details {
        background-color: transparent;
        color: var(--primary);
        border: 1px solid var(--primary);
    }
     .btn-details:hover {
         background-color: rgba(255, 107, 0, 0.1);
         transform: translateY(-2px);
     }

     .btn-live {
         background-color: var(--primary);
         color: white;
         border: 1px solid var(--primary);
     }
     .btn-live:hover {
         background-color: var(--primary-light);
         border-color: var(--primary-light);
         transform: translateY(-2px);
         box-shadow: 0 3px 8px rgba(255, 107, 0, 0.2);
     }
     .btn-live svg {
         margin-right: 0.1rem;
     }


</style>