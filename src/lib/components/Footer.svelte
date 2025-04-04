<script>
    import { onMount } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { fly, fade } from 'svelte/transition';

    const currentYear = new Date().getFullYear();

    // Back to Top button logic
    let scrollY = 0;
    let showBackToTop = false;

    // Function to scroll smoothly to the top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Reactive statement to show/hide the button based on scroll position
    $: showBackToTop = scrollY > 300; // Show button after scrolling 300px

    // Feather icons SVGs (simplified versions)
    const icons = {
        mail: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        phone: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
        arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`
    }

</script>

<!-- Bind scrollY to the window's scroll position -->
<svelte:window bind:scrollY />

<footer class="site-footer">
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-section footer-logo-section">
                <a href="/" class="logo-link">
                    <!-- Assuming logo.png exists in static/images -->
                    <img src="/images/logo.png" alt="CNJM Technologies Inc. Logo" class="footer-logo-img"/>
                    <!-- Updated highlight target -->
                    <span>CNJM<span class="highlight">Technologies</span> Inc.</span>
                </a>
                <p class="tagline">Innovative Software Solutions for a Digital World.</p>
            </div>

            <div class="footer-section footer-links-section">
                <h4>Quick Links</h4>
                <ul class="footer-nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/hire-us">Hire Us</a></li>
                    <li>
                        <a href="https://james-mwangi-njenga.vercel.app/" target="_blank" rel="noopener noreferrer">
                            Meet the Founder
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-section footer-contact-section">
                <h4>Contact Info</h4>
                <ul class="contact-info-list">
                     <li>
                        <span class="contact-icon">{@html icons.mail}</span>
                        <a href="mailto:cnjmtechnologiesinc@gmail.com">cnjmtechnologiesinc@gmail.com</a>
                    </li>
                     <li>
                        <span class="contact-icon">{@html icons.phone}</span>
                        <a href="tel:+254741593506">+254 741 593 506</a>
                    </li>
                </ul>
                 <a href="/hire-us" class="btn-contact">Discuss Your Project</a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© {currentYear} CNJM Technologies Inc. All rights reserved.</p>
        <!-- Maybe add Privacy Policy / Terms links here -->
    </div>
</footer>

<!-- Back to Top Button -->
{#if showBackToTop}
    <button
        class="back-to-top"
        on:click={scrollToTop}
        aria-label="Scroll back to top"
        transition:fly={{ y: 20, duration: 300, easing: sineInOut }}
    >
        {@html icons.arrowUp}
    </button>
{/if}

<style>
    .site-footer {
        background-color: #151515; /* Slightly darker than dark-light for contrast */
        color: var(--text-muted);
        padding: 5rem 2rem 2.5rem; /* Increased top padding */
        margin-top: 6rem; /* Increased space above footer */
        border-top: 1px solid #2a2a2a; /* Darker border */
        position: relative; /* Needed if using pseudo-elements later */
    }

    .footer-container { /* Added container for max-width */
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* Adjusted minmax */
        gap: 2.5rem 2rem; /* Row and column gap */
        margin-bottom: 3.5rem; /* Increased space before bottom bar */
    }

    /* Logo Section */
    .footer-logo-section .logo-link {
        display: inline-flex; /* Better alignment */
        align-items: center;
        text-decoration: none;
        color: var(--text);
        font-weight: 700;
        font-size: 1.3rem; /* Adjusted size */
        gap: 0.6rem; /* Adjusted gap */
        margin-bottom: 1rem; /* Increased spacing */
    }

    .footer-logo-img {
        height: 38px; /* Adjusted size */
        border-radius: 4px; /* Slightly round logo corners if it's square */
    }

    .highlight {
        color: var(--primary);
        margin-left: 0.1em; /* Small space before highlighted word */
        margin-right: 0.2em;
    }

    .footer-logo-section .tagline {
        font-size: 0.95rem;
        line-height: 1.6;
        max-width: 300px; /* Prevent tagline from getting too wide */
    }

    /* Links & Contact Section Titles */
    .footer-section h4 {
        color: var(--text);
        font-size: 1.15rem; /* Slightly larger */
        margin-bottom: 1.25rem; /* Increased space */
        font-weight: 600;
        position: relative;
        padding-bottom: 0.5rem;
    }
     /* Underline effect for titles */
    .footer-section h4::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30px;
        height: 2px;
        background-color: var(--primary);
    }

    /* Links List */
    .footer-nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-nav-list li {
        margin-bottom: 0.7rem; /* Increased spacing */
    }

    .footer-nav-list li a {
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.2s ease, padding-left 0.2s ease;
        font-size: 1rem; /* Slightly larger links */
        position: relative;
    }
     /* Hover effect for links */
    .footer-nav-list li a:hover {
        color: var(--primary);
        padding-left: 5px; /* Subtle shift on hover */
    }

    /* Contact Info Section */
    .contact-info-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem 0; /* Space below contact list, before button */
    }
     .contact-info-list li {
         display: flex;
         align-items: center;
         gap: 0.8rem; /* Space between icon and text */
         margin-bottom: 0.8rem; /* Space between contact items */
     }
    .contact-icon {
         color: var(--primary);
         flex-shrink: 0; /* Prevent icon squishing */
         margin-top: 2px; /* Fine-tune vertical alignment */
         display: inline-flex; /* Ensure SVG vertical alignment */
    }
     .contact-info-list li a {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.2s ease;
        word-break: break-word; /* Prevent long emails/numbers overflowing */
    }
     .contact-info-list li a:hover {
        color: var(--primary-light);
    }

    /* Contact Button */
    .btn-contact {
        display: inline-block;
        padding: 0.7rem 1.4rem; /* Adjusted padding */
        border-radius: 6px; /* Slightly rounder */
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 0.95rem;
        border: 1px solid var(--primary);
        color: var(--primary);
        background-color: transparent;
    }

    .btn-contact:hover {
        background-color: rgba(255, 107, 0, 0.1);
        border-color: var(--primary-light);
        color: var(--primary-light);
        transform: translateY(-2px); /* Subtle lift */
    }

    /* Footer Bottom Bar */
    .footer-bottom {
        text-align: center;
        padding-top: 2.5rem; /* Increased padding */
        border-top: 1px solid #2a2a2a; /* Darker border */
        font-size: 0.9rem; /* Slightly larger text */
    }

    /* Back to Top Button */
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 45px; /* Size */
        height: 45px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%; /* Circular */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000; /* Ensure it's above other content */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
     .back-to-top:hover {
        background-color: var(--primary-light);
        transform: scale(1.1) translateY(-2px); /* Grow and lift slightly */
        box-shadow: 0 6px 16px rgba(255, 107, 0, 0.4);
     }
     /* Style for the SVG icon inside
     .back-to-top :global(svg) {
        /* Styles applied via icon object */
     /* } */ 


     /* Responsive Adjustments */
     @media (max-width: 768px) {
        .site-footer {
            padding: 4rem 1rem 2rem;
            margin-top: 4rem;
        }
        .footer-content {
             grid-template-columns: 1fr; /* Stack columns */
             text-align: center; /* Center text in stacked columns */
             gap: 2.5rem; /* Increase gap when stacked */
        }
        .footer-logo-section .logo-link {
             justify-content: center; /* Center logo when stacked */
        }
        .footer-logo-section .tagline {
            margin-left: auto;
            margin-right: auto; /* Center tagline */
        }
         .footer-section h4::after {
             left: 50%; /* Center underline */
             transform: translateX(-50%);
         }
         .contact-info-list li {
            justify-content: center; /* Center contact items */
         }
         .back-to-top {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
         }
     }

</style>