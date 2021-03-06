import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../Components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

export const Main = () => {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector(({ pizzas }) => {
    return {
      items: pizzas.items,
      isLoaded: pizzas.isLoaded,
    };
  });
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const handlePizzaToCart = (obj) => {
    dispatch(addPizzaCart(obj));
  };

  const renderPizzas = items.map((item) => (
    <PizzaBlock
      onClickAddPizza={handlePizzaToCart}
      addedCount={cartItems[item.id] && cartItems[item.id].items.length}
      key={item.id}
      {...item}
    />
  ));

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), []);
  const onSelectSortType = React.useCallback((index) => dispatch(setSortBy(index)), []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded && isLoaded
          ? renderPizzas
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
};
