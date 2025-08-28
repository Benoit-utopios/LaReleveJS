import { Movie } from "./interfaces/movie.js";
import { Rating } from "./enums/rating.js";          
import { RatingEntry } from "./interfaces/ratingEntry.js";
import { Comment } from "./interfaces/comment.js";
import { User } from "./interfaces/user.js";        

// ===== Helpers =====
const generateUniqueIdWithPrefix = (prefix = "id") =>
  `${prefix}_${(typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : (Date.now().toString(36) + Math.random().toString(36).slice(2,8))}`;

const getCurrentTimestampIsoString = () => new Date().toISOString();

const normalizeSingleTagToLowerTrimmed = (rawTag) =>
  String(rawTag ?? "").trim().toLowerCase();

const toNormalizedTagListUnique = (rawTags) => {
  const arr = Array.isArray(rawTags) ? rawTags : (rawTags ? [rawTags] : []);
  const set = new Set(arr.map(normalizeSingleTagToLowerTrimmed).filter(Boolean));
  return [...set];
};

const isValidRatingValueBetween1And5 = (ratingValue) =>
  Number.isFinite(ratingValue) && ratingValue >= 1 && ratingValue <= 5;

// ===== Data =====
let users = [
  { id: "u_tmp_1", displayName: "User 1" },
  { id: "u_tmp_2", displayName: "User 2" }
];

let movies = [
  new Movie(
    "film_001",
    "Sharknado",
    2013,
    "http://image.test/shark.jpg",
    "Des tornades remplies de requins",
    ["requins", "catastrophe"],
    [], // ratings
    []  // comments
  )
];


const getSingleMovieByIdOrNull = (movieId) =>
  movies.find(m => m.id === movieId) || null;

// ===== Movies =====
const addFilm = (title, year, imageUrl, description, tags) => {
  const movie = new Movie(
    generateUniqueIdWithPrefix("film"),
    title,
    year,
    imageUrl,
    String(description ?? "").slice(0, 300),
    toNormalizedTagListUnique(tags),
    [],
    []
  );
  movies.push(movie);
  return movie;
};

const getFilms = () => movies;

// ===== Ratings =====
const addOrReplaceUserRatingForMovieById = (movieId, userId, ratingValue) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  if (!movie) return null;

  const v = Number(ratingValue);
  if (!isValidRatingValueBetween1And5(v)) return null;

  const idx = movie.ratings.findIndex(r => r.userId === userId);
  const entry = new RatingEntry(userId, v);
  if (idx >= 0) movie.ratings[idx] = entry;
  else movie.ratings.push(entry);
  return movie;
};

const computeAverageRatingForMovieById = (movieId) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  if (!movie || movie.ratings.length === 0) return 0;
  const sum = movie.ratings.reduce((acc, r) => acc + Number(r.value || 0), 0);
  return Number((sum / movie.ratings.length).toFixed(1));
};

// Aliases “simples” for the tests/UI
const addRating = addOrReplaceUserRatingForMovieById;
const getAverageRating = computeAverageRatingForMovieById;

// ===== Comments =====
const addUserCommentToMovieById = (movieId, userId, commentText) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  if (!movie) return null;

  const text = String(commentText ?? "").trim().slice(0, 300);
  if (!text) return null;

  const comment = new Comment(
    generateUniqueIdWithPrefix("c"),
    userId,
    text,
    getCurrentTimestampIsoString()
  );
  movie.comments.push(comment);
  return comment;
};

const getAllCommentsForMovieById = (movieId) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  return movie ? movie.comments : [];
};

// Aliases simple
const addComment = addUserCommentToMovieById;
const getComments = getAllCommentsForMovieById;

// ===== Tags =====
const addSingleTagToMovieById = (movieId, rawTag) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  if (!movie) return null;
  const tag = normalizeSingleTagToLowerTrimmed(rawTag);
  if (!tag) return movie;
  const hasAlready = (movie.tags ?? []).map(normalizeSingleTagToLowerTrimmed).includes(tag);
  if (!hasAlready) movie.tags.push(tag);
  return movie;
};

const addMultipleTagsToMovieById = (movieId, rawTags) => {
  const movie = getSingleMovieByIdOrNull(movieId);
  if (!movie) return null;
  toNormalizedTagListUnique(rawTags).forEach(tag => addSingleTagToMovieById(movieId, tag));
  return movie;
};

// ===== Filters =====
const filterMoviesByTitleSubstringCaseInsensitive = (titleQueryString) => {
  const q = String(titleQueryString ?? "").trim().toLowerCase();
  if (!q) return [...movies];
  return movies.filter(m => m.title.toLowerCase().includes(q));
};

const filterMoviesByAnyMatchingTagCaseInsensitive = (tagsToMatch) => {
  const wanted = toNormalizedTagListUnique(tagsToMatch);
  if (wanted.length === 0) return [...movies];
  return movies.filter(m =>
    (m.tags ?? []).some(t => wanted.includes(normalizeSingleTagToLowerTrimmed(t)))
  );
};

const filterMoviesByAllMatchingTagsCaseInsensitive = (tagsToMatch) => {
  const wanted = toNormalizedTagListUnique(tagsToMatch);
  if (wanted.length === 0) return [...movies];
  return movies.filter(m => {
    const movieTags = (m.tags ?? []).map(normalizeSingleTagToLowerTrimmed);
    return wanted.every(w => movieTags.includes(w));
  });
};

// ===== Tests =====
console.log("=== Films initiaux ===");
console.dir(getFilms(), { depth: null });

console.log("=== Ajout un film ===");
const f1 = addFilm("Birdemic", 2010, "http://image.test/bird.jpg", "Des oiseaux tueurs", ["oiseaux", "horreur"]);
console.log(f1);

console.log("=== Ajout / remplacement de notes ===");
addRating(f1.id, "u_tmp_1", Rating.ONE);
addRating(f1.id, "u_tmp_2", Rating.FIVE);
addRating(f1.id, "u_tmp_2", 4); 
console.log("Moyenne:", getAverageRating(f1.id));

console.log("=== Ajout un commentaire ===");
addComment(f1.id, "u_tmp_3", "omg c’est nul !");
console.log(getComments(f1.id));

console.log("=== Filtres ===");
console.log("Search 'shark':", filterMoviesByTitleSubstringCaseInsensitive("shark").map(m => m.title));
console.log("Filter tag 'horreur':", filterMoviesByAnyMatchingTagCaseInsensitive("horreur").map(m => m.title));
console.log("Filter tag 'oiseaux':", filterMoviesByAllMatchingTagsCaseInsensitive("oiseaux").map(m => m.title));

console.log("=== Movies actuels ===");
console.dir(getFilms(), { depth: null });
