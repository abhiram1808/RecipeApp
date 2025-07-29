import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';
import RecipeModal from '../components/RecipeModal';
import AppNavbar from '../components/Navbar';
import WishlistModal from '../components/WishlistModal';
import SearchBar from '../components/SearchBar';
import './HomePage.css'

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealRes, catRes, ingRes] = await Promise.all([
          axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='),
          axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        ]);

        const allMeals = mealRes.data.meals || [];
        const allCategories = catRes.data.meals.map(cat => cat.strCategory);
        const allIngredients = ingRes.data.meals.map(ing => ing.strIngredient);

        setRecipes(allMeals);
        setFilteredRecipes(allMeals);
        setCategories(allCategories);
        setIngredients(allIngredients);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes. Try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load Wishlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Save Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Filtering logic
  useEffect(() => {
    let filtered = [...recipes];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedCategories.includes(recipe.strCategory)
      );
    }

    if (selectedIngredient) {
      filtered = filtered.filter(recipe =>
        Object.values(recipe).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(selectedIngredient.toLowerCase())
        )
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, selectedCategories, selectedIngredient, recipes]);

  // Handles all search input (query, category, ingredient)
  const handleSearchChange = ({ query, category, ingredient }) => {
    setSearchQuery(query || '');
    setSelectedCategories(category ? [category] : []);
    setSelectedIngredient(ingredient || '');
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
  };

  const toggleWishlist = (recipe) => {
    const exists = wishlist.find(item => item.idMeal === recipe.idMeal);
    const updated = exists
      ? wishlist.filter(item => item.idMeal !== recipe.idMeal)
      : [...wishlist, recipe];
    setWishlist(updated);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };

  return (
    <>
      <AppNavbar
        wishlistCount={wishlist.length}
        onWishlistClick={() => setShowWishlist(!showWishlist)}
      />

      <WishlistModal
        show={showWishlist}
        handleClose={() => setShowWishlist(false)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onOpenModal={openModal}
      />

      <Container className="my-4">
        <SearchBar
          onSearch={handleSearchChange}
          categories={categories}
          ingredients={ingredients}
        />

        {/* <FilterBar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        /> */}

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {filteredRecipes.map((recipe) =>
              recipe?.idMeal ? (
                <Col key={recipe.idMeal} md={4} sm={6} xs={12} className="mb-4">
                  <RecipeCard
                    meal={recipe}
                    isWished={wishlist.some(item => item.idMeal === recipe.idMeal)}
                    onToggleWishlist={() => toggleWishlist(recipe)}
                    onOpenModal={() => openModal(recipe)}
                  />
                </Col>
              ) : null
            )}
          </Row>
        )}
      </Container>

      <RecipeModal
        show={showModal}
        handleClose={closeModal}
        recipe={selectedRecipe}
      />
    </>
  );
};

export default HomePage;
