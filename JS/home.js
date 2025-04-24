
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
document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const albums = document.querySelectorAll('.album-item');
    const charts = document.querySelectorAll('.chart-item');
    const releases = document.querySelectorAll('.release-item');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        filterContent(query);
    });
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        filterContent(query);
    });
    
    function filterContent(query) {
        // Filter Albums
        albums.forEach(album => {
            const title = album.querySelector('.album-title').textContent.toLowerCase();
            const artist = album.querySelector('.album-artist').textContent.toLowerCase();
            album.style.display = (query === '' || title.includes(query) || artist.includes(query)) ? 'block' : 'none';
        });
    
        // Filter Charts
        charts.forEach(chart => {
            const title = chart.querySelector('.chart-title').textContent.toLowerCase();
            const artist = chart.querySelector('.chart-artist').textContent.toLowerCase();
            chart.style.display = (query === '' || title.includes(query) || artist.includes(query)) ? 'flex' : 'none';
        });
    
        // Filter Releases
        releases.forEach(release => {
            const title = release.querySelector('h4').textContent.toLowerCase();
            const artist = release.querySelector('p').textContent.toLowerCase();
            release.style.display = (query === '' || title.includes(query) || artist.includes(query)) ? 'flex' : 'none';
        });
    }
});    