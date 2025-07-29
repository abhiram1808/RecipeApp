import React, { useState } from 'react';
import { Form, Button, Collapse } from 'react-bootstrap';

const FilterBar = ({ categories, selectedCategories, onCategoryChange }) => {
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleClear = () => {
    onCategoryChange([]);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="filter-collapse"
        aria-expanded={open}
        variant="outline-primary"
        className="mb-3"
      >
        {open ? 'Hide Filters' : 'Show Filters'}
      </Button>

      <Collapse in={open}>
        <div id="filter-collapse" className="mb-3 border p-3 rounded">
          <h5>Filter by Category</h5>
          <Form>
            {categories.map(category => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
            ))}
          </Form>
          <Button variant="secondary" size="sm" onClick={handleClear} className="mt-2">
            Clear Filters
          </Button>
        </div>
      </Collapse>
    </>
  );
};

export default FilterBar;
