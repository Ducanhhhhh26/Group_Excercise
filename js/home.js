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

const musicData = {
    albums: [
        { title: "Endless Summer", artist: "Sarah Johnson", image: "../assets/images/img_2.png", mp3: "../assets/1.mp3" },
        { title: "Midnight Dreams", artist: "Alex Turner", image: "../assets/images/img_3.png", mp3: "../assets/1.mp3" },
        { title: "Neon Lights", artist: "Electro Beats", image: "../assets/images/img_4.png", mp3: "../assets/1.mp3" },
        { title: "Mountain View", artist: "Nature Sounds", image: "../assets/images/img_5.png", mp3: "../assets/1.mp3" },
        { title: "City Lights", artist: "Urban Rhythms", image: "../assets/images/img_6.png", mp3: "../assets/1.mp3" },
        { title: "Ocean Waves", artist: "Coastal Sounds", image: "../assets/images/img_7.png", mp3: "../assets/1.mp3" },
        { title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png", mp3: "../assets/1.mp3" },
        { title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png", mp3: "../assets/1.mp3" },
        { title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song6.jpg.png", mp3: "../assets/1.mp3" },
        { title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png", mp3: "../assets/1.mp3" },
        { title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song3.jpg.png", mp3: "../assets/1.mp3" },
        { title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png", mp3: "../assets/1.mp3" }
    ],
    charts: [
        { title: "Summer Vibes", artist: "Beach Boys", image: "../assets/images/img_10.png", mp3: "../assets/1.mp3" },
        { title: "Moonlit Nights", artist: "Luna Echo", image: "../assets/images/img_11.png", mp3: "../assets/1.mp3" },
        { title: "Electric Pulse", artist: "DJ Spark", image: "../assets/images/img_12.png", mp3: "../assets/1.mp3" },
        { title: "Golden Hour", artist: "Sunny Days", image: "../assets/images/img_13.png", mp3: "../assets/1.mp3" },
        { title: "Echoes of Love", artist: "Heartstrings", image: "../assets/images/img_14.png", mp3: "../assets/1.mp3" },
        { title: "City Dreams", artist: "Urban Echo", image: "../assets/images/img_15.png", mp3: "../assets/1.mp3" },
        { title: "Starry Sky", artist: "Night Glow", image: "../assets/images/img_16.png", mp3: "../assets/1.mp3" },
        { title: "Rhythm Flow", artist: "Beat Master", image: "../assets/images/img_17.png", mp3: "../assets/1.mp3" },
        { title: "Ocean Breeze", artist: "Wave Riders", image: "../assets/images/img_18.png", mp3: "../assets/1.mp3" },
        { title: "Sunset Glow", artist: "Horizon Band", image: "../assets/images/img_14.png", mp3: "../assets/1.mp3" },
        { title: "Neon Dreams", artist: "Light Pulse", image: "../assets/images/img_17.png", mp3: "../assets/1.mp3" },
        { title: "Wild Hearts", artist: "Free Spirits", image: "../assets/images/img_10.png", mp3: "../assets/1.mp3" },
        { title: "Crystal Echo", artist: "Glass Notes", image: "../assets/images/img_16.png", mp3: "../assets/1.mp3" },
        { title: "Frosty Nights", artist: "Winter Chill", image: "../assets/images/img_19.png", mp3: "../assets/1.mp3" },
        { title: "Fire Within", artist: "Blaze Band", image: "../assets/images/img_15.png", mp3: "../assets/1.mp3" }
    ],
    releases: [
        { title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "../assets/images/img_14.png", duration: "5:10", mp3: "../assets/1.mp3" },
        { title: "Dreamy Nights", artist: "Luna Echo", image: "../assets/images/img_16.png", duration: "4:30", mp3: "../assets/1.mp3" },
        { title: "Electric Vibes", artist: "DJ Spark", image: "../assets/images/img_11.png", duration: "3:45", mp3: "../assets/1.mp3" },
        { title: "Golden Sunset", artist: "Sunny Days", image: "../assets/images/img_15.png", duration: "4:15", mp3: "../assets/1.mp3" }
    ]
};
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.querySelector('.play-btn');
    const playerAlbumImg = document.querySelector('.player-album-img img');
    const playerSongTitle = document.querySelector('.player-song-info h6');
    const playerSongArtist = document.querySelector('.player-song-info p');

    let isPlaying = false;

    function playSong(song) {
        if (!song || !song.mp3 || !song.image || !song.title || !song.artist) {
            console.error('Invalid song data:', song);
            return;
        }
        playerAlbumImg.src = song.image;
        playerSongTitle.textContent = song.title;
        playerSongArtist.textContent = song.artist;
        audioPlayer.src = song.mp3;
        audioPlayer.play().then(() => {
            isPlaying = true;
            playBtn.querySelector('i').classList.replace('bi-play-fill', 'bi-pause-fill');
        })
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playBtn.querySelector('i').classList.replace('bi-pause-fill', 'bi-play-fill');
        } else {
            audioPlayer.play().then(() => {
                isPlaying = true;
                playBtn.querySelector('i').classList.replace('bi-play-fill', 'bi-pause-fill');
            })
        }
    });

    const chartItems = document.querySelectorAll('.chart-item');
    chartItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const song = musicData.charts[index];
            if (song) {
                console.log('Clicked chart item:', index, song);
                playSong(song);
            } else {
                console.error('No song found at chart index:', index);
            }
        });
    });

    const albumItems = document.querySelectorAll('.album-item');
    albumItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const song = musicData.albums[index];
            if (song) {
                console.log('Clicked album item:', index, song);
                playSong(song);
            } else {
                console.error('No song found at album index:', index);
            }
        });
    });
});







document.addEventListener('DOMContentLoaded', () => {
    const recentlyPlayedGrid = document.querySelector('.recently-played .album-grid');
    const recentlyPlayedPrev = document.querySelector('.recently-played .carousel-controls button:first-child');
    const recentlyPlayedNext = document.querySelector('.recently-played .carousel-controls button:last-child');
    let recentlyPlayedIndex = 0;
    const totalRecentlyPlayedItems = recentlyPlayedGrid.children.length;

    recentlyPlayedNext.addEventListener('click', () => {
        if (recentlyPlayedIndex < totalRecentlyPlayedItems - 6) { // Hiển thị 6 mục mỗi lần
            recentlyPlayedIndex++;
            recentlyPlayedGrid.style.transform = `translateX(-${recentlyPlayedIndex * (100 / 6)}%)`;
        }
    });

    recentlyPlayedPrev.addEventListener('click', () => {
        if (recentlyPlayedIndex > 0) {
            recentlyPlayedIndex--;
            recentlyPlayedGrid.style.transform = `translateX(-${recentlyPlayedIndex * (100 / 6)}%)`;
        }
    });

    const featuredArtistsGrid = document.querySelector('.featured-artists .album-grid');
    const featuredArtistsPrev = document.querySelector('.featured-artists .carousel-controls button:first-child');
    const featuredArtistsNext = document.querySelector('.featured-artists .carousel-controls button:last-child');
    let featuredArtistsIndex = 0;
    const totalFeaturedArtistsItems = featuredArtistsGrid.children.length;

    featuredArtistsNext.addEventListener('click', () => {
        if (featuredArtistsIndex < totalFeaturedArtistsItems - 6) {
            featuredArtistsIndex++;
            featuredArtistsGrid.style.transform = `translateX(-${featuredArtistsIndex * (100 / 6)}%)`;
        }
    });

    featuredArtistsPrev.addEventListener('click', () => {
        if (featuredArtistsIndex > 0) {
            featuredArtistsIndex--;
            featuredArtistsGrid.style.transform = `translateX(-${featuredArtistsIndex * (100 / 6)}%)`;
        }
    });
});