import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(({ activeCategory, items, onClickCategory }) => {
  const nameOfCategory =
    items &&
    items.map((name, index) => (
      <li
        onClick={() => onClickCategory(index)}
        className={activeCategory === index ? 'active' : ''}
        key={`${name}_${index}`}>
        {name}
      </li>
    ));
  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>Все</li>
        {nameOfCategory}
        </ul>
    </div>
  );
});

Categories.propTypes = {
  // activeCategory: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = {
  items: [],
  activeCategory: null,
};

export default Categories;
