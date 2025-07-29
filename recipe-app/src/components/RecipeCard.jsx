// src/components/RecipeCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart, Eye } from 'lucide-react';

const RecipeCard = ({ meal, isWished, onToggleWishlist, onOpenModal }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{meal.strMeal}</span>
          <Heart
            color={isWished ? 'red' : 'gray'}
            fill={isWished ? 'red' : 'none'}
            onClick={onToggleWishlist}
            style={{ cursor: 'pointer' }}
          />
        </Card.Title>
        <Card.Text>
          <small>Category: {meal.strCategory}</small>
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" size="sm" onClick={onOpenModal}>
            <Eye size={18} className="me-1" />
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
