import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const WishlistModal = ({ show, handleClose, wishlist, onToggleWishlist, onOpenModal }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>❤️ Your Wishlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {wishlist.length === 0 ? (
          <p className="text-center text-muted">No saved recipes yet.</p>
        ) : (
          <Row>
            {wishlist.map((meal) => (
              <Col key={meal.idMeal} md={6} className="mb-3">
                <RecipeCard
                  meal={meal}
                  isWished={true}
                  onToggleWishlist={() => onToggleWishlist(meal)}
                  onOpenModal={() => onOpenModal(meal)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WishlistModal;
