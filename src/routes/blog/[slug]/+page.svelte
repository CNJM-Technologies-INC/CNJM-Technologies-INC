<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { page } from '$app/stores';
    import blogsData from '$lib/data/blogs.json'; // Import the JSON data
    import { error } from '@sveltejs/kit'; // Import SvelteKit error helper
  
    let blog = null;
    let loaded = false; // Still useful for transitions/loading state
    let relatedBlogs = [];
  
    // --- Using Local JSON Data ---
    try {
      const slug = $page.params.slug;
      const allBlogs = blogsData.blogs || [];
  
      // Find the current blog post by slug
      blog = allBlogs.find(b => b.id === slug);
  
      if (!blog) {
          // If blog not found, throw a 404 error
          // This replaces the need for a complex loading/error state just for not finding the blog
           throw error(404, { message: 'Blog post not found' });
      }
  
      // Calculate related blogs based on shared tags
      if (blog && blog.tags && Array.isArray(blog.tags)) {
          relatedBlogs = allBlogs
            .filter(b => b.id !== blog.id) // Exclude current blog
            .filter(b => b.tags && b.tags.some(tag => blog.tags.includes(tag))) // Find posts with at least one common tag
            .slice(0, 3); // Limit to 3 related posts
      }
  
       // Set loaded to true immediately
       // Use onMount just to delay transitions slightly after initial render
      onMount(() => {
         loaded = true;
      });
  
    } catch (err) {
        // If the error is already a SvelteKit error (like our 404), re-throw it
        if (err.status) {
            throw err;
        }
        // Otherwise, log and potentially show a generic error
        console.error('Error processing local blog data for slug:', $page.params.slug, err);
        // Optionally, set an error state to display a message
        // For now, we'll rely on the 404 logic above for missing posts
         onMount(() => {
           loaded = true; // Mark as loaded even if there was an unexpected error
        });
    }
    // --- End Local JSON Data ---
  
  
    /* --- API Fetching Code (Commented Out) ---
    // Load blog data
    onMount(async () => {
      try {
        const slug = $page.params.slug;
        const response = await fetch(`/api/blogs/${slug}`);
         if (!response.ok) {
              if (response.status === 404) {
                  throw error(404, { message: 'Blog post not found' });
              }
              throw new Error(`HTTP error! status: ${response.status}`);
         }
        const data = await response.json();
        blog = data;
  
        // Get related blogs (could be optimized by fetching only necessary data)
        const allBlogsRes = await fetch('/api/blogs');
         if (!allBlogsRes.ok) throw new Error(`HTTP error! status: ${allBlogsRes.status}`);
        const allBlogsData = await allBlogsRes.json();
         const allBlogs = allBlogsData.blogs || [];
  
        if (blog && blog.tags && Array.isArray(blog.tags)) {
          relatedBlogs = allBlogs
            .filter(b => b.id !== blog.id)
            .filter(b => b.tags && b.tags.some(tag => blog.tags.includes(tag)))
            .slice(0, 3);
        }
  
        loaded = true;
      } catch (err) {
         // Re-throw SvelteKit errors
         if (err.status) {
             throw err;
         }
        console.error('Error loading blog:', err);
        // Potentially set an error state variable to show in the template
        loaded = true; // Still set loaded to remove spinner
      }
    });
    --- End API Fetching Code --- */
  
  
    // Format date function (remains the same)
    function formatDate(dateString) {
      try {
          const date = new Date(dateString);
          // Add checks for invalid date
          if (isNaN(date.getTime())) {
               return "Invalid Date";
          }
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
      } catch (e) {
          console.warn("Error formatting date:", dateString, e);
          return "Invalid Date";
      }
    }
  </script>
  
  <svelte:head>
    {#if blog}
      <title>{blog.title || 'Blog Post'} - CNJM Technologies Inc.</title>
      <meta name="description" content={blog.excerpt || 'Read our latest blog post.'} />
       <!-- Add Open Graph / Twitter Card meta tags here for better sharing -->
       <meta property="og:title" content={blog.title} />
       <meta property="og:description" content={blog.excerpt} />
       {#if blog.image}
          <meta property="og:image" content={new URL(blog.image, $page.url.origin).href} />
       {/if}
       <meta property="og:type" content="article" />
       <meta property="og:url" content={$page.url.href} />
       <meta name="twitter:card" content="summary_large_image" />
    {:else}
      <title>Blog - CNJM Technologies Inc.</title>
    {/if}
  </svelte:head>
  
  {#if loaded && blog} <!-- Render only if loaded and blog exists -->
    <article class="blog-post">
      <!-- Header Section -->
      <header class="post-header" in:fade={{ duration: 500 }}>
        <div class="header-container">
          <div class="meta">
            {#if blog.date}<span class="date">{formatDate(blog.date)}</span>{/if}
            {#if blog.author}
               {#if blog.date}<span class="divider">•</span>{/if}
               <span class="author">By {blog.author}</span>
            {/if}
          </div>
          <h1>{blog.title}</h1>
          {#if blog.tags && blog.tags.length > 0}
          <div class="tags">
            {#each blog.tags as tag}
              <a href="/blog?tag={encodeURIComponent(tag)}" class="tag">{tag}</a> <!-- Make tags links -->
            {/each}
          </div>
          {/if}
        </div>
      </header>
  
      <!-- Featured Image Section -->
      {#if blog.image}
      <div class="featured-image" in:fade={{ duration: 800, delay: 200 }}>
        <img src={blog.image} alt={blog.title || 'Blog post image'} loading="lazy"/>
      </div>
      {/if}
  
      <!-- Content Section -->
      <div class="content-container" in:fade={{ duration: 800, delay: blog.image ? 400 : 200 }}>
        <div class="content-body">
          {#if blog.content && Array.isArray(blog.content)}
            {#each blog.content as section, i (i)}
                {#if section.type === 'paragraph'}
                  <p in:fly={{ y: 20, duration: 500, delay: i * 50 }}>{@html section.content}</p> <!-- Allow basic HTML if needed, sanitize on backend if source is untrusted -->
                {:else if section.type === 'heading'}
                  <h2 in:fly={{ y: 20, duration: 500, delay: i * 50 }}>{section.content}</h2>
                {:else if section.type === 'quote'}
                  <blockquote in:fly={{ y: 20, duration: 500, delay: i * 50 }}>
                    <p>"{@html section.content}"</p>
                    {#if section.author}<cite>— {section.author}</cite>{/if}
                  </blockquote>
                {:else if section.type === 'list'}
                  <ul in:fly={{ y: 20, duration: 500, delay: i * 50 }}>
                    {#each section.items as item}
                      <li>{@html item}</li>
                    {/each}
                  </ul>
                {:else if section.type === 'image'}
                  <figure in:fade={{ duration: 600, delay: i * 50 }}>
                    <img src={section.url} alt={section.alt || 'Blog image'} loading="lazy"/>
                    {#if section.caption}
                      <figcaption>{section.caption}</figcaption>
                    {/if}
                  </figure>
                {/if}
            {/each}
          {:else}
              <p><em>Content is not available for this post.</em></p>
          {/if}
        </div>
      </div>
  
      <!-- Related Posts Section -->
      {#if relatedBlogs.length > 0}
        <div class="related-section" in:fade={{ duration: 800, delay: 600 }}>
          <div class="related-container">
            <h3>Related Articles</h3>
            <div class="related-grid">
              {#each relatedBlogs as relatedBlog (relatedBlog.id)}
                <a href={`/blog/${relatedBlog.id}`} class="related-card">
                  {#if relatedBlog.image}
                  <div class="thumb">
                    <img src={relatedBlog.image} alt={relatedBlog.title || ''} loading="lazy"/>
                  </div>
                  {/if}
                  <div class="info">
                    <h4>{relatedBlog.title}</h4>
                    {#if relatedBlog.date}
                    <span class="date">{formatDate(relatedBlog.date)}</span>
                    {/if}
                  </div>
                </a>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </article>
  {:else if !blog && loaded}
      <!-- This state should ideally not be reached because of the 404 error -->
      <div class="loading">
         <p>Could not load the article.</p>
     </div>
  {:else}
    <!-- Show loading spinner only if not loaded yet -->
     <div class="loading" aria-live="polite">
      <div class="spinner"></div>
      <p>Loading article...</p>
    </div>
  {/if}
  
  <style>
      .blog-post {
        padding-bottom: 6rem;
      }
  
      /* Header Refinements */
      .post-header {
        padding: 7rem 1.5rem 5rem;
        background: linear-gradient(145deg, var(--dark) 0%, var(--dark-light) 100%);
        text-align: center;
        border-bottom: 1px solid #2a2a2a;
      }
  
      .header-container { /* Specific container for header content */
        max-width: 800px;
        margin: 0 auto;
      }
  
      .meta {
        color: var(--text-muted);
        margin-bottom: 1rem;
        font-size: 0.95rem; /* Slightly smaller */
      }
      .divider { margin: 0 0.5rem; }
      .author { font-weight: 500; color: var(--text); } /* Make author stand out slightly */
      /* .date {} */
  
      .post-header h1 {
        font-size: clamp(2.2rem, 6vw, 3.8rem);
        line-height: 1.25;
        margin-bottom: 1.5rem;
        color: var(--text); /* Ensure high contrast */
      }
  
      .tags {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
  
      .tag { /* Style for tags in header */
        background-color: rgba(255, 107, 0, 0.1);
        color: var(--primary);
        padding: 0.3rem 0.8rem;
        border-radius: 15px; /* Pill shape */
        font-size: 0.85rem;
        text-decoration: none;
        transition: background-color 0.2s ease, color 0.2s ease;
         border: 1px solid transparent;
      }
       .tag:hover {
          background-color: var(--primary);
          color: white;
       }
  
      /* Featured Image Refinements */
      .featured-image {
        width: 100%;
        max-height: 60vh; /* Limit height */
        margin-bottom: 4rem; /* Increased spacing */
        overflow: hidden;
        background-color: var(--dark-light); /* Placeholder bg */
      }
  
      .featured-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block; /* Remove potential bottom space */
      }
  
      /* Content Area Refinements */
      .content-container {
        max-width: 800px; /* Standard content width */
        margin: 0 auto;
        padding: 0 1.5rem;
      }
  
      .content-body p {
        font-size: 1.1rem; /* Base paragraph size */
        line-height: 1.8;
        margin-bottom: 1.75rem; /* Consistent paragraph spacing */
        color: var(--text);
      }
       /* .content-body p a { 
           color: var(--primary-light);
           text-decoration: underline;
           text-decoration-color: rgba(255, 138, 51, 0.5);
           transition: color 0.2s ease, text-decoration-color 0.2s ease;
       }
        .content-body p a:hover {
           color: var(--primary);
            text-decoration-color: var(--primary);
        } */
  
      .content-body h2 {
        font-size: 1.8rem; /* Slightly smaller h2 */
        margin: 3.5rem 0 1.5rem;
        color: var(--primary);
        line-height: 1.4;
         font-weight: 600;
      }
       /* Add styles for h3, h4 if needed in JSON */
  
      .content-body blockquote {
        border-left: 3px solid var(--primary);
        padding-left: 1.5rem;
        margin: 2.5rem 0;
        color: var(--text-muted); /* Muted text for quote */
      }
  
      .content-body blockquote p {
        font-size: 1.15rem; /* Slightly larger quote text */
        font-style: italic;
        color: var(--text); /* Override muted color for main quote text */
        margin-bottom: 1rem; /* Space before cite */
      }
  
      .content-body blockquote cite {
        font-size: 0.95rem;
        color: var(--text-muted);
        display: block;
        font-style: normal;
      }
  
      .content-body ul {
        margin: 1.75rem 0 2.5rem;
        padding-left: 1.8rem; /* Indent list */
      }
  
      .content-body li {
        margin-bottom: 0.8rem;
        font-size: 1.05rem; /* Match paragraph size */
        line-height: 1.7;
         color: var(--text);
      }
      .content-body li::marker { /* Style list markers */
          color: var(--primary);
      }
  
  
      .content-body figure {
        margin: 3rem 0; /* Consistent figure spacing */
      }
  
      .content-body figure img {
        width: 100%;
        border-radius: 8px;
         display: block; /* Remove potential bottom space */
          border: 1px solid #333; /* Subtle border on content images */
      }
  
      .content-body figcaption {
        margin-top: 0.8rem;
        font-size: 0.9rem;
        color: var(--text-muted);
        text-align: center;
         line-height: 1.5;
      }
  
      /* Related Posts Refinements */
      .related-section {
        margin-top: 5rem;
        padding-top: 4rem;
        border-top: 1px solid #2a2a2a; /* Slightly darker border */
        background-color: var(--dark-light); /* Different bg for related */
         padding-bottom: 5rem;
      }
  
      .related-container {
         max-width: 1200px;
         margin: 0 auto;
         padding: 0 1.5rem;
      }
  
      .related-section h3 {
        margin-bottom: 2.5rem;
        font-size: 1.8rem;
        text-align: center;
        color: var(--text);
         font-weight: 600;
      }
  
      .related-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Allow flexible columns */
        gap: 2rem;
      }
  
      .related-card {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: var(--text);
        background-color: var(--dark);
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
         border: 1px solid #333;
      }
  
      .related-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      }
  
      .thumb {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        position: relative;
        overflow: hidden;
        background-color: #333; /* Placeholder bg */
      }
  
      .thumb img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease; /* Slightly slower zoom */
      }
  
      .related-card:hover .thumb img {
        transform: scale(1.08); /* Slightly more zoom */
      }
  
      .info {
          padding: 1.25rem; /* Padding for text content */
          display: flex;
          flex-direction: column;
          flex-grow: 1; /* Allows date to be pushed down if needed */
      }
  
      .info h4 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
         font-weight: 600;
         flex-grow: 1; /* Push date down */
      }
  
      .info .date {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-top: 0.5rem; /* Space above date */
      }
  
      /* Loading State */
      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh; /* Taller loading state */
        padding: 6rem 1rem;
        gap: 1rem;
      }
       .loading p {
           color: var(--text-muted);
       }
  
      .spinner {
        width: 35px;
        height: 35px;
        border: 3px solid rgba(255, 107, 0, 0.2);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s infinite linear;
      }
  
      @keyframes spin { to { transform: rotate(360deg); } }
  
      /* Responsive Adjustments */
      @media (max-width: 768px) {
        .post-header {
          padding: 6rem 1rem 4rem;
        }
         .post-header h1 {
             font-size: clamp(2rem, 7vw, 2.8rem);
         }
  
        .featured-image {
          max-height: 40vh; /* Adjust height on mobile */
           margin-bottom: 3rem;
        }
         .content-container, .related-container {
              padding: 0 1rem;
         }
         .content-body h2 {
              font-size: 1.6rem;
         }
          .content-body p {
             font-size: 1rem;
         }
          .content-body li {
              font-size: 1rem;
          }
         .related-grid {
           /* Already uses auto-fit, might not need changes unless you want 1 column */
           /* grid-template-columns: 1fr; */
           gap: 1.5rem;
        }
        .related-section {
            padding-bottom: 4rem;
        }
      }
  </style>