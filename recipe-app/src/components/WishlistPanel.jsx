import React from 'react';
import { Button, Card } from 'react-bootstrap';

const WishlistPanel = ({ wishlist, onClose, onRemove }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '320px',
        height: '100%',
        background: '#fff',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
        zIndex: 999,
        overflowY: 'auto',
        padding: '1rem',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">💖 Wishlist</h5>
        <Button variant="outline-danger" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      {wishlist.length === 0 ? (
        <p>No recipes in wishlist.</p>
      ) : (
        wishlist.map((recipe) => (
          <Card key={recipe.idMeal} className="mb-3">
            <Card.Img variant="top" src={recipe.strMealThumb} />
            <Card.Body>
              <Card.Title>{recipe.strMeal}</Card.Title>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onRemove(recipe)}
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default WishlistPanel;
