import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Heart } from 'lucide-react';

const AppNavbar = ({ wishlistCount, onWishlistClick }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-5 px-5">
      <Navbar.Brand href="/">🍽 Recipe App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link onClick={onWishlistClick} style={{ position: 'relative' }}>
            <Heart color="red" size={24} />
            {wishlistCount > 0 && (
              <Badge
                pill
                bg="danger"
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-4px', // ← Adjusted from -10px to -4px
                  fontSize: '0.7rem',
                  padding: '4px 6px',
                }}
              >
                {wishlistCount}
              </Badge>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
