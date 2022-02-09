import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PizzaBlock = ({ name, price, imageUrl, sizes, types }) => {
  const typeNames = ['тонкое', 'традиционное'];
  const avaiableSizes = [26, 30, 40];
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
console.log(sizes[0], types[0]);
  const handleSelectTypeClick = (index) => setSelectedType(index);
  const typesOfPizza =
    typeNames &&
    typeNames.map((element, index) => (
      <li
        onClick={() => handleSelectTypeClick(index)}
        key={index}
        className={classNames({
          active: selectedType === index,
          disabled: !types.includes(index),
        })}>
        {element}
      </li>
    ));

  const handleSelectSizeClick = (index) => setSelectedSize(index);
  const sizesOfpizza =
    avaiableSizes &&
    avaiableSizes.map((size, index) => (
      <li
        onClick={() => handleSelectSizeClick(index)}
        key={index}
        className={classNames({
          active: selectedSize === index,
          disabled: !sizes.includes(size),
        })}>
        {size} см.
      </li>
    ));

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>{typesOfPizza}</ul>
        <ul>{sizesOfpizza}</ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>2</i>
        </div>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.number),
  types: PropTypes.arrayOf(PropTypes.number),
};

PizzaBlock.defaultProps = {
  name: 'pizza',
  price: 0,
  imageUrl: '',
  sizes: [],
  types: [],
};

export default PizzaBlock;
