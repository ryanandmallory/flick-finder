// Page element variables
const introPage = document.querySelector('.intro-page');
const questionOnePage = document.querySelector('.question-one-page');
const questionTwoPage = document.querySelector('.question-two-page');
const questionThreePage = document.querySelector('.question-three-page');
const questionFourPage = document.querySelector('.question-four-page');
const questionFivePage = document.querySelector('.question-five-page');
const questionSixPage = document.querySelector('.question-six-page');
const questionSevenPage = document.querySelector('.question-seven-page');
const searchResultsPage = document.querySelector('.search-results');
const progressLine = document.querySelectorAll('.progress-line');
const sliderOutput = document.querySelector('.slider-output');
const displayEpisodePage = document.querySelector('.display-episode-page');
const displayEpisodeResults = document.querySelector('.display-episode-results');
const displayOutputContainer = document.querySelector('.movies-container');
const startOverConfirmationPage = document.querySelector('.start-over-confirmation-page');
const searchPage = document.querySelector('.search-page');
const searchConfirmationPage = document.querySelector('.search-confirmation-page');
const episodeSearchField = document.querySelector('#episode-search-feld');
const imgPath = 'https://image.tmdb.org/t/p/w1280';
// Temporary array 
let tempArray = [];
// Object data being stored based on the seven questions
const questions = {
	type: "",
	genre: "",
	category: "",
	time: "",
	popular: "",
	audience: "",
	hit: ""
};
// Progress lines on the top showing progress of the seven questions
const changeProgressLine = function(val){
	progressLine.forEach((line)=> {
		line.style.width = val;
	})
}
// Hides geners or category button option when series is selected
const hideMovieBtns = () => {
	const hideBtns = document.querySelectorAll('.question-three-btn');
	hideBtns.forEach((button) => {
		let tvBtnsDeleted = ['Adult', 'Biography', 'Film Noir', 'Horror', 'Music', 'Short', 'Sports', 'Thriller'];
		tvBtnsDeleted.forEach((tvBtnDeleted)=>{
			if (button.textContent == tvBtnDeleted) {
				button.style.display = 'none';
			}
		});
	});
}
// Gets series information and dynamically outputs display
const getSeries = (values) => {
	let discoverMovieUrl;
	let discoverTvUrl;
	// Defines modern (greater than 2010) and classic less than 2010
	const getDate = () => {
		if (values.genre == 'Modern'){
			console.log(values.genre)
			return 2010;
		} else {
			return 1960;
		}
	};
	// Gets time
	const getRuntime = () => {
		return values.time;
	};
	// Converts numberic count based on popularity
	const getVoteCount = () => {
		if (values.popular == 'Popular'){
			return 10;
		} else {
			return 3;
		}
	};
	// Gets series categories and converts them to a numeric code
	const getTVCategory = (categories) => {
		let category_names = [];
		categories.forEach((category_name) => {
			if (category_name == 'Action'){ category_names.push(Number(10759))}
			if (category_name == 'Adventure'){ category_names.push(Number(10759))}
			if (category_name == 'Animation'){ category_names.push(Number(16))}
			if (category_name == 'Comedy'){ category_names.push(Number(35))}
			if (category_name == 'Crime'){ category_names.push(Number(80))}
			if (category_name == 'Documentary'){ category_names.push(Number(99))}
			if (category_name == 'Drama'){ category_names.push(Number(18))}
			if (category_name == 'Family'){ category_names.push(Number(10751))}
			if (category_name == 'Fantasy'){ category_names.push(Number(10765))}
			if (category_name == 'Kids'){ category_names.push(Number(10762))}
			if (category_name == 'Mystery'){ category_names.push(Number(9648))}
			if (category_name == 'News'){ category_names.push(Number(10763))}
			if (category_name == 'Reality'){ category_names.push(Number(10764))}
			if (category_name == 'Romance'){ category_names.push(Number(10766))}
			if (category_name == 'Sci-Fi'){ category_names.push(Number(10765))}
			if (category_name == 'Talk-Show'){ category_names.push(Number(10767))}
			if (category_name == 'War'){ category_names.push(Number(10768))}
			if (category_name == 'Western'){ category_names.push(Number(37))}
		});
		return category_names;
	};
	// Excludes generes based on audience selection
	const getExcludedTVCategory = () => {
		let excluded_category_names = [];
		if (values.audience == 'Kids'){
			excluded_category_names.push(88);
			excluded_category_names.push(99);
			excluded_category_names.push(18);
			excluded_category_names.push(10763);
			excluded_category_names.push(10764);
			excluded_category_names.push(10766);
			excluded_category_names.push(10767);
			excluded_category_names.push(10768);
			excluded_category_names.push(37);
		}
		if (values.audience == 'Teenagers'){
			excluded_category_names.push(88);
			excluded_category_names.push(99);
			excluded_category_names.push(18);
			excluded_category_names.push(10763);
			excluded_category_names.push(10764);
			excluded_category_names.push(10767);
			excluded_category_names.push(10768);
			excluded_category_names.push(37);
		}
		if (values.audience == 'Adults'){
			excluded_category_names.push(10762);
		} else {
			return 0;
		}
		return excluded_category_names;
	}
	// Returns results if critically acclaimed or screen theatrically
	const getScreenedTheatrically = () => {
		if (values.hit == 'Critically Acclaimed'){
			return true;
		} else {
			return false;
		}
	}
	// Fetches url — runs check, if no results then alternate url appears reducing parameters and genrs cateogries to just two
	const createShowBoard = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		showMoviesEpsiodes(data.results);
		if (data.results === undefined || data.results.length == 0 ) {
			const tempArray = values.category;
			const tempArrayReduce = tempArray.splice(0, 2);
			discoverTvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=4b04125b76f09355bc6be4f9e740d5fd&language=en-US&timezone=America%2FNew_York&with_genres=${getTVCategory(tempArrayReduce)}&sort_by=popularity.desc&page=1}`;
			createShowBoardAlt(discoverTvUrl);
		}
	}
	// Fetches url based on reduce parameters
	const createShowBoardAlt = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		showMoviesEpsiodes(data.results);
	}
	// Displays Movie or epsiodes based on data results
	const showMoviesEpsiodes = (movies) => {
		movies.forEach((movie) => {
			const { name, poster_path, id } = movie;
			const movieEl = document.createElement('div');
			movieEl.classList.add('movie-wrapper');
			movieEl.innerHTML = `
				<img src="${runImageChecker(imgPath, poster_path)}" alt="${name}">
				<h3>${name}</h3>
				<button class="episode-btn" href="#" data-id="${id}">More</button>
		`;
		displayOutputContainer.appendChild(movieEl);
    	});
	}
	// Returns movie or series depending on which button is clicked
	if (values.type == 'Movie'){
		discoverMovieUrl = `https://api.themoviedb.org/3/discover/movie/?sort_by=popularity.desc&api_key=4b04125b76f09355bc6be4f9e740d5fd&page=1`;
		console.log("Movies");
	} else {
		discoverTvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=4b04125b76f09355bc6be4f9e740d5fd&language=en-US&timezone=America%2FNew_York&with_genres=${getTVCategory(values.category)}&with_runtime.lte=${getRuntime()}&first_air_date.gte=${getDate()}&vote_count.gte=${getVoteCount()}&without_genres=${getExcludedTVCategory()}&screened_theatrically=${getScreenedTheatrically()}&sort_by=popularity.desc&page=1}`;
		createShowBoard(discoverTvUrl);
		console.log(discoverTvUrl);
	}
}
// Fetches specific episode results through fetch
const fetchEpisodeResults = async (movieId) => {
	const res = await fetch('https://api.themoviedb.org/3/tv/' + movieId + '?api_key=4b04125b76f09355bc6be4f9e740d5fd');
	const data = await res.json();
	console.log(data)
	createEpisodeDisplay(data);
}
// Creates overview of the episodes series display
const fetchEpisodeSeriesSearch = async (movieId) => {
	const res = await fetch('https://api.themoviedb.org/3/search/tv?api_key=4b04125b76f09355bc6be4f9e740d5fd&query=' + movieId + '&language=en-US&page=1&include_adult=false');
	const data = await res.json();
	displayOutputContainer.innerHTML = '';
	let seriesEl = data.results;
	seriesEl.forEach((movie) => {
		const { name, poster_path, id } = movie;
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie-wrapper');
		movieEl.innerHTML = `
			<img src="${runImageChecker(imgPath, poster_path)}" alt="${name}">
			<h3>${name}</h3>
			<button class="episode-btn" href="#" data-id="${id}">More</button>
	`;
	displayOutputContainer.appendChild(movieEl);
	});
	searchPage.classList.remove('active');
	displayEpisodePage.classList.add('active');
}
// Creates expanded view of the episode series page
const createEpisodeDisplay = (episodeDataResults) => {
		const { name, poster_path, overview, genres, first_air_date, created_by, number_of_seasons, number_of_episodes, networks, episode_run_time, popularity, vote_count, vote_average} = episodeDataResults;
		const epsoideEl = document.createElement('div');
		epsoideEl.classList.add('display-episode-container');
		epsoideEl.innerHTML = `
		<div class="display-episode-container-left">
			<img src="${runImageChecker(imgPath, poster_path)}" alt="${name}">
			<button class="episode-back-btn">Back to selections</button>
		</div>
		<div class="display-episode-container-right">
			<h2 class="lead-headline">${name}</h2>
			<p class="lead-desc">${overview}</p>
			<div class="details-wrapper">
				<div class="details-desc">
					<p><strong>Type:</strong> TV Series</p>
					<p><strong>Genre:</strong> ${loopArray(genres)}</p>
					<p><strong>Release date:</strong> ${first_air_date}</p>
					<p><strong>Created by:</strong> ${loopArray(created_by)}</p>
					<p><strong>Number of seasons:</strong> ${number_of_seasons}</p>
					<p><strong>Number of episodes:</strong> ${number_of_episodes}</p>
					<p><strong>Networks:</strong> ${loopArray(networks)}</p>
					<p><strong>Length:</strong> ${loopArrayAlt(episode_run_time)}</p>
				</div>
				<div class="details-ratings">
					<img src="img/star.svg" alt="Star icon">
					<h4>Episode Ratings</h4>
					<p>Popularity<strong>${roundsFigure(popularity)}</strong></p>
					<p>Vote Count<strong>${vote_count}</strong></p>
					<p>Vote Average<strong>${vote_average}</strong></p>
				</div>
			</div>
		</div>
	`;
	displayEpisodeResults.appendChild(epsoideEl);
}
// Returns a generic images if the image cannot be found
const runImageChecker = (path, image) =>{
	const img = path + image;
	if (img == 'https://image.tmdb.org/t/p/w1280null'){
		return '../img/img-not-available.jpg'
	} else {
		return img;
	}
}
// Returns Not Available for information that cannot be found 
const loopArray = (elements)=> {
	let elementArray = [];
	console.log(elements)
	if (elements.length == 0){
		return 'Not available';
	}
	elements.forEach((element) => {
		elementArray.push(element.name);
	});
	return elementArray.join(', ');
};
// Returns Not Available for minutes that cannot be found 
const loopArrayAlt = (elements)=> {
	let elementArray = [];
	if (elements.length == 0){
		return 'Not available';
	}
	elements.forEach((element) => { elementArray.push(element + ' mins.'); });
	return elementArray.join(', ');
};
// Rounds popolarity figure
const roundsFigure = (num) => {
	return Math.round(num);
}

// EVENT LISTENERS
// Keystroke or enter Event Listeners
episodeSearchField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
		const seriesEpisode = episodeSearchField.value;
		fetchEpisodeSeriesSearch(seriesEpisode);
    }
});
// Click Event Listeners
document.addEventListener('click', function (event) {
	if (event.target.matches('.begin-btn')) {
		introPage.classList.remove('active');
        questionOnePage.classList.add('active');
	}
	if (event.target.matches('.question-one-btn')) {
		questionOnePage.classList.remove('active');
		questions.type = [event.target.textContent];
        questionTwoPage.classList.add('active');
		if (event.target.textContent == 'Series'){ hideMovieBtns(); }
		changeProgressLine('20%');
	}
	if (event.target.matches('.question-two-btn')) {
		questionTwoPage.classList.remove('active');
		questions.genre = [event.target.textContent];
		questionThreePage.classList.add('active');
		changeProgressLine('35%');
	}
	if (event.target.matches('.question-three-btn')) {
		let flag = false;
		let category = event.target.textContent;
		const checkDuplicate = function (value, array) {
			for (let i = 0; i < tempArray.length; i++) {
				if (value === array[i]){
					const id = tempArray.indexOf(value);
					const removeId = tempArray.splice(id, 1);
					event.target.setAttribute('style', 'background: #fcf3f3 !important; color: #1D1919 !important;');
					flag = true;
				} 
			}
		}
		if (tempArray === undefined || tempArray.length == 0) {
			event.target.setAttribute('style', 'background: #6edb27; color: #ffffff;');
			tempArray.push(event.target.textContent);
		} 
		else {
			checkDuplicate(category, tempArray);
			if (flag == false){
				event.target.setAttribute('style', 'background: #6edb27; color: #ffffff;');
				tempArray.push(category);
			} 
		}
	}
	if (event.target.matches('.question-three-proceed-btn')) {
		const categoryMessage = document.querySelector('.question-three-confirmed p');
		const categoryMessageBtn = document.querySelector('.question-three-proceed-btn');
		if (tempArray === undefined || tempArray.length == 0){
			categoryMessage.textContent = "Please click on one or more categories to proceed.";
			categoryMessageBtn.style.display = "none";
			setTimeout(()=> {
				categoryMessage.classList.add('fade-out');
				categoryMessage.textContent = "Look's good to me — let's proceed.";
				categoryMessageBtn.classList.add('fade-out');
				categoryMessageBtn.style.display = "block";
			}, 3000);
				categoryMessage.classList.remove('fade-out');
				categoryMessageBtn.classList.remove('fade-out');
		} else {
			questionThreePage.classList.remove('active');
			questionFourPage.classList.add('active');
			changeProgressLine('50%');
			questions.category = tempArray;
		}
	}
	if (event.target.matches('.question-four-proceed-btn')) {
		const str = sliderOutput.value;
		const res = str.split(" ");
		res.pop();
		questions.time = res;
		questionFourPage.classList.remove('active');
		questionFivePage.classList.add('active');
		changeProgressLine('65%');
	}
	if (event.target.matches('.question-five-btn')) {
		questionFivePage.classList.remove('active');
		questionSixPage.classList.add('active');
		questions.popular = [event.target.textContent];
		changeProgressLine('80%');
	}
	if (event.target.matches('.question-six-btn')) {
		questionSixPage.classList.remove('active');
		questionSevenPage.classList.add('active');
		questions.audience = [event.target.textContent];
		changeProgressLine('90%');
	}
	if (event.target.matches('.question-seven-btn')) {
		questionSevenPage.classList.remove('active');
		searchResultsPage.classList.add('active');
		questions.hit = [event.target.textContent];
		getSeries(questions);
		setTimeout( ()=> {
			const secondMessage = document.querySelector('.search-wrapper-txt p');
			const searchSpinner = document.querySelector('.search-spinner');
			const secondMessageDisplay = document.querySelector('.search-wrapper-txt');
			const greenLine = document.querySelector('.green-line-alt');
			searchSpinner.style.display = 'none';
			secondMessage.classList.add('fade-out');
			secondMessageDisplay.style.bottom = '35%';
			greenLine.style.display = 'none';
			secondMessage.textContent = "Found them! Here's your results.";
		}, 3000);
		setTimeout( ()=> {
			searchResultsPage.classList.remove('active');
			displayEpisodePage.classList.add('active');
		}, 7000);
	}
	if (event.target.matches('.episode-btn')) {
		fetchEpisodeResults(event.target.dataset.id);
		displayEpisodePage.classList.remove('active');
		displayEpisodeResults.classList.add('active');
	}
	if (event.target.matches('.episode-back-btn')) {
		displayEpisodeResults.classList.remove('active');
		displayEpisodeResults.innerHTML = '';
		displayEpisodePage.classList.add('active');
	}
	if (event.target.matches('.nav-close-btn')) {
		startOverConfirmationPage.classList.add('active');
	}
	if (event.target.matches('.confirmation-btn')) {
		if (event.target.textContent == 'Yes'){
			window.location.reload();
		} else {
			startOverConfirmationPage.classList.remove('active');
		}
	}
	if (event.target.matches('.nav-search-btn')) {
		searchConfirmationPage.classList.add('active');
	}
	if (event.target.matches('.search-btn')) {
		if (event.target.textContent == 'Yes'){
			searchConfirmationPage.classList.remove('active');
			displayEpisodePage.classList.remove('active');
			episodeSearchField.value = '';
			searchPage.classList.add('active');
		} else {
			searchConfirmationPage.classList.remove('active');
		}
	}
	if (event.target.matches('.take-me-back')) {
		searchPage.classList.remove('active');
		displayEpisodePage.classList.add('active');
	}
}, false);