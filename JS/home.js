// Sidebar Chevron Toggle
const sidebar = document.querySelector('.sidebar');
const chevronBtn = document.querySelector('.sidebar-chevorn a');
const mainContent = document.querySelector('.container');
const header = document.querySelector('header');
let isSidebarExpanded = false;

chevronBtn.addEventListener('click', () => {
    isSidebarExpanded = !isSidebarExpanded;
    if (isSidebarExpanded) {
        sidebar.classList.add('expanded');
        mainContent.classList.add('expanded');
        header.classList.add('expanded');
        chevronBtn.querySelector('i').classList.replace('fa-chevron-right', 'fa-chevron-left');
    } else {
        sidebar.classList.remove('expanded');
        mainContent.classList.remove('expanded');
        header.classList.remove('expanded');
        chevronBtn.querySelector('i').classList.replace('fa-chevron-left', 'fa-chevron-right');
    }
});

// Search Functionality with Local Storage
document.addEventListener('DOMContentLoaded', () => {
    // Sample data for albums, charts, and releases
    const musicData = {
        albums: [
            { title: "Endless Summer", artist: "Sarah Johnson", image: "../assets/images/img_2.png" },
            { title: "Midnight Dreams", artist: "Alex Turner", image: "../assets/images/img_3.png" },
            { title: "Neon Lights", artist: "Electro Beats", image: "../assets/images/img_4.png" },
            { title: "Mountain View", artist: "Nature Sounds", image: "../assets/images/img_5.png" },
            { title: "City Lights", artist: "Urban Rhythms", image: "../assets/images/img_6.png" },
            { title: "Ocean Waves", artist: "Coastal Sounds", image: "../assets/images/img_7.png" },
            { title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png" },
            { title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png" },
            { title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song6.jpg.png" },
            { title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png" },
            { title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song3.jpg.png" },
            { title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png" }
        ],
        charts: [
            { title: "Summer Vibes", artist: "Beach Boys", image: "../assets/images/img_10.png" },
            { title: "Moonlit Nights", artist: "Luna Echo", image: "../assets/images/img_11.png" },
            { title: "Electric Pulse", artist: "DJ Spark", image: "../assets/images/img_12.png" },
            { title: "Golden Hour", artist: "Sunny Days", image: "../assets/images/img_13.png" },
            { title: "Echoes of Love", artist: "Heartstrings", image: "../assets/images/img_14.png" },
            { title: "City Dreams", artist: "Urban Echo", image: "../assets/images/img_15.png" },
            { title: "Starry Sky", artist: "Night Glow", image: "../assets/images/img_16.png" },
            { title: "Rhythm Flow", artist: "Beat Master", image: "../assets/images/img_17.png" },
            { title: "Ocean Breeze", artist: "Wave Riders", image: "../assets/images/img_18.png" },
            { title: "Sunset Glow", artist: "Horizon Band", image: "../assets/images/img_14.png" },
            { title: "Neon Dreams", artist: "Light Pulse", image: "../assets/images/img_17.png" },
            { title: "Wild Hearts", artist: "Free Spirits", image: "../assets/images/img_10.png" },
            { title: "Crystal Echo", artist: "Glass Notes", image: "../assets/images/img_16.png" },
            { title: "Frosty Nights", artist: "Winter Chill", image: "../assets/images/img_19.png" },
            { title: "Fire Within", artist: "Blaze Band", image: "../assets/images/img_15.png" }
        ],
        releases: [
            { title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "../assets/images/img_14.png", duration: "5:10" },
            { title: "Dreamy Nights", artist: "Luna Echo", image: "../assets/images/img_16.png", duration: "4:30" },
            { title: "Electric Vibes", artist: "DJ Spark", image: "../assets/images/img_11.png", duration: "3:45" },
            { title: "Golden Sunset", artist: "Sunny Days", image: "../assets/images/img_15.png", duration: "4:15" }
        ]
    };

    // Save data to Local Storage if not already present
    if (!localStorage.getItem('musicData')) {
        localStorage.setItem('musicData', JSON.stringify(musicData));
    }

    // Initialize search history
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const searchMessage = document.querySelector('.search-message');
    const recentlyPlayedGrid = document.querySelector('.recently-played .album-grid');
    const chartsGrid = document.querySelector('.charts-section .charts-grid');
    const releasesContainer = document.querySelector('.releases');
    const featuredArtistsGrid = document.querySelector('.featured-artists .album-grid');
    const featuredAlbumsGrid = document.querySelector('.featured-albums .album-grid');

    // Show/hide clear button based on input
    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
        filterContent(searchInput.value.toLowerCase().trim());
    });

    // Clear search input
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterContent('');
        searchMessage.style.display = 'none';
    });

    // Search on button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            searchHistory.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(-5))); // Keep last 5 searches
        }
        filterContent(query);
    });

    // Suggest search history (basic autocomplete)
    searchInput.addEventListener('focus', () => {
        // This could be enhanced with a dropdown for suggestions
        console.log('Search history:', searchHistory); // For debugging
    });

    function filterContent(query) {
        const data = JSON.parse(localStorage.getItem('musicData'));
        let hasResults = false;

        // Filter and render albums (Recently Played and Featured Artists)
        const albumItems = data.albums.filter(item => 
            query === '' || 
            item.title.toLowerCase().includes(query) || 
            item.artist.toLowerCase().includes(query)
        );
        recentlyPlayedGrid.innerHTML = albumItems.slice(0, 6).map(item => `
            <div class="album-item">
                <img src="${item.image}" alt="Album Cover">
                <div class="album-info">
                    <div class="album-title">${item.title}</div>
                    <div class="album-artist">${item.artist}</div>
                </div>
            </div>
        `).join('');
        featuredArtistsGrid.innerHTML = albumItems.slice(0, 6).map(item => `
            <div class="album-item">
                <img src="${item.image}" alt="Album Cover">
                <div class="album-info">
                    <div class="album-title">${item.title}</div>
                    <div class="album-artist">${item.artist}</div>
                </div>
            </div>
        `).join('');
        featuredAlbumsGrid.innerHTML = albumItems.map(item => `
            <div class="album-item">
                <img src="${item.image}" alt="Album Cover">
                <div class="album-info">
                    <div class="album-title">${item.title}</div>
                    <div class="album-artist">${item.artist}</div>
                </div>
            </div>
        `).join('');
        hasResults |= albumItems.length > 0;

        // Filter and render charts
        const chartItems = data.charts.filter(item => 
            query === '' || 
            item.title.toLowerCase().includes(query) || 
            item.artist.toLowerCase().includes(query)
        );
        chartsGrid.innerHTML = `
            <div class="chart-column">
                ${chartItems.slice(0, 5).map((item, index) => `
                    <div class="chart-item">
                        <div class="chart-number">${(index + 1).toString().padStart(2, '0')}</div>
                        <div class="chart-thumbnail">
                            <img src="${item.image}" alt="Song Thumbnail">
                        </div>
                        <div class="chart-info">
                            <div class="chart-title">${item.title}</div>
                            <div class="chart-artist">${item.artist}</div>
                        </div>
                        <div class="chart-buttons">
                            <button><i class="fas fa-play"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="chart-column">
                ${chartItems.slice(5, 10).map((item, index) => `
                    <div class="chart-item">
                        <div class="chart-number">${(index + 6).toString().padStart(2, '0')}</div>
                        <div class="chart-thumbnail">
                            <img src="${item.image}" alt="Song Thumbnail">
                        </div>
                        <div class="chart-info">
                            <div class="chart-title">${item.title}</div>
                            <div class="chart-artist">${item.artist}</div>
                        </div>
                        <div class="chart-buttons">
                            <button><i class="fas fa-play"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="chart-column">
                ${chartItems.slice(10, 15).map((item, index) => `
                    <div class="chart-item">
                        <div class="chart-number">${(index + 11).toString().padStart(2, '0')}</div>
                        <div class="chart-thumbnail">
                            <img src="${item.image}" alt="Song Thumbnail">
                        </div>
                        <div class="chart-info">
                            <div class="chart-title">${item.title}</div>
                            <div class="chart-artist">${item.artist}</div>
                        </div>
                        <div class="chart-buttons">
                            <button><i class="fas fa-play"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        hasResults |= chartItems.length > 0;

        // Filter and render releases
        const releaseItems = data.releases.filter(item => 
            query === '' || 
            item.title.toLowerCase().includes(query) || 
            item.artist.toLowerCase().includes(query)
        );
        releasesContainer.innerHTML = releaseItems.map(item => `
            <div class="release-item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h4>${item.title} ${item.duration}</h4>
                    <p>${item.artist}</p>
                </div>
            </div>
        `).join('');
        hasResults |= releaseItems.length > 0;

        // Show/hide no results message
        searchMessage.style.display = hasResults || query === '' ? 'none' : 'block';
    }
});