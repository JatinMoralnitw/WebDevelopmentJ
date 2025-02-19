let movies = [];
        
const movieInput = document.getElementById('movieInput');
const addBtn = document.getElementById('addBtn');
const movieList = document.getElementById('movieList');
const clearBtn = document.getElementById('clearBtn');
const movieStats = document.getElementById('movieStats');

function renderMovies() {
    movieList.innerHTML = '';

    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${movie}</span>
            <span class="delete-movie" data-index="${index}">✕</span>
        `;
        movieList.appendChild(li);
    });
    
    updateStats();
}
function updateStats() {
    if (movies.length === 0) {
        movieStats.textContent = 'No movies added yet';
    } else {
        movieStats.textContent = `Total movies: ${movies.length}`;
    }
}
addBtn.addEventListener('click', () => {
    addMovie();
});

movieInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addMovie();
    }
});

function addMovie() {
    const movieName = movieInput.value.trim();
    if (movieName === '') {
        return;
    }
    movies.push(movieName);
    movieInput.value = '';
    movieInput.focus();
    renderMovies();
}
movieList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-movie')) {
        const index = parseInt(event.target.dataset.index);
        movies.splice(index, 1);
        renderMovies();
    }
});

clearBtn.addEventListener('click', () => {
    if (movies.length > 0) {
        if (confirm('Are you sure you want to clear all movies?')) {
            movies = [];
            renderMovies();
        }
    }
});
renderMovies();