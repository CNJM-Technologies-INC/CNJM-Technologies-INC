<script>
    export let blog;
    
    // Format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric' 
      });
    }
  </script>
  
  <a href={`/blog/${blog.id}`} class="blog-card">
    <div class="image-container">
      <img src={blog.image} alt={blog.title} />
      <div class="date">{formatDate(blog.date)}</div>
    </div>
    <div class="content">
      <h3>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <div class="meta">
        <span class="author">By {blog.author}</span>
        <div class="tags">
          {#each blog.tags.slice(0, 2) as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  </a>
  
  <style>
    .blog-card {
      display: flex;
      flex-direction: column;
      background-color: var(--dark-light);
      border-radius: 8px;
      overflow: hidden;
      height: 100%;
      text-decoration: none;
      color: var(--text);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .image-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      overflow: hidden;
    }
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .blog-card:hover img {
      transform: scale(1.05);
    }
    
    .date {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: var(--primary);
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-top-left-radius: 8px;
    }
    
    .content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    h3 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.4;
    }
    
    p {
      margin: 0 0 1.5rem;
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--text-muted);
      flex: 1;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    
    .author {
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .tags {
      display: flex;
      gap: 0.5rem;
    }
    
    .tag {
      font-size: 0.75rem;
      background-color: rgba(255, 107, 0, 0.15);
      color: var(--primary);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
  </style>