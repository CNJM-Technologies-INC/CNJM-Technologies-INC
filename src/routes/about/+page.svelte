<script>
    // Base Svelte imports
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    // Component Imports - assume these exist or will be created
    // import PageHeader from '$lib/components/PageHeader.svelte';
    
    // Page State
    let mounted = false;
    let teamElement;
    let isTeamIntersecting = false;

    // Team Members Data
    const teamMembers = [
        {
            name: "James Mwangi (Camresh)",
            role: "Founder & Lead Developer",
            bio: "With over 4 years of experience in software development, James founded CNJM Tech with a vision to create meaningful software solutions that solve real business problems.",
            imageUrl: "/images/team/James.jpg",
            socialLinks: {
                linkedin: "https://linkedin.com/in/CamreshJames",
                github: "https://github.com/CamreshJames",
                twitter: "https://twitter.com/CamreshJames",
                dribbble: "https://james-mwangi-njenga.vercel.app/"
            }
        },
        {
            name: "Francis Ng'ang'a",
            role: "Mobile App Developer",
            bio: "Francis brings 3 years of Mobile Development experience, ensuring our solutions are not just functional but also intuitive and delightful to use.",
            imageUrl: "/images/team/francis.jpg", 
            socialLinks: {
                github: "http://Github.com/freminoxa",
                twitter: "https://x.com/Frank5149170005?t=w3FpxdgYHYlxW26rMI0HjA&s=09",
                dribbble: "https://ngangafrancis.netlify.app/"
            }
        },
        {
            name: "Henry Mwangi Chege (Hencha Edits)",
            role: "UX/UI Designer & Developer",
            bio: "Henry brings over 4 years of expertise in crafting exceptional user experiences. He bridges the gap between design aesthetics and functional development, ensuring intuitive and engaging interfaces.",
            imageUrl: "/images/team/henry.jpg",
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/henchadev/", 
                github: "http://Github.com/HenchaDev",   
                twitter: "https://x.com/mac_henry_03",  
                dribbble: "https://henry-portfolio-five.vercel.app/"  
            }
        },
        {
            name: "Joseph Macharia Kariuki",
            role: "Hardware & Network Specialist",
            bio: "With over 5 years in the field, Joseph is our master troubleshooter and hardware expert. He ensures our infrastructure, servers, and networks run smoothly and efficiently.",
            imageUrl: "/images/team/joseph.png", 
            socialLinks: {
                dribbble: "https://joseph-macharia-kariuki.vercel.app/", 
            }
        }
    ];

    // Timeline Data
    const companyTimeline = [
        {
            year: "June 2024",
            title: "Foundation",
            description: "CNJM Technologies was founded with the mission to develop innovative software solutions for businesses of all sizes."
        },
        {
            year: "August 2024",
            title: "First Major Client",
            description: "Secured our first enterprise client and delivered a comprehensive inventory management system that increased efficiency by 40%."
        },
        {
            year: "October 2024",
            title: "Team Expansion",
            description: "Grew our team to include specialists in UI/UX design, mobile development, and project management."
        },
        {
            year: "November 2024",
            title: "Remote-First Culture",
            description: "Embraced a remote-first approach, allowing us to work with talent and clients worldwide."
        },
        {
            year: "December 2024",
            title: "Innovation Award",
            description: "Received regional recognition for our innovative approach to solving complex business challenges through technology."
        },
        {
            year: "January 2025",
            title: "Service Expansion",
            description: "Added data analytics and AI capabilities to our service offerings, helping clients derive greater insights from their data."
        },
        {
            year: "February 2025",
            title: "Community Initiative",
            description: "Launched our tech education program, providing training and mentorship to aspiring developers in underserved communities."
        },
        {
            year: "April 2025",
            title: "Looking Forward",
            description: "Continuing to grow and innovate while maintaining our core values of excellence, integrity, and client satisfaction."
        }
    ];

    // Company Stats
    const companyStats = [
        { number: "50+", label: "Completed Projects" },
        { number: "15", label: "Happy Clients" },
        { number: "5", label: "Team Members" },
        { number: "100%", label: "Client Retention" }
    ];

    // Social media icon SVGs
    const socialIcons = {
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
        twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
        dribbble: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>`
    };

    // Intersection Observer for animation triggers
    function setupIntersectionObserver() {
        if (typeof IntersectionObserver === 'undefined' || !teamElement) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isTeamIntersecting) {
                    isTeamIntersecting = true;
                }
            },
            { threshold: 0.2 }
        );
        
        observer.observe(teamElement);
        
        return () => {
            if (teamElement) observer.unobserve(teamElement);
        };
    }

    // Lifecycle
    onMount(() => {
        mounted = true;
        setTimeout(() => {
            setupIntersectionObserver();
        }, 100);
    });
</script>

<svelte:head>
  <title>About Us - CNJM Technologies Inc.</title>
  <meta name="description" content="Learn about CNJM Technologies Inc., our team, mission, values, and history of creating innovative software solutions.">
</svelte:head>

<!-- Page Header -->
<!-- <PageHeader 
    title="About Us" 
    subtitle="Get to know our team and our journey in creating innovative software solutions." 
    backgroundImage="/images/headers/about-header.jpg"
/> -->

{#if mounted}
<!-- Company Overview Section -->
<section class="company-overview content-section" in:fade={{ duration: 800, delay: 300 }}>
    <div class="section-container">
        <div class="overview-content">
            <div class="overview-text" in:fly={{ x: -30, duration: 500, delay: 500 }}>
                <h2 class="section-title">Our <span class="highlight">Story</span></h2>
                <p class="overview-paragraph">
                    Founded in 2024, CNJM Technologies emerged from a simple belief: software should solve real problems, not create new ones. We've grown from a small team of passionate developers into a full-service digital solutions provider, but our core mission remains unchanged.
                </p>
                <p class="overview-paragraph">
                    We specialize in creating custom software solutions that automate processes, enhance productivity, and drive innovation. Our approach is deeply collaborative – we don't just build what we think you need; we listen, understand, and then craft solutions that address your specific challenges.
                </p>
                <p class="overview-paragraph">
                    Today, we're proud to serve clients across multiple industries, from startups to established enterprises. What sets us apart is our commitment to not just meeting expectations, but exceeding them through thoughtful design, robust engineering, and attentive service.
                </p>
            </div>
            <div class="overview-stats" in:fly={{ x: 30, duration: 500, delay: 700 }}>
                <div class="stats-grid">
                    {#each companyStats as stat, i}
                        <div class="stat-card" in:fade={{ duration: 300, delay: 900 + i * 100 }}>
                            <div class="stat-number">{stat.number}</div>
                            <div class="stat-label">{stat.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Mission & Values Section -->
<section class="mission-values content-section" in:fade={{ duration: 800, delay: 500 }}>
    <div class="section-container">
        <h2 class="section-title centered" in:fly={{ y: 30, duration: 500, delay: 600 }}>
            Our Mission & <span class="highlight">Values</span>
        </h2>
        <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 700 }}>
            Guiding principles that define who we are and how we work.
        </p>
        
        <div class="mission-statement" in:fly={{ y: 30, duration: 500, delay: 800 }}>
            <div class="quote-mark">"</div>
            <blockquote>
                Our mission is to empower businesses through technology, creating software solutions that are not just functional, but transformative—enabling our clients to operate more efficiently, serve their customers better, and achieve their fullest potential.
            </blockquote>
        </div>
        
        <div class="values-grid">
            <div class="value-item" in:fly={{ y: 30, duration: 500, delay: 900 }}>
                <h3>Excellence</h3>
                <p>We pursue excellence in every line of code, every design decision, and every client interaction. Good enough is never enough.</p>
            </div>
            <div class="value-item" in:fly={{ y: 30, duration: 500, delay: 1000 }}>
                <h3>Integrity</h3>
                <p>We believe in transparent communication, honest feedback, and doing what's right—even when it's challenging.</p>
            </div>
            <div class="value-item" in:fly={{ y: 30, duration: 500, delay: 1100 }}>
                <h3>Innovation</h3>
                <p>We embrace new technologies and approaches, continuously learning and evolving to deliver the best possible solutions.</p>
            </div>
            <div class="value-item" in:fly={{ y: 30, duration: 500, delay: 1200 }}>
                <h3>Collaboration</h3>
                <p>We work closely with our clients, valuing their expertise and insights as essential to creating effective solutions.</p>
            </div>
        </div>
    </div>
</section>

<!-- Team Section -->
<section class="team-section content-section" bind:this={teamElement} in:fade={{ duration: 800, delay: 300 }}>
    <div class="section-container">
        <h2 class="section-title centered" in:fly={{ y: 30, duration: 500, delay: 400 }}>
            Meet Our <span class="highlight">Team</span>
        </h2>
        <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 500 }}>
            The passionate people behind our innovative solutions.
        </p>
        
        <div class="team-grid">
            {#each teamMembers as member, i}
                <div class="team-card" in:fly={{ y: 30, duration: 500, delay: 600 + i * 150 }}>
                    <div class="team-photo" style="background-image: url({member.imageUrl || '/images/team/placeholder.jpg'})"></div>
                    <div class="team-info">
                        <h3 class="team-name">{member.name}</h3>
                        <p class="team-role">{member.role}</p>
                        <p class="team-bio">{member.bio}</p>
                        <div class="team-social">
                            {#each Object.entries(member.socialLinks) as [platform, url]}
                                <a href={url} target="_blank" rel="noopener noreferrer" class="social-link">
                                    {@html socialIcons[platform]}
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Company Timeline Section -->
<section class="timeline-section content-section" in:fade={{ duration: 800, delay: 300 }}>
    <div class="section-container">
        <h2 class="section-title centered" in:fly={{ y: 30, duration: 500, delay: 400 }}>
            Our <span class="highlight">Journey</span>
        </h2>
        <p class="section-subtitle" in:fly={{ y: 30, duration: 500, delay: 500 }}>
            Key milestones in our path of growth and innovation.
        </p>
        
        <div class="timeline">
            {#each companyTimeline as item, i}
                <div class="timeline-item" class:right={(i % 2) !== 0} in:fly={{ y: 30, duration: 500, delay: 600 + i * 100 }}>
                    <div class="timeline-content">
                        <div class="timeline-year">{item.year}</div>
                        <h3 class="timeline-title">{item.title}</h3>
                        <p class="timeline-description">{item.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="cta-section content-section" in:fade={{ duration: 800, delay: 300 }}>
    <div class="section-container">
        <div class="cta-wrapper" in:fade={{ duration: 500, delay: 400 }}>
            <div class="cta-content">
                <h2 class="cta-title">Ready to bring your ideas to life?</h2>
                <p class="cta-description">Let's start a conversation about how we can help your business reach its full potential through custom software solutions.</p>
            </div>
            <div class="cta-buttons">
                <a href="/hire-us" class="btn primary large">Get in Touch</a>
                <a href="/projects" class="btn text">Explore Our Work</a>
            </div>
        </div>
    </div>
</section>
{/if}

<style>
    /* Base styles */
    .content-section { 
        padding: 6rem 0; 
        position: relative;
    }
    .section-container { 
        max-width: 1200px; 
        margin: 0 auto; 
        padding: 0 2rem; 
    }
    .section-title { 
        font-size: clamp(2.2rem, 5vw, 3rem); 
        font-weight: 700; 
        color: var(--text); 
        margin-bottom: 1rem; 
        letter-spacing: -0.02em;
    }
    .section-title.centered {
        text-align: center;
    }
    .section-title .highlight { 
        color: var(--primary); 
        position: relative;
        z-index: 1;
    }
    .section-subtitle { 
        font-size: clamp(1rem, 2.5vw, 1.2rem); 
        color: var(--text-muted); 
        text-align: center; 
        max-width: 700px; 
        margin: 0 auto 4rem auto; 
        line-height: 1.6; 
    }
    .btn { 
        display: inline-block; 
        padding: 0.8rem 2rem; 
        border-radius: 6px; 
        font-weight: 600; 
        text-decoration: none; 
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        font-size: 1rem; 
        cursor: pointer; 
        border: none; 
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
    .btn.text {
        background: transparent;
        color: var(--text);
        text-decoration: underline;
        padding: 0.8rem 1rem;
    }
    .btn.text:hover {
        color: var(--primary);
    }
    .btn.large { 
        padding: 1rem 2.5rem; 
        font-size: 1.1rem; 
    }

    /* Section Backgrounds */
    .company-overview { 
        background-color: var(--dark); 
    }
    .mission-values { 
        background-color: var(--dark-light); 
    }
    .team-section { 
        background-color: var(--dark); 
    }
    .timeline-section {
        background-color: var(--dark-light);
        position: relative;
    }
    .cta-section {
        background-color: var(--dark);
        position: relative;
    }

    /* Company Overview */
    .overview-content {
        display: flex;
        gap: 4rem;
        align-items: center;
    }
    .overview-text {
        flex: 1.5;
    }
    .overview-stats {
        flex: 1;
    }
    .overview-paragraph {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--text-muted);
        margin-bottom: 1.5rem;
    }
    .overview-paragraph:last-child {
        margin-bottom: 0;
    }
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    .stat-card {
        background-color: var(--dark-lighter);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        transition: transform 0.3s ease;
    }
    .stat-card:hover {
        transform: translateY(-5px);
    }
    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    .stat-label {
        font-size: 1rem;
        color: var(--text-muted);
    }

    /* Mission & Values */
    .mission-statement {
        background-color: var(--dark);
        padding: 3rem;
        border-radius: 16px;
        margin-bottom: 4rem;
        position: relative;
        text-align: center;
    }
    .quote-mark {
        font-size: 8rem;
        position: absolute;
        top: -2rem;
        left: 2rem;
        color: var(--primary-transparent);
        font-family: serif;
        line-height: 1;
    }
    .mission-statement blockquote {
        font-size: 1.5rem;
        line-height: 1.6;
        color: var(--text);
        font-weight: 300;
        margin: 0;
        font-style: italic;
    }
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    .value-item {
        background-color: var(--dark);
        padding: 2rem;
        border-radius: 12px;
        transition: transform 0.3s ease;
    }
    .value-item:hover {
        transform: translateY(-5px);
    }
    .value-item h3 {
        color: var(--primary);
        font-size: 1.3rem;
        margin: 0 0 1rem 0;
    }
    .value-item p {
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0;
    }

    /* Team Section */
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2.5rem;
    }
    .team-card {
        background-color: var(--dark-lighter);
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .team-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
    .team-photo {
        height: 250px;
        background-size: auto 250px;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #000;
    }
    .team-info {
        padding: 1.5rem;
    }
    .team-name {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: var(--text);
    }
    .team-role {
        font-size: 1rem;
        color: var(--primary);
        margin: 0 0 1rem 0;
        font-weight: 500;
    }
    .team-bio {
        font-size: 0.95rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
    }
    .team-social {
        display: flex;
        gap: 1rem;
    }
    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--dark);
        color: var(--text-muted);
        transition: all 0.3s ease;
    }
    .social-link:hover {
        background-color: var(--primary);
        color: white;
        transform: translateY(-3px);
    }

    /* Timeline Section */
    .timeline {
        position: relative;
        max-width: 1000px;
        margin: 0 auto;
        padding-bottom: 2rem;
    }
    .timeline::before {
        content: '';
        position: absolute;
        width: 4px;
        background-color: var(--primary-transparent);
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
    }
    .timeline-item {
        padding: 0 2rem 2rem 2rem;
        position: relative;
        width: 50%;
        box-sizing: border-box;
    }
    .timeline-item::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        right: -10px;
        background-color: var(--primary);
        border-radius: 50%;
        top: 15px;
        z-index: 1;
    }
    .timeline-item.right {
        left: 50%;
    }
    .timeline-item.right::after {
        left: -10px;
    }
    .timeline-content {
        padding: 1.5rem;
        background: var(--dark);
        border-radius: 10px;
        position: relative;
    }
    .timeline-year {
        display: inline-block;
        background-color: var(--primary);
        color: white;
        padding: 0.3rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .timeline-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 0.8rem 0;
        color: var(--text);
    }
    .timeline-description {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--text-muted);
        margin: 0;
    }

    /* CTA Section */
    .cta-wrapper {
        background-color: var(--dark-lighter);
        border-radius: 16px;
        padding: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    .cta-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--primary-light));
    }
    .cta-content {
        max-width: 60%;
    }
    .cta-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--text);
        margin: 0 0 1rem 0;
    }
    .cta-description {
        font-size: 1.1rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.6;
    }
    .cta-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-end;
    }

    /* Responsive Styles */
    @media (max-width: 992px) {
        .overview-content {
            flex-direction: column;
            gap: 3rem;
        }
        
        .timeline::before {
            left: 31px;
        }
        
        .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
        }
        
        .timeline-item::after {
            left: 21px;
            right: auto;
        }
        
        .timeline-item.right {
            left: 0;
        }
        
        .cta-wrapper {
            flex-direction: column;
            text-align: center;
            padding: 2.5rem 2rem;
        }
        
        .cta-content {
            max-width: 100%;
            margin-bottom: 2rem;
        }
        
        .cta-buttons {
            align-items: center;
        }
    }
    
    @media (max-width: 768px) {
        .content-section {
            padding: 4rem 0;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .mission-statement {
            padding: 2rem;
        }
        
        .mission-statement blockquote {
            font-size: 1.3rem;
        }
        
        .quote-mark {
            font-size: 6rem;
            top: -1.5rem;
            left: 1rem;
        }
        
        .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }
    
    @media (max-width: 576px) {
        .section-container {
            padding: 0 1.5rem;
        }
        
        .team-photo {
            height: 200px;
        }
    }
</style>