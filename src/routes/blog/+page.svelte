<script>
    import { onMount } from 'svelte'; // Keep onMount if you still want entry transitions tied to mounting
    import { fade, fly } from 'svelte/transition';
    import BlogCard from '$lib/components/BlogCard.svelte';
    import blogsData from '$lib/data/blogs.json'; // Import the JSON data
  
    let blogs = [];
    let loaded = false; // Keep for controlling transitions/loading state display
    let searchQuery = '';
    let activeTag = '';
    let allTags = [];
  
    // --- Using Local JSON Data ---
    try {
      blogs = blogsData.blogs || []; // Get blogs array from imported JSON
  
      // Extract all unique tags
      const tagSet = new Set();
      blogs.forEach(blog => {
        if (blog.tags && Array.isArray(blog.tags)) {
          blog.tags.forEach(tag => tagSet.add(tag));
        }
      });
      allTags = Array.from(tagSet).sort(); // Sort tags alphabetically
  
      // Set loaded to true immediately as data is available synchronously
      // Use onMount hook just to ensure transitions trigger after initial render if needed
      onMount(() => {
         loaded = true;
      });
  
    } catch (error) {
       console.error('Error processing local blog data:', error);
       // Handle error appropriately, maybe show an error message
       blogs = [];
       allTags = [];
        onMount(() => { // Still need to set loaded eventually
           loaded = true;
       });
    }
    // --- End Local JSON Data ---
  
  
    /* --- API Fetching Code (Commented Out) ---
    // Load blog data
    onMount(async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        blogs = data.blogs || []; // Ensure blogs is an array
  
        // Extract all unique tags
        const tagSet = new Set();
        if (Array.isArray(blogs)) {
            blogs.forEach(blog => {
              if (blog.tags && Array.isArray(blog.tags)) {
                   blog.tags.forEach(tag => tagSet.add(tag));
              }
            });
        }
        allTags = Array.from(tagSet).sort(); // Sort tags
  
        loaded = true;
      } catch (error) {
        console.error('Error loading blogs:', error);
        // Display error state to user?
        loaded = true; // Set loaded even on error to remove spinner
      }
    });
    --- End API Fetching Code --- */
  
    // Filter blogs based on search and tag
    $: filteredBlogs = blogs.filter(blog => {
      const titleMatch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
      const excerptMatch = blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
      const matchesSearch = searchQuery === '' || titleMatch || excerptMatch;
  
      const matchesTag = activeTag === '' || (blog.tags && blog.tags.includes(activeTag));
  
      return matchesSearch && matchesTag;
    });
  
    function setActiveTag(tag) {
      activeTag = activeTag === tag ? '' : tag;
    }
  
    function clearFilters() {
      searchQuery = '';
      activeTag = '';
    }
  </script>
  
  <svelte:head>
    <title>Blog - CNJM Technologies Inc.</title>
    <meta name="description" content="Insights, tutorials, and updates from the CNJM Technologies Inc. team.">
  </svelte:head>
  
  <!-- Header remains the same -->
  <section class="blog-header" in:fade={{ duration: 500 }}>
      <div class="container">
        <h1 in:fly={{ y: -20, duration: 400, delay: 100 }}>Our <span class="highlight">Blog</span></h1>
        <p in:fly={{ y: 20, duration: 400, delay: 200 }}>Insights, tutorials, and updates from our team</p>
      </div>
  </section>
  
  <!-- Filters Section -->
  {#if loaded || blogs.length > 0} <!-- Show filters once loaded or if initial data exists -->
  <section class="blog-filters" in:fade={{ duration: 500, delay: 300 }}>
      <div class="search-container">
        <input
          type="search"
          placeholder="Search articles..."
          bind:value={searchQuery}
          aria-label="Search blogs"
        />
        <span class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </span>
      </div>
  
     {#if allTags.length > 0}
      <div class="tags-filter">
        <button
            class="tag-button"
            class:active={activeTag === ''}
            on:click={() => setActiveTag('')}
          >
            All Topics
          </button>
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
     {/if}
  </section>
  {/if}
  
  <!-- Blog Grid Section -->
  <section class="blog-grid-container">
    {#if !loaded}
      <div class="loading" aria-live="polite">
        <div class="spinner"></div>
        <p>Loading articles...</p>
      </div>
    {:else if filteredBlogs.length > 0}
      <div class="blog-grid">
        {#each filteredBlogs as blog (blog.id)}
          <div
            in:fly={{ y: 50, duration: 500, delay: i * 80 }}
            out:fade={{ duration: 200 }}
          >
            <BlogCard {blog} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="no-results" in:fade>
        <p>No articles found matching your criteria.</p>
        <button class="btn outline small" on:click={clearFilters}>
          Clear Filters
        </button>
      </div>
    {/if}
  </section>
  
  <style>
      /* General styles - slightly refined */
      .highlight {
        color: var(--primary);
      }
  
      .btn {
          display: inline-block;
          padding: 0.8rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          text-align: center;
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
       .btn.small {
           padding: 0.6rem 1.2rem;
           font-size: 0.9rem;
       }
  
  
      .blog-header {
        padding: 7rem 1.5rem 5rem; /* Adjusted padding */
        background: linear-gradient(135deg, var(--dark) 0%, var(--dark-light) 100%);
        text-align: center;
        border-bottom: 1px solid #2a2a2a;
      }
  
      .container { /* Reusable container class */
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1rem; /* Reduced padding inside container */
      }
  
      .blog-header h1 {
        font-size: clamp(2.5rem, 6vw, 3.5rem); /* Responsive heading */
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text);
      }
  
      .blog-header p {
        font-size: clamp(1rem, 3vw, 1.2rem);
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
      }
  
      .blog-filters {
        padding: 2.5rem 1rem; /* Adjusted padding */
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 1000px; /* Slightly wider filter container */
        margin: 0 auto;
      }
  
      .search-container {
        position: relative;
        max-width: 600px; /* Wider search */
        margin: 0 auto;
        width: 100%;
      }
  
      .search-container input {
        width: 100%;
        padding: 0.9rem 1rem 0.9rem 3.2rem; /* Adjusted padding */
        border-radius: 8px;
        border: 1px solid #333;
        background-color: var(--dark-light);
        color: var(--text);
        font-size: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
       .search-container input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.3);
       }
  
      .search-icon { /* Wrapper span for icon */
        position: absolute;
        left: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        pointer-events: none; /* Allow clicks to pass through */
        display: flex; /* Ensures SVG scales correctly */
        align-items: center;
      }
  
      .tags-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem; /* Increased gap */
        justify-content: center;
      }
  
      .tag-button {
        background-color: var(--dark-light);
        color: var(--text-muted);
        border: 1px solid #333; /* Subtle border */
        padding: 0.5rem 1rem;
        border-radius: 20px; /* Pill shape */
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        font-weight: 500;
      }
  
      .tag-button:hover:not(.active) {
        background-color: #333;
        border-color: #555;
        color: var(--text);
      }
  
      .tag-button.active {
        background-color: var(--primary);
        color: white;
        border-color: var(--primary);
        font-weight: 600;
      }
  
      .blog-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem 6rem; /* Adjusted padding */
      }
  
      .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
  
      .no-results {
        grid-column: 1 / -1; /* Span full width if needed */
        text-align: center;
        padding: 5rem 1rem;
        background-color: var(--dark-light);
        border-radius: 8px;
        margin-top: 2rem;
      }
  
      .no-results p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        color: var(--text-muted);
      }
      /* Using .btn.outline.small for the button */
  
      .loading {
        grid-column: 1 / -1; /* Span full width if needed */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 30vh; /* Reduced height */
        padding: 4rem 0;
        gap: 1rem;
      }
       .loading p {
           color: var(--text-muted);
       }
  
      .spinner {
        width: 35px; /* Slightly smaller spinner */
        height: 35px;
        border: 3px solid rgba(255, 107, 0, 0.2);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s infinite linear;
      }
  
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
  
      @media (max-width: 768px) {
        .blog-header {
          padding: 6rem 1rem 4rem;
        }
  
        .blog-header h1 {
          font-size: 2.5rem;
        }
  
        .blog-filters {
          padding: 2rem 1rem;
        }
  
        .blog-grid-container {
            padding: 1rem 1rem 4rem;
        }
  
        .blog-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
      }
  </style>