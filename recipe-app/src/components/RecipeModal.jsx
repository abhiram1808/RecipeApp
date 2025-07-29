// src/components/RecipeModal.jsx
import React from 'react';
import { Modal, Button, Image, Badge } from 'react-bootstrap';

const RecipeModal = ({ show, handleClose, recipe }) => {
  if (!recipe) return null;

  const parseInstructions = (instructions) => {
    return instructions
      .split('.')
      .map((step, index) => step.trim())
      .filter(Boolean)
      .map((step, index) => (
        <li key={index}>Step {index + 1}: {step}.</li>
      ));
  };

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.strMeal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={recipe.strMealThumb} fluid rounded className="mb-3" />
        <h6>
          <Badge bg="secondary" className="me-2">{recipe.strCategory}</Badge>
          {recipe.strArea && <Badge bg="info">{recipe.strArea}</Badge>}
        </h6>

        <h5 className="mt-4">🧂 Ingredients</h5>
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h5 className="mt-4">📋 Instructions</h5>
        <ol>
          {parseInstructions(recipe.strInstructions)}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
          >
            Watch Video
          </a>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;
