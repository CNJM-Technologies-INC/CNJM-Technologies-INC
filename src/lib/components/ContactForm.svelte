<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
  
    let name = '';
    let email = '';
    let company = '';
    let projectType = '';
    let budget = '';
    let description = '';
    let submitting = false;
    let submitted = false;
    let error = '';
  
    const projectTypes = [
      'Custom Software Development',
      'Web Application',
      'Mobile Application',
      'Data Analytics',
      'AI/Machine Learning',
      'Process Automation',
      'Other'
    ];
  
    const budgetRanges = [
      'Less than KES 50,000',
      'KES 50,000 - KES 100,000',
      'KES 100,000 - KES 250,000',
      'KES 250,000 - KES 500,000',
      'KES 500,000+'
    ];
  
    async function handleSubmit() {
      // Basic client-side validation
      if (!name.trim() || !email.trim() || !description.trim()) {
        error = 'Please fill in all required fields (Name, Email, Project Description).';
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
          error = 'Please enter a valid email address.';
          return;
      }
  
      error = '';
      submitting = true;
  
      try {
        // --- SIMULATED API CALL ---
        // In a real app, this would be an API call to your backend
        // Example:
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ name, email, company, projectType, budget, description })
        // });
        // if (!response.ok) {
        //    throw new Error('Server error');
        // }
        // const result = await response.json();
  
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Simulated submission:', { name, email, company, projectType, budget, description });
        // --- END SIMULATION ---
  
        submitting = false;
        submitted = true;
        resetForm();
  
      } catch (err) {
        submitting = false;
        error = 'Failed to submit your request. Please try again later.';
        console.error('Error submitting form:', err);
      }
    }
  
    function resetForm() {
      name = '';
      email = '';
      company = '';
      projectType = '';
      budget = '';
      description = '';
    }
  </script>
  
  <div class="contact-form-container">
    {#if !submitted}
      <form on:submit|preventDefault={handleSubmit} class="contact-form" novalidate>
        <div class="form-header" in:fade={{ delay: 100, duration: 400 }}>
          <h2>Tell us about your project</h2>
          <p>Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>
  
        {#if error}
          <div class="error-message" role="alert" in:fade={{ duration: 300 }}>
            {error}
          </div>
        {/if}
  
        <div class="form-grid">
          <div class="form-group" in:fly={{ y: 20, duration: 400, delay: 200 }}>
            <label for="name">Name <span class="required">*</span></label>
            <input
              type="text"
              id="name"
              bind:value={name}
              required
              aria-required="true"
              disabled={submitting}
            />
          </div>
  
          <div class="form-group" in:fly={{ y: 20, duration: 400, delay: 250 }}>
            <label for="email">Email <span class="required">*</span></label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              aria-required="true"
              disabled={submitting}
            />
          </div>
  
          <div class="form-group" in:fly={{ y: 20, duration: 400, delay: 300 }}>
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              bind:value={company}
              disabled={submitting}
            />
          </div>
  
          <div class="form-group" in:fly={{ y: 20, duration: 400, delay: 350 }}>
            <label for="projectType">Project Type</label>
            <select id="projectType" bind:value={projectType} disabled={submitting}>
              <option value="">Select a project type</option>
              {#each projectTypes as type}
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>
  
          <div class="form-group full-width" in:fly={{ y: 20, duration: 400, delay: 400 }}>
            <label for="budget">Estimated Budget</label>
            <select id="budget" bind:value={budget} disabled={submitting}>
              <option value="">Select a budget range</option>
              {#each budgetRanges as range}
                <option value={range}>{range}</option>
              {/each}
            </select>
          </div>
  
          <div class="form-group full-width" in:fly={{ y: 20, duration: 400, delay: 450 }}>
            <label for="description">Project Description <span class="required">*</span></label>
            <textarea
              id="description"
              bind:value={description}
              rows="6"
              placeholder="Tell us about your project, goals, challenges, and desired outcomes..."
              required
              aria-required="true"
              disabled={submitting}
            ></textarea>
          </div>
  
          <div class="form-group full-width" in:fly={{ y: 20, duration: 400, delay: 500 }}>
            <button
              type="submit"
              class="submit-btn"
              disabled={submitting}
            >
              {#if submitting}
                <span class="spinner"></span>
                Submitting...
              {:else}
                Send Inquiry
              {/if}
            </button>
          </div>
        </div>
      </form>
    {:else}
      <div class="success-message" in:fade={{ duration: 500 }}>
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Message Sent!</h2>
        <p>Thank you for reaching out. We've received your inquiry and will be in touch within 24 business hours.</p>
        <button
          class="reset-btn"
          on:click={() => submitted = false}
        >
          Send Another Message
        </button>
      </div>
    {/if}
  </div>
  
  <style>
    .contact-form-container {
      background-color: var(--dark-light);
      border-radius: 12px; /* Slightly larger radius */
      padding: 2.5rem 3rem; /* Adjusted padding */
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
      max-width: 800px;
      margin: 4rem auto 6rem; /* Added top/bottom margin */
    }
  
    .form-header {
      text-align: center;
      margin-bottom: 2.5rem; /* Increased margin */
    }
  
    .form-header h2 {
      font-size: clamp(1.8rem, 4vw, 2.2rem); /* Responsive font size */
      margin-bottom: 0.75rem;
      color: var(--text);
    }
  
    .form-header p {
      color: var(--text-muted);
      font-size: 1rem;
    }
  
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem; /* This is where it stopped */
    }
  
    .form-group {
      margin-bottom: 0.5rem; /* Slight adjustment */
    }
  
    .form-group.full-width {
      grid-column: 1 / -1;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  
    .required {
      color: var(--primary);
      margin-left: 2px;
    }
  
    input[type="text"],
    input[type="email"],
    select,
    textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 6px; /* Consistent radius */
      border: 1px solid #333; /* Darker border */
      background-color: #2a2a2a; /* Slightly different dark shade */
      color: var(--text);
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
  
    input[type="text"]:focus,
    input[type="email"]:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.3); /* Focus ring */
    }
  
    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a0a0a0' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1em 1em;
    }
  
    textarea {
      resize: vertical;
      min-height: 120px;
    }
  
    input:disabled, select:disabled, textarea:disabled {
        background-color: #333;
        opacity: 0.7;
        cursor: not-allowed;
    }
  
    .submit-btn {
      width: 100%;
      padding: 0.9rem 2rem;
      border-radius: 6px;
      border: none;
      background-color: var(--primary);
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  
    .submit-btn:hover:not(:disabled) {
      background-color: var(--primary-light);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 0, 0.25);
    }
  
    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
  
    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    .error-message {
      background-color: rgba(255, 0, 0, 0.1);
      color: #ff8a8a;
      border: 1px solid rgba(255, 0, 0, 0.3);
      padding: 0.8rem 1rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      grid-column: 1 / -1; /* Span across grid if error appears after grid setup */
    }
  
    .success-message {
      text-align: center;
      padding: 2rem 0;
    }
  
    .success-icon {
      color: var(--primary);
      margin-bottom: 1rem;
    }
  
    .success-message h2 {
      font-size: 1.8rem;
      margin-bottom: 0.75rem;
      color: var(--text);
    }
  
    .success-message p {
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-size: 1rem;
      line-height: 1.6;
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
    }
  
    .reset-btn {
      padding: 0.8rem 1.8rem;
      border-radius: 6px;
      border: 1px solid var(--primary);
      background-color: transparent;
      color: var(--primary);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
  
    .reset-btn:hover {
      background-color: rgba(255, 107, 0, 0.1);
    }
  
    @media (max-width: 768px) {
      .contact-form-container {
        padding: 2rem 1.5rem;
      }
      .form-grid {
        grid-template-columns: 1fr; /* Stack columns */
      }
    }
  </style>