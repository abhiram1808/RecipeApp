import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";



export const fetchRecipeById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data.meals[0];
};


export const fetchAreas = async () => {
  const res = await axios.get(`${BASE_URL}/list.php?a=list`);
  return res.data.meals;
};

export const fetchIngredients = async () => {
  const res = await axios.get(`${BASE_URL}/list.php?i=list`);
  return res.data.meals;
};



export const fetchCategories = async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  const data = await res.json();
  return data.meals || [];
};

export const fetchByFilter = async (type, value = '') => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${value}`);
  const data = await res.json();
  return data.meals || [];
};

export const fetchRecipes = async (query = '') => {
  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const res = await fetch(url);
  const data = await res.json();
  return data.meals || [];
};
