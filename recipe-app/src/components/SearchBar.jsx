import { useState, useEffect } from "react";

const SearchBar = ({ onSearch, categories = [], ingredients = [] }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  // Trigger search instantly when filters or query change (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch({ query, category: selectedCategory, ingredient: selectedIngredient });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, selectedCategory, selectedIngredient, onSearch]);

  return (
    <div className="row mb-4 g-2">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Search Recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
        >
          <option value="">All Ingredients</option>
          {ingredients.map((ing) => (
            <option key={ing} value={ing}>
              {ing}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
