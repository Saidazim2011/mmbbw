import movies from "./movies.js";

let containerMovie = document.querySelector(".container-movie");
let searchInput = document.getElementById("searchInput");
let genreSelect = document.getElementById("genreSelect");
let sortSelect = document.getElementById("sortSelect");
let resultContainer = document.getElementById("resultContainer");
let searchBtn = document.getElementById("searchBtn");

function getMoviePoster(imgUrl) {
    return imgUrl && imgUrl.length > 0
      ? imgUrl
      : "https://www.example.com/images/dinosaur.jpg";
}

function generator(moviesArr) {
    containerMovie.innerHTML = '';
    if (moviesArr.length === 0) {
        containerMovie.innerHTML = "<p style='color:white'>No movies found.</p>";
        return;
    }
    moviesArr.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${getMoviePoster(element.ImageURL)}" alt="${element.Title}">
            <h1>${element.Title}</h1>
            <h1 style="font-size: 17px;color: white;">
                ${element.imdb_rating}⭐️ 
                ${element.movie_year}🌍 
                ${element.runtime} min🕝
            </h1>
            <div class="kka">${element.Categories}</div>
            <button class="oo">More Info</button>
        `;
        containerMovie.appendChild(card);
    });
}

function filterAndSortMovies() {
    let searchValue = searchInput.value.trim().toLowerCase();
    let genreValue = genreSelect.value;
    let sortValue = sortSelect.value;

    // Фильтрация
    let filteredMovies = movies.filter(movie => {
        let titleMatch = movie?.Title?.toString().toLowerCase().includes(searchValue);
        let categoryMatch = !genreValue || genreValue === "All" || (movie.Categories && movie.Categories.toLowerCase().includes(genreValue.toLowerCase()));
        return titleMatch && categoryMatch;
    });

    // Сортировка
    switch (sortValue) {
        case "A-Z":
            filteredMovies.sort((a, b) => a.Title.toString().localeCompare(b.Title.toString()));
            break;
        case "Z-A":
            filteredMovies.sort((a, b) => b.Title.toString().localeCompare(a.Title.toString()));
            break;
        case "1-10":
            filteredMovies.sort((a, b) => (a.imdb_rating || 0) - (b.imdb_rating || 0));
            break;
        case "10-1":
            filteredMovies.sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0));
            break;
        case "Max-year 2018-2000":
            filteredMovies.sort((a, b) => (b.movie_year || 0) - (a.movie_year || 0));
            break;
        case "Min-year 2000-2018":
            filteredMovies.sort((a, b) => (a.movie_year || 0) - (b.movie_year || 0));
            break;
    }

    resultContainer.textContent = `Results: ${filteredMovies.length}`;
    generator(filteredMovies);
}

// События
searchInput.addEventListener("input", filterAndSortMovies);
genreSelect.addEventListener("change", filterAndSortMovies);
sortSelect.addEventListener("change", filterAndSortMovies);
searchBtn.addEventListener("click", filterAndSortMovies);

// Стартовый рендер
filterAndSortMovies();