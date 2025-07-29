const FAVORITES_KEY = "favoriteRecipes";

export const getFavorites = () => {
  const fav = localStorage.getItem(FAVORITES_KEY);
  return fav ? JSON.parse(fav) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const toggleFavorite = (recipe) => {
  const favs = getFavorites();
  const exists = favs.find((f) => f.idMeal === recipe.idMeal);

  const updated = exists
    ? favs.filter((f) => f.idMeal !== recipe.idMeal)
    : [...favs, recipe];

  saveFavorites(updated);
  return updated;
};

export const isFavorite = (id) => {
  return getFavorites().some((f) => f.idMeal === id);
};
