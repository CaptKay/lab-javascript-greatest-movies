// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray
    .filter((director, index) => moviesArray.indexOf(director) === index)
    .map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  let avg = 0;

  if (moviesArray.length === 0) {
    return avg;
  }

  const totalScore = moviesArray.reduce((sum, currVal) => {
    const score = Number(currVal?.score) || 0;
    return sum + score;
  }, 0);

  avg = totalScore / moviesArray.length;

  return parseFloat(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  //   const {dramaMoviesTotal, dramaMoviesCount} = moviesArray.reduce((sum, movie) => {
  //     const movieGenre = movie.genre || [];

  //     if (movieGenre.includes("Drama")) {
  //       sum.dramaMoviesTotal += Number(movie.score) || 0;
  //       sum.dramaMoviesCount += 1;
  //     }
  //     return sum;
  //   }, {dramaMoviesTotal: 0, dramaMoviesCount: 0});

  //   const avg = dramaMoviesCount > 0 ? dramaMoviesTotal/dramaMoviesCount : 0;

  //   console.log(dramaMoviesTotal, dramaMoviesCount)
  //   return parseFloat(avg.toFixed(2));

  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );
  const dramaMoviesTotalScore = dramaMovies.reduce(
    (sum, movie) => sum + movie.score,
    0
  );

  const avg =
    dramaMoviesTotalScore > 0 ? dramaMoviesTotalScore / dramaMovies.length : 0;

  return parseFloat(avg.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray.toSorted((a, b) => {
    if (a.year === b.year) {
      return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
    }
    return a.year > b.year ? 1 : a.year < b.year ? -1 : 0;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  // const sortedMovieArr = moviesArray.toSorted((a,b)=> a.title > b.title
  // ? 1 :  a.title < b.title ? -1 : 0)
  // const mappedMovieArr = sortedMovieArr.map(movie => movie.title)
  // console.log(mappedMovieArr)
  // return mappedMovieArr.splice(0,20)

  const mappedMovieArr = moviesArray
    .toSorted((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
    .map((movie) => movie.title)
    .splice(0, 20);

  //   const mappedMovieArr = moviesArray
  //     .map((movie) => ({title: movie.title}))
  //     .toSorted((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
  //     .splice(0, 20);
  console.log(mappedMovieArr);
  return mappedMovieArr;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const hoursToMinuteCustomFn = function (data) {
    let timeString = data.duration;
    let hours = 0;
    let minutes = 0;

    if (timeString.includes("h")) {
      const hIndex = timeString.indexOf("h");
      const hoursPart = timeString.slice(0, hIndex).trim();
      hours = parseInt(hoursPart);
    }

    if (timeString.includes("min")) {
      const minIndex = timeString.indexOf("min");
      const spaceBtwHM = timeString.indexOf(" ");
      const minutesPart = timeString.slice(spaceBtwHM, minIndex).trim();
      minutes = parseInt(minutesPart);
    }

    return (timeString = hours * 60 + minutes);
  };

  const result = moviesArray.map((movie) => {
    // movie.duration = hoursToMinuteCustomFn(movie);
    return {
      ...movie,
      duration: hoursToMinuteCustomFn(movie),
    };
  });

  console.log(result);
  return result;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;
  // const newArray = structuredClone(moviesArray);
  if (moviesArray.length === 1) {
    // const only = moviesArray[0];
    return `The best year was ${
      moviesArray[0].year
    } with an average score of ${moviesArray[0].score}`;
  }

  const yearScores = {};
  let bestYear = null;
  let bestAvg = 0;

  moviesArray.forEach((movie) => {
    const year = movie.year;
    const score = movie.score;

    if (!yearScores[year]) {
      yearScores[year] = [];
    }
    yearScores[year].push(score);
  });

  Object.keys(yearScores).forEach((year) => {
    const scores = yearScores[year];
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    if (avg > bestAvg || (avg === bestAvg && Number(year) < bestYear)) {
      bestAvg = avg;
      bestYear = Number(year);
    }
  });

  return `The best year was ${bestYear} with an average score of ${bestAvg.toFixed(
    1
  )}`;
}
