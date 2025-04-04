// src/lib/store/blogStore.js
import { writable } from 'svelte/store';

// Initialize as null or an empty array. It can hold the list of blog posts if needed later.
export const blogPosts = writable(null);

// You could add other related state here in the future, e.g.:
// export const isLoadingBlogs = writable(false);
// export const blogError = writable(null);
// export const currentBlogFilter = writable({ tag: '', search: '' });

// Example function to potentially load data into the store (optional for now)
/*
export async function loadBlogs() {
    if (get(blogPosts)) return; // Already loaded

    isLoadingBlogs.set(true);
    blogError.set(null);
    try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        blogPosts.set(data.blogs || []);
    } catch (e) {
        console.error("Failed to load blogs into store:", e);
        blogError.set(e.message || 'Failed to load blogs');
        blogPosts.set([]); // Set to empty array on error
    } finally {
        isLoadingBlogs.set(false);
    }
}
*/

// Note: Currently, blog/+page.svelte and blog/[slug]/+page.svelte fetch data directly.
// This store is set up as requested but isn't actively used by those components yet.