// ========================================================
// THE SOCIAL MEDIA PLATFORM DATA STATE CONTROLLER
// ========================================================
const SocialSystem = {
    STORAGE_KEY: "nexus_stream_vault",
    posts: [],

    // 1. Initial System Boot Initialization Loop
    init() {
        // Hydrate feed history with cached files or load structural default mock values
        this.posts = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [
            { id: "post_1", author: "morgan_dev", content: "Just configured a custom hot-reloader workflow on my layout workstation. Massive productivity upgrade!", likes: 4, likedByMe: false, timestamp: "Just now" },
            { id: "post_2", author: "sky_line", content: "Architecture tip: Always isolate your abstract platform logic modules cleanly away from structural view rendering engines. Your code components will thank you.", likes: 12, likedByMe: true, timestamp: "2 hours ago" }
        ];

        this.syncSystemState();
        this.setupSearchFilter();
    },

    // 2. Publish New Node Entry Object into Post Logs Stack
    createPost(author, content) {
        const newPost = {
            id: "post_" + Math.random().toString(36).substr(2, 9),
            author: author.trim().replace(/^@/, ''), // Clean up any duplicate character declarations
            content: content.trim(),
            likes: 0,
            likedByMe: false,
            timestamp: "Just now"
        };

        this.posts.unshift(newPost); // Append newest item directly onto the head of the timeline stream
        this.syncSystemState();
    },

    // 3. Mutate Engagement Like Array Counts
    toggleLike(id) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            if (post.likedByMe) {
                post.likes -= 1;
                post.likedByMe = false;
            } else {
                post.likes += 1;
                post.likedByMe = true;
            }
            this.syncSystemState();
        }
    },

    // 4. Wipe Selected Post from Timeline Stream Array
    purgePost(id) {
        this.posts = this.posts.filter(p => p.id !== id);
        this.syncSystemState();
    },

    syncSystemState() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.posts));
        this.calculateMetrics();
        this.renderFeedUI(this.posts); // Default layout view prints complete array layer
    },

    // 5. System Analytics Engine Calculations
    calculateMetrics() {
        const totalPosts = this.posts.length;
        const totalLikes = this.posts.reduce((sum, p) => sum + p.likes, 0);
        
        // Engagement evaluation maps ratio indexes based on total posts vs interactions
        const computedEngagement = totalPosts > 0 ? Math.round((totalLikes / totalPosts) * 10) : 0;

        // Push updates straight out to top display counter presentation panels
        document.getElementById('totalPostsCount').textContent = totalPosts;
        document.getElementById('totalLikesCount').textContent = totalLikes;
        document.getElementById('engagementRate').textContent = `${computedEngagement}%`;
    },

    // 6. Connect Real-time Text Input Observers to Search Filter Engines
    setupSearchFilter() {
        document.getElementById('searchInput').addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase().trim();
            
            // Generate temporary filtered slice match arrays
            const filteredPosts = this.posts.filter(p => {
                return p.author.toLowerCase().includes(query) || p.content.toLowerCase().includes(query);
            });

            this.renderFeedUI(filteredPosts);
        });
    },

    // 7. Dynamic HTML DOM Parsing: Feed Container List Renderer Matrix
    renderFeedUI(postsDataset) {
        const feedContainer = document.getElementById('feedContainer');
        feedContainer.innerHTML = "";

        if (postsDataset.length === 0) {
            feedContainer.innerHTML = `
                <div class="panel" style="text-align:center; color:#64748b; padding: 30px 0;">
                    No network streams match your current search profile queries.
                </div>`;
            return;
        }

        postsDataset.forEach(post => {
            const card = document.createElement('div');
            card.className = "post-card";

            card.innerHTML = `
                <div class="post-header">
                    <span class="post-author">@${post.author}</span>
                    <span class="post-time">${post.timestamp}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="action-btn like-btn ${post.likedByMe ? 'liked' : ''}" data-id="${post.id}">
                        ♥ <span>${post.likes}</span> Likes
                    </button>
                    <button class="action-btn delete-btn purge-btn" data-id="${post.id}">
                        🗑 Delete Post
                    </button>
                </div>
            `;
            feedContainer.appendChild(card);
        });
    }
};

// ========================================================
// CONTROLLER EVENT HANDLING INTERFACE LOGIC
// ========================================================

// Handle Post Form Broadcaster Submissions
document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const authorInput = document.getElementById('usernameInput');
    const contentInput = document.getElementById('postContentInput');

    // Route inputs down into active core system state processes
    SocialSystem.createPost(authorInput.value, contentInput.value);

    // Flash entry textareas back to clean empty string configurations
    contentInput.value = "";
});

// Event Delegation capture block maps interactions within dynamic post components
document.getElementById('feedContainer').addEventListener('click', (event) => {
    const target = event.target;
    // Walk up tree branches to find valid structural element identification metrics if needed
    const button = target.closest('button');
    if (!button) return;

    const selectedId = button.getAttribute('data-id');
    if (!selectedId) return;

    if (button.classList.contains('like-btn')) {
        SocialSystem.toggleLike(selectedId);
    } else if (button.classList.contains('purge-btn')) {
        if (confirm("Are you sure you want to permanently delete this broadcast entry from your feed timeline?")) {
            SocialSystem.purgePost(selectedId);
        }
    }
});

// Boot central execution engine systems when HTML parsing operations finish safely
document.addEventListener('DOMContentLoaded', () => {
    SocialSystem.init();
});